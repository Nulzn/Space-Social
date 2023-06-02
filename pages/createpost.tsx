import styling from "../styles/CreatePost.module.css"
import Link from "next/link"
import { IoRocketSharp, IoHomeSharp, IoSettingsSharp, IoNotificationsSharp, IoPlanetSharp, IoAddCircleSharp } from "react-icons/io5"

export default function createPost() {
    return (
        <div className={styling.mainDiv}>
            <div className={styling.secondDiv}>
                <form action="/api/posts/create" method="POST" className={styling.form}>

                    <label htmlFor="">Title</label>
                    <input type="text" className={styling.titleInput}/>

                    <div>
                        <div>

                        </div>
                        <div>
                            <label htmlFor="">Content</label>
                            <textarea name="" id="" cols={70} rows={10} className={styling.textArea}></textarea>
                        </div>
                    </div>

                    <label htmlFor="">Upload Image</label>
                    <input type="file" className={styling.fileInput}/>

                    <button className={styling.createPostButton}>Create</button>
                </form>

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