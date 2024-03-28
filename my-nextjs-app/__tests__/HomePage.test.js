import { render, screen } from '@testing-library/react'
import HomePage from '@/app/page'

it('should have Reads text', () => {
    render(<HomePage />)

    const myElem = screen.getByText('Reads')

    expect(myElem).toBeInTheDocument()
})
