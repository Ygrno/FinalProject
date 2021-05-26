import unittest
from unittest.main import main
from selenium import webdriver
import page
from locator import *
import warnings
from selenium.webdriver.support.ui import Select

def ignore_warnings(test_func):
    def do_test(self, *args, **kwargs):
        with warnings.catch_warnings():
            warnings.simplefilter("ignore", ResourceWarning)
            test_func(self, *args, **kwargs)
    return do_test

class Login_and_Register_Tests(unittest.TestCase):

    @ignore_warnings
    def setUp(self):
        PATH = "C:\Program Files\EdgeDriver\msedgedriver.exe"
        self.driver = webdriver.Edge(PATH)

    @ignore_warnings
    def test_login_soldier_member(self):
        self.driver.get("http://localhost:3000/login")
        loginPage = page.LoginPage(self.driver)
        loginPage.email_input = 'selenium_soldier1@mail.com'
        loginPage.password_input = '123'

        loginPage.click_submit_button()
        assert loginPage.is_logged_in()

        soldierPage = page.SoldierMemberPage(self.driver)
        assert soldierPage.checkPages()

    @ignore_warnings
    def test_login_wrong_password(self):
        self.driver.get("http://localhost:3000/login")
        loginPage = page.LoginPage(self.driver)
        loginPage.email_input = 'h5@h5.com'
        loginPage.password_input = '321'

        loginPage.click_submit_button()
        assert loginPage.is_logged_in()

    @ignore_warnings
    def test_login_volunteer_member(self):
        self.driver.get("http://localhost:3000/login")
        loginPage = page.LoginPage(self.driver)
        loginPage.email_input = 'selenium_volunteer@mail.com'
        loginPage.password_input = '123'

        loginPage.click_submit_button()
        assert loginPage.is_logged_in()

        volunteerPage = page.VolunteerMemberPage(self.driver)
        assert volunteerPage.checkPages()


    @ignore_warnings
    def test_login_staff_member(self):
        self.driver.get("http://localhost:3000/login")
        loginPage = page.LoginPage(self.driver)
        loginPage.email_input = 'selenium_staff_member@mail.com'
        loginPage.password_input = '123'

        loginPage.click_submit_button()
        assert loginPage.is_logged_in()

        staffPage = page.StaffMemberPage(self.driver)
        assert staffPage.checkPages()

    # @ignore_warnings
    # def test_register_new_soldier(self):
    #     self.driver.get("http://localhost:3000/register")
    #     register_page = page.RegisterPage(self.driver)
    #     register_page.register_email = "selenium_soldier3@mail.com"
    #     register_page.register_password = "123"
    #     register_page.register_confirm = "123"
    #     register_page.register_firstname = "selenium"
    #     register_page.register_lastname = "test"
    #     register_page.register_phone = "0507777771"
    #     register_page.register_city = "Haifa"
    #     register_page.register_streetName = "sport"
    #     register_page.register_buildingNumber = "54"
    #     register_group_name = self.driver.find_element_by_id('user_type')
    #     selector = Select(register_group_name)
    #     selector.select_by_visible_text('חייל')

    #     register_page.approve_takanon()

    #     register_page.enter_private_number()
    #     check = False
    #     try:
    #         register_page.click_submit_button()
    #         check = True
    #     except:
    #         check = False
    #     assert check
    #     assert register_page.is_registered()

    # @ignore_warnings
    # def test_register_new_volunteer(self):
    #     self.driver.get("http://localhost:3000/register")
    #     register_page = page.RegisterPage(self.driver)
    #     register_page.register_email = "selenium_volunteer3@mail.com"
    #     register_page.register_password = "123"
    #     register_page.register_confirm = "123"
    #     register_page.register_firstname = "selenium"
    #     register_page.register_lastname = "test"
    #     register_page.register_phone = "0507777771"
    #     register_page.register_city = "Haifa"
    #     register_page.register_streetName = "sport"
    #     register_page.register_buildingNumber = "54"
    #     register_group_name = self.driver.find_element_by_id('user_type')
    #     selector = Select(register_group_name)
    #     selector.select_by_visible_text('מתנדב')

    #     register_page.approve_takanon()
        
    #     check = False
    #     try:
    #         register_page.click_submit_button()
    #         check = True
    #     except:
    #         check = False
    #     assert check
    #     assert register_page.is_registered()

    # @ignore_warnings
    # def test_register_new_staff_member(self):
    #     self.driver.get("http://localhost:3000/register")
    #     register_page = page.RegisterPage(self.driver)
    #     register_page.register_email = "selenium_staff_member3@mail.com"
    #     register_page.register_password = "123"
    #     register_page.register_confirm = "123"
    #     register_page.register_firstname = "selenium"
    #     register_page.register_lastname = "test"
    #     register_page.register_phone = "0507777771"
    #     register_page.register_city = "Haifa"
    #     register_page.register_streetName = "sport"
    #     register_page.register_buildingNumber = "54"
    #     register_group_name = self.driver.find_element_by_id('user_type')
    #     selector = Select(register_group_name)
    #     selector.select_by_visible_text('איש צוות')

    #     register_page.approve_takanon()
        
    #     check = False
    #     try:
    #         register_page.click_submit_button()
    #         check = True
    #     except:
    #         check = False
    #     assert check
    #     assert register_page.is_registered()

    @ignore_warnings
    def test_register_existing_soldier(self):
        self.driver.get("http://localhost:3000/register")
        register_page = page.RegisterPage(self.driver)
        register_page.register_email = "selenium_soldier1@mail.com"
        register_page.register_password = "123"
        register_page.register_confirm = "123"
        register_page.register_firstname = "selenium"
        register_page.register_lastname = "test"
        register_page.register_phone = "0507777771"
        register_page.register_city = "Haifa"
        register_page.register_streetName = "sport"
        register_page.register_buildingNumber = "54"
        register_group_name = self.driver.find_element_by_id('user_type')
        selector = Select(register_group_name)
        selector.select_by_visible_text('חייל')

        register_page.enter_private_number()

        register_page.approve_takanon()
        register_page.click_submit_button()
        

        assert not register_page.is_registered()

    


    @ignore_warnings
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()