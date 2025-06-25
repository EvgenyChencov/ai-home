import '@testing-library/jest-dom'

// Global test setup
global.ResizeObserver = class ResizeObserver {
	constructor(cb: ResizeObserverCallback) {
		this.cb = cb
	}
	observe() {
		// Mock implementation
	}
	unobserve() {
		// Mock implementation  
	}
	disconnect() {
		// Mock implementation
	}
	cb: ResizeObserverCallback
}

// Mock window.confirm for delete confirmations
Object.defineProperty(window, 'confirm', {
	writable: true,
	value: vi.fn(() => true)
})

// Mock window.location.reload
Object.defineProperty(window, 'location', {
	writable: true,
	value: {
		reload: vi.fn()
	}
}) 