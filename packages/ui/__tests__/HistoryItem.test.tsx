import { render, screen } from '@testing-library/react'
import HistoryItem from '../src/historyItem'

describe('HistoryItem component', () => {
  it('renders title and year', () => {
    render(<HistoryItem title="Event" year={1990} description="d" />)
    expect(screen.getByText(/Event/)).toBeInTheDocument()
    expect(screen.getByText(/1990/)).toBeInTheDocument()
  })

  it('renders with only required title prop', () => {
    render(<HistoryItem title="Important Event" />)
    expect(screen.getByText('Important Event')).toBeInTheDocument()
  })

  it('renders year as number', () => {
    render(<HistoryItem title="Event" year={2024} />)
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('renders year as string', () => {
    render(<HistoryItem title="Event" year="2024" />)
    expect(screen.getByText('2024')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(<HistoryItem title="Event" description="This is a detailed description" />)
    expect(screen.getByText('This is a detailed description')).toBeInTheDocument()
  })

  it('renders all props together', () => {
    render(
      <HistoryItem
        title="Stand-up Comedy Festival"
        year={2023}
        description="The biggest comedy event of the year"
      />
    )

    expect(screen.getByText('Stand-up Comedy Festival')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
    expect(screen.getByText('The biggest comedy event of the year')).toBeInTheDocument()
  })

  it('does not render year when not provided', () => {
    render(<HistoryItem title="Event" description="Description" />)
    expect(screen.queryByText(/\d{4}/)).not.toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    const { container } = render(<HistoryItem title="Event" year={2020} />)
    const paragraphs = container.querySelectorAll('p')
    expect(paragraphs).toHaveLength(0)
  })
})
