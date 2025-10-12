import type { APIRequestContext, APIResponse } from '@playwright/test';

export class ApiClient {
  constructor(private readonly request: APIRequestContext, private readonly baseUrl: string) {}

  async post<T>(path: string, payload: unknown, headers: Record<string, string> = {}): Promise<T> {
    const response = await this.request.post(this.resolve(path), {
      data: payload,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
    });

    return this.parseResponse<T>(response);
  }

  async delete<T>(path: string, headers: Record<string, string> = {}): Promise<T> {
    const response = await this.request.delete(this.resolve(path), {
      headers: {
        Accept: 'application/json',
        ...headers,
      },
    });

    return this.parseResponse<T>(response);
  }

  private resolve(path: string): string {
    return path.startsWith('http') ? path : `${this.baseUrl.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
  }

  private async parseResponse<T>(response: APIResponse): Promise<T> {
    if (!response.ok()) {
      const message = await this.safeBody(response);
      throw new Error(`API request failed: ${response.status()} ${response.statusText()} - ${message}`);
    }

    return response.json() as Promise<T>;
  }

  private async safeBody(response: APIResponse): Promise<string> {
    try {
      return JSON.stringify(await response.json());
    } catch {
      return await response.text();
    }
  }
}

