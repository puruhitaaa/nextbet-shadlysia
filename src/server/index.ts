import { cors, type HTTPMethod } from "@elysiajs/cors"
import { Elysia } from "elysia"
import { auth } from "./better-auth"

const corsConfig = {
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PATCH", "DELETE", "PUT"] as HTTPMethod[],
  allowedHeaders: "*",
  exposedHeaders: "*",
  maxAge: 5,
  credentials: true,
}

// user middleware (compute user and session and pass to routes)
const betterAuth = new Elysia({ name: "better-auth" })
  .mount(auth.handler)
  .macro({
    auth: {
      async resolve({ status, request: { headers } }) {
        const session = await auth.api.getSession({
          headers,
        })

        if (!session) return status(401)

        return {
          user: session.user,

          session: session.session,
        }
      },
    },
  })

export const app = new Elysia({ prefix: "/api" })
  .use(cors(corsConfig))
  .use(betterAuth)
  .guard({ auth: true }, (app) =>
    app.get("/protected", ({ auth }) => ({
      message: "You are authenticated",
      user: auth.user,
    }))
  )

export type App = typeof app // <--- Export type for Client
