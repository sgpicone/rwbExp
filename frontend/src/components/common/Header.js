import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <h1>RWB Management App</h1>
      <hr />
      <div className="links">
        <NavLink to="/kegs" className="link" activeClassName="active" exact>
          Kegs
        </NavLink>
        <NavLink to="/beers" className="link" activeClassName="active" exact>
          Beers
        </NavLink>
        <NavLink to="/beers/add" className="link" activeClassName="active">
          Add Beer
        </NavLink>
      </div>
    </header>
  );
};

export default Header;
