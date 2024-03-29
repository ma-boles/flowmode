import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '@/app/page'

describe('HomePage', () => {
    it('renders How it works text', () => {
        render(<HomePage />)
        const myElem = screen.getByText('How it works')
        expect(myElem).toBeInTheDocument()
     });

});
