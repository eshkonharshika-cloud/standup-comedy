import { render, screen } from '@testing-library/react'
import BlogCard from '../src/blogCard'

describe('BlogCard component', () => {
  it('renders headline and excerpt', () => {
    render(<BlogCard headline="Hello" excerpt="short" comedian="A." category="Cat" />)
    expect(screen.getByText(/Hello/)).toBeInTheDocument()
    expect(screen.getByText(/short/)).toBeInTheDocument()
  })

  it('renders with only required props', () => {
    render(<BlogCard headline="Test Headline" />)
    expect(screen.getByText('Test Headline')).toBeInTheDocument()
  })

  it('renders comedian name when provided', () => {
    render(<BlogCard headline="Test" comedian="John Doe" />)
    expect(screen.getByText(/By John Doe/)).toBeInTheDocument()
  })

  it('renders category when provided', () => {
    render(<BlogCard headline="Test" category="Comedy" />)
    expect(screen.getByText(/· Comedy/)).toBeInTheDocument()
  })

  it('renders both comedian and category', () => {
    render(<BlogCard headline="Test" comedian="Jane Smith" category="Stand-up" />)
    expect(screen.getByText(/By Jane Smith/)).toBeInTheDocument()
    expect(screen.getByText(/· Stand-up/)).toBeInTheDocument()
  })

  it('renders featured image with correct attributes', () => {
    const featuredImage = { url: 'https://example.com/image.jpg', alt: 'Test Image' }
    render(<BlogCard headline="Test" featuredImage={featuredImage} />)

    const img = screen.getByRole('img')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'https://example.com/image.jpg')
    expect(img).toHaveAttribute('alt', 'Test Image')
  })

  it('uses headline as alt text when image alt is not provided', () => {
    const featuredImage = { url: 'https://example.com/image.jpg' }
    render(<BlogCard headline="My Headline" featuredImage={featuredImage} />)

    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('alt', 'My Headline')
  })

  it('renders external URL link when provided', () => {
    render(<BlogCard headline="Test" externalUrl="https://example.com/article" />)

    const link = screen.getByRole('link', { name: /Read/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com/article')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', 'noreferrer')
  })

  it('renders all props together', () => {
    const props = {
      headline: 'Complete Blog Post',
      excerpt: 'This is a complete blog post excerpt',
      comedian: 'Famous Comedian',
      category: 'Observational',
      featuredImage: { url: 'https://example.com/full.jpg', alt: 'Full Image' },
      externalUrl: 'https://example.com/full-article'
    }

    render(<BlogCard {...props} />)

    expect(screen.getByText('Complete Blog Post')).toBeInTheDocument()
    expect(screen.getByText('This is a complete blog post excerpt')).toBeInTheDocument()
    expect(screen.getByText(/By Famous Comedian/)).toBeInTheDocument()
    expect(screen.getByText(/· Observational/)).toBeInTheDocument()
    expect(screen.getByRole('img')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Read/i })).toBeInTheDocument()
  })

  it('does not render optional elements when not provided', () => {
    render(<BlogCard headline="Minimal" />)

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
    expect(screen.queryByRole('link')).not.toBeInTheDocument()
    expect(screen.queryByText(/By/)).not.toBeInTheDocument()
    expect(screen.queryByText(/·/)).not.toBeInTheDocument()
  })
})
