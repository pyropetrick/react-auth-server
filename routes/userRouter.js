import {Router} from "express";
import {
  blockUser,
  check,
  deleteUser,
  getUsers,
  login,
  logout,
  registration,
  unblockUser
} from "../controllers/userController.js";
import {auth} from "../middleware/authMiddleWare.js";

const router = new Router();

router.post('/user/registration', registration);
router.post('/user/login', login);
router.get('/user/auth', auth, check);
router.get('/users', getUsers);
router.put('/user/block', blockUser);
router.put('/user/unblock', unblockUser);
router.delete('/user/delete', deleteUser);
router.put('/user/logout', logout)

export default router;