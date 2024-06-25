import React from "react";
import { render, fireEvent, waitFor, getByTestId } from '@testing-library/react';
import SearchComponent from "@/components/search/SearchComponent";
import { searchAlbums, searchPlaylist, searchTrack } from "@/app/lib/apiCall";

// Mock API calls
jest.mock('@/app/lib/apiCall', () => ({
    searchAlbums: jest.fn(() => Promise.resolve([])),
    searchTrack: jest.fn(() => Promise.resolve([])),
    searchPlaylist: jest.fn(() => Promise.resolve([])),
}));

// Mock useSession hook
jest.mock('next-auth/react', () => ({
    useSession: jest.fn(() => ({
        data: { accessToken: 'mockAccessToken' },
    })),
}));

describe('SearchComponent', () => {
    it('renders without crashing', () => {
        render(<SearchComponent />)
    });

    it('executes search when Enter key is pressed', async () => {
        const { getByTestId } = render(<SearchComponent />);
        const searchInput = getByTestId('search-input');

        fireEvent.change(searchInput, { target: { value: 'test keyword' } });
        fireEvent.keyDown(searchInput, { key: 'Enter', code: 'Enter' });

        // Wait for search to complete
        await waitFor(() => {
            expect(searchAlbums).toHaveBeenCalledTimes(1);
            expect(searchPlaylist).toHaveBeenCalledTimes(1);
            expect(searchTrack).toHaveBeenCalledTimes(1);
        }, { timeout: 5000 });
    });

    // Additional testing
});
