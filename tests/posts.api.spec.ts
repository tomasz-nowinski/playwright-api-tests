import { test, expect } from '@playwright/test';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

const testPost = {
  userId: 1,
  title: 'Playwright API Test',
  body: 'TEST TEST',
};

test.describe('Posts API', () => {
  test('GET /posts/1 - should return post details', async ({ request }) => {
    const response = await request.get('/posts/1');

    expect(response.status()).toBe(200);

    const post: Post = await response.json();

    expect(post).toMatchObject({
      id: 1,
      userId: 1,
      title: expect.any(String),
      body: expect.any(String),
    });

    expect(post.title).not.toBe('');
    expect(post.body).not.toBe('');
  });

  test('GET /posts - should return a list of posts', async ({ request }) => {
    const response = await request.get('/posts');

    await expect(response).toBeOK();

    const posts: Post[] = await response.json();

    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
      expect(post).toEqual(
        expect.objectContaining({
          id: expect.any(Number),
          userId: expect.any(Number),
          title: expect.any(String),
          body: expect.any(String),
        }),
      );
    }
  });

  test('GET /posts?userId=1 - should return posts for the specified user', async ({
    request,
  }) => {
    const response = await request.get('/posts', {
      params: { userId: 1 },
    });

    await expect(response).toBeOK();

    const posts: Post[] = await response.json();

    expect(posts.length).toBeGreaterThan(0);

    for (const post of posts) {
      expect(post.userId).toBe(1);
    }
  });

  test('POST /posts - should create a new post', async ({ request }) => {
    const response = await request.post('/posts', {
      data: testPost,
    });

    expect(response.status()).toBe(201);

    const createdPost: Post = await response.json();

    expect(createdPost).toMatchObject(testPost);
    expect(createdPost.id).toEqual(expect.any(Number));
  });

  test('PUT /posts/1 - should update an existing post', async ({ request }) => {
    const updatedPost: Post = {
      id: 1,
      userId: 1,
      title: 'Updated post title',
      body: 'Updated post body',
    };

    const response = await request.put('/posts/1', {
      data: updatedPost,
    });

    await expect(response).toBeOK();

    const result: Post = await response.json();

    expect(result).toMatchObject(updatedPost);
  });

  test('PATCH /posts/1 - should update the post title', async ({ request }) => {
    const updatedTitle = 'Updated title - PATCH';

    const response = await request.patch('/posts/1', {
      data: { title: updatedTitle },
    });

    await expect(response).toBeOK();

    const result: Post = await response.json();

    expect(result.id).toBe(1);
    expect(result.title).toBe(updatedTitle);
  });

  test('DELETE /posts/1 - should delete a post', async ({ request }) => {
    const response = await request.delete('/posts/1');

    await expect(response).toBeOK();
  });

  test('GET /posts/999999 - should return 404 for a non-existing post', async ({
    request,
  }) => {
    const response = await request.get('/posts/999999');

    expect(response.status()).toBe(404);
  });
});

test('GET /posts?userId=999999 - should return an empty list', async ({
  request,
}) => {
  const response = await request.get('/posts', {
    params: { userId: 999999 },
  });

  expect(response.status()).toBe(200);

  const posts = await response.json();

  expect(posts).toEqual([]);
});