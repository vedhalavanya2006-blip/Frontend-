package com.employee.automation;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class EmployeeDashboardTest {

    WebDriver driver;

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        // Open Employee Dashboard
        driver.get("http://localhost:5173/employee");

    }

    @Test(priority = 1)
    public void verifyEmployeeDashboardPageLoaded() {

        Assert.assertTrue(driver.getCurrentUrl().contains("/employee"));

    }

    @Test(priority = 2)
    public void verifyWelcomeMessageDisplayed() {

        Assert.assertTrue(
                driver.findElement(By.xpath("//h2[contains(text(),'Welcome Employee')]"))
                        .isDisplayed());

    }

    @Test(priority = 3)
    public void verifyEmployeeIdDisplayed() {

        Assert.assertTrue(
                driver.findElement(By.xpath("//p[contains(text(),'Employee ID')]"))
                        .isDisplayed());

    }

    @Test(priority = 4)
    public void verifyMyProfileCardDisplayed() {

        Assert.assertTrue(
                driver.findElement(By.xpath("//p[text()='My Profile']"))
                        .isDisplayed());

    }

    @Test(priority = 5)
    public void verifySalaryCardDisplayed() {

        Assert.assertTrue(
                driver.findElement(By.xpath("//p[text()='Salary Details']"))
                        .isDisplayed());

    }

    @Test(priority = 6)
    public void verifyAttendanceCardDisplayed() {

        Assert.assertTrue(
                driver.findElement(By.xpath("//p[text()='Attendance']"))
                        .isDisplayed());

    }

    @Test(priority = 7)
    public void verifyLeaveCardDisplayed() {

        Assert.assertTrue(
                driver.findElement(By.xpath("//p[text()='Leave Apply']"))
                        .isDisplayed());

    }

    @Test(priority = 8)
    public void verifyNoticeCardDisplayed() {

        Assert.assertTrue(
                driver.findElement(By.xpath("//p[text()='Notice Board']"))
                        .isDisplayed());

    }

    @Test(priority = 9)
    public void verifyChangePasswordCardDisplayed() {

        Assert.assertTrue(
                driver.findElement(By.xpath("//p[text()='Change Password']"))
                        .isDisplayed());

    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {
            driver.quit();
        }

    }

}