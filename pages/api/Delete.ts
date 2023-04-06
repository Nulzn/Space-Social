import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { argon2Verify, argon2id } from "hash-wasm";

export default async function deleteHandler(req: NextApiRequest, res: NextApiResponse) {
    async function VerifyUser() 
    {

        const token: any = req.cookies.sessionToken

        if (!token) { res.status(401).end() }

        const mainToken = token.split(".")[1]
        const payload: any = JSON.parse(Buffer.from(mainToken, "base64").toString("ascii"))

        const info: any = await prisma.user.findUnique({
            where: {
                email: payload.email,
            }
        })

        const salt: any = info?.salt

        const key = await argon2id({
            password: req.body.confirmPassword,
            salt,
            parallelism: 1,
            iterations: 256,
            memorySize: 512,
            hashLength: 32,
            outputType: 'hex'
        })

        if (info?.password != key || info?.username != req.body.confirmUsername) { res.status(401).end() }

        const deleteUser = await prisma.user.delete({
            where: {
                username: req.body.confirmUsername
            }
        })
    }

    VerifyUser().then(async() => {
        await prisma.$disconnect
        res.status(200).end()
    }).catch(async(e) => {
        await prisma.$disconnect
        res.status(401).end()
    })
}