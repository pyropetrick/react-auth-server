import {ApiError} from "../error/apiError.js";
import {User} from "../models/models.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {v4} from 'uuid';

const generateJwt = (id, status) => jwt.sign({id, status}, process.env.SECRET_KEY, {
  expiresIn: '24h'
});

export const registration = async (req, res, next) => {
  const {name, lastname, email, username, password} = req.body;
  if (!email || !username || !password) {
    return next(ApiError.badRequest('Invalid data about user'))
  }
  const candidate = await User.findOne({where: {username}});
  if (candidate) {
    return next(ApiError.badRequest('Invalid email or username'));
  }
  const hashPassword = await bcrypt.hash(password, 5);
  const date = new Date;
  const user = await User.create({
    id: v4(),
    name,
    lastname,
    email,
    dateregistration: date.toLocaleString(),
    lastlogin: date.toLocaleString(),
    status: 'offline',
    password: hashPassword,
    username
  });
  const token = generateJwt(user.id, 'offline');
  return res.json({token})
}

export const login = async (req, res, next) => {
  const {username, password} = req.body;
  const user = await User.findOne({where: {username}})
  if (!user) {
    return next(ApiError.badRequest('User not found'))
  }
  if (user.status === 'blocked') {
    return next(ApiError.badRequest('User is blocked'))
  }
  const comparePassword = bcrypt.compareSync(password, user.password);
  if (!comparePassword) {
    return next(ApiError.badRequest('Password or username not correct'))
  }
  const token = generateJwt(user.id, user.status);
  return res.json({token})
}

export const check = async (req, res, next) => {
  const user = await User.findOne({where: {id: req.user.id}});
  if (user.status === 'blocked') {
    return next(ApiError.badRequest('User is blocked'))
  }
  user.status = 'online';
  const date = new Date();
  user.lastlogin = date.toLocaleString();
  await user.save();
  const token = generateJwt(req.user.id, req.user.email, req.user.username);
  return res.json({token});
}

export const getUsers = async (req, res) => {
  const users = await User.findAll({attributes: {exclude: ['username', 'password']}});
  return res.json({users})
}

export const deleteUser = async (req, res) => {
  const users = await User.destroy({where: {id: [...req.query.usersId]}});

  return res.json({users})
}
export const blockUser = async (req, res) => {
  const users = await User.findAll({
    where: {id: [...req.body.usersId]},
    attributes: {exclude: ['username', 'password']}
  });
  users.forEach(user => {
    user.status = 'blocked'
    user.save();
  })
  return res.json({users})
}
export const unblockUser = async (req, res) => {
  const users = await User.findAll({
    where: {id: [...req.body.usersId]},
    attributes: {exclude: ['username', 'password']}
  });
  users.forEach(user => {
    user.status = 'offline'
    user.save()
  });
  return res.json({users})
}
export const logout = async (req, res) => {
  const users = await User.findAll({
    where: {id: [...req.body.usersId]},
    attributes: {exclude: ['username', 'password']}
  });
  users.forEach(user => {
    if (user.status === 'blocked') {
      return res.json({message: 'You are blocked'});
    }
    user.status = 'offline';
    user.save();
  })
  return res.json({message: 'Logout is success'});
}
