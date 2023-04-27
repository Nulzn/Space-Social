import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    const user = await prisma.user.findUnique({
        where: {
            email: "nils.ritze@icloud.com" // Change this later
        },
        include: {
            posts: true
        }
    })

    const updateUser = await prisma.user.update({
        where: {
            email: "nils.ritze@icloud.com" // Change this later
        },
        data: {
            posts: {
                connect: { id: newPost.id }
            }
        }
    })
}