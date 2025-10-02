import { Router } from 'express';
import { body } from 'express-validator'
import { createAccount, getUser, login } from './handlers';
import { hanldeInputError } from './middleware/validation';
import { authenticate } from './middleware/auth';

const router = Router();

// Authentication and registry
router.post('/auth/register',
    body('handle')
        .notEmpty()
        .withMessage('El handle no puede ir vacio'),
    body('name')
        .notEmpty()
        .withMessage('El nombre no puede ir vacio'),
    body('email')
        .isEmail()
        .withMessage('El email no es valido'),
    body('password')
        .notEmpty()
        .withMessage('La constraseña no puede ir vacia')
        .isLength({ min: 8 })
        .withMessage('La constraseña debe contener al menos 8 caracteres'),
    hanldeInputError,
    createAccount
);

router.post('/auth/login',
    body('email')
        .isEmail()
        .withMessage('El email no es valido'),
    body('password')
        .notEmpty()
        .withMessage('La contraseña es obligatoria'),
    hanldeInputError,
    login
)

router.get('/user',
    authenticate,
    getUser
)

export default router;