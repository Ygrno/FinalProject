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

    EXISTED_LIST_BUTTON = (By.ID, 'existing_soldiers')
    APPROVE_LIST_BUTTON = (By.ID, 'applications_list')
    PENDING_LIST_BUTTON = (By.ID, 'pending_users')

class RegisterLocators(object):
    SUBMIT_BUTTON = (By.CSS_SELECTOR,"button[class='ant-btn ant-btn-primary ant-btn-round ant-btn-rtl singup-btn']")

class ProfileLocators(object):
    EDIT_BUTTON = (By.ID,"edit_details")
    
class ApplicationLocators(object):
    ADD_APPLICATION = (By.ID,"add_app")
    SEND_APPLICATION = (By.ID,"send_app")
    APPROVE_BUTTON = (By.CSS_SELECTOR,"button[class='ant-btn ant-btn-primary']")
    DECLINE_BUTTON = (By.CSS_SELECTOR,"button[class='ant-btn']")