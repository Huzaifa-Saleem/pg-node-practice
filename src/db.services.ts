import { pgClient } from "./db";

export class User {
  private client;
  constructor() {
    this.client = pgClient;
  }

  /**
   *
   * @returns res from the pg
   */
  async create() {
    const res = await this.client.query(`    
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP 
        );
    `);
    return res;
  }

  /**
   *
   * @param username
   * @param email
   * @param password
   * @returns res from the pg
   */
  async insert(username: string, email: string, password: string) {
    try {
      const res = await this.client.query(
        `
          INSERT INTO users (
              username,
              email,
              password
          ) VALUES (
              $1,
              $2,
              $3
          );
        `,
        [username, email, password]
      );
      return res;
    } catch (error) {
      throw error;
    }
  }

  /**
   *
   * @param username
   * @param email
   * @param password
   * @returns res from the pg
   */
  async update(username?: string, email?: string, password?: string) {
    try {
      const CLAUSE = [];
      const VALUES = [];
      if (username !== undefined) {
        CLAUSE.push("username = $");
        VALUES.push(username);
      }
      if (email !== undefined) {
        CLAUSE.push("email = $");
        VALUES.push(email);
      }
      if (password !== undefined) {
        CLAUSE.push("password = $");
        VALUES.push(password);
      }
      const res = await this.client.query(
        `UPDATE users SET ${CLAUSE.map((v, i) => v + (i + 1)).join(
          ","
        )}  WHERE id = 1
        ;`,
        VALUES
      );
      return res;
    } catch (error) {
      throw error;
    }
  }
}
