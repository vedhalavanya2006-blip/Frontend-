package com.employee.automation;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.JavascriptExecutor;

import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class MyProfileTest {

    WebDriver driver;

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        driver.get("http://localhost:5173/myprofile");

        // Employee Login simulation
        ((JavascriptExecutor) driver).executeScript(
                "localStorage.setItem('employeeId','2');");

        driver.navigate().refresh();

    }

    @Test(priority = 1)
    public void verifyMyProfilePageLoaded() {

        Assert.assertTrue(driver.getCurrentUrl().contains("/myprofile"));

    }

    @Test(priority = 2)
    public void verifyProfileHeadingDisplayed() {

        Assert.assertTrue(driver.findElement(
                By.xpath("//h1[contains(text(),'My Profile')]"))
                .isDisplayed());

    }

    @Test(priority = 3)
    public void verifyProfileImageDisplayed() {

        Assert.assertTrue(driver.findElement(
                By.xpath("//img[@alt='profile']"))
                .isDisplayed());

    }

    @Test(priority = 4)
    public void verifyEmployeeNameDisplayed() {

        Assert.assertTrue(driver.findElement(
                By.xpath("//h2"))
                .isDisplayed());

    }

    @Test(priority = 5)
    public void verifyDepartmentDisplayed() {

        Assert.assertTrue(driver.findElement(
                By.xpath("//table"))
                .getText()
                .contains("Department"));

    }

    @Test(priority = 6)
    public void verifyEmployeeDetailsDisplayed() {

        Assert.assertTrue(driver.findElement(By.xpath("//table")).isDisplayed());

    }

    @Test(priority = 7)
    public void verifySalaryDisplayed() {

        Assert.assertTrue(driver.findElement(
                By.xpath("//table"))
                .getText()
                .contains("Salary"));

    }

    @Test(priority = 8)
    public void verifyStatusDisplayed() {

        Assert.assertTrue(driver.findElement(
                By.xpath("//table"))
                .getText()
                .contains("Status"));

    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {

            driver.quit();

        }

    }

}