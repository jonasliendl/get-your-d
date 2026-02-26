# Project context
Get your D is a healthcare application focusing on the aspect of vitamin D. Part of this application for example is a calculator calculating the daily dosis of Vitamin D supplements a user with a vitamin D deficiency has to take.
The primary goal is to give users an overview of how vitamin D affects their health and how they can be more healthy by taking vitamin D supplements or balance their intake.

## Tech Context
- Shadcn/ui and tailwindcss are used for styling
- Next.js is used for server-side rendering (SSR)
- Client components should be minimal (for better SEO)
- SEO optimizations should always be checked and implemented
- TypeScript is used for type safety. Inputs, outputs, etc. need to be types and the `any` type is prohibited

## Features
- Vitamin D daily dosis calculator (over 30 days)
- Information about vitamin D and health aspects

## Commands
- `npm run dev` - Starts the website in dev mode. Dev mode means the website is recompiled whenever a change to the codebase happens
- `npm run build` - Creates a production-ready build
- `npm run start` - Starts the website normally, not in dev mode, meaning no refresh.
- `npm run lint` - Runs ESLint to flag code against the set rules
