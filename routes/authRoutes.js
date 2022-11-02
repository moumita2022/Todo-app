import express from 'express';

const router = express.Router();
import {signinController,registerController} from '../controllers/authController.js';

router.post("/signin",signinController)
router.post("/register",registerController)

export default router;