import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '../src/button'

describe('Button component', () => {
    // Mock window.alert
    const originalAlert = window.alert
    beforeEach(() => {
        window.alert = vi.fn()
    })

    afterEach(() => {
        window.alert = originalAlert
    })

    it('renders children content', () => {
        render(<Button appName="TestApp">Click Me</Button>)
        expect(screen.getByRole('button', { name: 'Click Me' })).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(<Button appName="TestApp" className="custom-class">Button</Button>)
        const button = screen.getByRole('button')
        expect(button).toHaveClass('custom-class')
    })

    it('shows alert with appName on click', () => {
        render(<Button appName="MyApp">Click</Button>)
        const button = screen.getByRole('button')

        fireEvent.click(button)

        expect(window.alert).toHaveBeenCalledWith('Hello from your MyApp app!')
    })

    it('renders with different appName values', () => {
        const { rerender } = render(<Button appName="App1">Test</Button>)
        fireEvent.click(screen.getByRole('button'))
        expect(window.alert).toHaveBeenCalledWith('Hello from your App1 app!')

        rerender(<Button appName="App2">Test</Button>)
        fireEvent.click(screen.getByRole('button'))
        expect(window.alert).toHaveBeenCalledWith('Hello from your App2 app!')
    })

    it('renders complex children', () => {
        render(
            <Button appName="TestApp">
                <span>Icon</span> Click Here
            </Button>
        )
        expect(screen.getByText('Icon')).toBeInTheDocument()
        expect(screen.getByText(/Click Here/)).toBeInTheDocument()
    })

    it('renders without className', () => {
        render(<Button appName="TestApp">Button</Button>)
        const button = screen.getByRole('button')
        expect(button).toBeInTheDocument()
    })
})
