import React, { useEffect, useState } from "react"
import styling from "../styles/Settings.module.css"
import { IoRocketSharp, IoHomeSharp, IoSettingsSharp, IoNotificationsSharp, IoPlanetSharp, IoAddCircleSharp } from "react-icons/io5"
import Link from "next/link"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import * as CSS from "csstype"

export default function Settings() {
    const router = useRouter()

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")

    const [formPassword, setFormPassword] = useState("")
    const [formUsername, setFormUsername] = useState("")
    const [errorMessage, setErrorMessage] = useState(false)
    const [invalidCredentials, setInvalidCredentials] = useState<any>()

    const token = Cookies.get("sessionToken")
    useEffect(() => {

        if (!token) { return; }

        const mainToken = token.split(".")[1]
        const payload: any = JSON.parse(Buffer.from(mainToken, "base64").toString("ascii"))
        
        const timeNow = Math.floor(Date.now() / 1000)
        if (payload.exp && payload.exp < timeNow) {

            return;
        } else {
            setUsername(payload.username)
            setEmail(payload.email)
        }
    }, [token])

    const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const response = await fetch('/api/Settings', {
            method: 'POST',
            body: JSON.stringify({ formUsername, formPassword }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        //const data: LoginResponse = await response.json();

        if (response.status === 401) {
            setErrorMessage(true);
        } else if (response.status == 200) {
            router.push("/")
        }
    };

    useEffect(() => {
        const invalidCredentials: React.CSSProperties = {
            visibility: errorMessage ? "visible" : "hidden"
        } as { visibility: CSS.Property.Visibility }

        setInvalidCredentials(invalidCredentials)
    }, [errorMessage])


    return (
        <div className={styling.backgroundDiv}>
            <h1 className={styling.h1}>Space Social <IoRocketSharp className={styling.rocketSharpIcon}/></h1>
            <div className={styling.sidebar}>
                <Link href={"/"} className={styling.sidebarLink}>
                    <button className={styling.homeButton}>Home <IoHomeSharp className={styling.HomeIcon}/></button>
                </Link>
                <Link href={"/notifications"} className={styling.sidebarLink}>
                    <button>Notifications <IoNotificationsSharp className={styling.NotificationsIcon}/></button>
                </Link>
                <Link href={"/settings"} className={styling.sidebarLink}>
                    <button className={styling.settingsButton}>Settings <IoSettingsSharp className={styling.SettingsIcon}/></button>
                </Link>
                <Link href={"/spaceinfo"} className={styling.sidebarLink}>
                    <button className={styling.spaceInfoButton}>Space Info <IoPlanetSharp className={styling.PlanetsIcon}/></button>
                </Link>
            </div>

            <div className={styling.confirmDeletion}>
                <form className={styling.confirmDeletionForm}>
                    <h1>Delete Account</h1>
                    <p>Enter <b>{username}</b> to confirm</p>
                    <input type="text" className={styling.inputField} />

                    <label htmlFor="" className={styling.newUsername}>Confirm with your password</label>
                    <input type="password" className={styling.inputField} />

                    <button type="submit" className={styling.deleteAccountButton}>Confirm Delete</button>
                </form>
            </div>


            <div className={styling.mainDiv}>
                <h1>Space Social<span className={styling.span}>Settings</span></h1>
                <form onSubmit={handleFormSubmit}>

                    <div className={styling.newUsername}>
                        <label htmlFor="">Username</label>
                        <input type="text" id="confirmUsername" name="confirmUsername" placeholder={username} className={styling.inputField} onChange={(event) => setFormUsername(event.target.value)}/>
                    </div>

                    <div className={styling.newEmail}>
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder="" className={styling.inputField} value={email} readOnly/>
                    </div>

                    <div className={styling.themeSection}>
                        <label htmlFor="">Theme</label>
                        <select name="" id="">
                            <option value="">Light</option>
                            <option value="">Dark</option>
                        </select>
                    </div>

                    <div className={styling.confirmPassword}>
                        <label htmlFor="">Confirm with your password</label>
                        <input type="password" id="confirmPassword" name="confirmPassword" className={styling.inputField} onChange={(event) => setFormPassword(event.target.value)}/>
                    </div>

                    <small className={styling.invalidCred} style={invalidCredentials}>Incorrect password!</small>

                    <div>
                        <button className={styling.applyChangesButton} type="submit">Apply Changes</button>
                        <button className={styling.deleteAccountButton}>Delete Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}