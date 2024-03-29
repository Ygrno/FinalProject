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

class Volunteer_Test(unittest.TestCase):

    @ignore_warnings
    def setUp(self):
        PATH = "C:\Program Files\EdgeDriver\msedgedriver.exe"
        self.driver = webdriver.Edge(PATH)
        self.driver.get("http://localhost:3000/login")
        loginPage = page.LoginPage(self.driver)
        loginPage.email_input = 'selenium_volunteer@mail.com'
        loginPage.password_input = '123'
        loginPage.click_submit_button()
        assert loginPage.is_logged_in()

    
    @ignore_warnings
    def test_take_care_app(self):
        self.driver.get("http://localhost:3000/applications")
        application_page = page.ApplicationPage(self.driver)
        summary = 'i want pizza'
        assert application_page.take_care_application(summary)
        

    @ignore_warnings
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()