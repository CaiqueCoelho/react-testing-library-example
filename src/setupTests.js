import '@testing-library/jest-dom'
import fetchMock from 'jest-fetch-mock'
import { server } from './mocks/node'

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
})

afterAll(() => {
  server.close()
})

fetchMock.enableMocks()
