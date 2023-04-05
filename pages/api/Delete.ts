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

        const info = prisma.user.findUnique({
            where: {
                email: req.body.formEmail
            }
        })
    }

    VerifyUser().then(async() => {

    }).catch(async(e) => {
        res.status(401).end()
    })
}