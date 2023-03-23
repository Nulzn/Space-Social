import { NextApiRequest, NextApiResponse } from "next";

const secretKey = process.env.JWT_SECRET as string

export default function secretKeyHandler(req: NextApiRequest, res: NextApiResponse) {
    res.send({ secretKey })
}