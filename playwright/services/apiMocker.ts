import type { Page, Route, Request } from '@playwright/test';

type Json = Record<string, unknown>;

export type UserProfile = {
  name: string;
  email: string;
  address: string;
  dob: string;
  hobbies: string;
  events: string;
  secret: string;
};

export type PostRecord = {
  id: string;
  _id: string;
  owner: string;
  description: string;
  updatedAt: string;
};

type ResponseConfig = {
  status: number;
  body?: Json;
};

const oneByOnePng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAE0lEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
  'base64',
);

const alternateOneByOnePng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR4nGJ89uzdfwAJZgO6Z35JtQAAAABJRU5ErkJggg==',
  'base64',
);

const defaultUser: UserProfile = {
  name: 'Ava Example',
  email: 'ava@example.com',
  address: '221B Baker Street, London',
  dob: '1990-05-14',
  hobbies: 'Photography, Hiking',
  events: 'Media Summit 2025',
  secret: 'poppy',
};

const defaultRegistration: ResponseConfig = {
  status: 201,
  body: { id: 'new-user-id' },
};

const defaultPasswordReset: ResponseConfig = {
  status: 200,
  body: { success: true },
};

export class ApiMocker {
  private readonly cleanup: Array<() => Promise<void>> = [];
  private user: UserProfile = defaultUser;
  private posts = new Map<string, PostRecord>();
  private registrationResponse: ResponseConfig = defaultRegistration;
  private resetPasswordResponse: ResponseConfig = defaultPasswordReset;
  private userRouteRegistered = false;
  private postsRouteRegistered = false;
  private avatarRouteRegistered = false;
  private registrationRouteRegistered = false;
  private resetPasswordRouteRegistered = false;
  private avatarContent: Buffer | null = oneByOnePng;
  private readonly enabled: boolean;

  constructor(private readonly page: Page, options: { enabled?: boolean } = {}) {
    this.enabled = options.enabled ?? (process.env.UI_E2E_USE_MOCKS !== 'false');
  }

  async primeUserProfile(overrides: Partial<UserProfile> = {}): Promise<void> {
    if (!this.enabled) return;
    this.user = {
      ...this.user,
      ...overrides,
    };
    if (!this.userRouteRegistered) {
      await this.registerUserRoute();
      this.userRouteRegistered = true;
    }
  }

  async primeAvatar(): Promise<void> {
    if (!this.enabled) return;
    if (this.avatarRouteRegistered) return;

    await this.registerRoute('**/users/me/avatar', async (route, request) => {
      if (request.method() === 'GET') {
        if (!this.avatarContent) {
          await route.fulfill({ status: 404 });
          return;
        }
        await route.fulfill({
          status: 200,
          headers: {
            'Content-Type': 'image/png',
          },
          body: this.avatarContent,
        });
      } else if (request.method() === 'POST') {
        this.avatarContent = this.avatarContent === oneByOnePng ? alternateOneByOnePng : oneByOnePng;
        await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
      } else if (request.method() === 'DELETE') {
        this.avatarContent = null;
        await route.fulfill({ status: 200, body: JSON.stringify({ success: true }) });
      } else {
        await route.continue();
      }
    });

    this.avatarRouteRegistered = true;
  }

  async primePosts(initialPosts: PostRecord[] = []): Promise<void> {
    if (!this.enabled) return;
    this.posts = new Map(initialPosts.map((post) => [post.id, post]));
    if (!this.postsRouteRegistered) {
      await this.registerPostsRoutes();
      this.postsRouteRegistered = true;
    }
  }

  async configureRegistration(response: Partial<ResponseConfig> = {}): Promise<void> {
    if (!this.enabled) return;
    this.registrationResponse = {
      ...this.registrationResponse,
      ...response,
    };
    if (!this.registrationRouteRegistered) {
      await this.registerRoute(/\/users(?:\?.*)?$/, async (route, request) => {
        if (request.method() === 'POST') {
          await route.fulfill({
            status: this.registrationResponse.status,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.registrationResponse.body ?? {}),
          });
        } else {
          await route.continue();
        }
      });
      this.registrationRouteRegistered = true;
    }
  }

  async configurePasswordReset(response: Partial<ResponseConfig> = {}): Promise<void> {
    if (!this.enabled) return;
    this.resetPasswordResponse = {
      ...this.resetPasswordResponse,
      ...response,
    };
    if (!this.resetPasswordRouteRegistered) {
      await this.registerRoute('**/users/reset-password', async (route, request) => {
        if (request.method() === 'PATCH') {
          await route.fulfill({
            status: this.resetPasswordResponse.status,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.resetPasswordResponse.body ?? {}),
          });
        } else {
          await route.continue();
        }
      });
      this.resetPasswordRouteRegistered = true;
    }
  }

  async dispose(): Promise<void> {
    if (!this.enabled) return;
    await Promise.all(this.cleanup.map((dispose) => dispose()));
    this.cleanup.length = 0;
    this.userRouteRegistered = false;
    this.postsRouteRegistered = false;
    this.avatarRouteRegistered = false;
    this.registrationRouteRegistered = false;
    this.resetPasswordRouteRegistered = false;
    this.avatarContent = oneByOnePng;
  }

  private async registerRoute(
    url: string | RegExp,
    handler: (route: Route, request: Request) => Promise<void>,
  ): Promise<void> {
    if (!this.enabled) return;
    await this.page.route(url, handler);
    this.cleanup.push(async () => this.page.unroute(url, handler));
  }

  private async registerUserRoute(): Promise<void> {
    await this.registerRoute('**/users/me', async (route, request) => {
      switch (request.method()) {
        case 'GET':
          await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.user),
          });
          break;
        case 'PATCH': {
          const payload = this.safeJson(request);
          this.user = {
            ...this.user,
            ...(payload as Partial<UserProfile>),
          };
          await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.user),
          });
          break;
        }
        case 'DELETE':
          await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true }),
          });
          break;
        default:
          await route.continue();
      }
    });
  }

  private async registerPostsRoutes(): Promise<void> {
    await this.registerRoute(/\/posts(?:\?.*)?$/, async (route, request) => {
      if (request.method() === 'GET') {
        await route.fulfill({
          status: 200,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(this.postsAsObject()),
        });
        return;
      }

      if (request.method() === 'POST') {
        const payload = this.safeJson(request) as Partial<PostRecord>;
        const id = this.generatePostId();
        const record: PostRecord = {
          id,
          _id: id,
          owner: payload.owner ?? this.user.name,
          description: payload.description ?? '',
          updatedAt: new Date().toISOString(),
        };
        this.posts.set(id, record);
        await route.fulfill({
          status: 201,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(record),
        });
        return;
      }

      await route.continue();
    });

    await this.registerRoute(/\/posts\/([^/]+)$/, async (route, request) => {
      const match = request.url().match(/\/posts\/([^/]+)$/);
      const id = match?.[1];

      if (!id || !this.posts.has(id)) {
        await route.fulfill({ status: 404 });
        return;
      }

      const existing = this.posts.get(id);

      switch (request.method()) {
        case 'GET':
          await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(existing),
          });
          break;
        case 'PATCH': {
          const payload = this.safeJson(request) as Partial<PostRecord>;
          const updated: PostRecord = {
            ...existing!,
            ...payload,
            updatedAt: new Date().toISOString(),
          };
          this.posts.set(id, updated);
          await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updated),
          });
          break;
        }
        case 'DELETE':
          this.posts.delete(id);
          await route.fulfill({
            status: 200,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ success: true }),
          });
          break;
        default:
          await route.continue();
      }
    });
  }

  private postsAsObject(): Record<string, PostRecord> {
    const ordered = Array.from(this.posts.values()).sort((a, b) =>
      a.updatedAt > b.updatedAt ? -1 : 1,
    );
    return ordered.reduce<Record<string, PostRecord>>((acc, post) => {
      acc[post.id] = post;
      return acc;
    }, {});
  }

  private safeJson(request: Request): Json | undefined {
    try {
      return request.postDataJSON();
    } catch (error) {
      return undefined;
    }
  }

  private generatePostId(): string {
    const unique = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    return `post-${unique}`;
  }
}
