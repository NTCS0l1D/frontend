'use client'

import Pagina from "@/components/Pagina";
import { useState } from "react";
import { Button, Form, Row, Col, Card, Container } from "react-bootstrap";
import { FaExchangeAlt, FaTrash } from "react-icons/fa";

// Caminhos para as imagens no Next.js (sem '../../../../' ou 'public/')
const imagensMoedas = {
  USD: '/img/dolar.png',    
  EUR: '/img/euro.webp',     
  BTC: '/img/bitcoin.jpg'   
};

export default function ConversorMoedaPage() {
  const [valor, setValor] = useState('0');
  const [moedaDestino, setMoedaDestino] = useState('');
  const [resultado, setResultado] = useState(null);

  function converter(event) {
    event.preventDefault();

    const taxasConversao = {
      USD: 0.20,
      EUR: 0.18,
      BTC: 0.000003
    };

    const valorConvertido = parseFloat(valor) * (taxasConversao[moedaDestino] || 0);
    const resultadoFormatado = moedaDestino === 'BTC'
      ? valorConvertido.toFixed(6)
      : valorConvertido.toFixed(2);

    setResultado(resultadoFormatado);
  }

  function limpar() {
    setValor('0');
    setMoedaDestino('');
    setResultado(null);
  }

  return (
    <Pagina titulo="Conversor de Moeda">
      <Container fluid className="p-5" style={{ backgroundColor: '#F5F7FA' }}>
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow-lg p-4 mb-5 rounded" style={{ backgroundColor: '#FFFAF0', border: 'none' }}>
              <Card.Body>
                <h2 className="text-center mb-4" style={{ color: "#6A5ACD", fontWeight: 'bold' }}>
                  Conversor de Moeda
                </h2>
                <Form onSubmit={converter}>
                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#708090' }}>Valor em Reais (BRL):</Form.Label>
                    <Form.Control
                      type="number"
                      name="valor"
                      value={valor}
                      onChange={e => setValor(e.target.value)}
                      min={0.01}
                      step={0.01}
                      placeholder="Digite o valor em BRL"
                      className="p-3"
                      style={{ backgroundColor: '#FFF0F5', border: '2px solid #6A5ACD' }}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label style={{ color: '#708090' }}>Moeda de Destino:</Form.Label>
                    <Form.Select
                      name="moedaDestino"
                      value={moedaDestino}
                      onChange={e => setMoedaDestino(e.target.value)}
                      className="p-3"
                      style={{ backgroundColor: '#FFF0F5', border: '2px solid #6A5ACD' }}
                    >
                      <option>Selecione a moeda</option>
                      <option value="USD">Dólar (USD)</option>
                      <option value="EUR">Euro (EUR)</option>
                      <option value="BTC">Bitcoin (BTC)</option>
                    </Form.Select>
                  </Form.Group>

                  <div className="text-center">
                    <Button 
                      type="submit" 
                      variant="success" 
                      className="me-2 px-4 py-2" 
                      style={{ backgroundColor: '#7FFFD4', border: 'none', color: '#333' }}
                    >
                      <FaExchangeAlt /> Converter
                    </Button>
                    <Button 
                      type="button" 
                      variant="danger" 
                      className="ms-2 px-4 py-2" 
                      onClick={limpar}
                      style={{ backgroundColor: '#FFB6C1', border: 'none', color: '#333' }}
                    >
                      <FaTrash /> Limpar
                    </Button>
                  </div>
                </Form>

                {resultado !== null && moedaDestino && (
                  <div className="mt-5 text-center">
                    <h4 style={{ color: '#333' }}>Resultado: {resultado} {moedaDestino}</h4>

                    {moedaDestino && imagensMoedas[moedaDestino] && (
                      <img 
                        src={imagensMoedas[moedaDestino]} 
                        alt={`Ícone da moeda ${moedaDestino}`} 
                        className="mt-3"
                        style={{ width: '150px', height: 'auto', borderRadius: '8px' }}
                      />
                    )}
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Seção sobre moedas e taxas de conversão */}
        <div className="mt-5 p-4" style={{ backgroundColor: '#FFF0F5', borderRadius: '10px' }}>
          <h3 style={{ color: '#6A5ACD' }}>Sobre Moedas e Taxas de Conversão</h3>
          <p style={{ color: '#333' }}>
            A conversão de moedas é o processo de troca de uma moeda por outra. O valor de uma moeda é determinado por vários fatores, 
            incluindo políticas econômicas, inflação e a oferta e demanda por essa moeda. No conversor, estamos usando três moedas principais:
          </p>
          <ul style={{ color: '#333' }}>
            <li><strong>Dólar (USD)</strong>: A moeda oficial dos Estados Unidos e uma das mais negociadas no mundo.</li>
            <li><strong>Euro (EUR)</strong>: A moeda oficial da União Europeia, utilizada por 19 dos 27 estados-membros da UE.</li>
            <li><strong>Bitcoin (BTC)</strong>: Uma criptomoeda descentralizada que permite transações digitais sem a necessidade de intermediários.</li>
          </ul>
          <p style={{ color: '#333' }}>
            As taxas de conversão podem variar ao longo do tempo devido a mudanças no mercado. Atualmente, usamos os seguintes valores fixos para conversão:
          </p>
          <ul style={{ color: '#333' }}>
            <li>1 Real (BRL) = 0.20 Dólares (USD)</li>
            <li>1 Real (BRL) = 0.18 Euros (EUR)</li>
            <li>1 Real (BRL) = 0.000003 Bitcoins (BTC)</li>
          </ul>
          <p style={{ color: '#333' }}>
            Essas taxas são exemplos e podem não refletir os valores reais no mercado atual.
          </p>
        </div>
      </Container>
    </Pagina>
  );
}
