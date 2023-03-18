import styling from "../styles/Settings.module.css"

export default function Settings() {
    return (
        <div>
            <div className={styling.mainDiv}>
                <h1>Space Social<span className={styling.span}>Settings</span></h1>
                <form action="/api/Settings" method="POST">
                    <div>
                        <input type="text" placeholder="Username" />
                        <button>Change</button>
                    </div>
                    <div>
                        <input type="checkbox" />
                        <span>Theme</span>
                    </div>
                </form>
            </div>
        </div>
    )
}