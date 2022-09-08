import React from 'react';
import logo from './logo.svg';
import { Navbar, NavbarBrand, Dropdown} from 'reactstrap';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar dark color = "primary">
        <div className = "container">
          <NavbarBrand href = "/">Ristorante Con Fusion</NavbarBrand>
        </div>
        <Dropdown className = "dark">Menu</Dropdown>
      </Navbar>
    </div>
  );
}

export default App;
