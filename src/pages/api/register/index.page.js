import nc from "next-connect"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import {prisma} from "@/services/prisma"
import validateMethod from "@/middlewares/validateMethod"
import {registerSchema} from "@/schema"

const register = async (req, res) => {
    try{
        const validationResult = await registerSchema.validateAsync(req.body)
        const userExist = await prisma.user.findUnique({
            where: {email: validationResult.email},
        })

        if (userExist) return res.status(400).json({data: 'Email has already taken'})

        validationResult.password = await bcrypt.hash(validationResult.password, 12)
        const user = await prisma.user.create({
            data: validationResult,
        })

        const {password, ...result} = user
        const token = jwt.sign({ id: result.id, email: result.email}, process.env.JWT_SECRET, {expiresIn: "2h"})

        res.status(201).json({user:{...result}, token})
    }catch (err){
        res.status(500).json({ data: err.message })
    }
}

const handler = nc()
    .use(validateMethod(["POST"]))
    .post(register)

export default handler