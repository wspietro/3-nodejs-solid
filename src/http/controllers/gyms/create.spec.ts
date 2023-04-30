/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Create a gym (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to create a gym', async () => {
    const { token } = await createAndAuthenticateUser(app)

    const response = await request(app.server)
      .post("/gyms")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Create Gym Test',
        latitude: -48.67949,
        longitude: -145.53401,
        description: null,
        phone: null,
      })

    expect(response.statusCode).toEqual(201)
  })
})