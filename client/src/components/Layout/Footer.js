import React from 'react';
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer">
      <h4 className="text-center">Derechos Reservados &copy; ALFA DESIGN</h4>
      <p className='text-center mt-3'>
        <Link to='/about'>Sobre Nosotros</Link>
        |
        <Link to='/contact'>Contactanos</Link>
        |
        <Link to='/policy'>Politica De Privacidad</Link>
      </p>
    </div>
  );
};

export default Footer;