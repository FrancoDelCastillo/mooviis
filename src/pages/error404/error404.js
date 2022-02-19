import { useNavigate } from "react-router-dom"
import Button from "react-bootstrap/Button"

import "./error404.scss"

export default function Error404(){

    const navigate = useNavigate();

    return(
        <div className="error404">
            <h1>Error 404 :(</h1>
            <h2>Page not found</h2>
            <Button className="back-home" onClick={()=>{navigate("/")}}>
                Back to home
            </Button>
        </div>
    )
}