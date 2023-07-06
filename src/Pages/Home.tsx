import React, { useEffect, useState } from 'react';
import AgreementReport from '../components/CardsReports/AgreementReport'
import SoftwareReport from '../components/CardsReports/SoftwareReport'
import DesingReport from '../components/CardsReports/DesingReport'
import MarketingReport from '../components/CardsReports/MarketingReport'
import NursingReport from '../components/CardsReports/NursingReport'
import GastroReport from '../components/CardsReports/GastroReport'
import TourismReport from '../components/CardsReports/TourismReport'

const Home: React.FC = () => {

  return (
    <div>
      <AgreementReport />
      <SoftwareReport />
      <DesingReport/>
      <MarketingReport/>
      <NursingReport/>
      <GastroReport/>
      <TourismReport/>
    </div>
  );
};

export default Home;
