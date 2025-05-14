// types/env.d.ts

declare namespace NodeJS {
  interface ProcessEnv {
    // Next.js runtime environment
    NODE_ENV: "development" | "production" | "test";

    API_URL: "http://localhost:3000";
  }
}
