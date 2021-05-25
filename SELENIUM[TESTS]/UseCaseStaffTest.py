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
        loginPage.email_input = 'selenium_staff_member@mail.com'
        loginPage.password_input = '123'
        loginPage.click_submit_button()
        assert loginPage.is_logged_in()

    
    @ignore_warnings
    # def test_find_existing_soldiers(self):
    #     self.driver.get("http://localhost:3000/staff")
    #     staff_page = page.StaffMemberPage(self.driver)
    #     assert staff_page.find_existed_soldier('selenium')

    @ignore_warnings
    def test_approve_application(self):
        self.driver.get("http://localhost:3000/staff")
        staff_page = page.StaffMemberPage(self.driver)
        assert staff_page.approve_application('84')

        
        
        

    # @ignore_warnings
    # def test_create_application(self):
    #     self.driver.get("http://localhost:3000/applications")
    #     application_page = page.ApplicationPage(self.driver)
    #     subject = 'אחר'
    #     details = 'i want pizza'
    #     application_page.add_application(subject, details)

    #     self.driver.get("http://localhost:3000/myApplications")
    #     my_application_page = page.MyApplicationPage(self.driver)
    #     assert my_application_page.exist_application(details)

        # profilePage.load_details()
        # name = profilePage.name
        # email = profilePage.email
        # address = profilePage.address
        # birth = profilePage.birth
        # profilePage.edit_profile('h_selenium','h_selenium')
        # self.driver.get("http://localhost:3000/profile")
        # profilePage.load_details()
        # assert name != profilePage.name

    @ignore_warnings
    def tearDown(self):
        self.driver.close()

if __name__ == "__main__":
    unittest.main()