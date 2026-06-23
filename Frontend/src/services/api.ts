// ============================================================
// api.ts — مُحدَّث بناءً على الـ DTOs الحقيقية
// ============================================================

import { authService } from "./authService";
import type {
  LoginDTO, RegisterDTO, ForgotPasswordDTO, ResetPasswordDTO,
  RequestOtpDTO, VerifyOtpDTO, ChangePasswordDTO,
  AuthResponseDTO, UserDTO, ScanResultDTO,
  MinistryDTO, MinistryDTOPaginatedResult,
  ServiceCenterDTO, ServiceCenterDTOPaginatedResult, ServiceCenterLocationDTO,
  ServiceDTO, ServiceDTOPaginatedResult,
  ConversationDTO, MessageResponseDTO, SendMessageDTO,
  RequestDTO, PaginatedResult,
  MinistriesParams, ServicesParams, ServiceCentersParams, RequestsParams,
} from "../types/api.types";

const BASE_URL = "";

// ── HTTP Helper ───────────────────────────────────────────────
async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const token = authService.getToken();

  const headers: HeadersInit = {
    ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...((options.headers as Record<string, string>) ?? {}),
  };

  const response = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers });

  if (response.status === 401) {
    const refreshed = await tryRefreshToken();
    if (refreshed) {
      const newToken = authService.getToken();
      const retryHeaders: HeadersInit = {
        ...(options.body instanceof FormData ? {} : { "Content-Type": "application/json" }),
        ...(newToken ? { Authorization: `Bearer ${newToken}` } : {}),
      };
      const retry = await fetch(`${BASE_URL}${endpoint}`, { ...options, headers: retryHeaders });
      if (!retry.ok) throw await buildError(retry);
      return parseResponse<T>(retry);
    } else {
      // انتهت الجلسة — امسح الـ token بس متعملش redirect تلقائي
      // عشان متأثرش على باقي الصفحات
      authService.logout();
      throw new Error("SESSION_EXPIRED");
    }
  }

  if (!response.ok) throw await buildError(response);
  return parseResponse<T>(response);
}

// الـ backend بيرجع كل حاجة في wrapper: { success, message, data, errors }
interface ApiWrapper<T> {
  success: boolean;
  message?: string;
  data: T;
  errors?: unknown;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    const json = await response.json();
    // لو في wrapper { success, data } استخرج الـ data
    if (json && typeof json === "object" && "success" in json && "data" in json) {
      const wrapped = json as ApiWrapper<T>;
      if (!wrapped.success) {
        throw new Error(wrapped.message ?? "حدث خطأ");
      }
      return wrapped.data;
    }
    // لو مفيش wrapper رجّع الـ response كما هو
    return json as T;
  }
  return {} as T;
}

async function buildError(response: Response): Promise<Error> {
  let message = `خطأ ${response.status}`;
  try {
    const body = await response.json();
    // الـ backend بيرجع { success: false, message: "..." }
    message = body?.message ?? body?.title ?? JSON.stringify(body);
  } catch { /* ignore */ }
  const err = new Error(message);
  (err as Error & { status: number }).status = response.status;
  return err;
}

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = authService.getRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${BASE_URL}/api/Auth/refresh-token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(refreshToken),
    });
    if (!res.ok) return false;
    const json = await res.json();
    // unwrap الـ response
    const data: AuthResponseDTO = json?.data ?? json;
    authService.setToken(data.token);
    if (data.refreshToken) authService.setRefreshToken(data.refreshToken);
    return true;
  } catch { return false; }
}

function buildQuery(params: Record<string, unknown>): string {
  const entries = Object.entries(params).filter(([, v]) => v !== undefined && v !== null && v !== "");
  if (entries.length === 0) return "";
  return "?" + entries.map(([k, v]) => `${k}=${encodeURIComponent(String(v))}`).join("&");
}

// ╔══════════════════════════════════════════════════════════════╗
// ║                        AUTH API                             ║
// ╚══════════════════════════════════════════════════════════════╝
export const authApi = {
  async login(dto: LoginDTO): Promise<AuthResponseDTO> {
    const data = await request<AuthResponseDTO>("/api/Auth/login", {
      method: "POST",
      body: JSON.stringify(dto),
    });
    authService.setToken(data.token);
    if (data.refreshToken) authService.setRefreshToken(data.refreshToken);
    if (data.user) authService.setUser(data.user);
    return data;
  },

  async register(dto: RegisterDTO): Promise<void> {
    const formData = new FormData();
    formData.append("Email", dto.Email);
    formData.append("Password", dto.Password);
    formData.append("FullName", dto.FullName);
    formData.append("Address", dto.Address);
    formData.append("NationalId", dto.NationalId);
    formData.append("DateOfBirth", dto.DateOfBirth); // "YYYY-MM-DD"
    formData.append("PhoneNumber", dto.PhoneNumber);
    formData.append("Occupation", dto.Occupation);
    formData.append("Gender", String(dto.Gender));
    formData.append("MaritalStatus", String(dto.MaritalStatus));
    formData.append("ReligiousStatus", String(dto.ReligiousStatus));
    formData.append("IdCardImage", dto.IdCardImage);
    if (dto.ProfilePicture) formData.append("ProfilePicture", dto.ProfilePicture);
    await request<void>("/api/Auth/register", { method: "POST", body: formData });
  },

  // ScanResultDTO — بيرجع بيانات البطاقة مع confidence scores
  async scanIdCard(idCardImage: File): Promise<ScanResultDTO> {
    const formData = new FormData();
    formData.append("IdCardImage", idCardImage);
    return request<ScanResultDTO>("/api/Auth/id-card-scan", { method: "POST", body: formData });
  },

  async refreshToken(token: string): Promise<AuthResponseDTO> {
    return request<AuthResponseDTO>("/api/Auth/refresh-token", {
      method: "POST",
      body: JSON.stringify(token),
    });
  },

  async revokeToken(token: string): Promise<void> {
    await request<void>("/api/Auth/revoke-token", {
      method: "POST",
      body: JSON.stringify(token),
    });
    authService.logout();
  },

  async forgotPassword(dto: ForgotPasswordDTO): Promise<void> {
    return request<void>("/api/Auth/forgot-password", { method: "POST", body: JSON.stringify(dto) });
  },

  async resetPassword(dto: ResetPasswordDTO): Promise<void> {
    return request<void>("/api/Auth/reset-password", { method: "POST", body: JSON.stringify(dto) });
  },

  async requestOtp(dto: RequestOtpDTO): Promise<void> {
    return request<void>("/api/Auth/request-otp", { method: "POST", body: JSON.stringify(dto) });
  },

  async verifyOtp(dto: VerifyOtpDTO): Promise<void> {
    return request<void>("/api/Auth/verify-otp", { method: "POST", body: JSON.stringify(dto) });
  },
};

// ╔══════════════════════════════════════════════════════════════╗
// ║                       ACCOUNT API                           ║
// ╚══════════════════════════════════════════════════════════════╝
export const accountApi = {
  async getProfile(): Promise<UserDTO> {
    return request<UserDTO>("/api/Account/profile");
  },

  async changePassword(dto: ChangePasswordDTO): Promise<void> {
    return request<void>("/api/Account/change-password", {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  async deleteAccount(): Promise<void> {
    return request<void>("/api/Account", { method: "DELETE" });
  },
};

// ╔══════════════════════════════════════════════════════════════╗
// ║                     MINISTRIES API                          ║
// ╚══════════════════════════════════════════════════════════════╝
export const ministriesApi = {
  async getAll(params: MinistriesParams = {}): Promise<MinistryDTOPaginatedResult> {
    return request<MinistryDTOPaginatedResult>(`/api/Ministries${buildQuery(params)}`);
  },
  async getById(id: number): Promise<MinistryDTO> {
    return request<MinistryDTO>(`/api/Ministries/${id}`);
  },
};

// ╔══════════════════════════════════════════════════════════════╗
// ║                    SERVICE CENTERS API                      ║
// ╚══════════════════════════════════════════════════════════════╝
export const serviceCentersApi = {
  async getAll(params: ServiceCentersParams = {}): Promise<ServiceCenterDTOPaginatedResult> {
    return request<ServiceCenterDTOPaginatedResult>(`/api/ServiceCenters${buildQuery(params)}`);
  },
  async getById(id: number): Promise<ServiceCenterDTO> {
    return request<ServiceCenterDTO>(`/api/ServiceCenters/${id}`);
  },
  async getLocation(id: number): Promise<ServiceCenterLocationDTO> {
    return request<ServiceCenterLocationDTO>(`/api/ServiceCenters/${id}/location`);
  },
};

// ╔══════════════════════════════════════════════════════════════╗
// ║                      SERVICES API                           ║
// ╚══════════════════════════════════════════════════════════════╝
export const servicesApi = {
  async getAll(params: ServicesParams = {}): Promise<ServiceDTOPaginatedResult> {
    return request<ServiceDTOPaginatedResult>(`/api/Services${buildQuery(params)}`);
  },
  async getById(id: number): Promise<ServiceDTO> {
    return request<ServiceDTO>(`/api/Services/${id}`);
  },
};

// ╔══════════════════════════════════════════════════════════════╗
// ║                   CONVERSATIONS API                         ║
// ╚══════════════════════════════════════════════════════════════╝
export const conversationsApi = {
  // POST /api/Conversations — محادثة جديدة
  async create(): Promise<ConversationDTO> {
    return request<ConversationDTO>("/api/Conversations", { method: "POST" });
  },

  // GET /api/Conversations — كل المحادثات
  async getAll(): Promise<ConversationDTO[]> {
    return request<ConversationDTO[]>("/api/Conversations");
  },

  // GET /api/Conversations/{id}
  async getById(id: number): Promise<ConversationDTO> {
    return request<ConversationDTO>(`/api/Conversations/${id}`);
  },

  // POST /api/Conversations/{id}/message
  // بيرجع MessageResponseDTO مع botResponse + isReadyToConfirm + missingFields
  async sendMessage(id: number, dto: SendMessageDTO): Promise<MessageResponseDTO> {
    return request<MessageResponseDTO>(`/api/Conversations/${id}/message`, {
      method: "POST",
      body: JSON.stringify(dto),
    });
  },

  // POST /api/Conversations/{id}/confirm — تأكيد وتنفيذ الطلب
  async confirm(id: number): Promise<void> {
    return request<void>(`/api/Conversations/${id}/confirm`, { method: "POST" });
  },

  // DELETE /api/Conversations/{id}
  async delete(id: number): Promise<void> {
    return request<void>(`/api/Conversations/${id}`, { method: "DELETE" });
  },
};

// ╔══════════════════════════════════════════════════════════════╗
// ║                      REQUESTS API                           ║
// ╚══════════════════════════════════════════════════════════════╝
export const requestsApi = {
  // GET /api/Requests — بيرجع paginated result
  async getAll(params: RequestsParams = {}): Promise<PaginatedResult<RequestDTO>> {
    return request<PaginatedResult<RequestDTO>>(`/api/Requests${buildQuery(params)}`);
  },

  // GET /api/Requests/{id}
  async getById(id: number): Promise<RequestDTO> {
    return request<RequestDTO>(`/api/Requests/${id}`);
  },

  // GET /api/Requests/{id}/response
  async getResponse(id: number): Promise<RequestDTO["response"]> {
    return request<RequestDTO["response"]>(`/api/Requests/${id}/response`);
  },
};
