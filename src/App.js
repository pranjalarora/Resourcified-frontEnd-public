import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';




import "./App.css";

import Login from "./pages/login";
import Register from "./pages/register";
import NotFound from "./pages/notfound";
import Navbar from './pages/navbar';
import Branches from './pages/branches';
import Courses from './pages/courses';
import Posts from './pages/posts';
import UserProfile from './pages/userProfile';
import Myposts from './pages/myposts';
import LikedPosts from './pages/likedposts';
import Subscription from './pages/subscription';
import Random from './pages/random';
import Home from './pages/home';



class App extends Component {

    render() {
        return (
            <div className="App">
              
                <Router forceRefresh={true} basename="/">
                    <Navbar ></Navbar>
                    <Switch>
                        
                        <Route exact path='/login' component={Login} />
                        

                        
                        <Route path='/register' component={Register} />
                        <Route path='/branches' component={Branches} />
                        <Route path='/courses/:id' component={Courses} />
                        <Route path='/posts/:id' component={Posts} />
                        <Route path="/userProfile" component={UserProfile} />
                        <Route path="/mysubscription" component={Subscription} />
                        <Route path="/likedposts" component={LikedPosts}  />
                        <Route path="/myposts" component={Myposts} />
                        <Route path="/random" component={Random} />
                        <Route path="/" component={Home} />
                        <Route path='*' component={NotFound} />
                        

                    </Switch>
                
                </Router>
            </div>
        );
    }
}

export default App;
