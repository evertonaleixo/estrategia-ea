import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 p-4 text-center">
      <p>&copy; {currentYear} Emerson Lima Aleixo. Todos os direitos reservados.</p>
    </footer>
  );
};

export default Footer;