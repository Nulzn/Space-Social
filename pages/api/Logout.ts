import { NextApiRequest, NextApiResponse } from "next";
import Cookies from "js-cookie";

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
    Cookies.remove("sessionToken")
    res.status(200).end()
}