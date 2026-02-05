import { render, screen } from '@testing-library/react'
import { Hero } from '../src/hero'

describe('Hero component', () => {
  it('renders headline and CTAs', () => {
    render(<Hero headlineTop="Top" headlineAccent="Accent" subtext="hello" />)
    expect(screen.getByText(/Top/)).toBeInTheDocument()
    expect(screen.getByText(/Accent/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Search/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Explore/i })).toBeInTheDocument()
  })

  it('renders with only required props', () => {
    render(<Hero headlineTop="Welcome" />)
    expect(screen.getByText('Welcome')).toBeInTheDocument()
  })

  it('renders headline accent when provided', () => {
    render(<Hero headlineTop="Stand-up" headlineAccent="India" />)
    expect(screen.getByText('Stand-up')).toBeInTheDocument()
    expect(screen.getByText('India')).toBeInTheDocument()
  })

  it('renders subtext when provided', () => {
    render(<Hero headlineTop="Title" subtext="This is the subtext" />)
    expect(screen.getByText('This is the subtext')).toBeInTheDocument()
  })

  it('renders default CTA buttons', () => {
    render(<Hero headlineTop="Title" />)
    expect(screen.getByRole('button', { name: 'Search' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Explore' })).toBeInTheDocument()
  })

  it('renders custom CTA search text', () => {
    render(<Hero headlineTop="Title" ctaSearch="Find Now" />)
    expect(screen.getByRole('button', { name: 'Find Now' })).toBeInTheDocument()
  })

  it('renders custom CTA scroll text', () => {
    render(<Hero headlineTop="Title" ctaScroll="Discover" />)
    expect(screen.getByRole('button', { name: 'Discover' })).toBeInTheDocument()
  })

  it('renders both custom CTA texts', () => {
    render(<Hero headlineTop="Title" ctaSearch="Start" ctaScroll="Learn More" />)
    expect(screen.getByRole('button', { name: 'Start' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Learn More' })).toBeInTheDocument()
  })

  it('renders all props together', () => {
    render(
      <Hero
        headlineTop="Discover"
        headlineAccent="Comedy"
        subtext="Find the best stand-up shows"
        ctaSearch="Search Shows"
        ctaScroll="Browse All"
      />
    )

    expect(screen.getByText('Discover')).toBeInTheDocument()
    expect(screen.getByText('Comedy')).toBeInTheDocument()
    expect(screen.getByText('Find the best stand-up shows')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Search Shows' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Browse All' })).toBeInTheDocument()
  })

  it('renders two separate buttons', () => {
    render(<Hero headlineTop="Title" />)
    const buttons = screen.getAllByRole('button')
    expect(buttons).toHaveLength(2)
  })
})
