import styling from "../styles/CreatePost.module.css"

export default function createPost() {
    return (
        <div className={styling.mainDiv}>
            <div className={styling.secondDiv}>
                <form action="/api/create" method="POST" className={styling.form}>

                    <label htmlFor="">Title</label>
                    <input type="text" className={styling.titleInput}/>

                    <div>
                        <div>

                        </div>
                        <div>
                            <label htmlFor="">Description</label>
                            <textarea name="" id="" cols={70} rows={10} className={styling.textArea}></textarea>
                        </div>
                    </div>

                    <label htmlFor="">Photo</label>
                    <input type="file" className={styling.fileInput}/>
                </form>
            </div>
        </div>
    )
}