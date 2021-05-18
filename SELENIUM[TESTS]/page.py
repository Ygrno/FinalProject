from selenium.webdriver.support.wait import WebDriverWait
from locator import *
from element import BasePageElement
from selenium.webdriver.support.ui import Select

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

class ProfilePage(BasePage):

    def load_details(self):
        WebDriverWait(self.driver, 100).until(
            lambda driver: driver.find_element_by_id('h2_name'))
        self.name = self.driver.find_element_by_id('h2_name').text
        self.email = self.driver.find_element_by_id('h2_email').text
        self.birth = self.driver.find_element_by_id('h2_birth').text
        self.address = self.driver.find_element_by_id('h2_address').text
    
    def edit_profile(self, private_name, last_name):
        element = self.driver.find_element(*ProfileLocators.EDIT_BUTTON)
        element.click()

        WebDriverWait(self.driver, 100).until(
            lambda driver: driver.find_element_by_id('normal_login_lastName'))
        self.driver.find_element_by_id('normal_login_name').send_keys(private_name)
        self.driver.find_element_by_id('normal_login_lastName').send_keys(last_name)

        ok_button = self.driver.find_element_by_css_selector("button[class='ant-btn ant-btn-primary']")
        # ok_button = (By.CSS_SELECTOR,"button[class='ant-btn ant-btn-primary']")
        ok_button.click()

class ApplicationPage(BasePage):

    def add_application(self,subject,details):
        add_application = self.driver.find_element(*ApplicationLocators.ADD_APPLICATION)
        add_application.click()
        WebDriverWait(self.driver, 100).until(lambda driver: driver.find_element_by_id('input'))
        selector = Select(self.driver.find_element_by_id('app_subject'))
        selector.select_by_visible_text(subject)
        self.driver.find_element_by_id('input').send_keys(details)

        send_application = self.driver.find_element(*ApplicationLocators.SEND_APPLICATION)
        send_application.click()

        WebDriverWait(self.driver, 5)

        approve_button = self.driver.find_element_by_css_selector("button[class='ant-btn ant-btn-primary ant-btn-rtl']")
        approve_button.click()

class MyApplicationPage(BasePage):

    def exist_application(self,details):
        WebDriverWait(self.driver, 100).until(
            lambda driver: driver.find_elements_by_id('application_details'))
        
        application_details = self.driver.find_elements_by_id('application_details')
        for a_d in application_details:
            if a_d.text.find(details) >= 0:
                return True
        return False


    



    def edit_profile(self, private_name, last_name):
        element = self.driver.find_element(*ProfileLocators.EDIT_BUTTON)
        element.click()

        WebDriverWait(self.driver, 100).until(
            lambda driver: driver.find_element_by_id('lastName'))
        self.driver.find_element_by_id('name').send_keys(private_name)

        WebDriverWait(self.driver, 100).until(
            lambda driver: driver.find_element_by_id('lastName'))
        self.driver.find_element_by_id('lastName').send_keys(last_name)

        ok_button = self.driver.find_element_by_css_selector("button[class='ant-btn ant-btn-primary']")
        # ok_button = (By.CSS_SELECTOR,"button[class='ant-btn ant-btn-primary']")
        ok_button.click()


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

class SoldierMemberPage(BasePage):

    def checkPages(self):

        try:
            application = self.driver.find_element(*StaffMemberLocators.APPLICATION_LINK)
            return False
        except:
            pass

        try:
            staff = self.driver.find_element(*StaffMemberLocators.STAFF_LINK)
            return False
        except:
            pass

        try:
            home = self.driver.find_element(*StaffMemberLocators.HOME_LINK)
            my_application = self.driver.find_element(*StaffMemberLocators.MY_APPLICATION_LINK)
            profile = self.driver.find_element(*StaffMemberLocators.PROFILE_LINK)
        except:
            return False
        
        return True




class VolunteerMemberPage(BasePage):

    def checkPages(self):

        try:
            staff = self.driver.find_element(*StaffMemberLocators.STAFF_LINK)
            return False
        except:
            pass

        try:
            home = self.driver.find_element(*StaffMemberLocators.HOME_LINK)
            application = self.driver.find_element(*StaffMemberLocators.APPLICATION_LINK)
            my_application = self.driver.find_element(*StaffMemberLocators.MY_APPLICATION_LINK)
            profile = self.driver.find_element(*StaffMemberLocators.PROFILE_LINK)
        except:
            return False
        
        return True

class RegisterPage(BasePage):
    register_email = SearchTextElement('register_email')
    register_password = SearchTextElement('register_password')
    register_confirm = SearchTextElement('register_confirm')
    register_firstname = SearchTextElement('register_firstname')
    register_lastname = SearchTextElement('register_lastname')
    register_phone = SearchTextElement('register_phone')
    register_city = SearchTextElement('register_city')
    register_streetName = SearchTextElement('register_streetName')
    register_buildingNumber = SearchTextElement('register_buildingNumber')
    
    
    
    def enter_private_number(self):
        register_privateNumber = self.driver.find_element_by_id('register_privateNumber')
        register_privateNumber.send_keys('1234567')

    def click_submit_button(self):
        element = self.driver.find_element(*RegisterLocators.SUBMIT_BUTTON)
        element.click()

    def is_registered(self):
        check = WebDriverWait(self.driver, 40).until(lambda driver: driver.current_url != 'http://localhost:3000/register')
        print(self.driver.current_url)
        return check


