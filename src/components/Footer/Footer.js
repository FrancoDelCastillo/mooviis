import Container from "react-bootstrap/Container"

import { LinkContainer } from "react-router-bootstrap"

import {BsLinkedin, BsGithub} from "react-icons/bs"

import {ReactComponent as Logo} from "../../assets/img/movie-finder.svg"

import "./Footer.scss"

export default function Footer(){
    return(
        <>
            <Container fluid className="container-footer">
            <LinkContainer to="/" className="navbar-link">
                    <div className="footer-logo">
                        <Logo className="footer-logo__logo"/>
                        <span className="footer-logo__title">MooViis</span>
                    </div>
                    </LinkContainer>    
                    <div>
                        <span className="container-footer__name">by Franco Del Castillo</span>
                        <div className="container-footer__icons">
                            <BsLinkedin/><BsGithub/>
                        </div>
                    </div>
                
            </Container>
        </>
    )
}