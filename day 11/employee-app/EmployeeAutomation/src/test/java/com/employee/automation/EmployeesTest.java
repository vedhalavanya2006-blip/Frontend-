package com.employee.automation;

import java.time.Duration;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.testng.Assert;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class EmployeesTest {

    WebDriver driver;
    WebDriverWait wait;

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        driver.get("http://localhost:5173/employees");

    }

    @Test(priority = 1)
    public void verifyEmployeesPageLoaded() {

        Assert.assertTrue(driver.getCurrentUrl().contains("/employees"));

    }

    @Test(priority = 2)
    public void verifyHeadingDisplayed() {

        WebElement heading = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.xpath("//h1[contains(text(),'Employee Management')]")));

        Assert.assertTrue(heading.isDisplayed());

    }

    @Test(priority = 3)
    public void verifyDepartmentFilterDisplayed() {

        WebElement filter = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.tagName("select")));

        Assert.assertTrue(filter.isDisplayed());

    }

    @Test(priority = 4)
    public void verifyDepartmentFilterWorks() {

        Select department = new Select(
                wait.until(ExpectedConditions.visibilityOfElementLocated(
                        By.tagName("select"))));

        department.selectByVisibleText("IT");

        Assert.assertEquals(
                department.getFirstSelectedOption().getText(),
                "IT");

    }

    @Test(priority = 5)
    public void verifyEmployeeTableDisplayed() {

        WebElement table = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.className("employee-table")));

        Assert.assertTrue(table.isDisplayed());

    }

    @Test(priority = 6)
    public void verifyEmployeeRowsPresent() {

        int rows = driver.findElements(
                By.xpath("//table/tbody/tr")).size();

        Assert.assertTrue(rows > 0);

    }

    @Test(priority = 7)
    public void verifyEditButtonDisplayed() {

        WebElement editButton = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.className("edit-btn")));

        Assert.assertTrue(editButton.isDisplayed());

    }

    @Test(priority = 8)
    public void verifyDeleteButtonDisplayed() {

        WebElement deleteButton = wait.until(
                ExpectedConditions.visibilityOfElementLocated(
                        By.className("delete-btn")));

        Assert.assertTrue(deleteButton.isDisplayed());

    }

    @Test(priority = 9)
    public void verifyDeleteConfirmationPopup() {

        WebElement deleteButton = wait.until(
                ExpectedConditions.elementToBeClickable(
                        By.className("delete-btn")));

        deleteButton.click();

        Alert alert = wait.until(
                ExpectedConditions.alertIsPresent());

        Assert.assertEquals(
                alert.getText(),
                "Are you sure you want to delete this employee?");

        alert.dismiss();

    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {

            driver.quit();

        }

    }

}