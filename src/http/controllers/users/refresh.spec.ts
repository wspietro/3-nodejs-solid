/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from '@/app'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to refresh a token', async () => {
    await request(app.server).post('/users').send({
      name: 'John Doe',
      email: 'jd@test.com',
      password: '123456'
    })

    const authResponse = await request(app.server).post('/sessions').send({
      email: 'jd@test.com',
      password: '123456'
    })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String)
    })
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken=')
    ])
  })
})