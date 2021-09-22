import React, { useEffect } from 'react';
import { connect } from 'react-redux';

const KegList = ({ keg, loading}) => {
  console.log(keg);

  if(loading || !keg) {
    return <h1>please wait...</h1>
  }
  return (
    <div>
      <h2>List of Kegs</h2>
      <ul>
        {keg.kegs.map(k => (
          <li>{k.RWBId}</li>
        ))}
      </ul>
    </div>
  );
};
const mapStateToProps = state => ({
  keg: state.keg
});

export default connect(
  mapStateToProps,
  null
)(KegList);
