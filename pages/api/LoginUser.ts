import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { argon2Verify, argon2id } from "hash-wasm";
import { sign } from "jsonwebtoken"

export default async function userHandlerLogin(req: NextApiRequest, res: NextApiResponse) {
    
    async function VerifyUser() {
        const info: any = await prisma.user.findUnique({
            where: {
                email: req.body.loginEmail
            }
        })

        console.log(info)

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
            const sessionToken = sign({ userId: info?.id }, process.env.JWT_SECRET, {
                expiresIn: '1d',
            })
            res.redirect(302, "/")
        }
        else {
            res.status(200).json({successfulLogin: false})
        }
    }

    VerifyUser().then(async() => {

        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })
}