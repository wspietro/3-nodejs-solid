/* eslint-disable prettier/prettier */
import { it, describe, expect, beforeAll, afterAll } from "vitest";
import request from "supertest";
import { app } from '@/app'
import { createAndAuthenticateUser } from "@/utils/test/create-and-authenticate-user";

describe('List nearby gyms (e2e)', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to list nearby gyms', async () => {
    const { token } = await createAndAuthenticateUser(app)

    await request(app.server)
      .post("/gyms")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'JavaScript Gym',
        latitude: -23.5456482,
        longitude: -46.6859711,
        description: null,
        phone: null,
      })

    await request(app.server)
      .post("/gyms")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'TypeScript Gym',
        latitude: -23.5259392,
        longitude: 46.6221082,
        description: null,
        phone: null,
      })

    const response = await request(app.server)
      .get("/gyms/nearby")
      .query({
        userLatitude: -23.5456482,
        userLongitude: -46.6859711,
      })
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    // expect(response.body.matchingGyms).toHaveLength(1)
    // expect(response.body.matchingGyms).toEqual([
    //   expect.objectContaining({
    //     title: 'JavaScript Gym'
    //   })
    // ])
  })
})