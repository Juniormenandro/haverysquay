/*
 import { BookingType, ProductType } from "@/app/page";
import { useState } from 'react';
import React from 'react';
import Selector from '../Selector/Selector';


const availablePaymentSlots = [
  "dinheiro",
  "cartão",
  "boleto",
  
];


type SelectionStepsProps = {
  step: number;
  data?: ProductType[];
  
  bookingData: BookingType;
  setBookingData: (newState: BookingType) => void;
  
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  
  rawPrice: number;
  setRawPrice: React.Dispatch<React.SetStateAction<number>>;

  telefone: string;
  setTelefone: React.Dispatch<React.SetStateAction<string>>;
  
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  
  endereco: string;
  setEndereco: React.Dispatch<React.SetStateAction<string>>;
};




interface Product {
  id: string;
  name: string;
  price: string;
  default_price: string;
  raw_price: number;
};



const SelectionSteps: React.FC<SelectionStepsProps> = ({
  step,
  data,
  bookingData,
  setBookingData,
  
  nome,
  setNome,

  telefone,
  setTelefone,

  rawPrice,
  setRawPrice,

  email,
  setEmail,

  endereco,
  setEndereco,

}) => {

 
  

  let content: JSX.Element | JSX.Element[] | null = null;

   
  switch (step) {
    case 0:
      content = (data || []).map((product: Product) => (
        <Selector
          key={product.id}
          item={product.id} 
          selectedItem={bookingData.selectedProductId}
          onClick={() => {
            console.log("Produto selecionado:", product.id, product.name, product.price);
            setBookingData({
              ...bookingData,
              selectedProductId: product.id,
              selectedProductNane: product.name, 
              selectedProdutPrice: product.price,
              selectedProductDefaultPrice: product.default_price,
            });
          }}
          
        >
          <strong>{product.name}</strong>
          <p>{product.price}</p>
        </Selector>
      ));
      break;
  
    
    case 1:
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Dados submetidos:", { nome, telefone, email, endereco, rawPrice });
        setBookingData({
          ...bookingData,
          nome,
          telefone,
          email,
          endereco,
          rawPrice 
        });
      };
      

      content = (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <input
              key="nome"
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #2F6B90',
                borderRadius: '10px',
                fontSize: '18px',
              }}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="NAME"
            />
          </label>

          <label className="block mb-2">
            <input
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #2F6B90',
                borderRadius: '10px',
                fontSize: '18px',
              }}
              className="block mb-2"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="PHONE"
            />
          </label>

          <label className="block mb-2">
              <input
                key="email"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '1px solid #2F6B90',
                  borderRadius: '10px',
                  fontSize: '18px',
                }}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL"
              />
            </label>

            <label className="block mb-2">
              <input
                key="endereco"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '1px solid #2F6B90',
                  borderRadius: '10px',
                  fontSize: '18px',
                }}
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="ENDERECO"
              />
            </label>

            <label className="block mb-2">
              <input
                key="rawPrice"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '1px solid #2F6B90',
                  borderRadius: '10px',
                  fontSize: '18px',
                }}
                type="number"
                value={rawPrice.toString()}
                onChange={(e) => setRawPrice(Number(e.target.value))}
                placeholder="Preço"
              />
            </label>

        </form>
      );
      break;
    case 2:
      content = availablePaymentSlots.map((PaymentSlot) => (
        <Selector
          key={PaymentSlot}
          item={PaymentSlot}
          selectedItem={bookingData.selectedPayment}
          onClick={() =>
            setBookingData({
              ...bookingData,
              selectedPayment: PaymentSlot,
            })
          }
        />
      ));
      break;
   
    
    default:
      break;
  }

  return (
    <>
      {content}
    </>
  );
};

export default SelectionSteps;

 */

import { BookingType, ProductType } from "@/app/page";
import React, { useEffect, useState } from "react";
import Selector from '../Selector/Selector';

const availablePaymentSlots = [
  "dinheiro",
  "cartão",
  "boleto",
];

type SelectionStepsProps = {
  step: number;
  data?: ProductType[];
  bookingData: BookingType;
  setBookingData: (newState: BookingType) => void;
  nome: string;
  setNome: React.Dispatch<React.SetStateAction<string>>;
  rawPrice: number;
  setRawPrice: React.Dispatch<React.SetStateAction<number>>;
  telefone: string;
  setTelefone: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  endereco: string;
  setEndereco: React.Dispatch<React.SetStateAction<string>>;
};

interface Product {
  id: string;
  name: string;
  price: string;
  default_price: string;
  raw_price: number;
};

const SelectionSteps: React.FC<SelectionStepsProps> = ({
  step,
  data,
  bookingData,
  setBookingData,
  nome,
  setNome,
  telefone,
  setTelefone,
  rawPrice,
  setRawPrice,
  email,
  setEmail,
  endereco,
  setEndereco,
}) => {
  let content: JSX.Element | JSX.Element[] | null = null;


  switch (step) {
    case 0:
      content = (data || []).map((product: Product) => (
        <Selector
          key={product.id}
          item={product.id}
          selectedItem={bookingData.selectedProductId}
          onClick={() => {
            setBookingData({
              ...bookingData,
              selectedProductId: product.id,
              selectedProductNane: product.name,
              selectedProdutPrice: product.price,
              selectedProductDefaultPrice: product.default_price,
            });
          }}
        >
          <strong>{product.name}</strong>
          <p>{product.price}</p>
        </Selector>
      ));
      break;

    case 1:
      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("Dados submetidos:", { ...bookingData, nome, telefone, email, endereco, rawPrice });

        setBookingData({
          ...bookingData,
          nome,
          telefone,
          email,
          endereco,
          rawPrice,
        });
      };

      content = (
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <input
              key="nome"
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #2F6B90',
                borderRadius: '10px',
                fontSize: '18px',
              }}
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="NAME"
            />
          </label>

          <label className="block mb-2">
            <input
              style={{
                width: '100%',
                padding: '5px',
                border: '1px solid #2F6B90',
                borderRadius: '10px',
                fontSize: '18px',
              }}
              className="block mb-2"
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              placeholder="PHONE"
            />
          </label>

          <label className="block mb-2">
              <input
                key="email"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '1px solid #2F6B90',
                  borderRadius: '10px',
                  fontSize: '18px',
                }}
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="EMAIL"
              />
            </label>

            <label className="block mb-2">
              <input
                key="endereco"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '1px solid #2F6B90',
                  borderRadius: '10px',
                  fontSize: '18px',
                }}
                type="text"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
                placeholder="ENDERECO"
              />
            </label>
            <label className="block mb-2">
              <input
                key="rawPrice"
                style={{
                  width: '100%',
                  padding: '5px',
                  border: '1px solid #2F6B90',
                  borderRadius: '10px',
                  fontSize: '18px',
                }}
                type="number"
                value={rawPrice}
                onChange={(e) => setRawPrice(Number(e.target.value))}
                placeholder="Preço"
              />
            </label>
          </form>
       );
      break;

    case 2:
      content = availablePaymentSlots.map((PaymentSlot) => (
        <Selector
          key={PaymentSlot}
          item={PaymentSlot}
          selectedItem={bookingData.selectedPayment}
          onClick={() => setBookingData({
              ...bookingData,
              selectedPayment: PaymentSlot,
            })
          }
        />
      ));
      break;

    default:
      break;
  }

  return <>{content}</>;
};

export default SelectionSteps;

