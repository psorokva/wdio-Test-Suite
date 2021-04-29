const LoginPage = require("../pageobjects/login.page");
const SecurePage = require("../pageobjects/secure.page");

describe("My Login application", () => {
  it("should login with valid credentials", async () => {
    await LoginPage.open();

    await LoginPage.login("tomsmith", "SuperSecretPassword!");
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(
      "You logged into a secure area!"
    );
    // browser.pause(5000);
  });

  it("should logout and display logout message", async () => {
    await LoginPage.open();
    await LoginPage.login("tomsmith", "SuperSecretPassword!");

    await SecurePage.logout();
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(LoginPage.flashAlert).toHaveTextContaining(
      "You logged out of the secure area!"
    );
  });

  it("should throw invalid password error if it is blank", async () => {
    await LoginPage.open();

    await LoginPage.login("tomsmith", "");
    await expect(LoginPage.flashAlert).toBeExisting();
    await expect(LoginPage.flashAlert).toHaveTextContaining(
      "Your password is invalid!"
    );
  });

  it("should throw invalid username error if it is blank", async () => {
    await LoginPage.open();

    await LoginPage.login("", "SuperSecretPassword!");
    await expect(LoginPage.flashAlert).toBeExisting();
    await expect(LoginPage.flashAlert).toHaveTextContaining(
      "Your username is invalid!"
    );
  });
});
