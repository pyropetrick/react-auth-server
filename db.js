import {Sequelize} from 'sequelize';

const DB_NAME = 'railway';
const DB_USER = 'postgres';
const DB_PASSWORD = 'stCrnL6ptmSHt2M1T2VC';
const options = {
  dialect: 'postgres',
  host: 'containers-us-west-129.railway.app',
  port: '5756',
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