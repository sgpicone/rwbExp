import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { columnMaps, DefaultColumnFilter, GlobalFilter } from './utils/tableUtils';
import { Card } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import OnTapTable from './tables/OnTapTable';
import { getKegs } from '../../actions/kegActions';
import { setLoading } from '../../actions/types';
import DirtyTable from './tables/DirtyTable';
import FullTable from './tables/FullTable';
import CleanTable from './tables/CleanTable';
import SaniTable from './tables/SaniTable';

const LOCATIONS = {
  TAPROOM: "TAP",
  ONTAP: "ONTAP",
  BACKUPTAP: "BACKUPTAP",
  COLDROOM_BMNT: "COLDROOM-BMNT",
  STORAGE_DIRTY: "STORAGE-DIRTY",
  STORAGE_RINSED: "STORAGE-RINSED",
  STORAGE_WASHED: "STORAGE-WASHED",
  STORAGE_BMNT: "STORAGE-BMNT",
  CUSTOMER: "CUSTOMER",
  QUARANTINE_BMNT: "QUARANTINE-BMNT",
  UNKNOWN: "UNKNOWN",
  STORAGE_BREWERY: "STORAGE/BREWERY"
};

const STATUSES = {
  FULL: 'FULL',
  DIRTY: 'DIRTY',
  WASHED: 'WASHED',
  SANITIZED: 'SANI',
  UNKNOWN: 'UNKNOWN',
  QUARANTINED: 'QUARANTINED'
}

const KegDashboard = () => {
  const { kegs, loading } = useSelector(state => state.keg);
  const dispatch = useDispatch();
  const onTapKegs = useMemo(() => kegs.filter(k => k.currentLocation?.includes(LOCATIONS.TAPROOM)).sort((a, b) => a.lastFillBeer > b.lastFillBeer), [kegs]);
  const fullKegs = useMemo(() => kegs.filter(k => k.status === STATUSES.FULL).sort((a, b) => a.lastFillBeer > b.lastFillBeer), [kegs]);
  const coldroomKegs = useMemo(() => kegs.filter(k => k.status === STATUSES.FULL && k.currentLocation === LOCATIONS.COLDROOM_BMNT).sort((a, b) => a.lastFillBeer > b.lastFillBeer), [kegs]);
  const customerKegs = useMemo(() => kegs.filter(k => k.status === STATUSES.FULL && k.currentLocation === LOCATIONS.CUSTOMER).sort((a, b) => a.lastFillBeer > b.lastFillBeer), [kegs]);
  const cleanKegs = useMemo(() => kegs.filter(k => k.status === STATUSES.WASHED).sort((a, b) => a.lastWashDate < b.lastWashDate), [kegs]);
  const dirtyKegs = useMemo(() => kegs.filter(k => k.status === STATUSES.DIRTY).sort((a, b) => a.lastFillBeer > b.lastFillBeer), [kegs]);
  const sanitizedKegs = useMemo(() => kegs.filter(k => k.status === STATUSES.SANITIZED).sort((a, b) => a.lastSaniDate < b.lastSaniDate), [kegs]);

  if (loading || !kegs.length) {
    dispatch(getKegs());
    return <h1>please wait...</h1>
  }


  return (
    <div className="row">
      <Accordion>
        <Accordion.Item eventKey="0">
          <Accordion.Header>Kegs in Taproom: {onTapKegs.length}</Accordion.Header>
          <Accordion.Body>
            <OnTapTable kegs={onTapKegs} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1">
          <Accordion.Header>Full Kegs (total): {fullKegs.length}</Accordion.Header>
          <Accordion.Body>
            <FullTable kegs={fullKegs} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2">
          <Accordion.Header>Full Kegs (untapped): {coldroomKegs.length}</Accordion.Header>
          <Accordion.Body>
            <FullTable kegs={coldroomKegs} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3">
          <Accordion.Header>Kegs with Customers: {customerKegs.length}</Accordion.Header>
          <Accordion.Body>
            <FullTable kegs={customerKegs} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4">
          <Accordion.Header>Dirty Kegs: {dirtyKegs.length}</Accordion.Header>
          <Accordion.Body>
            <DirtyTable kegs={dirtyKegs} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="5">
          <Accordion.Header>Clean Kegs: {cleanKegs.length}</Accordion.Header>
          <Accordion.Body>
            <CleanTable kegs={cleanKegs} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="6">
          <Accordion.Header>Sanitized Kegs: {sanitizedKegs.length}</Accordion.Header>
          <Accordion.Body>
            <SaniTable kegs={sanitizedKegs} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div >
  );
};

export default KegDashboard;
