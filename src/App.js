import './App.css';
import React from 'react'
import {
  BrowserRouter as HashRouter ,
  Routes,
  Route
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/Notes/NoteState';
import Alert from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';

function App() {
  return (
<>
<NoteState>
 <HashRouter basename='/'> 
 <Navbar/>
 <Alert/>
 <div className="container">
  <Routes>
        <Route exact path="/" element={ <Home/> } />
        <Route exact path="/about" element={ <About/> } />
        <Route exact path="/login" element={ <Login/> } />
        <Route exact path="/signup" element={ <Signup/> } />
  </Routes>
</div> 
</HashRouter>
</NoteState>
</>
  );
}

export default App;
