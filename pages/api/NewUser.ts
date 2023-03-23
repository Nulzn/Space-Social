import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { argon2id } from "hash-wasm";

export default async function userHandlerCreate(req: NextApiRequest, res: NextApiResponse) {
    const salt = new Uint8Array(16)

    console.log("Default Pass: ", req.body.newPassword)

    const key = await argon2id({
        password: req.body.newPassword,
        salt,
        parallelism: 1,
        iterations: 256,
        memorySize: 512,
        hashLength: 32,
        outputType: 'hex'
    })

    console.log("Hash Key: ", key)
    
    async function StoreUser() {
        const user: any = await prisma.user.create({
            data: {
                first_name: req.body.first_n,
                last_name: req.body.last_n,
                username: req.body.newUsername,
                email: req.body.newEmail,
                salt: Buffer.from(salt),
                password: key
            }
        })

        console.log(user)
    }

    StoreUser().then(async() => {
        await prisma.$disconnect()
        res.status(200).json({Status: true})
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        res.status(200).json({Status: false})
    })
}