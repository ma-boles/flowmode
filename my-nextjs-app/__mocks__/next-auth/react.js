const nextAuthReact = jest.requireActual('next-auth/react');

module.exports = {
    ...nextAuthReact,
    useSession: () => ({
        data: {
            user: {
                name: 'Mocked User',
                email: 'mock@example.com',
            },
        },
        status: 'authenticated',
    }),
};