package com.employee.automation;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class LeaveTest {

    WebDriver driver;

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        driver.get("http://localhost:5173/leave");
    }

    @Test(priority = 1)
    public void verifyLeavePageLoaded() {

        Assert.assertTrue(driver.getCurrentUrl().contains("/leave"));

    }

    @Test(priority = 2)
    public void verifyHeadingDisplayed() {

        WebElement heading = driver.findElement(
                By.xpath("//h1[contains(text(),'Leave Management')]"));

        Assert.assertTrue(heading.isDisplayed());

    }

    @Test(priority = 3)
    public void verifyLeaveTypeDropdownDisplayed() {

        WebElement leaveType = driver.findElement(
                By.xpath("//select"));

        Assert.assertTrue(leaveType.isDisplayed());

    }

    @Test(priority = 4)
    public void verifyLeaveFormSubmission() {

        driver.findElement(By.xpath("//select"))
                .sendKeys("Casual Leave");

        driver.findElements(By.xpath("//input[@type='date']"))
                .get(0)
                .sendKeys("15-07-2026");

        driver.findElements(By.xpath("//input[@type='date']"))
                .get(1)
                .sendKeys("16-07-2026");

        driver.findElement(By.tagName("textarea"))
                .sendKeys("Family Function");

        driver.findElement(
                By.xpath("//button[contains(text(),'Apply Leave')]"))
                .click();

        Assert.assertTrue(
                driver.findElement(
                        By.xpath("//button[contains(text(),'Apply Leave')]"))
                        .isDisplayed());

    }

    @Test(priority = 5)
    public void verifyLeaveStatusTableDisplayed() {

        WebElement table = driver.findElement(By.tagName("table"));

        Assert.assertTrue(table.isDisplayed());

    }

    @Test(priority = 6)
    public void verifyApprovedStatusDisplayed() {

        WebElement status = driver.findElement(
                By.xpath("//td[contains(text(),'Approved')]"));

        Assert.assertTrue(status.isDisplayed());

    }

    @Test(priority = 7)
    public void verifyPendingStatusDisplayed() {

        WebElement status = driver.findElement(
                By.xpath("//td[contains(text(),'Pending')]"));

        Assert.assertTrue(status.isDisplayed());

    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {

            driver.quit();

        }

    }

}