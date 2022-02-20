import Container from "react-bootstrap/Container"

import {BsLinkedin, BsGithub} from "react-icons/bs"

import {ReactComponent as Logo} from "../../assets/img/movie-finder.svg"

import "./Footer.scss"

export default function Footer(){


    return(
        <>
            <Container fluid className="container-footer">
                <a href="/">
                    <div className="footer-logo">
                        <Logo className="footer-logo__logo"/>
                        <span className="footer-logo__title">MooViis</span>
                    </div>
                </a>
                    
                    <div>
                        
                        <span className="container-footer__name">by Franco Del Castillo</span>
                        
                        
                        <div className="container-footer__icons">
                        <a href="https://www.linkedin.com/in/francodelcastillo/" target="_blank" rel="noreferrer">
                        <BsLinkedin/>
                        </a>
                        <a href="https://github.com/FrancoDelCastillo" target="_blank" rel="noreferrer">
                            <BsGithub/>
                        </a>
                        </div>
                    </div>
                
            </Container>
        </>
    )
}