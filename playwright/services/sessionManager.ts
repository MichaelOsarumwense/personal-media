import type { APIRequestContext, Page, Route } from '@playwright/test';
import { ApiClient } from './apiClient';
import { environment } from '../config/env';

type LoginPayload = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

export class SessionManager {
  private readonly apiClient: ApiClient;
  private interceptors: Array<() => Promise<void>> = [];

  constructor(private readonly page: Page, private readonly request: APIRequestContext) {
    this.apiClient = new ApiClient(request, environment.apiBaseURL);
  }

  async loginViaApi(
    credentials: LoginPayload = environment.credentials.primary,
  ): Promise<LoginResponse> {
    return this.apiClient.post<LoginResponse>('users/login', credentials);
  }

  async stubSuccessfulLogin(responseOverrides?: Partial<LoginResponse>): Promise<void> {
    const token =
      responseOverrides?.token ??
      process.env.UI_E2E_FAKE_TOKEN ??
      `fake-token-${Date.now().toString(36)}`;

    const handler = async (route: Route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ token }),
      });
    };

    await this.page.route('**/users/login', handler);
    this.interceptors.push(async () => this.page.unroute('**/users/login', handler));
  }

  async stubFailedLogin(errorMessage = 'Unable to login'): Promise<void> {
    const handler = async (route: Route) => {
      await route.fulfill({
        status: 401,
        contentType: 'application/json',
        body: JSON.stringify({ error: errorMessage }),
      });
    };

    await this.page.route('**/users/login', handler);
    this.interceptors.push(async () => this.page.unroute('**/users/login', handler));
  }

  async reset(): Promise<void> {
    // Tear down registered interceptors.
    await Promise.all(this.interceptors.map((dispose) => dispose()));
    this.interceptors = [];
    await this.page.context().clearCookies();
    await this.page.context().clearPermissions();
  }
}
