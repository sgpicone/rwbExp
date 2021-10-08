import React, { useEffect, useState, Component } from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getKeg } from '../../actions/kegActions';
import HistoryTable from './HistoryTable';
import { columnMaps } from './utils/tableUtils';

const KegDetail = ({ kegs, selectedKeg, loading, getKeg }) => {
  let { kegId: kegRwbId = null } = useParams();
  const history = useHistory();

  useEffect(() => {
    if (!loading) {
      getKeg(kegRwbId);
    }
  }, [kegRwbId]);

  if (loading || !selectedKeg) {
    console.log(kegs);
    return <h1>please wait...</h1>
  }
  else if (!loading && selectedKeg) {
    console.log(kegRwbId);
  }


  return (
    <div>
      <h2>{selectedKeg.rwbId}</h2>
      <ul>
        <li>Location: {selectedKeg.currentLocation}</li>
        <li>status: {selectedKeg.status}</li>
        <li>last beer: {selectedKeg.lastFillBeer}</li>
      </ul>
      <HistoryTable title="Fill History" data={selectedKeg.fillHistory} columnMap={columnMaps.FILL_HISTORY}></HistoryTable>
      <HistoryTable title="Wash History" data={selectedKeg.washHistory} columnMap={columnMaps.WASH_HISTORY}></HistoryTable>
      <HistoryTable title="Sani History" data={selectedKeg.saniHistory} columnMap={columnMaps.SANI_HISTORY}></HistoryTable>
      <HistoryTable title="Breakdown History" data={selectedKeg.breakdownHistory} columnMap={columnMaps.BREAKDOWN_HISTORY}></HistoryTable>
      <HistoryTable title="Issues" data={selectedKeg.issueHistory} columnMap={columnMaps.ISSUE_HISTORY}></HistoryTable>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    kegs: state.keg.kegs,
    selectedKeg: state.keg.selectedKeg
  }
};

export default connect(
  mapStateToProps,
  { getKeg }
)(KegDetail);