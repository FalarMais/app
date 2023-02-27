import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
// import logo from '../../assets/img/illustrations/falcon.png';

const Logo = ({ at, width, className, ...rest }) => {
  return (
    <Link
      to="/"
      className={classNames(
        'text-decoration-none',
        { 'navbar-brand text-left': at === 'navbar-vertical' },
        { 'navbar-brand text-left': at === 'navbar-top' }
      )}
      {...rest}
    >
      <div
        className={classNames(
          'd-flex',
          {
            'align-items-center py-3': at === 'navbar-vertical',
            'align-items-center': at === 'navbar-top',
            'flex-center font-weight-extra-bold fs-5 mb-4': at === 'auth'
          },
          className
        )}
      >
        {/* <img style={{ width: 60, background: "#6e00b0", padding: 5}} className="mr-2 rounded" src="http://falarmais.com.br/wp-content/uploads/2022/07/logo-stick-2.png" alt="Logo" width={width} /> */}
        <span style={{ color: '#6e00b0' }} className="text-sans-serif">
          Falar Mais
        </span>
      </div>
    </Link>
  );
};

Logo.propTypes = {
  at: PropTypes.oneOf(['navbar-vertical', 'navbar-top', 'auth']),
  width: PropTypes.number,
  className: PropTypes.string
};

Logo.defaultProps = { at: 'auth', width: 58 };

export default Logo;
