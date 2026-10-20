import { test, expect } from '@playwright/test';

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    city: string;
  };
  company: {
    name: string;
  };
};

test.describe('Users API', () => {
  test('GET /users/1 - should return user details', async ({ request }) => {
    const response = await request.get('/users/1');

    await expect(response).toBeOK();

    const user: User = await response.json();

    expect(user).toMatchObject({
      id: 1,
      name: expect.any(String),
      username: expect.any(String),
      email: expect.stringContaining('@'),
      address: {
        street: expect.any(String),
        city: expect.any(String),
      },
      company: {
        name: expect.any(String),
      },
    });
  });
});