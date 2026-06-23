// ============================================================
// api.types.ts — مبني 1:1 على الـ Entities والـ DTOs الحقيقية
// ============================================================

// ── Enums — مطابقة للـ entities ──────────────────────────────

export enum Gender {
  Male = 1,   // ذكر
  Female = 2, // أنثى
}

export enum MaritalStatus {
  Single = 1,   // أعزب
  Married = 2,  // متزوج
  Divorced = 3, // مطلق
  Widowed = 4,  // أرمل
}

// ReligiousStatus — قيمتين بس حسب الـ entity الحقيقي
export enum ReligiousStatus {
  Islam = 1,       // مسلم
  Christianity = 2, // مسيحي
}

// RequestStatus — حسب Request.cs entity
export enum RequestStatus {
  Pending = 0,
  Processing = 1,
  Completed = 2,
  Failed = 3,
}

// ConversationStatus — حسب Conversation.cs entity
export enum ConversationStatus {
  Active = 0,
  Confirmed = 1,
  Closed = 2,
}

// ══════════════════════════════════════════════════════════════
// IDENTITY DTOs
// ══════════════════════════════════════════════════════════════

export interface LoginDTO {
  email: string;
  password: string;
}

export interface RegisterDTO {
  Email: string;
  Password: string;
  FullName: string;
  Address: string;
  NationalId: string;
  DateOfBirth: string; // "YYYY-MM-DD"
  PhoneNumber: string;
  Occupation: string;
  Gender: Gender;
  MaritalStatus: MaritalStatus;
  ReligiousStatus: ReligiousStatus;
  ProfilePicture?: File;
  IdCardImage: File;
}

export interface ForgotPasswordDTO {
  email: string;
}

export interface ResetPasswordDTO {
  email: string;
  otpCode: string;
  newPassword: string;
}

export interface RequestOtpDTO {
  email: string;
  purpose: string;
}

export interface VerifyOtpDTO {
  email: string;
  otpCode: string;
  purpose: string;
}

export interface ChangePasswordDTO {
  currentPassword: string;
  newPassword: string;
}

// UserDTO — مطابق لـ ApplicationUser.cs + login response
export interface UserDTO {
  id: string;
  fullName: string;
  address: string;
  nationalId: string;
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  occupation?: string | null;
  gender: Gender;
  maritalStatus: MaritalStatus;
  religiousStatus: ReligiousStatus;
  profilePictureUrl?: string | null;
  createdAt: string;
  updatedAt: string;
}

export type UserProfile = UserDTO;

// AuthResponseDTO — مطابق للـ login response الفعلي
export interface AuthResponseDTO {
  token: string;
  refreshToken: string;
  expiresAt: string;
  user: UserDTO;
}

export type LoginResponse = AuthResponseDTO;

// ══════════════════════════════════════════════════════════════
// ID CARD SCAN DTOs
// ══════════════════════════════════════════════════════════════

export interface ScanResultDTO {
  isReliable: boolean;
  overallScore: number;
  idCardConfidence: number;
  fullNameConfidence: number;
  nationalIdConfidence: number;
  dateOfBirthConfidence: number;
  addressConfidence: number;
  fullName: string;
  nationalId: string;
  dateOfBirth: string;
  address: string;
}

// ══════════════════════════════════════════════════════════════
// CONVERSATION DTOs — مبني على Conversation.cs entity
// ══════════════════════════════════════════════════════════════

// Message object جوه الـ Messages JSON array
export interface ConversationMessage {
  role: "user" | "assistant" | "bot";
  content: string;
  timestamp?: string;
}

// ConversationDTO
export interface ConversationDTO {
  id: number;
  messages: string;              // JSON array string من الـ entity
  collectedData?: string | null;
  detectedServiceName?: string | null;
  serviceId?: number | null;
  status: ConversationStatus;
  createdAt: string;
  updatedAt: string;
}

// MessageResponseDTO — response من /api/Conversations/{id}/message
export interface MessageResponseDTO {
  botResponse: string;
  collectedData?: string | null;
  isReadyToConfirm: boolean;
  missingFields?: string[] | null;
  detectedServiceName?: string | null;
}

export interface SendMessageDTO {
  message: string;
}

// ══════════════════════════════════════════════════════════════
// REQUEST DTOs — مبني على Request.cs entity
// ══════════════════════════════════════════════════════════════

export interface ResponseDTO {
  requestId: number;
  content: string;
  receivedAt: string;
}

export interface RequestDTO {
  id: number;
  serviceName: string;
  requestData?: string | null;
  status: RequestStatus;
  note?: string | null;
  createdAt: string;
  updatedAt: string;
  digitalEgyptRequestCreatedAt?: string | null;
  response?: ResponseDTO | null;
}

// ══════════════════════════════════════════════════════════════
// MINISTRY & SERVICE DTOs — مبني على الـ entities
// ══════════════════════════════════════════════════════════════

export interface MinistryDTO {
  id: number;
  name: string;
  description: string;
  websiteUrl: string;
}

export interface ServiceDTO {
  id: number;
  name: string;
  description: string;
  whoCanApply: string;
  requiredDocuments: string[];
  termsAndConditions: string[];
  fee: number;
  processingEstimatedTime: string;
  ministry: string;
  similarServices: string[];
}

// ServiceCenter — فيه Latitude/Longitude في الـ entity نفسه
export interface ServiceCenterDTO {
  id: number;
  name: string;
  description: string;
  address: string;
  city: string;
  operatingHours: string;
  ministry: string;
}

export interface ServiceCenterLocationDTO {
  latitude: number;
  longitude: number;
}

// ══════════════════════════════════════════════════════════════
// PAGINATED RESULTS
// ══════════════════════════════════════════════════════════════

export interface PaginatedResult<T> {
  pageIndex: number;
  pageSize: number;
  count: number;
  data: T[] | null;
}

export type MinistryDTOPaginatedResult = PaginatedResult<MinistryDTO>;
export type ServiceDTOPaginatedResult = PaginatedResult<ServiceDTO>;
export type ServiceCenterDTOPaginatedResult = PaginatedResult<ServiceCenterDTO>;

// ══════════════════════════════════════════════════════════════
// QUERY PARAMS
// ══════════════════════════════════════════════════════════════

export interface PaginationParams {
  PageIndex?: number;
  PageSize?: number;
  Search?: string;
}

export interface MinistriesParams extends PaginationParams {}
export interface ServicesParams extends PaginationParams { MinistryId?: number; }
export interface ServiceCentersParams extends PaginationParams { MinistryId?: number; City?: string; }
export interface RequestsParams extends PaginationParams { Status?: RequestStatus; IsDescending?: boolean; }
