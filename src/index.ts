export type Config = {
  authServerUrl: string;
  loginUrl: string;
};

export type LoginOptions = {
  redirectUrl: string;
};

export default class EnrollAuthentication {
  authServerUrl: string;
  loginUrl: string;

  constructor(config: Config) {
    this.loginUrl = `${config.loginUrl}`;
    this.authServerUrl = `${config.authServerUrl}`;
  }

  private createLoginUrl(options?: LoginOptions) {
    const redirectUrl = options?.redirectUrl || window.location.href;
    return `${this.loginUrl}?redirectUrl=${redirectUrl}`;
  }

  private createLogoutUrl() {
    return `${this.authServerUrl}/account-sign-out`;
  }

  login(options?: LoginOptions) {
    const url = this.createLoginUrl(options);
    window.location.assign(url);
  }

  async getUserProfile() {
    const data = await fetch(`${this.authServerUrl}/account-logged-user`, {
      credentials: "include",
    });
    const profile = await data.json();
    return profile;
  }

  async logout() {
    await fetch(this.createLogoutUrl(), {
      method: "POST",
      credentials: "include",
    });
  }
}
