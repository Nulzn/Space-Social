import React, { useEffect, useState } from "react"
import styling from "../styles/Settings.module.css"
import {IoMoonSharp, IoSunnySharp} from "react-icons/io5"

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
        <div>
            <div className={styling.mainDiv}>
                <h1>Space Social<span className={styling.span}>Settings</span></h1>
                <form action="/api/Settings" method="POST">

                    <div>
                        <input type="text" placeholder="Change username" className={styling.inputField} />
                    </div>

                    <div className={styling.themeSection}>
                        <p>Theme: </p>
                        <span><IoSunnySharp className={styling.themeIcon}/></span>
                    </div>

                    <div>
                        <input type="password" placeholder="Confirm Password" className={styling.inputField}/>
                    </div>

                    <div>
                        <button className={styling.applyChangesButton}>Apply Changes</button>
                    </div>
                    
                    <div>
                        <button className={styling.deleteAccountButton}>Delete Account</button>
                    </div>
                </form>
            </div>
        </div>
    )
}