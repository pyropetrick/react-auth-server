import {Sequelize} from 'sequelize';

const DB_NAME = 'auth';
const DB_USER = 'postgres';
const DB_PASSWORD = 'root';
const options = {
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  "define": {
    timestamps: false
  }
}

const db = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {...options}
);


export default db;