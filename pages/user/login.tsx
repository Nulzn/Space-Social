import styling from "../../styles/Login.module.css"
import Link from "next/link"

export default function LoginUser() {
    return (
        <div>
            <div className={styling.mainDiv}>
                <form action="/api/LoginUser" method="POST" className={styling.form}>
                    <h1 className={styling.h1}>Space Social<span className={styling.span}>Login</span></h1>
                    <input type="email" name="loginEmail" id="loginEmail" placeholder="Email" className={styling.email} />
                    <input type="password" name="loginPassword" id="loginPassword" placeholder="Password" className={styling.password}/>
                    <Link href={"/password/reset"} className={styling.forgotPassword}>
                        Forgot password?
                    </Link>
                    <input type="submit" value={"Login"} className={styling.submit}/>
                </form>
            </div>
        </div>
    )
}