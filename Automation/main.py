from automation import Automation
#from start_automation import Start_Automation

bot = Automation()

mobile = "01128417941"
password = "Seif@2003"
service_name = "استعلام عن مخالفات رخص القيادة"

bot.log_in(mobile, password)
bot.search_service(service_name)
bot.service_page()
response = bot.Driving_License("30505190101257", "خاصه", "القاهرة", "وحده مرور حدائق القبه")
print(response)