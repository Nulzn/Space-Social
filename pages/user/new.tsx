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
                    <div className={styling.firstName}>
                        <label htmlFor="">First Name</label>
                        <input type="text" name="first_n" id="first_n"/>
                    </div>
                    <div className={styling.lastName}>
                        <label htmlFor="">Last Name</label>
                        <input type="text" name="last_n" id="last_n" />
                    </div>
                </div>
                <div className={styling.newUser}>
                    <label htmlFor="">New Username</label>
                    <input type="text" name="newUsername" id="newUsername" />
                </div>
                <div className={styling.newEmail}>
                    <label htmlFor="">New Email</label>
                    <input type="email" name="newEmail" id="newEmail"/>
                </div>
                <div className={styling.newPassword}>
                    <label htmlFor="">New Password</label>
                    <input type="password" name="newPassword" id="newPassword"/>
                </div>

                <div className={styling.agreeTermsAndService}>
                    <input type="checkbox" />
                    <p>Agree to the <Link className={styling.linkToTerms} href={"/policy/termsandservice"}>Terms & Service</Link></p>
                </div>

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