import styling from "../styles/Home.module.css"
import Link from "next/link"
import { IoRocketSharp, IoHomeSharp, IoSettingsSharp, IoNotificationsSharp, IoPlanetSharp } from "react-icons/io5"
import { GetStaticProps } from "next"


export const getStaticProps: GetStaticProps = async() => {
  return {
    props: {
      
    }
  }
}

export default function Home() {
  return (
    <>
      <div>
        <div className={styling.navbar}>
          <h1 className={styling.h1}>Space Social <IoRocketSharp className={styling.rocketSharpIcon}/></h1>
          <div>
            <Link href={"/user/new"}>
              <button className={styling.signUp}>Sign Up</button>
            </Link>
            
            <Link href={"/user/login"}>
                <button className={styling.signIn}>Sign In</button>
            </Link>
          </div>
        </div>


        <div className={styling.sidebar}>
          <Link href={"/"} className={styling.sidebarLink}>
            <button>Home <IoHomeSharp className={styling.HomeIcon}/></button>
          </Link>
          <Link href={"/notifications"} className={styling.sidebarLink}>
            <button>Notifications <IoNotificationsSharp className={styling.NotificationsIcon}/></button>
          </Link>
          <Link href={"/settings"} className={styling.sidebarLink}>
            <button>Settings <IoSettingsSharp className={styling.SettingsIcon}/></button>
          </Link>
          <Link href={"/spaceinfo"} className={styling.sidebarLink}>
            <button>Space Info <IoPlanetSharp className={styling.PlanetsIcon}/></button>
          </Link>
        </div>
      </div>
    </>
  )
}
