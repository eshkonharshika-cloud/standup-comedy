import { render, screen, fireEvent } from '@testing-library/react'
import EditorLayout from '../components/EditorLayout'
import { useEditorStore } from '../lib/editorStore'
import { act } from 'react-dom/test-utils'

describe('Editor flow', () => {
  it('adds a hero and updates headline', async () => {
    render(<EditorLayout />)

    // add a hero component
    const addButton = screen.getByRole('button', { name: /Add Hero/i })
    await act(async () => {
      addButton.click()
    })

    // find the headline input (select the component first)
    const editButtons = screen.getAllByText(/Edit/i)
    await act(async () => editButtons[0].click())

    const headline = screen.getByLabelText(/Headline Top/i)
    await act(async () => {
      fireEvent.change(headline, { target: { value: 'Updated Headline' } })
      // blur to trigger onBlur
      headline.blur()
    })

    // verify the preview shows updated text
    expect(screen.getByText(/Updated Headline/)).toBeInTheDocument()
  })
})
