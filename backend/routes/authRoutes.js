import express from 'express'

const router = express.Router()

import { deleteUser, editUser,getAllUsers, getUser, userLogin } from '../controllers/authController.js';

router.post('/login', userLogin)
router.get('/users', getAllUsers)
router.get('/users/:id', getUser)
router.delete('/delete_user/:id', deleteUser)
router.put('/edit/:id', editUser)
export { router as userRouter }

