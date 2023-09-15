'use client';

import React, { useState } from 'react';


const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Aqui você pode adicionar lógica para enviar os dados do formulário.
    // Por exemplo, você pode usar a função fetch() para enviar os dados para um servidor ou API.

    try {
      // Simular um envio bem-sucedido (aqui você pode adicionar sua lógica de envio real)
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setIsError(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        message: '',
      });
    } catch (error) {
      setIsSubmitted(false);
      setIsError(true);
    }
  };

  return (
    <div className="flex justify-center items-center  middle-full">
      <div className="w-full max-w-md p-6 bg-gray-100 bg-opacity-80 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">
          Contato
        </h1>
        <h3>Você pode entrar em contato enviando um email para <i>emerson.aleixo@gmail.com</i> ou enviando uma mensagem pelo formulário abaixo:</h3>
        {isSubmitted && (
          <p className="text-green-600 mb-4">Mensagem enviada com sucesso!</p>
        )}
        {isError && (
          <p className="text-red-600 mb-4">Houve um erro ao enviar a mensagem.</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium">
              Nome:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium">
              Telefone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
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
          <div className="mb-6">
            <label htmlFor="message" className="block font-medium">
              Mensagem:
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
