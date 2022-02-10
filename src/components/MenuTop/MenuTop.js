import {useState, useRef, useEffect } from "react"

import {ReactComponent as Logo} from "../../assets/img/movie-finder.svg"

import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"
import {BsList, BsXLg} from "react-icons/bs"
import { LinkContainer } from "react-router-bootstrap"

import "./MenuTop.scss"

export default function MenuTop(){

    // item id state
    const [isItemID, setIsItemID] = useState(1);

    // hook for verify pathname browser and it's enabled when handleItems() is executed
    useEffect(()=>{
        // using querySelectorAll to be able to use forEach()
        const navItems = document.querySelectorAll(".nav-item");   
        navItems.forEach(item =>{            
            if(window.location.pathname === item.children[0].pathname){
                item.classList.add("--selected")
            } else {
                item.classList.remove("--selected")
            }
        })
    },[isItemID])
    
    const handleItems = (Event)=> {
        const itemSelected = Event.currentTarget;
        const itemSelected_id = parseInt(itemSelected.id);
        setIsItemID(itemSelected_id)
        document.getElementById(itemSelected_id).classList.add("--selected");        
        for(let i = 1; i < 5; i++){
            if (itemSelected_id !== i){
            document.getElementById(i).classList.remove("--selected")
            }
        }
        closeMenu();
    }

    const clickedLogo = ()=>{
        /*
        const navItems = document.querySelectorAll(".nav-item");  
        navItems.forEach(item => {item.classList.remove("--selected")})
        document.getElementById(1).classList.add("--selected");
        */
    
       const getItems = document.getElementsByClassName("nav-item")
        for(let i = 1; i < getItems.length;++i){
            getItems[i].classList.remove("--selected")
        }
        document.getElementById(1).classList.add("--selected") 
    }
  
    // responsive menu state
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const openMenu = () =>{setIsMenuOpen(true)}
    const closeMenu = ()=> {setIsMenuOpen(false)}

    // close menu when clicked outside
    const ref = useRef();
    useEffect(()=>{
        const clickOutsideMenu = e =>{
            if(isMenuOpen && ref.current && !ref.current.contains(e.target)){
                setIsMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", clickOutsideMenu)
        return () =>{
            document.removeEventListener("mousedown",clickOutsideMenu)
        }
    },[isMenuOpen])

    return(
        <div className="menutop-container">           
            <Navbar>
                <Nav ref={ref}  >

                <div className="menutop-container__logo-container">
                    <LinkContainer to="/" onClick={clickedLogo}>
                        <Nav.Link>                    
                            <Navbar.Brand>
                                <Logo className="navbar-brand__logo"/>
                            </Navbar.Brand>
                            <Navbar.Brand>
                                <span className="menutop-container__logo-container__title">Mooviis</span>
                                </Navbar.Brand>
                        </Nav.Link>
                    </LinkContainer>
                </div>

                <div className={isMenuOpen ? "menutop-container__navbar-items mobile":"menutop-container__navbar-items"}>
                    
                    <Nav.Item className="close-menu-icon">
                    <BsXLg className="x-icon" onClick={closeMenu}/>
                    </Nav.Item>

                    <Nav.Item onClick={(Event)=>{handleItems(Event)}} id="1" >
                            <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                    </Nav.Item>

                    <Nav.Item onClick={(Event)=>{handleItems(Event)}} id="2" >
                            <LinkContainer to="/new-movies" >
                            <Nav.Link>New Movies</Nav.Link>
                            </LinkContainer>
                    </Nav.Item>

                    <Nav.Item onClick={(Event)=>{handleItems(Event)}} id="3" >
                            <LinkContainer to="/popular-movies"  >
                            <Nav.Link>Popular Movies</Nav.Link>
                            </LinkContainer>
                    </Nav.Item>

                    <Nav.Item onClick={(Event)=>{handleItems(Event)}} id="4">
                            <LinkContainer to="/search"> 
                                <Nav.Link>Search</Nav.Link>
                            </LinkContainer>
                    </Nav.Item>
                    </div>
                    <div className="open-menu-icon" onClick={openMenu}> 
                    <BsList className="bread-icon" />
                </div>
                </Nav>
            </Navbar>

        </div>
    )
}