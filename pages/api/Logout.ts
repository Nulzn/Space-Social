import { NextApiRequest, NextApiResponse } from "next";

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
    res.setHeader(
        'Set-Cookie',
        ['sessionToken=; Max-Age=0']
    )
    res.status(200).end()
}