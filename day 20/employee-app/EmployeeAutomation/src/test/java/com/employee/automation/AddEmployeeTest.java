package com.employee.automation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class AddEmployeeTest {

    @Test
    public void addEmployee() throws Exception {

        WebDriverManager.chromedriver().setup();

        WebDriver driver = new ChromeDriver();

        driver.manage().window().maximize();

        // Open Add Employee page
        driver.get("http://localhost:5173/add");

        Thread.sleep(2000);

        // Fill Employee Details
        driver.findElement(By.name("name")).sendKeys("Lavanya");
        driver.findElement(By.name("department")).sendKeys("Testing");
        driver.findElement(By.name("email")).sendKeys("lavanya@gmail.com");
        driver.findElement(By.name("phone")).sendKeys("9876543210");
        driver.findElement(By.name("salary")).sendKeys("35000");
        driver.findElement(By.name("joiningDate")).sendKeys("2026-07-16");
        driver.findElement(By.name("status")).sendKeys("Active");
        driver.findElement(By.name("address")).sendKeys("Chennai");
        driver.findElement(By.name("image")).sendKeys("https://example.com/profile.jpg");

        // Click Add Employee button
        driver.findElement(By.xpath("//button[@type='submit']")).click();

        Thread.sleep(3000);

        driver.quit();
    }
}