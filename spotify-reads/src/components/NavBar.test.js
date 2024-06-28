import React from "react";
import { render, screen } from '@testing-library/react';
import NavBar from "@/components/nav/NavBar";

describe('NavBar', () => {
    it('renders Spotify Reads', () => {
        render(<NavBar />)
        const myElem = screen.getByText('Spotify Reads')
        expect(myElem).toBeInTheDocument()
    });

});