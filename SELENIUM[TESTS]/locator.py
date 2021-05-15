from selenium.webdriver.common.by import By

class LoginPageLocators(object):
    SUBMIT_BUTTON = (By.CSS_SELECTOR,"button[class='ant-btn ant-btn-primary ant-btn-round ant-btn-rtl login-form-input']")
    LOG_OUT_BUTTON = (By.CLASS_NAME, "MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit")

class StaffMemberLocators(object):
    HOME_LINK = (By.XPATH, "//a[@href='/home']")
    MY_APPLICATION_LINK = (By.XPATH, "//a[@href='/myApplications']")
    APPLICATION_LINK = (By.XPATH, "//a[@href='/applications']")
    PROFILE_LINK = (By.XPATH, "//a[@href='/profile']")
    STAFF_LINK = (By.XPATH, "//a[@href='/staff']")

class RegisterLocators(object):
    SUBMIT_BUTTON = (By.CSS_SELECTOR,"button[class='ant-btn ant-btn-primary ant-btn-round ant-btn-rtl singup-btn']")
    