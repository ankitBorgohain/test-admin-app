import express from 'express';
import { deleteMessage, deleteUserById, getAllServices, getAllUsers, getMessages, getUserById, updateUserById } from '../controllers/adminController';
import authMiddleware from '../middlewares/auth-middleware';
import adminMiddleware from '../middlewares/admin-middleware';

const router = express.Router();


router.get('/users', authMiddleware, adminMiddleware, getAllUsers)

router.get('/users/:id', authMiddleware, adminMiddleware, getUserById)

router.patch('/users/update/:id', authMiddleware, adminMiddleware, updateUserById)

router.delete('/users/delete/:id', authMiddleware, adminMiddleware, deleteUserById)

router.get('/message', authMiddleware,adminMiddleware, getMessages)
router.delete('/message/delete/:id', authMiddleware,adminMiddleware, deleteMessage)

router.get('/services', authMiddleware, adminMiddleware, getAllServices)




export default router;