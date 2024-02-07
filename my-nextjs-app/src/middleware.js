// Protects all routes
/*import nextAuthMiddleware from "next-auth/middleware"
export default nextAuthMiddleware;*/

// Protects only matching routes
export const config = { matcher: ["/shelf", "/browse"] }
