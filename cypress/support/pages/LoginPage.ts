class LoginPage {
  visit() {
    cy.visit('login');
  }

  get usernameInput() {
    return cy.get('input[name="username"]');
  }

  get passwordInput() {
    return cy.get('input[name="password"]');
  }

  get submitButton() {
    return cy.get('button[type="submit"]');
  }

  login(username: string, password: string) {
    this.usernameInput.type(username);
    this.passwordInput.type(password);
    this.submitButton.click();
  }
}

export default new LoginPage();
