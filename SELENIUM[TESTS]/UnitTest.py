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

class UseCase_Tests(unittest.TestCase):

    @ignore_warnings
    def setUp(self):
        PATH = "C:\Program Files\EdgeDriver\msedgedriver.exe"
        self.driver = webdriver.Edge(PATH)

    @ignore_warnings
    def test_register_new_soldier(self):
        self.driver.get("http://localhost:3000/register")
        register_page = page.RegisterPage(self.driver)
        register_page.register_email = "selenium_soldier1@mail.com"
        register_page.register_password = "123"
        register_page.register_confirm = "123"
        register_page.register_firstname = "selenium"
        register_page.register_lastname = "test"
        register_page.register_phone = "0507777771"
        register_group_name = self.driver.find_element_by_id('user_type')
        selector = Select(register_group_name)
        selector.select_by_visible_text('חייל')

        register_page.enter_private_number()
        register_page.click_submit_button()
        assert register_page.is_registered()


    @ignore_warnings
    def test_login_staff_member(self):
        self.driver.get("http://localhost:3000/login")
        loginPage = page.LoginPage(self.driver)
        loginPage.email_input = 'gal@mail.com'
        loginPage.password_input = '123'

        loginPage.click_submit_button()
        assert loginPage.is_logged_in()

        staffPage = page.StaffMemberPage(self.driver)
        assert staffPage.checkPages()

    @ignore_warnings
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()