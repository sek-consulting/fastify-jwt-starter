import { DataSource } from "typeorm";

const db = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: ["dist/entities/*.{js,ts}"],
  logging: ["error", "query"],
});

db.initialize()
  .then(() => {
    // do stuff
  })
  .catch((error) => console.log(error));

export { db };
