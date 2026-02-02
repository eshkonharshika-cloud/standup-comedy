import { render, screen } from '@testing-library/react'
import { Code } from '../src/code'

describe('Code component', () => {
    it('renders children content', () => {
        render(<Code>const x = 42;</Code>)
        expect(screen.getByText('const x = 42;')).toBeInTheDocument()
    })

    it('renders as code element', () => {
        const { container } = render(<Code>test code</Code>)
        const codeElement = container.querySelector('code')
        expect(codeElement).toBeInTheDocument()
        expect(codeElement).toHaveTextContent('test code')
    })

    it('applies custom className', () => {
        const { container } = render(<Code className="language-javascript">const x = 1;</Code>)
        const codeElement = container.querySelector('code')
        expect(codeElement).toHaveClass('language-javascript')
    })

    it('renders without className', () => {
        const { container } = render(<Code>plain code</Code>)
        const codeElement = container.querySelector('code')
        expect(codeElement).toBeInTheDocument()
        expect(codeElement?.className).toBe('')
    })

    it('renders complex children', () => {
        render(
            <Code>
                <span>function</span> test() {'{}'}
            </Code>
        )
        expect(screen.getByText('function')).toBeInTheDocument()
        expect(screen.getByText(/test\(\)/)).toBeInTheDocument()
    })

    it('renders multiline code', () => {
        const code = `function hello() {
  return 'world';
}`
        render(<Code>{code}</Code>)
        expect(screen.getByText(/function hello/)).toBeInTheDocument()
    })

    it('preserves whitespace in code', () => {
        const { container } = render(<Code>  indented  code  </Code>)
        const codeElement = container.querySelector('code')
        expect(codeElement?.textContent).toBe('  indented  code  ')
    })

    it('renders empty code block', () => {
        const { container } = render(<Code></Code>)
        const codeElement = container.querySelector('code')
        expect(codeElement).toBeInTheDocument()
        expect(codeElement?.textContent).toBe('')
    })

    it('renders with multiple className values', () => {
        const { container } = render(<Code className="language-tsx highlight-line">code</Code>)
        const codeElement = container.querySelector('code')
        expect(codeElement).toHaveClass('language-tsx')
        expect(codeElement).toHaveClass('highlight-line')
    })
})
