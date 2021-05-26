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

class Soldier_Test(unittest.TestCase):

    @ignore_warnings
    def setUp(self):
        PATH = "C:\Program Files\EdgeDriver\msedgedriver.exe"
        self.driver = webdriver.Edge(PATH)
        self.driver.get("http://localhost:3000/login")
        loginPage = page.LoginPage(self.driver)
        loginPage.email_input = 'selenium_soldier1@mail.com'
        loginPage.password_input = '123'
        loginPage.click_submit_button()
        assert loginPage.is_logged_in()

    
    @ignore_warnings
    def test_profile_change_name(self):
        self.driver.get("http://localhost:3000/profile")
        profilePage = page.ProfilePage(self.driver)
        assert profilePage.load_details()
        name = profilePage.name
        city = profilePage.city
        street = profilePage.street
        house = profilePage.house
        profilePage.edit_profile('h_selenium6','h_selenium6')
        # self.driver.get("http://localhost:3000/profile")
        profilePage.load_details()
        assert name != profilePage.name

    @ignore_warnings
    def test_profile_change_address(self):
        self.driver.get("http://localhost:3000/profile")
        profilePage = page.ProfilePage(self.driver)
        assert profilePage.load_details()
        city = profilePage.city
        street = profilePage.street
        house = profilePage.house
        # email = profilePage.email
        # address = profilePage.address
        # birth = profilePage.birth
        profilePage.edit_profile('h_selenium5','h_selenium5', 'city5','street5','5')
        # self.driver.get("http://localhost:3000/profile")
        profilePage.load_details()
        assert city != profilePage.city
        assert street != profilePage.street
        assert house != profilePage.house



    @ignore_warnings
    def test_create_application(self):
        self.driver.get("http://localhost:3000/applications")
        application_page = page.ApplicationPage(self.driver)
        subject = 'אחר'
        details = 'i want pizza'
        description = 'i want pizza very much!'
        application_page.add_application(subject, details, description)

        self.driver.get("http://localhost:3000/myApplications")
        my_application_page = page.MyApplicationPage(self.driver)
        assert my_application_page.exist_application(details)




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