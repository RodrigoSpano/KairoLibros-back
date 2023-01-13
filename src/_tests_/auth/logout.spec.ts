import { expect } from '@jest/globals'
import request from 'supertest'
import app from '../../index'

describe('test functionality logout in endpoint', () => {
  it('should return 400 statuscode', async () => {
    const response = await request(app).delete('/auth/logout')
    expect(response.statusCode).toBe(400)
  })
})