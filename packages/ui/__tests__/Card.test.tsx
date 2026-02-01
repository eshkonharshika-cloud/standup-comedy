import { render, screen } from '@testing-library/react'
import { Card } from '../src/card'

describe('Card component', () => {
    it('renders title and children', () => {
        render(
            <Card title="Test Card" href="https://example.com">
                Card content
            </Card>
        )
        expect(screen.getByText('Test Card')).toBeInTheDocument()
        expect(screen.getByText('Card content')).toBeInTheDocument()
    })

    it('renders as a link with correct href', () => {
        render(
            <Card title="Link Card" href="https://example.com">
                Content
            </Card>
        )
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('href', 'https://example.com?utm_source=create-turbo&utm_medium=basic&utm_campaign=create-turbo')
    })

    it('opens in new tab with correct attributes', () => {
        render(
            <Card title="External" href="https://example.com">
                Content
            </Card>
        )
        const link = screen.getByRole('link')
        expect(link).toHaveAttribute('target', '_blank')
        expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('renders arrow indicator', () => {
        render(
            <Card title="Arrow Card" href="https://example.com">
                Content
            </Card>
        )
        expect(screen.getByText('->')).toBeInTheDocument()
    })

    it('applies custom className', () => {
        render(
            <Card title="Styled" href="https://example.com" className="custom-card">
                Content
            </Card>
        )
        const link = screen.getByRole('link')
        expect(link).toHaveClass('custom-card')
    })

    it('renders without className', () => {
        render(
            <Card title="No Class" href="https://example.com">
                Content
            </Card>
        )
        const link = screen.getByRole('link')
        expect(link).toBeInTheDocument()
    })

    it('renders complex children', () => {
        render(
            <Card title="Complex" href="https://example.com">
                <div>
                    <p>Paragraph 1</p>
                    <p>Paragraph 2</p>
                </div>
            </Card>
        )
        expect(screen.getByText('Paragraph 1')).toBeInTheDocument()
        expect(screen.getByText('Paragraph 2')).toBeInTheDocument()
    })

    it('appends UTM parameters to href', () => {
        render(
            <Card title="UTM Test" href="https://example.com/page">
                Content
            </Card>
        )
        const link = screen.getByRole('link')
        const href = link.getAttribute('href')
        expect(href).toContain('utm_source=create-turbo')
        expect(href).toContain('utm_medium=basic')
        expect(href).toContain('utm_campaign=create-turbo')
    })

    it('renders title in h2 tag', () => {
        const { container } = render(
            <Card title="Heading Test" href="https://example.com">
                Content
            </Card>
        )
        const heading = container.querySelector('h2')
        expect(heading).toBeInTheDocument()
        expect(heading).toHaveTextContent('Heading Test')
    })
})
