# Test Rules and Guidelines

## Overview
This document outlines the testing standards and rules for the User Management System project.

## Test Coverage Requirements

### Minimum Coverage Thresholds
- **Lines**: 80% minimum
- **Functions**: 80% minimum  
- **Branches**: 80% minimum
- **Statements**: 80% minimum

### Coverage Exceptions
- Configuration files (*.config.*)
- Type definition files (*.d.ts)
- Test files themselves
- Build artifacts (/dist, /coverage)

## Test Organization

### File Structure
```
src/
├── __tests__/           # Integration tests
├── components/
│   └── __tests__/       # Component unit tests
├── services/
│   └── __tests__/       # Service unit tests
└── test/
    ├── mocks/           # Mock data and functions
    ├── utils/           # Test utilities
    └── setup.ts         # Global test setup
```

### Naming Conventions
- Test files: `*.test.ts` or `*.test.tsx`
- Mock files: `*Mock.ts`
- Test utilities: `testUtils.ts`

## Test Types

### 1. Unit Tests
- Test individual components in isolation
- Mock all external dependencies
- Focus on component behavior and props
- Test accessibility features
- Test error handling

### 2. Integration Tests
- Test component interactions
- Test data flow between components
- Test API integration with mocked services
- Test user workflows end-to-end

### 3. Service Tests
- Test API calls and error handling
- Test data transformation
- Test network error scenarios
- Mock fetch API

## Testing Standards

### Test Structure
Use the **Arrange-Act-Assert** pattern:
```typescript
it('should do something when condition occurs', () => {
	// Arrange
	const props = { user: mockUser }
	
	// Act
	render(<Component {...props} />)
	fireEvent.click(screen.getByRole('button'))
	
	// Assert
	expect(screen.getByText('Expected Text')).toBeInTheDocument()
})
```

### Accessibility Testing
All interactive components must test:
- ARIA attributes
- Keyboard navigation
- Screen reader compatibility
- Focus management

### Error Testing
Every component must test:
- Error states
- Fallback UI
- Error boundaries
- Loading states

### Async Testing
For async operations:
- Use `waitFor` for DOM updates
- Mock API calls consistently
- Test loading states
- Test error scenarios

## Mocking Guidelines

### API Mocking
```typescript
// Mock entire service module
vi.mock('../services/userService')

// Mock specific functions
const mockFetchUsers = vi.mocked(fetchUsers)
mockFetchUsers.mockResolvedValue(mockUsers)
```

### Browser API Mocking
```typescript
// Mock window methods
window.confirm = vi.fn(() => true)
window.location.reload = vi.fn()

// Mock DOM APIs
global.ResizeObserver = class ResizeObserver {
	observe() {}
	unobserve() {}
	disconnect() {}
}
```

## Required Test Scenarios

### Component Tests
1. **Rendering**: Component renders without crashing
2. **Props**: All props are handled correctly
3. **Events**: All event handlers work as expected
4. **Accessibility**: ARIA attributes and keyboard navigation
5. **Edge Cases**: Empty states, error states, loading states

### Service Tests
1. **Success Cases**: API calls return expected data
2. **Error Cases**: Network errors are handled gracefully
3. **Data Transformation**: Data is properly formatted
4. **Retry Logic**: Failed requests are retried appropriately

### Integration Tests
1. **User Workflows**: Complete user interactions
2. **State Management**: State updates work correctly
3. **Side Effects**: useEffect hooks work as expected
4. **Component Communication**: Parent-child interactions

## Performance Testing

### Component Performance
- Test component re-render behavior
- Verify memo optimizations work
- Test large data sets performance

### Memory Leaks
- Test cleanup in useEffect
- Verify event listeners are removed
- Test modal body overflow reset

## Continuous Integration

### Pre-commit Hooks
- Run test suite before commits
- Enforce coverage thresholds
- Check for test file existence

### CI Pipeline
- Run full test suite on push
- Generate coverage reports
- Fail builds on coverage drops
- Run tests in multiple environments

## Test Maintenance

### Regular Tasks
- Update test data when APIs change
- Refactor tests when components change
- Remove obsolete tests
- Update mocks for new features

### Documentation
- Keep test documentation updated
- Document complex test setups
- Explain testing decisions in comments
- Maintain test data consistency

## Tools and Libraries

### Core Testing Stack
- **Vitest**: Test runner and framework
- **React Testing Library**: Component testing utilities
- **Jest DOM**: Additional DOM matchers
- **User Event**: User interaction simulation

### Coverage Tools
- **V8 Coverage**: Built-in coverage provider
- **HTML Reports**: Visual coverage reports
- **Text Reports**: CLI coverage summaries

## Best Practices

### Do's
✅ Write tests before fixing bugs
✅ Use descriptive test names
✅ Test user behavior, not implementation
✅ Mock external dependencies
✅ Test accessibility features
✅ Keep tests simple and focused
✅ Use factory functions for test data

### Don'ts
❌ Test implementation details
❌ Write overly complex tests
❌ Skip error scenarios
❌ Ignore accessibility
❌ Mock React Testing Library
❌ Test third-party libraries
❌ Duplicate test logic

## Example Test Template

```typescript
import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '../../test/utils/testUtils'
import { Component } from '../Component'
import { mockData } from '../../test/mocks/dataMock'

const defaultProps = {
	// Define default props
}

describe('Component', () => {
	it('renders correctly with default props', () => {
		render(<Component {...defaultProps} />)
		
		expect(screen.getByRole('button')).toBeInTheDocument()
	})
	
	it('handles user interaction', () => {
		const onAction = vi.fn()
		render(<Component {...defaultProps} onAction={onAction} />)
		
		fireEvent.click(screen.getByRole('button'))
		
		expect(onAction).toHaveBeenCalledWith(expectedValue)
	})
	
	it('has proper accessibility', () => {
		render(<Component {...defaultProps} />)
		
		const button = screen.getByRole('button')
		expect(button).toHaveAttribute('aria-label', 'Expected label')
	})
})
``` 