import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export default async function postHandler(req: NextApiRequest, res: NextApiResponse) {
    
}