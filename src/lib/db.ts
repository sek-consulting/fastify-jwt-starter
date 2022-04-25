import { DataSource } from "typeorm";

const db = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["build/entities/*.{js,ts}"],
  logging: ["error", "query"],
});

db.initialize()
  .then(() => {
    console.log("DataSource has been initialized!");
  })
  .catch((err) => {
    console.log("Error during DataSource initialization", err);
  });

const rawQuery = async (query: string, parameters?: any[]): Promise<any> => {
  return await db.manager.query(query, parameters);
};

export { db, rawQuery };
