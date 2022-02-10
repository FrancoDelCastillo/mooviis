import Spinner from "react-bootstrap/Spinner"

import "./SpinnerLoading.scss"

export default function SpinnerLoading(){
    return(
        <div className="spinner-loading">
            <Spinner animation="border"></Spinner>
        </div>
    )
}