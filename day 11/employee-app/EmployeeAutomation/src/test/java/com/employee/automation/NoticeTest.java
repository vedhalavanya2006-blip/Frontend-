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



public class NoticeTest {


    WebDriver driver;

    WebDriverWait wait;



    @BeforeMethod
    public void setup(){


        driver = new ChromeDriver();


        driver.manage()
              .window()
              .maximize();



        wait = new WebDriverWait(
                driver,
                Duration.ofSeconds(20)
        );



        driver.get(
                "http://localhost:5173/notice"
        );



        wait.until(
                ExpectedConditions.presenceOfElementLocated(
                        By.tagName("body")
                )
        );


    }






    @Test(priority = 1)
    public void verifyNoticePageLoaded(){


        Assert.assertTrue(
                driver.getCurrentUrl().contains("/notice"),
                "Notice page not loaded"
        );


    }







    @Test(priority = 2)
    public void verifyHeadingDisplayed(){


        WebElement heading =
                wait.until(
                    ExpectedConditions.visibilityOfElementLocated(
                        By.xpath(
                        "//h1[contains(.,'Company Notice Board')]"
                        )
                    )
                );


        Assert.assertTrue(
                heading.isDisplayed(),
                "Notice heading not displayed"
        );


    }







    @Test(priority = 3)
    public void verifyDescriptionDisplayed(){


        WebElement description =
                wait.until(
                    ExpectedConditions.visibilityOfElementLocated(
                        By.xpath(
                        "//p[contains(.,'Stay updated with the latest company announcements')]"
                        )
                    )
                );


        Assert.assertTrue(
                description.isDisplayed(),
                "Notice description not displayed"
        );


    }







    @Test(priority = 4)
    public void verifyTeamMeeting(){


        verifyNotice("Team Meeting");


    }







    @Test(priority = 5)
    public void verifyPublicHoliday(){


        verifyNotice("Public Holiday");


    }







    @Test(priority = 6)
    public void verifySalaryUpdate(){


        verifyNotice("Salary Update");


    }







    @Test(priority = 7)
    public void verifyBirthdayWishes(){


        verifyNotice("Birthday Wishes");


    }







    @Test(priority = 8)
    public void verifyTrainingProgram(){


        verifyNotice("Training Program");


    }







    @Test(priority = 9)
    public void verifyEmployeeOfMonth(){


        verifyNotice("Employee of the Month");


    }







    @Test(priority = 10)
    public void verifyTotalNoticeCards(){


        int count =
                driver.findElements(
                    By.xpath(
                    "//h2[contains(.,'Team Meeting') " +
                    "or contains(.,'Public Holiday') " +
                    "or contains(.,'Salary Update') " +
                    "or contains(.,'Birthday Wishes') " +
                    "or contains(.,'Training Program') " +
                    "or contains(.,'Employee of the Month')]"
                    )
                ).size();



        Assert.assertEquals(
                count,
                6,
                "Notice card count mismatch"
        );


    }







    public void verifyNotice(String noticeName){


        WebElement notice =
                wait.until(
                    ExpectedConditions.visibilityOfElementLocated(
                        By.xpath(
                        "//h2[contains(.,'" + noticeName + "')]"
                        )
                    )
                );



        Assert.assertTrue(
                notice.isDisplayed(),
                noticeName + " notice is not displayed"
        );


    }







    @AfterMethod
    public void closeBrowser(){


        if(driver != null){

            driver.quit();

        }


    }


}