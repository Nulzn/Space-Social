import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { argon2id } from "hash-wasm"

export default async function userHandler(req: NextApiRequest, res: NextApiResponse) {
    const salt = new Uint8Array(16)
    window.crypto.getRandomValues(salt)

    const key: any = await argon2id({
        password: req.body.newPassword.toString(),
        salt,
        parallelism: 1,
        iterations: 256,
        memorySize: 512,
        hashLength: 32,
        outputType: 'encoded'
    })

    console.log(`Derived key: ${key}`)
    
    
    async function StoreUser() {
        const user: any = await prisma.user.create({
            data: {
                first_name: req.body.first_n.toString(),
                last_name: req.body.last_n.toString(),
                email: req.body.newEmail.toString(),
                password: key
            }
        })
    }

    StoreUser().then(async() => {
        await prisma.$disconnect()
        res.status(200).json({HashedKey: key})
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
        res.status(404).json({Status: false})
    })
}