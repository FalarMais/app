import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { Card, CardBody } from 'reactstrap';

const Error404 = () => (
  <Card className="text-center">
    <CardBody className="p-5">
      <div className="display-1 text-200 fs-error">404</div>
      <p className="lead mt-4 text-800 text-sans-serif font-weight-semi-bold">Essa página não existe.</p>
      <hr />
      <p>Verifique se o endereço está correto e se a página não foi movida.</p>
      <Link className="btn btn-primary btn-sm mt-3" to="/">
        <FontAwesomeIcon icon="home" className="mr-2" />
        Leve-me a principal.
      </Link>
    </CardBody>
  </Card>
);

export default Error404;
