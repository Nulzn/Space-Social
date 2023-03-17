import styling from "../styles/Error.module.css"
import {IoRocketSharp} from "react-icons/io5"
import Image from "next/image"
import Nikocado from "../gifs/nic.gif"

export default function Error() {
    return (
        <div className={styling.mainDiv}>
            <div>
                <h1>Space Social <IoRocketSharp/><span className={styling.span}>404</span></h1>
                <h3 className={styling.h3}>Page was not found.</h3>
            </div>
        </div>
    )
}