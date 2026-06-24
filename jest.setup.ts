import '@testing-library/jest-dom'

// Radix UI primitives (ScrollArea, etc.) use ResizeObserver internally.
// jsdom does not implement it, so we provide a no-op mock.
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))
