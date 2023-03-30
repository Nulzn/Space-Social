import { NextApiRequest, NextApiResponse } from "next";
import cookies from "cookies"

export default function logoutHandler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const cookieInstance = new cookies(req, res);
        cookieInstance.set("sessionToken", "", { expires: new Date(0) })
        res.status(200).end()
    } catch(err) {
        console.error("Error while trying to logout! ", err)
        res.status(500).end()
    }
    
}