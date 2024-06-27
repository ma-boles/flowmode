import React from 'react';
import { render, screen } from '@testing-library/react';
import NavBar from '@/components/nav/NavBar';

describe('NavBar', () => {
    it('displays the user image from the session', () => {
        render(<NavBar />)
        expect(screen.getByRole('img', { src: 'https://example.com/johndoe.jpg'})).toBeInTheDocument();
     });

});
