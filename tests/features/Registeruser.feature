#Author: abhishek.kadavil@gmail.com

Feature: Register user
  I want to test signup feature

  @RegisterUser_Scenario1
  Scenario Outline: sign up with different users
    Given user is on home page and testdata present in "<TestData>"
    When navigate to register user page
    Then add personal details
    Then add company details
    Then add options
    Then add password
    Then user should be able register successfully
    Examples:
      | TestData                     |
      | /RegisterUser/Scenario01.json |
      | /RegisterUser/Scenario02.json |
      | /RegisterUser/Scenario03.json |
      | /RegisterUser/Scenario04.json |
      | /RegisterUser/Scenario05.json |