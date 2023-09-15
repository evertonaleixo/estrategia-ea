'use client';

import React, { useState } from 'react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    senha: '',
  });
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // Aqui você pode adicionar lógica para verificar as credenciais do usuário.
    // Por exemplo, você pode enviar os dados para um servidor ou API para autenticação.

    // Se o login for bem-sucedido (ou simulação), definimos isLoggedin como true.
    // Caso contrário, definimos isError como true.
    if (formData.email === 'seuemail@example.com' && formData.senha === 'suasenha') {
      setIsLoggedin(true);
      setIsError(false);
    } else {
      setIsLoggedin(false);
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-gray-100 bg-opacity-25 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Acessar</h1>
        {isLoggedin && (
          <p className="text-green-600 mb-4">Login bem-sucedido!</p>
        )}
        {isError && (
          <p className="text-red-600 mb-4">Credenciais inválidas. Tente novamente.</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="senha" className="block font-medium">
              Senha:
            </label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
