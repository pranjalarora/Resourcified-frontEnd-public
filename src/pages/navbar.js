import React, { Component } from "react";
import axios from "axios";
import logo from './homeicon.png';
import Avatar from 'react-avatar';
import configData from "./config.json";
export class Navbar extends Component {
    constructor(props) {
        super(props);

        let menu;
        this.state = {
            full_name:localStorage.getItem('full_name')
        
        };
    }

   
    componentDidMount() {
        //window.location.reload();
        this.setState({full_name:localStorage.getItem('full_name')});
        
        window.scrollTo(0, 0);
    }
    refreshPage() {
        window.setTimeout(function(){window.location.reload()},500)
    }

    logout = () => {
        const options = {
            headers: {
                'Content-Type': 'application/json',

            }
        };
        localStorage.removeItem('token');
        localStorage.removeItem('isLoggedIn');


    }

    render() {
        if (!localStorage.getItem('token')) {
            this.menu = (
                <div class="container">

<a class="navbar-brand " href="/">
                        <img src={logo} height={50} width={50}></img>
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"

                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav me-auto mb-2 mb-md-0"></ul>
                        <form class="d-flex">

                            <ul class="navbar-nav me-auto mb-2 mb-md-0">
                                <li class="nav-item">
                                    <a class="nav-link active" aria-current="page" href="/login">
                                        Login
                                    </a>
                                </li>

                                <li class="nav-item">
                                    <a
                                        class="nav-link active"
                                        aria-current="page"
                                        href="/register"
                                    >
                                        Register
                                    </a>
                                </li>
                            </ul>

                        </form>
                    </div>
                </div>
            );
        } else  {
            this.menu = (
                <div class="container">
                    <a class="navbar-brand " href="/">
                        <img src={logo} height={50} width={50}></img>
                    </a>
                    <button
                        class="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse"
                        aria-controls="navbarCollapse"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                     

                    >
                        <span class="navbar-toggler-icon"></span>

                    </button>
                    <div class="collapse navbar-collapse " id="navbarCollapse">

                       

                        <ul class="navbar-nav ms-auto mb-2 mb-md-0 ">
                        <span style={{width:'500px'}}></span>
                        
                            <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    aria-current="page"
                                    href="/branches"
                                    
                                >
                                Branches
                                </a>

                            </li>
                            
                            <li class="nav-item">
                                <a
                                    class="nav-link active"
                                    aria-current="page"
                                    href="/userProfile"
                                    
                                >
                               <Avatar  round name={this.state.full_name} size='40px' />
                                </a>

                            </li>
                            <span style={{marginRight:'100px'}}></span>
                            <li class="nav-item"  >
                                <a
                                    class="nav-link active"
                                    aria-current="page"
                                    href="/login"
                                    onClick={this.logout}
                                   
                                >
                                 <span style={{marginRight:'10px'}}>Logout </span> <i class="fas fa-sign-out-alt fa-2x"></i>
                                </a>

                            </li>
                            
                            

                        </ul>


                    </div>
                </div>
            );

        } 

        return (
            <div>
                <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
                    {this.menu}
                </nav>
            </div>
        );
    }
}

export default Navbar;