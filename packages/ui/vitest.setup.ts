import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.scrollTo
window.scrollTo = vi.fn().mockImplementation(() => { }) as any

// Mock IntersectionObserver
class IntersectionObserverMock {
    observe = vi.fn()
    unobserve = vi.fn()
    disconnect = vi.fn()
}

Object.defineProperty(window, 'IntersectionObserver', {
    writable: true,
    configurable: true,
    value: IntersectionObserverMock
})

// Mock HTMLMediaElement
window.HTMLMediaElement.prototype.play = vi.fn().mockImplementation(() => Promise.resolve())
window.HTMLMediaElement.prototype.pause = vi.fn()
window.HTMLMediaElement.prototype.load = vi.fn()
