import supertest from 'supertest';
import { web } from '../src/application/web';
import { removeUser } from './test-utils';

describe('/auth', () => {
  const username = 'usertesting';
  afterAll(async () => {
    await removeUser(username);
  });
  it('should register success if body valid', async () => {
    const result = await supertest(web).post('/api/v1/auth/register').send({
      username,
      password: 'tests',
    });

    expect(result.status).toBe(200);
    expect(result.body.data.username).toBe(username);
    expect(result.body.data.id).toBeDefined();
    expect(result.body.data.password).toBeUndefined();
  });
  it('should register fail if body invalid', async () => {
    const result = await supertest(web).post('/api/v1/auth/register').send({
      username: '',
      password: 'tests',
    });

    expect(result.status).toBe(400);
    expect(result.body.errors).toBeDefined();
  });
});
