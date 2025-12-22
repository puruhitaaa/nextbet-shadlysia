import { treaty } from "@elysiajs/eden"
import type { App } from "@/server"

const url = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
export const api = treaty<App>(url).api
