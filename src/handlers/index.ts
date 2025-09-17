import { Request, Response } from 'express';
import slug from 'slug'
import User from "../models/User"
import { checkPassword, hashPassword } from '../utils/auth';
import { generateJWT } from '../utils/jwt';

export const createAccount = async (req: Request, res: Response) => {


    const { email, password } = req.body
    const userExist = await User.findOne({ email })
    if (userExist) {
        const error = new Error("El usuario ya ha sido registrado anteriormente con el mismo email")
        return res.status(409).json({ error: error.message })
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({ handle })
    if (handleExist) {
        const error = new Error("El usuario ya ha sido registrado anteriormente con el mismo handle")
        return res.status(409).json({ error: error.message })
    }

    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()
    res.status(201).send("Registro creado correctamente")
}

export const login = async (req: Request, res: Response) => {

    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
        const error = new Error("El usuario no existe")
        return res.status(404).json({ error: error.message })
    }

    const isPasswordCorrect = await checkPassword(password, user.password)
    if (!isPasswordCorrect) {
        const error = new Error("La constraseña es incorrecta")
        return res.status(401).json({ error: error.message })
    }
    
    const token = generateJWT({id: user._id})

    res.send(token)

}