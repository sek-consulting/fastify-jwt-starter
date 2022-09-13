declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";

      PORT: number;

      JWT_SECRET: string;

      DB_HOST: string;
      DB_PORT: number;
      DB_USER: string;
      DB_PASS: string;
      DB_DATABASE: string;
    }
  }
}

export {};
