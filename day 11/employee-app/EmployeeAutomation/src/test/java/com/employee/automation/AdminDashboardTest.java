package com.employee.automation;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class AdminDashboardTest {

    @Test
    public void adminDashboardTest() throws Exception {

        WebDriverManager.chromedriver().setup();

        WebDriver driver = new ChromeDriver();

        driver.manage().window().maximize();

        // Open Admin Dashboard
        driver.get("http://localhost:5173/admin");

        Thread.sleep(2000);

        // Verify page title
        String title = driver.findElement(By.tagName("h1")).getText();

        if (title.equals("Admin Dashboard")) {
            System.out.println("Admin Dashboard opened successfully");
        } else {
            System.out.println("Admin Dashboard verification failed");
        }

        // Click Manage Employees Card
        driver.findElement(By.xpath("//p[text()='Manage Employees']")).click();

        Thread.sleep(3000);
        driver.navigate().back();

        // Click Add Employee Card
        driver.findElement(By.xpath("//p[text()='Add Employee']")).click();

        Thread.sleep(3000);
        driver.navigate().back();

        // Click Dashboard Card
        driver.findElement(By.xpath("//p[text()='Dashboard']")).click();

        Thread.sleep(3000);
        driver.navigate().back();

        // Click View Employees Button
        driver.findElement(By.xpath("//button[text()='View Employees']")).click();

        Thread.sleep(3000);
        driver.navigate().back();

        // Click Add Employee Button
        driver.findElement(By.xpath("//button[text()='Add Employee']")).click();

        Thread.sleep(3000);

        driver.quit();
    }
}