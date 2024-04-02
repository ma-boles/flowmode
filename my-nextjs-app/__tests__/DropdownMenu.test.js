import React from 'react';
import { render, screen } from '@testing-library/react';
import DropdownMenu from '@/components/nav/DropdownMenu';

describe('DropdownMenu', () => {
    it('renders Dropdown text on button', () => {
        render(<DropdownMenu />)
        // Use query to select the button element
        const buttonElem = screen.getByRole('button', { name: 'Dropdown' });
        // Assert that the button's text content matches the expected value
        expect(buttonElem).toHaveTextContent('Dropdown');
     });

});