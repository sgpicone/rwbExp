import React from 'react';
import BeerForm from './BeerForm';

const AddBeer = () => {
  const handleOnSubmit = (beer) => {
    console.log(beer);
  };

  return (
    <React.Fragment>
      <BeerForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  );
};

export default AddBeer;
