/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('Search gyms (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to search gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post("/gyms")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        latitude: -48.67949,
        longitude: -145.53401,
        description: null,
        phone: null,
      })

    await request(app.server)
      .post("/gyms")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        latitude: -48.67949,
        longitude: -145.53401,
        description: null,
        phone: null,
      })

    const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q: 'JavaScript'
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.matchingGyms).toHaveLength(1)
    expect(response.body.matchingGyms).toEqual([
      expect.objectContaining({
        title: 'JavaScript Gym'
      })
    ])
  })
})