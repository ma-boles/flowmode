import { v4 as uuid4 } from 'uuid';

const nextAuthReact = jest.requireActual('next-auth/react');

module.exports = {
    ...nextAuthReact,
    useSession: jest.fn(() => ({
        data: {
            user: {
                name: 'Mocked User',
                email: 'mock@example.com',
            },
            accessToken: uuid4(),
        },
        status: 'authenticated',
    })),
};