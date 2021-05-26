from selenium.webdriver.support.wait import WebDriverWait
from locator import *
from element import BasePageElement
from selenium.webdriver.support.ui import Select
import time

TIME_TO_WAIT = 7

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
        check = True
        try:
            check = WebDriverWait(self.driver, TIME_TO_WAIT).until(lambda driver: driver.current_url != 'http://localhost:3000/login')
        except:
            pass
        print(self.driver.current_url)
        return check

class ProfilePage(BasePage):

    def load_details(self):
        try:
            WebDriverWait(self.driver, TIME_TO_WAIT).until(
                lambda driver: driver.find_element_by_id('span_house'))
        except:
            return False
        self.name = self.driver.find_element_by_id('span_name').text
        self.email = self.driver.find_element_by_id('span_email').text
        self.birth = self.driver.find_element_by_id('span_birth').text
        self.city = self.driver.find_element_by_id('span_city').text
        self.street = self.driver.find_element_by_id('span_street').text
        self.house = self.driver.find_element_by_id('span_house').text
        return True
    
    def edit_profile(self, private_name='', last_name='', city='', street='',house=''):
        element = self.driver.find_element(*ProfileLocators.EDIT_BUTTON)
        element.click()

        WebDriverWait(self.driver, TIME_TO_WAIT).until(
            lambda driver: driver.find_element_by_id('normal_login_lastName'))
        if private_name != '': self.driver.find_element_by_id('normal_login_name').send_keys(private_name)
        if last_name != '': self.driver.find_element_by_id('normal_login_lastName').send_keys(last_name)
        if city != '': self.driver.find_element_by_id('normal_login_city').send_keys(city)
        if street != '': self.driver.find_element_by_id('normal_login_street').send_keys(street)
        if house != '': self.driver.find_element_by_id('normal_login_building').send_keys(house)
        ok_button = self.driver.find_element_by_id("update_details")
        # ok_button = (By.CSS_SELECTOR,"button[class='ant-btn ant-btn-primary']")
        ok_button.click()

        time.sleep(5)

class ApplicationPage(BasePage):

    def add_application(self,subject, summary, description):
        add_application = self.driver.find_element(*ApplicationLocators.ADD_APPLICATION)
        add_application.click()
        WebDriverWait(self.driver, TIME_TO_WAIT).until(lambda driver: driver.find_element_by_id('description'))
        selector = Select(self.driver.find_element_by_id('app_subject'))
        selector.select_by_visible_text(subject)
        self.driver.find_element_by_id('summary').send_keys(summary)
        self.driver.find_element_by_id('description').send_keys(description)

        send_application = self.driver.find_element(*ApplicationLocators.SEND_APPLICATION)
        send_application.click()

        time.sleep(5)

        # WebDriverWait(self.driver, 5)

        # approve_button = self.driver.find_element_by_css_selector("button[class='ant-btn ant-btn-primary ant-btn-rtl']")
        # approve_button.click()

    def take_care_application(self, summary):
        try:
            WebDriverWait(self.driver, TIME_TO_WAIT).until(
                lambda driver: driver.find_elements_by_id('app_card'))
        except:
            return False
        app_card = self.driver.find_elements_by_id('app_card')
        found = False
        for a_c in app_card:
            if a_c.text.find(summary) >= 0:
                try:
                    button = a_c.find_element_by_id('take_care')
                    button.click()
                    found = True
                    alert = self.driver.switchTo().alert()
                    alert.accept()
                    break
                except:
                    pass

        
        return found
        

class MyApplicationPage(BasePage):

    def exist_application(self,details):
        self.driver.get("http://localhost:3000/myApplications")
        WebDriverWait(self.driver, 5).until(
            lambda driver: driver.find_elements_by_id('application_details'))
        
        application_details = self.driver.find_elements_by_id('application_details')
        for a_d in application_details:
            if a_d.text.find(details) >= 0:
                return True
        return False


    def edit_profile(self, private_name, last_name):
        element = self.driver.find_element(*ProfileLocators.EDIT_BUTTON)
        element.click()

        WebDriverWait(self.driver, TIME_TO_WAIT).until(
            lambda driver: driver.find_element_by_id('lastName'))
        self.driver.find_element_by_id('name').send_keys(private_name)

        WebDriverWait(self.driver, TIME_TO_WAIT).until(
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
            # my_application = self.driver.find_element(*StaffMemberLocators.MY_APPLICATION_LINK)
            profile = self.driver.find_element(*StaffMemberLocators.PROFILE_LINK)
            staff = self.driver.find_element(*StaffMemberLocators.STAFF_LINK)
            return True
        except:
            return False

    def find_existed_soldier(self, name):
        try:
            WebDriverWait(self.driver, TIME_TO_WAIT).until(
                lambda driver: driver.find_element_by_id('existing_soldiers'))
        except:
            return False
        button = self.driver.find_element(*StaffMemberLocators.EXISTED_LIST_BUTTON)
        button.click()

        try:
            WebDriverWait(self.driver, TIME_TO_WAIT).until(
                lambda driver: driver.find_element_by_id("soldiers_details"))
        except:
            return False

        soldiers_elements = self.driver.find_elements_by_id("soldiers_details")
        for s in soldiers_elements:
            if s.text.find(name) >= 0:
                return True
        return False

    def approve_application(self, app_id):
        try:
            WebDriverWait(self.driver, TIME_TO_WAIT).until(
                lambda driver: driver.find_element_by_id('applications_list'))
        except:
            return False
        button = self.driver.find_element(*StaffMemberLocators.APPROVE_LIST_BUTTON)
        button.click()

        try:
            WebDriverWait(self.driver, TIME_TO_WAIT).until(
                lambda driver: driver.find_element_by_id("app_approve"))
        except:
            return False

        application_elements = self.driver.find_elements_by_id("app_approve")
        found = False
        for a in application_elements:
            if a.text.find(app_id) >= 0:
                button = a.find_element_by_id('open_app')
                button.click()
                found = True
                try:
                    approve_button = self.driver.find_element(*ApplicationLocators.APPROVE_BUTTON)
                    approve_button.click()
                except:
                    return False
                break
        return found





    

class SoldierMemberPage(BasePage):

    def checkPages(self):
        try:
            staff = self.driver.find_element(*StaffMemberLocators.STAFF_LINK)
            return False
        except:
            pass

        try:
            home = self.driver.find_element(*StaffMemberLocators.HOME_LINK)
            my_application = self.driver.find_element(*StaffMemberLocators.MY_APPLICATION_LINK)
            profile = self.driver.find_element(*StaffMemberLocators.PROFILE_LINK)
            application = self.driver.find_element(*StaffMemberLocators.APPLICATION_LINK)
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

    def approve_takanon(self):
        element = self.driver.find_element(*RegisterLocators.TAKANON)
        element.click()

        WebDriverWait(self.driver, 5).until(
            lambda driver: driver.find_element(*RegisterLocators.APPROVE_BUTTON))
        element = self.driver.find_element(*RegisterLocators.APPROVE_BUTTON)
        element.click()


    def click_submit_button(self):
        element = self.driver.find_element(*RegisterLocators.SUBMIT_BUTTON)
        element.click()


    def is_registered(self):
        check = True
        try:
            check = WebDriverWait(self.driver, 10).until(lambda driver: driver.current_url != 'http://localhost:3000/register')
        except:
            check = False
        print(self.driver.current_url)
        return check


