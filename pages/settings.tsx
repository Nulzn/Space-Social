import React, { useEffect, useState } from "react"
import styling from "../styles/Settings.module.css"
import { IoRocketSharp, IoHomeSharp, IoSettingsSharp, IoNotificationsSharp, IoPlanetSharp, IoAddCircleSharp } from "react-icons/io5"
import Link from "next/link"

export default function Settings() {


    useEffect(() => {
        fetch("/api/settings")
        .then(response => {
            if (response.ok) {
                return;
            } else {
                /*var wrongPassword: any = document.getElementById("confirmWrongPassword")
                wrongPassword.style.visibility = "Hidden"*/
            }
        })
    }, [])


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


            <div className={styling.mainDiv}>
                <h1>Space Social<span className={styling.span}>Settings</span></h1>
                <form action="/api/Settings" method="POST">

                    <div className={styling.newUsername}>
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder="" className={styling.inputField} />
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
                        <input type="password" className={styling.inputField}/>
                    </div>

                    <div>
                        <button className={styling.applyChangesButton}>Apply Changes</button>
                        <button className={styling.deleteAccountButton}>Delete Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}