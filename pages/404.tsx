import styling from "../styles/Error.module.css"
import Image from "next/image"
import Nikocado from "../gifs/nic.gif"
import Link from "next/link"
import { IoRocketSharp, IoHomeSharp, IoSettingsSharp, IoNotificationsSharp, IoPlanetSharp, IoAddCircleSharp } from "react-icons/io5"

export default function Error() {
    return (
        <div className={styling.mainDiv}>
            <div>
                <h1>Space Social <IoRocketSharp/><span className={styling.span}>404</span></h1>
                <h3 className={styling.h3}>Page was not found.</h3>

                <ul className={styling.responsiveSidebar}>
                <Link href={"/"}>
                    <li><IoHomeSharp className={styling.HomeIcon}/></li>
                </Link>
                <Link href={"/notifications"}>
                    <li><IoNotificationsSharp className={styling.NotificationsIcon}/></li>
                </Link>
                <Link href={"/createpost"}>
                    <li><IoAddCircleSharp className={styling.createPostTitleIcon}/></li>
                </Link>
                <Link href={"/spaceinfo"}>
                    <li><IoPlanetSharp className={styling.PlanetsIcon}/></li>
                </Link>
                <Link href={"/settings"}>
                    <li><IoSettingsSharp className={styling.SettingsIcon}/></li>
                </Link>
            </ul>
            </div>
        </div>
    )
}