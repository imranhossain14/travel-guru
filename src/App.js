import React, { createContext, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { MDBContainer } from 'mdbreact';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Booking from './components/Booking/Booking';
import Hotels from './components/Hotels/Hotels';
import Login from './components/Login/Login';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
import Destination from './components/Destination/Destination';
import Blog from './components/Blog/Blog';
import Contact from './components/Contact/Contact';
import News from './components/News/News';



export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({})
  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <div className="App">
        <div className="Home">
          <MDBContainer>
            <BrowserRouter>
              <Header />
              <Switch>
                <Route path="/" exact><Home /></Route>
                <Route path="/travel/:id"><Booking /></Route>
                <PrivateRoute path="/hotels/:name" exact> <Hotels /> </PrivateRoute>
                <Route path="/login"><Login /> </Route>
                <Route path="/news">
                     < News />
                </Route>
                <Route path="/destination">
                    <Destination/>
                </Route>
                <Route path="/blog">
                    <Blog/>
                </Route>
                
                <Route path="/contact">
                    <Contact/>
                </Route>
                <Route path="*"> <NotFound/> </Route>
              </Switch>
            </BrowserRouter>

          </MDBContainer>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
