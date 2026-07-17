package com.employee.automation;

import java.time.Duration;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class ChangePasswordTest {

    WebDriver driver;
    WebDriverWait wait;

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        // Correct URL
        driver.get("http://localhost:5173/changepassword");
    }

    @Test(priority = 1)
    public void verifyPageLoaded() {

        Assert.assertTrue(driver.getCurrentUrl().contains("changepassword"));

    }

    @Test(priority = 2)
    public void verifyEmptyFieldsValidation() {

        driver.findElement(By.xpath("//button[text()='Change Password']")).click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        Assert.assertEquals(alert.getText(), "Please fill all fields");

        alert.accept();
    }

    @Test(priority = 3)
    public void verifyPasswordMismatchValidation() {

        driver.findElement(By.name("currentPassword")).sendKeys("123456");

        driver.findElement(By.name("newPassword")).sendKeys("abc123");

        driver.findElement(By.name("confirmPassword")).sendKeys("xyz123");

        driver.findElement(By.xpath("//button[text()='Change Password']")).click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        Assert.assertEquals(alert.getText(),
                "New Password and Confirm Password do not match");

        alert.accept();
    }

    @Test(priority = 4)
    public void verifyPasswordChangedSuccessfully() {

        driver.findElement(By.name("currentPassword")).sendKeys("123456");

        driver.findElement(By.name("newPassword")).sendKeys("Password@123");

        driver.findElement(By.name("confirmPassword")).sendKeys("Password@123");

        driver.findElement(By.xpath("//button[text()='Change Password']")).click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        Assert.assertEquals(alert.getText(),
                "Password Changed Successfully!");

        alert.accept();
    }

    @Test(priority = 5)
    public void verifyFieldsAreCleared() {

        driver.findElement(By.name("currentPassword")).sendKeys("123456");

        driver.findElement(By.name("newPassword")).sendKeys("Password@123");

        driver.findElement(By.name("confirmPassword")).sendKeys("Password@123");

        driver.findElement(By.xpath("//button[text()='Change Password']")).click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        alert.accept();

        Assert.assertEquals(
                driver.findElement(By.name("currentPassword")).getAttribute("value"),
                "");

        Assert.assertEquals(
                driver.findElement(By.name("newPassword")).getAttribute("value"),
                "");

        Assert.assertEquals(
                driver.findElement(By.name("confirmPassword")).getAttribute("value"),
                "");
    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {
            driver.quit();
        }

    }

}
