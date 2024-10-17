import express from  'express';
import { userSignUp, userLogIn, getAllUsers } from '../controller/user-controller.js';


const router = express.Router();

//login & signup
router.post('/signup', userSignUp);
router.post('/signIn', userLogIn);
router.get('/getUser', getAllUsers);

export default router;