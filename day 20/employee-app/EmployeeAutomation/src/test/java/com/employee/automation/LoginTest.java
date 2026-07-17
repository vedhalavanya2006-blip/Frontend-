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

public class LoginTest {

    WebDriver driver;
    WebDriverWait wait;

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("http://localhost:5173/");
    }

    @Test(priority = 1)
    public void verifyLoginPageLoaded() {

        Assert.assertTrue(driver.getPageSource().contains("Employee Management"));

    }

    @Test(priority = 2)
    public void verifyLoginFieldsDisplayed() {

        Assert.assertTrue(driver.findElement(
                By.xpath("//input[@placeholder='Admin Username / Employee ID']"))
                .isDisplayed());

        Assert.assertTrue(driver.findElement(
                By.xpath("//input[@placeholder='Password']"))
                .isDisplayed());

        Assert.assertTrue(driver.findElement(
                By.xpath("//button[text()='Login']"))
                .isDisplayed());

    }

    @Test(priority = 3)
    public void verifyEmptyLoginValidation() {

        driver.findElement(By.xpath("//button[text()='Login']")).click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        Assert.assertEquals(alert.getText(),
                "Please enter ID/Username and Password");

        alert.accept();

    }

    @Test(priority = 4)
    public void verifyAdminLogin() {

        driver.findElement(
                By.xpath("//input[@placeholder='Admin Username / Employee ID']"))
                .sendKeys("admin");

        driver.findElement(
                By.xpath("//input[@placeholder='Password']"))
                .sendKeys("admin123");

        driver.findElement(By.xpath("//button[text()='Login']")).click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        Assert.assertEquals(alert.getText(),
                "Admin Login Successful");

        alert.accept();

        wait.until(ExpectedConditions.urlContains("/admin"));

        Assert.assertTrue(driver.getCurrentUrl().contains("/admin"));

    }

    @Test(priority = 5)
    public void verifyEmployeeLogin() {

        driver.findElement(
                By.xpath("//input[@placeholder='Admin Username / Employee ID']"))
                .sendKeys("2");

        driver.findElement(
                By.xpath("//input[@placeholder='Password']"))
                .sendKeys("emp123");

        driver.findElement(By.xpath("//button[text()='Login']")).click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        Assert.assertEquals(alert.getText(),
                "Employee Login Successful");

        alert.accept();

        wait.until(ExpectedConditions.urlContains("/employee"));

        Assert.assertTrue(driver.getCurrentUrl().contains("/employee"));

    }

    @Test(priority = 6)
    public void verifyInvalidLogin() {

        driver.findElement(
                By.xpath("//input[@placeholder='Admin Username / Employee ID']"))
                .sendKeys("abc");

        driver.findElement(
                By.xpath("//input[@placeholder='Password']"))
                .sendKeys("12345");

        driver.findElement(By.xpath("//button[text()='Login']")).click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        Assert.assertEquals(alert.getText(),
                "Invalid Username or Password");

        alert.accept();

    }

    @Test(priority = 7)
    public void verifyEmployeeNotFound() {

        driver.findElement(
                By.xpath("//input[@placeholder='Admin Username / Employee ID']"))
                .sendKeys("999");

        driver.findElement(
                By.xpath("//input[@placeholder='Password']"))
                .sendKeys("emp123");

        driver.findElement(By.xpath("//button[text()='Login']")).click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        Assert.assertEquals(alert.getText(),
                "Employee ID Not Found");

        alert.accept();

    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {
            driver.quit();
        }

    }
}