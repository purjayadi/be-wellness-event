require('dotenv').config();

const isTest = process.env.NODE_ENV === 'test';
const dbName = isTest ? (process.env.TEST_DB_NAME) : (process.env.DB_NAME); 

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres'
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres'
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: dbName,
    host: process.env.DB_HOST,
    port: 5432,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
          require: true,
          rejectUnauthorized: false
      }
    }
  }
};