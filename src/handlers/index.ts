import { Request, Response } from 'express';
import slug from 'slug'
import User from "../models/User"
import { hashPassword } from '../utils/auth';
import { validationResult } from 'express-validator';

export const createAccount = async (req: Request, res: Response) => {

    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body
    const userExist = await User.findOne({email})

    if(userExist){
        const error = new Error("El usuario ya ha sido registrado anteriormente con el mismo email")
        return res.status(409).json({error: error.message})
    }

    const handle = slug(req.body.handle, '')
    const handleExist = await User.findOne({handle})
        if(handleExist){
        const error = new Error("El usuario ya ha sido registrado anteriormente con el mismo handle")
        return res.status(409).json({error: error.message})
    }
    
    const user = new User(req.body)
    user.password = await hashPassword(password)
    user.handle = handle

    await user.save()
    res.status(201).send("Registro creado correctamente")
}