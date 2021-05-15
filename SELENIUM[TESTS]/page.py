from selenium.webdriver.support.wait import WebDriverWait
from locator import *
from element import BasePageElement

class SearchTextElement(BasePageElement):
    def __init__(self, locator):
        self.locator = locator

class BasePage(object):
    def __init__(self, driver):
        self.driver = driver

class LoginPage(BasePage):

    email_input = SearchTextElement('normal_login_email')
    password_input = SearchTextElement('normal_login_password')

    def is_title_matches(self):
        return "Python" in self.driver.title
    
    def click_submit_button(self):
        element = self.driver.find_element(*LoginPageLocators.SUBMIT_BUTTON)
        element.click()
    
    def is_logged_in(self):
        check = WebDriverWait(self.driver, 40).until(lambda driver: driver.current_url != 'http://localhost:3000/login')
        print(self.driver.current_url)
        return check

class StaffMemberPage(BasePage):

    def checkPages(self):
        try:
            home = self.driver.find_element(*StaffMemberLocators.HOME_LINK)
            application = self.driver.find_element(*StaffMemberLocators.APPLICATION_LINK)
            my_application = self.driver.find_element(*StaffMemberLocators.MY_APPLICATION_LINK)
            profile = self.driver.find_element(*StaffMemberLocators.PROFILE_LINK)
            staff = self.driver.find_element(*StaffMemberLocators.STAFF_LINK)
            return True
        except:
            return False

class RegisterPage(BasePage):
    register_email = SearchTextElement('register_email')
    register_password = SearchTextElement('register_password')
    register_confirm = SearchTextElement('register_confirm')
    register_firstname = SearchTextElement('register_firstname')
    register_lastname = SearchTextElement('register_lastname')
    register_phone = SearchTextElement('register_phone')
    
    
    def enter_private_number(self):
        register_privateNumber = self.driver.find_element_by_id('register_privateNumber')
        register_privateNumber.send_keys('1234567')

    def click_submit_button(self):
        element = self.driver.find_element(*RegisterLocators.SUBMIT_BUTTON)
        element.click()

    def is_registered(self):
        check = WebDriverWait(self.driver, 40).until(lambda driver: driver.current_url != 'http://localhost:3000/login')
        print(self.driver.current_url)
        return check


