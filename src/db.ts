import { Client } from "pg";

export const pgClient = new Client({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "12345678",
});
export const connextDB = async () => {
  await pgClient.connect();
  return pgClient;
};
