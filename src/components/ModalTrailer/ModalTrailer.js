import {useState,useEffect} from "react"

import ReactPlayer from "react-player"

import Modal from "react-bootstrap/Modal"

import "./ModalTrailer.scss"

export default function ModalTrailer(props){
    const {videoKey, videoPlatform, isOpen, close} = props;

    return(
        <Modal className="modal-video"
        visible={isOpen}
        centered
        onCancel={close}
        footer={false}>
            This is the modal
        </Modal>
    )
}