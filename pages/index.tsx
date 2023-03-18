import styling from "../styles/Home.module.css"
import Link from "next/link"
import { IoRocketSharp, IoHomeSharp, IoSettingsSharp, IoNotificationsSharp, IoPlanetSharp, IoAddCircleSharp } from "react-icons/io5"
import { GetStaticProps } from "next"
import Image from "next/image"
import ProfilePic from "../Pictures/profile.jpg"
import { useEffect, useState } from "react"


export const getStaticProps: GetStaticProps = async() => {
  return {
    props: {
      
    }
  }
}

export default function Home() {
  const [newPostState, setNewPostState] = useState(false);

  useEffect(() => {
    let elem: any = document.getElementById("createPostFrame")
    elem.style.visibility = (newPostState) ? "Visible" : "Hidden"
  }, [newPostState])

  return (
    <>
      <div>
        <div className={styling.navbar}>
          <h1 className={styling.h1}>Space Social <IoRocketSharp className={styling.rocketSharpIcon}/></h1>

          <form action="/api/NewPost" method="POST" className={styling.createPostFrame} id="createPostFrame">
            <h3 className={styling.createPostTitle}>Create a new post <IoAddCircleSharp className={styling.createPostTitleIcon}/></h3>
            <input type="text" placeholder="Title" className={styling.postFrameTitle}/>
            <textarea name="" id="" cols={50} rows={5} placeholder="Text" className={styling.postFrameArea}></textarea>
            <input type="submit" value={"Post"} className={styling.postFrameSubmit} />
          </form>

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
                <h2>Well.. this planet is crazy</h2>
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
                <h2>Well.. this planet is crazy</h2>
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
                <h2>Well.. this planet is crazy</h2>
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
                <h2>Well.. this planet is crazy</h2>
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
                <h2>Well.. this planet is crazy</h2>
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
