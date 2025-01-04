from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
import time

# Set the path to your Chrome binary if necessary
chrome_options = Options()
chrome_options.binary_location = "C:/Program Files/Google/Chrome/Application/chrome.exe"  # Adjust the path if necessary

# Create a Service object for ChromeDriver
service = Service(ChromeDriverManager().install())

# Initialize the WebDriver with options
driver = webdriver.Chrome(service=service, options=chrome_options)

try:
    # Open the application URL
    driver.get("http://127.0.0.1:8000/maj/CreateDpi/")  # Replace with the correct URL

    # Wait for the page to load and the form to be present
    WebDriverWait(driver, 10).until(EC.presence_of_element_located((By.NAME, "patientid")))  # Wait until the patientid input is available

    # Fill in the fields
    driver.find_element(By.NAME, "patientid").send_keys("1221")
    driver.find_element(By.NAME, "nomuser").send_keys("zitouni")
    driver.find_element(By.NAME, "prenomuser").send_keys("rania")
    driver.find_element(By.NAME, "telephone").send_keys("052424453")
    driver.find_element(By.NAME, "datedenaissance").send_keys("2004-12-12")
    driver.find_element(By.NAME, "adresse").send_keys("les bananiers")
    driver.find_element(By.NAME, "emailuser").send_keys("zitounirania2509@gmail.com")
    driver.find_element(By.NAME, "etatpatient").send_keys("0")
    driver.find_element(By.NAME, "mutuelle").send_keys("sfjjd")
    driver.find_element(By.NAME, "personneacontacter").send_keys("someone")
    driver.find_element(By.NAME, "hopitalid").send_keys("1")

    # Find the form element and submit using JavaScript (if form doesn't submit with button)
    form = driver.find_element(By.TAG_NAME, 'form')
    
    # Ensure the form is sending a POST request
    driver.execute_script("arguments[0].submit();", form)

    # Wait for the response (success message)
    WebDriverWait(driver, 20).until(EC.presence_of_element_located((By.XPATH, "//div[contains(text(), 'Object created successfully')]")))

    # Check if the DPI was successfully created
    success_message = driver.find_element(By.XPATH, "//div[contains(text(), 'Object created successfully')]")
    if success_message:
        print("Test Passed: DPI was successfully created.")
    else:
        print("Test Failed: DPI creation failed.")

except Exception as e:
    print(f"An error occurred during the test: {e}")

finally:
    # Close the browser
    driver.quit()
