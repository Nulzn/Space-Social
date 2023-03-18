import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { argon2id, argon2Verify } from "hash-wasm"
import { error } from "console";

export default async function userHandlerLogin(req: NextApiRequest, res: NextApiResponse) {
    const salt = new Uint8Array(16)
    crypto.getRandomValues(salt)

    console.log("Default Pass:", req.body.loginPassword)

    const key = await argon2id({
        password: req.body.loginPassword,
        salt,
        parallelism: 1,
        iterations: 256,
        memorySize: 512,
        hashLength: 32,
        outputType: 'encoded'
    })

    async function VerifyUser() {
        const info = await prisma.user.findFirst({
            where: {
                password: req.body.loginPassword
            }
        })

        console.log(info)

        //console.log("Info Pass: ", info?.password)

        /*const isValid = await argon2Verify({
            password: info?.password,
            hash: key
        })

        console.log(isValid)
        return (isValid) ? true : false*/

        if (info?.password) {
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