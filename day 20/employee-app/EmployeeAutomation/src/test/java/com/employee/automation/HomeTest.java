package com.employee.automation;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class HomeTest {

    WebDriver driver;
    WebDriverWait wait;

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("http://localhost:5173/home");

    }

    @Test(priority = 1)
    public void verifyHomePageLoaded() {

        Assert.assertTrue(driver.getCurrentUrl().contains("/home"));

    }

    @Test(priority = 2)
    public void verifyHeadingDisplayed() {

        WebElement heading = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//h1[contains(text(),'Employee Management System')]")));

        Assert.assertTrue(heading.isDisplayed());

    }

    @Test(priority = 3)
    public void verifyDashboardCardsDisplayed() {

        int cards = driver.findElements(By.className("card")).size();

        Assert.assertEquals(cards, 6);

    }

    @Test(priority = 4)
    public void verifyViewEmployeesButtonDisplayed() {

        WebElement button = driver.findElement(
                By.xpath("//button[contains(text(),'View Employees')]"));

        Assert.assertTrue(button.isDisplayed());

    }

    @Test(priority = 5)
    public void verifyAddEmployeeButtonDisplayed() {

        WebElement button = driver.findElement(
                By.xpath("//button[contains(text(),'Add Employee')]"));

        Assert.assertTrue(button.isDisplayed());

    }

    @Test(priority = 6)
    public void verifyAdminDashboardButtonDisplayed() {

        WebElement button = driver.findElement(
                By.xpath("//button[contains(text(),'Admin Dashboard')]"));

        Assert.assertTrue(button.isDisplayed());

    }

    @Test(priority = 7)
    public void verifyEmployeeDashboardButtonDisplayed() {

        WebElement button = driver.findElement(
                By.xpath("//button[contains(text(),'Employee Dashboard')]"));

        Assert.assertTrue(button.isDisplayed());

    }

    @Test(priority = 8)
    public void verifyRecentEmployeesHeadingDisplayed() {

        WebElement heading = driver.findElement(
                By.xpath("//h2[contains(text(),'Recent Employees')]"));

        Assert.assertTrue(heading.isDisplayed());

    }

    @Test(priority = 9)
    public void verifyRecentEmployeesTableDisplayed() {

        WebElement table = driver.findElement(
                By.className("employee-table"));

        Assert.assertTrue(table.isDisplayed());

    }

    @Test(priority = 10)
    public void verifyRecentEmployeesRowsPresent() {

        int rows = driver.findElements(
                By.xpath("//table/tbody/tr")).size();

        Assert.assertTrue(rows > 0);

    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {

            driver.quit();

        }

    }

}