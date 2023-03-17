import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { argon2id } from "hash-wasm"

export default async function(req: NextApiRequest, res: NextApiResponse) {
    
}