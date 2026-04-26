import express from 'express';
import UserController from '../controllers/user.controller.js';

const router = express.Router();
const userController = new UserController();

// GET /api/usuarios
router.get('/', userController.getUsers.bind(userController));

// GET /api/usuarios/:id
router.get('/:id', userController.getUserById.bind(userController));

// POST /api/usuarios
router.post('/', userController.createUser.bind(userController));

// POST /api/usuarios/login
router.post('/login', userController.login.bind(userController));

// PUT /api/usuarios/:id
router.put('/:id', userController.updateUser.bind(userController));

// DELETE /api/usuarios/:id
router.delete('/:id', userController.deleteUser.bind(userController));

export default router;
