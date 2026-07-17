package com.employee.automation;

import java.time.Duration;

import org.openqa.selenium.Alert;
import org.openqa.selenium.By;
import org.openqa.selenium.NoAlertPresentException;
import org.openqa.selenium.TimeoutException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import org.testng.Assert;
import org.testng.SkipException;
import org.testng.annotations.AfterMethod;
import org.testng.annotations.BeforeMethod;
import org.testng.annotations.Test;

public class EditEmployeeTest {

    WebDriver driver;
    WebDriverWait wait;

    @BeforeMethod
    public void setup() {

        driver = new ChromeDriver();

        driver.manage().window().maximize();

        driver.manage().timeouts().implicitlyWait(Duration.ofSeconds(10));

        wait = new WebDriverWait(driver, Duration.ofSeconds(20));

        driver.get("http://localhost:5173/edit/2");

        // Employee Not Found alert இருந்தால் close பண்ணு
        try {
            Alert alert = wait.until(ExpectedConditions.alertIsPresent());

            if (alert.getText().contains("Employee Not Found")) {
                alert.accept();
                throw new SkipException("Employee ID 2 இல்லை");
            }

        } catch (TimeoutException | NoAlertPresentException e) {
            // Alert இல்லை
        }

        // Form load ஆகும் வரை wait
        wait.until(ExpectedConditions.visibilityOfElementLocated(
                By.cssSelector("input[name='name']")));
    }

    @Test(priority = 1)
    public void verifyEditEmployeePageLoaded() {

        Assert.assertTrue(driver.getCurrentUrl().contains("/edit/"));

    }

    @Test(priority = 2)
    public void verifyEmployeeNameFieldDisplayed() {

        Assert.assertTrue(driver.findElement(
                By.cssSelector("input[name='name']")).isDisplayed());

    }

    @Test(priority = 3)
    public void verifyUpdateButtonDisplayed() {

        Assert.assertTrue(driver.findElement(
                By.xpath("//button[contains(text(),'Update Employee')]"))
                .isDisplayed());

    }

    @Test(priority = 4)
    public void verifyAllFieldsPresent() {

        Assert.assertTrue(driver.findElement(By.name("name")).isDisplayed());

        Assert.assertTrue(driver.findElement(By.name("department")).isDisplayed());

        Assert.assertTrue(driver.findElement(By.name("email")).isDisplayed());

        Assert.assertTrue(driver.findElement(By.name("phone")).isDisplayed());

        Assert.assertTrue(driver.findElement(By.name("salary")).isDisplayed());

        Assert.assertTrue(driver.findElement(By.name("address")).isDisplayed());

        Assert.assertTrue(driver.findElement(By.name("image")).isDisplayed());

    }

    @Test(priority = 5)
    public void verifyUpdateEmployee() {

        WebElement name = driver.findElement(By.name("name"));
        name.clear();
        name.sendKeys("Lavanya");

        Select department =
                new Select(driver.findElement(By.name("department")));
        department.selectByVisibleText("Testing");

        WebElement email = driver.findElement(By.name("email"));
        email.clear();
        email.sendKeys("lavanya@gmail.com");

        WebElement phone = driver.findElement(By.name("phone"));
        phone.clear();
        phone.sendKeys("9876543210");

        WebElement salary = driver.findElement(By.name("salary"));
        salary.clear();
        salary.sendKeys("50000");

        WebElement address = driver.findElement(By.name("address"));
        address.clear();
        address.sendKeys("Chennai");

        WebElement image = driver.findElement(By.name("image"));
        image.clear();
        image.sendKeys("https://example.com/profile.jpg");

        driver.findElement(
                By.xpath("//button[contains(text(),'Update Employee')]"))
                .click();

        Alert alert = wait.until(ExpectedConditions.alertIsPresent());

        Assert.assertEquals(
                alert.getText(),
                "Employee Updated Successfully!"
        );

        alert.accept();

        wait.until(ExpectedConditions.urlContains("/employees"));

        Assert.assertTrue(driver.getCurrentUrl().contains("/employees"));

    }

    @AfterMethod
    public void tearDown() {

        if (driver != null) {
            driver.quit();
        }

    }

}