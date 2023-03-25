import { useEffect, useState } from "react"
import styling from "../../styles/NewUser.module.css"
import Link from "next/link"

export default function NewUser() {
    const [isLoggedIn, setState] = useState(false)



    return (
        <div className={styling.mainDiv}>
            <form action="/api/NewUser" method="POST" className={styling.form}>
                <h1 className={styling.h1}>Space Social<span className={styling.span}>Signup</span></h1>
                <div className={styling.name}>
                    <input type="text" name="first_n" id="first_n" placeholder="First Name"/>
                    <input type="text" name="last_n" id="last_n" placeholder="Last Name" />
                </div>
                <input type="text" name="newUsername" id="newUsername" placeholder="Enter username" />
                <input type="email" name="newEmail" id="newEmail" placeholder="Enter email"/>
                <input type="password" name="newPassword" id="newPassword" placeholder="Enter password"/>
                <div>
                    <input type="submit" value={"Sign Up"} className={styling.submit}/>
                    <Link href={"/"}>
                        <button value={"Sign Up"} className={styling.submit}>Go Back</button>
                    </Link>
                </div>
            </form>


            <div>
                
            </div>
        </div>
    )
}