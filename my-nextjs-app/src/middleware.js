import nextAuthMiddleware from "next-auth/middleware"
export default nextAuthMiddleware;

// Protects matching routes
export const config = { matcher: ["/shelf", "/browse"] }
