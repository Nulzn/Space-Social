import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { argon2Verify, argon2id } from "hash-wasm";

export default async function settingsHandler(req: NextApiRequest, res: NextApiResponse) {

    async function HandleSettings() {

        const token = req.cookies.sessionToken

        console.log("Token:", token)

        if (!token) { return res.status(401) }

        const mainToken = token.split(".")[1]
        const payload: any = JSON.parse(Buffer.from(mainToken, "base64").toString("ascii"))

        console.log("Payload:", payload.email)
        console.log("Request Body Password:", req.body.formPassword)
        
        const timeNow = Math.floor(Date.now() / 1000)
        if (payload.exp && payload.exp < timeNow) { res.status(401).end() }

        try {
            const info: any = await prisma.user.findUnique({
                where: {
                    email: payload.email
                }
            })

            const salt: any = info?.salt

            const key = await argon2id({
                password: req.body.formPassword,
                salt,
                parallelism: 1,
                iterations: 256,
                memorySize: 512,
                hashLength: 32,
                outputType: 'hex'
            })

            if (key != info?.password) { res.status(401).end() } // Set the <p> Wrong password <p> to Visible

            const update = await prisma.user.update({
                where: {
                    email: payload.email,
                },
                data: {
                    username: req.body.formUsername
                }
            })

            // Code below will get executed if the email and password were correct
            res.redirect("/")
        } catch (err) {
            console.error("Error:", err)
            res.status(401).end()
        }
    }

    HandleSettings().then(async() => {

        await prisma.$disconnect()
    }).catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
    })
}