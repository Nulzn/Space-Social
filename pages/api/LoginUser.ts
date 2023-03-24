import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { argon2Verify, argon2id } from "hash-wasm";
import jwt from "jsonwebtoken"
import cookies from "cookie";

export default async function userHandlerLogin(req: NextApiRequest, res: NextApiResponse) {

    async function VerifyUser() {
        const info: any = await prisma.user.findUnique({
            where: {
                email: req.body.loginEmail
            }
        })

        const salt: any = info?.salt

        const key = await argon2id({
            password: req.body.loginPassword,
            salt,
            parallelism: 1,
            iterations: 256,
            memorySize: 512,
            hashLength: 32,
            outputType: 'hex'
        })

        if (key == info?.password) {

            const sessionToken = jwt.sign({userId: info.id, username: info.username, email: info.email}, process.env.JWT_SECRET as string, {
                expiresIn: '1d',
            })
            
            res.setHeader('Set-Cookie', cookies.serialize('sessionToken', sessionToken, {
                httpOnly: false,
                maxAge: 60 * 60, // 1 Hour
                path: '/',
            }))

            return res.redirect("/")
            
        }
        else {
            return res.status(200).json({successfulLogin: false})
        }
    }

    VerifyUser().then(async() => {

        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })
}