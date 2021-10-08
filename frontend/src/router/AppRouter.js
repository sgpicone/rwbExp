import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/common/Header';
import AddBeer from '../components/beers/AddBeer';
import BeerList from '../components/beers/BeerList';
import KegList from '../components/kegs/KegList';
import { getKegs } from '../actions/kegActions';
import { connect } from 'react-redux';
import KegDetail from '../components/kegs/KegDetail';
import KegDashboard from '../components/kegs/KegDashboard';

const AppRouter = ({kegs, getKegs}) => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Switch>
            <Route component={BeerList} path="/beers" exact={true} />
            <Route component={KegDashboard} path="/kegs" exact={true}/>
            <Route component={AddBeer} path="/beers/add" />
            <Route component={KegDetail} path="/kegs/:kegId" />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = state => ({
    kegs: state.keg
});

export default connect(
    mapStateToProps,
    { getKegs }
)(AppRouter);
