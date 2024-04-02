import React from 'react';
import { render, screen } from '@testing-library/react';
import UserProfile from '@/components/profile/UserProfile';

describe('UserProfile', () => {
    it('displays the user image from the session', () => {
        render(<UserProfile />)
        expect(screen.getByRole('img', { src: 'https://example.com/johndoe.jpg'})).toBeInTheDocument();
     });

});
