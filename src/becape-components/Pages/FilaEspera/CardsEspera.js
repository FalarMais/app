import React from 'react';
// import CountUp from 'react-countup';
// import { Row } from 'reactstrap';
import CardSummary from '../../../components/dashboard/CardSummary';

const CardsEspera = () => {
  return (
    <>
      <div className="card-deck">
        <CardSummary rate="" title="" color="0">
          <h5>Em espera: 4</h5>
        </CardSummary>

        <CardSummary rate="" title="" color="">
          <h5>Operadores livres: 1</h5>
        </CardSummary>

        <CardSummary rate="" title="" color="">
          <h5>Ligações canceladas: 20</h5>
        </CardSummary>
      </div>
    </>
  );
};

export { CardsEspera };
