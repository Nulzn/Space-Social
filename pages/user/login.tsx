import styling from "../../styles/Login.module.css"
import Link from "next/link"
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import * as CSS from "csstype"

interface LoginResponse {
    success: boolean;
    message?: string;
}

export default function LoginUser() {

    const router = useRouter()
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);

    const [invalidCredentials, setInvalidCredentials] = useState<any>()

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('/api/LoginUser', {
            method: 'POST',
            body: JSON.stringify({ loginEmail, loginPassword }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //const data: LoginResponse = await response.json();

        if (response.status === 401) {
            console.log("Something went wrong")
            setErrorMessage(true);
        } else if (response.status == 200) {
            router.push("/")
        }

        //router.push("/")
    };

    useEffect(() => {
        const invalidCredentials: React.CSSProperties = {
            visibility: errorMessage ? "visible" : "hidden"
        } as { visibility: CSS.Property.Visibility }

        setInvalidCredentials(invalidCredentials)
    }, [errorMessage])



    return (
        <div>
            <div className={styling.mainDiv}>
                <form onSubmit={handleFormSubmit} className={styling.form}>
                    <h1 className={styling.h1}>Space Social<span className={styling.span}>Login</span></h1>

                    <input type="email" placeholder="Email" className={styling.email} onChange={(event) => setLoginEmail(event.target.value)}/>
                    <input type="password" placeholder="Password" className={styling.password} onChange={(event) => setLoginPassword(event.target.value)}/>

                    <small className={styling.invalidInfo} style={invalidCredentials}>Incorrect password. Try again.</small>
                    <Link href={"/password/reset"} className={styling.forgotPassword}>
                        Forgot password?
                    </Link>
                    <input type="submit" value={"Login"} className={styling.submit}/>
                </form>
            </div>
        </div>
    )
}