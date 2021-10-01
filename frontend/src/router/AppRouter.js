import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/common/Header';
import AddBeer from '../components/beers/AddBeer';
import BeerList from '../components/beers/BeerList';
import KegList from '../components/kegs/KegList';
import { getKegs } from '../actions/kegActions';
import { connect } from 'react-redux';
import KegDetail from '../components/kegs/KegDetail';

const AppRouter = ({kegs, getKegs}) => {
    useEffect(() => {
        getKegs();
        console.log(kegs);
    }, []);

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Switch>
            <Route component={BeerList} path="/beers" exact={true} />
            <Route component={KegList} path="/kegs" exact={true}/>
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
