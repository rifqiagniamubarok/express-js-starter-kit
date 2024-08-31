import supertest from 'supertest';
import { web } from '../src/application/test-web.js';
import { removeUser } from './test-utils.js';
import { logger } from '../src/application/logging.js';

describe('/auth', () => {
  const username = 'usertesting';
  const password = 'testingtesting';

  afterAll(async () => {
    await removeUser(username);
  });

  it('should register success if body valid', async () => {
    const result = await supertest(web).post('/api/v1/auth/register').send({
      username,
      password,
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe(username);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.password).toBeUndefined();
  });
  it('should not register if body invalid', async () => {
    const result = await supertest(web).post('/api/v1/auth/register').send({
      username: '',
      password: 'tests',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
  it('should login success if body valid', async () => {
    const result = await supertest(web).post('/api/v1/auth/login').send({
      username,
      password,
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe(username);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.password).toBeUndefined();
    expect(result.body.data.token).toBeDefined();
  });
  it('should not login success if body valid', async () => {
    const result = await supertest(web).post('/api/v1/auth/login').send({
      username,
      password: 'notfound',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
