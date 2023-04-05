import styling from "../styles/Home.module.css"
import Link from "next/link"
import { IoRocketSharp, IoHomeSharp, IoSettingsSharp, IoNotificationsSharp, IoPlanetSharp, IoAddCircleSharp } from "react-icons/io5"
import Image from "next/image"
import ProfilePic from "../Pictures/profile.jpg"
import { useEffect, useMemo, useState } from "react"
import Cookies from "js-cookie"
import { useRouter } from "next/router"
import * as CSS from "csstype"
import axios from "axios"

export default function Home() {

  const router = useRouter()

  const [newPostState, setNewPostState] = useState(false)
  const [loggedInState, setLoggedInState] = useState(false)

  const [loggedInVisibility, setLoggedInVisibility] = useState<any>()
  const [loginOptionsVisibility, setLoginOptionsVisibility] = useState<any>()

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")

  // Enabled / Disables the Create Post Frame
  useEffect(() => {
    let elem: any = document.getElementById("createPostFrame")
    elem.style.visibility = (newPostState) ? "Visible" : "Hidden"
  }, [newPostState])

  useEffect(() => {

    const loggedInVisibility: React.CSSProperties = {
      visibility: loggedInState ? "visible" : "hidden"
    } as { visibility: CSS.Property.Visibility }

    const loginOptionsVisibility: React.CSSProperties = {
      visibility: loggedInState ? "hidden" : "visible"
    } as { visibility: CSS.Property.Visibility }

    setLoggedInVisibility(loggedInVisibility)
    setLoginOptionsVisibility(loginOptionsVisibility)

  }, [loggedInState])

  const token = Cookies.get("sessionToken")
  useEffect(() => {

    if (!token)
    {
      return;
    }

    const mainToken = token.split(".")[1]
    const payload: any = JSON.parse(Buffer.from(mainToken, "base64").toString("ascii"))
    
    const timeNow = Math.floor(Date.now() / 1000)
    if (payload.exp && payload.exp < timeNow) {
      if (!loggedInState) { return; }
      
      setLoggedInState(false)
      return;
    } else {
      setUsername(payload.username)
      setEmail(payload.email)
      setLoggedInState(true)
    }

    router.push("/")
  }, [token])

  async function handleLogout() {
    const response = await fetch("/api/Logout", {
      method: "POST",
      credentials: "include"
    })

    if (response.ok) {
      console.log("Logout successful")
      setLoggedInState(false)

      router.push("/")
    } else {
      console.log("Error, something went wrong while trying to logout")
    }
  }

  async function createPost(postData: { title: string, content: string}, sessionKey: string) {
    try {
      const axiosInstance = axios.create({
        headers: {
          Authorization: `Bearer ${sessionKey}`
        }
      })

      const response = await axiosInstance.post("/api/create", axiosInstance)

      return response.data
      
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <>
      <div>
        <div className={styling.navbar}>
          <h1 className={styling.h1}>Space Social <IoRocketSharp className={styling.rocketSharpIcon}/></h1>


          <form action="/api/posts/create" method="POST" className={styling.createPostFrame} id="createPostFrame">
            <h3 className={styling.createPostTitle}>Create a new post <IoAddCircleSharp className={styling.createPostTitleIcon}/></h3>
            <input type="text" placeholder="Title" className={styling.postFrameTitle}/>
            <textarea name="" id="" cols={50} rows={5} placeholder="Text" className={styling.postFrameArea}></textarea>
            <input type="submit" value={"Post"} className={styling.postFrameSubmit} />
          </form>


          <div id="loginOptions" style={loginOptionsVisibility} className={styling.loginOptions}>
            <Link href={"/user/new"}>
              <button className={styling.signUp}>Sign Up</button>
            </Link>
            
            <Link href={"/user/login"}>
                <button className={styling.signIn}>Sign In</button>
            </Link>
          </div>


          <div className={styling.loggedInProfile} id="loggedInProfile" style={loggedInVisibility}>
              <Image 
                src={ProfilePic}
                alt="Monkey Family"
                width={40}
                height={40}
                className={styling.loggedInProfilePicture}
              />
              <p>{username}</p>
              <button onClick={() => handleLogout()}>Logout</button>
          </div>



        </div>


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
          <Link href={"/"} className={styling.sidebarLink}>
            <button onClick={() => setNewPostState(!newPostState)} className={styling.spaceInfoButton}>New Post<IoAddCircleSharp className={styling.PlanetsIcon}/></button>
          </Link>
        </div>


        <div className={styling.postFramePositioning}>
          <div className={styling.postFrame}>
              <Image 
                src={ProfilePic}
                alt="Monkey Family"
                width={60}
                height={60}
                className={styling.postProfile}
              />
              <div className={styling.postInfo}>
                <h2>Look at this exoplanet!</h2>
                <p>I saw this post, where they talked about how big this planet is! Amazing!</p>
                <small>Posted 2023-03-17 | 23:25 by Nulzn</small>
              </div>
              <div className={styling.upvoteFrame}>
                <IoRocketSharp className={styling.postUpvote}/>
                <small className={styling.upvoteCount}>25</small>
              </div>
          </div>





          <div className={styling.postFrame}>
              <Image 
                src={ProfilePic}
                alt="Monkey Family"
                width={60}
                height={60}
                className={styling.postProfile}
              />
              <div className={styling.postInfo}>
                <h2>Wow!</h2>
                <p>I saw this post on reddit, where they talked about how big this planet is!</p>
                <small>Posted 2023-03-17 | 23:25 by Nulzn</small>
              </div>
              <div className={styling.upvoteFrame}>
                <IoRocketSharp className={styling.postUpvote}/>
                <small className={styling.upvoteCount}>25</small>
              </div>
          </div>

          <div className={styling.postFrame}>
              <Image 
                src={ProfilePic}
                alt="Monkey Family"
                width={60}
                height={60}
                className={styling.postProfile}
              />
              <div className={styling.postInfo}>
                <h2>Cool!</h2>
                <p>I saw this post on reddit, where they talked about how big this planet is!</p>
                <small>Posted 2023-03-17 | 23:25 by Nulzn</small>
              </div>
              <div className={styling.upvoteFrame}>
                <IoRocketSharp className={styling.postUpvote}/>
                <small className={styling.upvoteCount}>25</small>
              </div>
          </div>

          <div className={styling.postFrame}>
              <Image 
                src={ProfilePic}
                alt="Monkey Family"
                width={60}
                height={60}
                className={styling.postProfile}
              />
              <div className={styling.postInfo}>
                <h2>Testing.. Testing..</h2>
                <p>I saw this post on reddit, where they talked about how big this planet is!</p>
                <small>Posted 2023-03-17 | 23:25 by Nulzn</small>
              </div>
              <div className={styling.upvoteFrame}>
                <IoRocketSharp className={styling.postUpvote}/>
                <small className={styling.upvoteCount}>25</small>
              </div>
          </div>

          <div className={styling.postFrame}>
              <Image 
                src={ProfilePic}
                alt="Monkey Family"
                width={60}
                height={60}
                className={styling.postProfile}
              />
              <div className={styling.postInfo}>
                <h2>Working!</h2>
                <p>I saw this post on reddit, where they talked about how big this planet is!</p>
                <small>Posted 2023-03-17 | 23:25 by Nulzn</small>
              </div>
              <div className={styling.upvoteFrame}>
                <IoRocketSharp className={styling.postUpvote}/>
                <small className={styling.upvoteCount}>25</small>
              </div>
          </div>



        </div>

      </div>
    </>
  )
}
