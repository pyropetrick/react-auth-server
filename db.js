import {Sequelize} from 'sequelize';

const DB_NAME = 'railway';
const DB_USER = 'postgres';
const DB_PASSWORD = 'FldUVnJNGBkP98u1OCAp';
const options = {
  dialect: 'postgres',
  host: 'containers-us-west-135.railway.app',
  port: '6641',
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