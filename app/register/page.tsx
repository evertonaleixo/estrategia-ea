'use client';

import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    dataNascimento: '',
    cidade: '',
    estado: '',
  });
  const [isRegistered, setIsRegistered] = useState(false);
  const [hasFailInRegister, setHasFailInRegister] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const apiUrl = '/api/user'; // Change this URL to your API endpoint

    try {
      setIsLoading(true);
      // Send the form data to the API to register the user
      const body = {
        'name': formData.nome,
        'email': formData.email,
        'password': formData.senha,
        'birthdate': formData.dataNascimento,
        'state': formData.cidade,
        'city': formData.estado,
      };
      const serverResp = await axios.post(apiUrl, body);
      console.log('serverResp', serverResp)

      // Registration successful, set isRegistered to true
      setIsRegistered(true);
    } catch (error) {
      console.error('Error registering user:', error);
      setIsRegistered(false);
      setHasFailInRegister(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-md p-6 bg-gray-100 bg-opacity-25 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Criar Conta</h1>
        {isRegistered && (
          <p className="text-green-600 mb-4">Cadastro realizado com sucesso!</p>
        )}
        {hasFailInRegister && (
          <p className="text-red-600 mb-4">Falha ao cadastrar! {erroMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="nome" className="block font-medium">
              Nome:
            </label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
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
          <div className="mb-4">
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
          <div className="mb-4">
            <label htmlFor="dataNascimento" className="block font-medium">
              Data de Nascimento:
            </label>
            <input
              type="date"
              id="dataNascimento"
              name="dataNascimento"
              value={formData.dataNascimento}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="estado" className="block font-medium">
              Estado:
            </label>
            <input
              type="text"
              id="estado"
              name="estado"
              value={formData.estado}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="cidade" className="block font-medium">
              Cidade:
            </label>
            <input
              type="text"
              id="cidade"
              name="cidade"
              value={formData.cidade}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Cadastrar
          </button>
        </form>

        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-300 bg-opacity-75">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
