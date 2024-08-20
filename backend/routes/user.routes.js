import express from 'express';
import { getAllUsers, login, logout, register, updateProfile } from '../controllers/user.controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { singleUpload } from '../middlewares/multer.js';

const router = express.Router();

router.route("/register").post(singleUpload, register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/").get(getAllUsers);
router.route("/profile/update").put(isAuthenticated ,updateProfile);

export default router;