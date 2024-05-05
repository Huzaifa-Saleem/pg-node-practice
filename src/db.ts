import { Client } from "pg";

export const connextDB = async () => {
  const client = new Client({
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "12345678",
  });
  await client.connect();
  return client;
};
