declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      PORT: number;

      JWT_SECRET: string;
      ACCESS_EXP: string | number;
      REFRESH_EXP: string | number;

      DATABASE_URL: string;
    }
  }
}
export {};
