import db from '../db.js';
import {DataTypes} from 'sequelize';

export const User = db.define('users', {
  id: {type: DataTypes.UUIDV4, primaryKey: true},
  name: {type: DataTypes.STRING},
  lastname: {type: DataTypes.STRING},
  dateregistration: {type: DataTypes.STRING},
  lastlogin: {type: DataTypes.STRING},
  status: {type: DataTypes.ENUM('blocked', 'online', 'offline')},
  email: {type: DataTypes.STRING, unique: true},
  username: {type: DataTypes.STRING, unique: true},
  password: {type: DataTypes.STRING},
})