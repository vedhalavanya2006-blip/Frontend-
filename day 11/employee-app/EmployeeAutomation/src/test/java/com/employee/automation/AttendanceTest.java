package com.employee.automation;

import java.time.Duration;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.testng.annotations.Test;

import io.github.bonigarcia.wdm.WebDriverManager;

public class AttendanceTest {

    @Test
    public void attendanceTest() {

        WebDriverManager.chromedriver().setup();

        WebDriver driver = new ChromeDriver();
        driver.manage().window().maximize();

        try {

            driver.get("http://localhost:5173/attendance");

            WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));

            // Wait until H1 is visible
            WebElement heading = wait.until(
                    ExpectedConditions.visibilityOfElementLocated(By.tagName("h1")));

            System.out.println("Page Heading : " + heading.getText());

            if (heading.getText().contains("Attendance Details")) {
                System.out.println("Attendance Page Opened Successfully");
            } else {
                System.out.println("Attendance Page Verification Failed");
            }

            // Employee Name
            System.out.println("Employee Name : "
                    + driver.findElement(By.xpath("//table//tr[2]/td[2]")).getText());

            // Department
            System.out.println("Department : "
                    + driver.findElement(By.xpath("//table//tr[3]/td[2]")).getText());

            // Working Days
            System.out.println("Working Days : "
                    + driver.findElement(By.xpath("//table//tr[4]/td[2]")).getText());

            // Present Days
            System.out.println("Present Days : "
                    + driver.findElement(By.xpath("//table//tr[5]/td[2]")).getText());

            // Absent Days
            System.out.println("Absent Days : "
                    + driver.findElement(By.xpath("//table//tr[6]/td[2]")).getText());

            // Attendance %
            System.out.println("Attendance : "
                    + driver.findElement(By.xpath("//table//tr[7]/td[2]")).getText());

        } catch (Exception e) {
            System.out.println("Test Failed");
            e.printStackTrace();
        } finally {
            driver.quit();
        }
    }
}