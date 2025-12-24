import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import {
  admin,
  haveIBeenPwned,
  phoneNumber,
  username,
} from "better-auth/plugins"

import { env } from "@/env.mjs"
import { prisma } from "@/server/db"

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: env.BETTER_AUTH_GOOGLE_CLIENT_ID,
      clientSecret: env.BETTER_AUTH_GOOGLE_CLIENT_SECRET,
    },
  },
  plugins: [
    admin(),
    phoneNumber({
      // Configure SMS sending function - you'll need to implement this with your SMS provider
      sendOTP: async ({ phoneNumber, code }) => {
        // TODO: Implement SMS sending logic with your preferred provider (e.g., Twilio, AWS SNS)
        console.log(`Sending OTP ${code} to ${phoneNumber}`)
      },
    }),
    username({
      // Optional: Configure username validation
      usernameValidator: (username) =>
        username.length >= 6 && username.length <= 20,
    }),
    haveIBeenPwned({
      // Optional: Customize error message for compromised passwords
      customPasswordCompromisedMessage:
        "This password has been compromised. Please choose a more secure password.",
    }),
  ],
})

export type Session = typeof auth.$Infer.Session
