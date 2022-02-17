import {useState,useEffect} from "react"

import ReactPlayer from "react-player"

import Modal from "react-bootstrap/Modal"

import "./ModalTrailer.scss"

export default function ModalTrailer(props){
    const {videoKey, videoPlatform, isOpen, close} = props;
    
    const [urlVideo, setUrlVideo]= useState(null);
    
    useEffect(()=>{
        switch(videoPlatform){
            case "YouTube":
                setUrlVideo(`https://www.youtube.com/watch?v=${videoKey}`);
                break;
            case "Vimeo":
                setUrlVideo(`https://vimeo.com/${videoKey}`);
                break;
            default:
                break;
        }
    },[videoKey, videoPlatform])
    

    return(
        <Modal className="modal-video"
        show={isOpen}
        centered
        onHide={close}
        keyboard={false}>
            <Modal.Header  closeButton>
            </Modal.Header>
            <ReactPlayer className='react-player'  width="80%"
            height="80%" url={urlVideo} controls />
        </Modal>
    )
}