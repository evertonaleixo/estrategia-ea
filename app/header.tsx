'use client';

import React, { useState } from 'react';
import Link from 'next/link'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      <div className="logo">
        <Link
          href={{
            pathname: '/'
          }}
        >
          <p>
            $TRATEGI
          </p>
        </Link>
      </div>
      <div className={`menu-toggle ${isMenuOpen ? 'active' : ''}`} onClick={toggleMenu}>
        &#9776;
      </div>
      <ul className={`nav ${isMenuOpen ? 'active' : ''}`}>
        <Link
          href={{
            pathname: '/'
          }}
        >
          <li>Inicio</li>
        </Link>
        <Link
          href={{
            pathname: '/contact'
          }}
        >
          <li>Contato</li>
        </Link>
        <Link
          href={{
            pathname: '/register'
          }}
        >
          <li>Registrar</li>
        </Link>
        <Link
          href={{
            pathname: '/login'
          }}
        >
          <li>Acessar</li>
        </Link>
      </ul>

      <style jsx>{`
        /* Estilos para o cabeçalho */
        header {
            background-color: #333;
            color: #fff;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 20px;
        }

        /* Estilos para a logo */
        .logo {
            font-size: 36px;
            font-weight: bold;
            color: #4470af
        }

        /* Estilos para o menu de hambúrguer */
        .menu-toggle {
            display: none; /* Esconder o ícone do menu em telas maiores */
            cursor: pointer;
        }

        /* Estilos para os links do menu */
        .nav {
            list-style: none;
            display: flex;
            margin: 0;
            padding: 0;
        }

        .nav li {
            margin-right: 20px;
        }

        /* Estilos para o menu de hambúrguer em dispositivos móveis */
        @media (max-width: 768px) {
            .menu-toggle {
                display: block; /* Mostrar o ícone do menu em telas menores */
            }

            .nav {
                display: none; /* Esconder os links em telas menores */
                flex-direction: column;
                background-color: #333;
                position: absolute;
                top: 60px;
                right: 20px;
                padding: 10px;
                z-index: 1;
            }

            .nav.active {
                display: flex; /* Mostrar os links quando o menu de hambúrguer estiver ativo */
            }
        }
      `}</style>
    </header>
  );
};

export default Header;
