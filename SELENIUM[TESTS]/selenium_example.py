from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
PATH = "C:\Program Files\EdgeDriver\msedgedriver.exe"
driver = webdriver.Edge(PATH)

driver.get("http://localhost:3000/login")
print(driver.title)


email_input = driver.find_element_by_id('normal_login_email')
email_input.send_keys("test@gmail.com")
# search.send_keys(Keys.RETURN)

time.sleep(5)

driver.quit()



