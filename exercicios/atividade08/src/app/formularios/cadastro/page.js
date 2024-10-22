"use client";
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';

const CadastroForm = () => {
  const [selectedFiles, setSelectedFiles] = useState(null);

  const initialValues = {
    tipo: '',
    finalidade: '',
    valor: '',
    area: '',
    quartos: '',
    banheiros: '',
    descricao: '',
    foto: '',
    vagasGaragem: '',
    endereco: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      UF: ''
    },
    proprietario: {
      nome: '',
      CPF: '',
      telefone: '',
      email: ''
    }
  };

  const validationSchema = Yup.object({
    tipo: Yup.string().required('Tipo é obrigatório'),
    finalidade: Yup.string().required('Finalidade é obrigatória'),
    valor: Yup.number().required('Valor é obrigatório'),
    area: Yup.number().required('Área é obrigatória'),
    quartos: Yup.number().required('Número de quartos é obrigatório'),
    banheiros: Yup.number().required('Número de banheiros é obrigatório'),
    descricao: Yup.string().required('Descrição é obrigatória'),
    foto: Yup.mixed().required('Foto é obrigatória'),
    vagasGaragem: Yup.number().required('Número de vagas de garagem é obrigatório'),
    endereco: Yup.object({
      cep: Yup.string().required('CEP é obrigatório'),
      logradouro: Yup.string().required('Logradouro é obrigatório'),
      numero: Yup.string().required('Número é obrigatório'),
      complemento: Yup.string(),
      bairro: Yup.string().required('Bairro é obrigatório'),
      cidade: Yup.string().required('Cidade é obrigatória'),
      UF: Yup.string().required('UF é obrigatório'),
    }),
    proprietario: Yup.object({
      nome: Yup.string().required('Nome é obrigatório'),
      CPF: Yup.string().required('CPF é obrigatório'),
      telefone: Yup.string().required('Telefone é obrigatório'),
      email: Yup.string().email('Email inválido').required('Email é obrigatório')
    })
  });

  const handleSubmit = (values) => {
    console.log('Dados do Formulário:', values);
  };

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFiles(file);
    } else {
      alert('Por favor, selecione uma imagem válida.');
    }
  };

  return (
    <div style={{
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{
        backgroundColor: '#f0f8ff',
        padding: '20px', 
        borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', 
        maxWidth: '600px', 
        width: '100%'
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>Cadastro de Imóvel</h1>
        
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, resetForm, isSubmitting }) => (
            <Form>
              {/* Dados do Imóvel */}
              <h3>Dados do Imóvel</h3>

              <div className="form-group">
                <label htmlFor="tipo">Tipo</label>
                <Field as="select" id="tipo" name="tipo" className="form-control">
                  <option value="">Selecione o tipo de imóvel</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  <option value="terreno">Terreno</option>
                  <option value="sala comercial">Sala Comercial</option>
                </Field>
                <ErrorMessage name="tipo" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="finalidade">Finalidade</label>
                <Field as="select" id="finalidade" name="finalidade" className="form-control">
                  <option value="">Selecione a finalidade</option>
                  <option value="venda">Venda</option>
                  <option value="aluguel">Aluguel</option>
                </Field>
                <ErrorMessage name="finalidade" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="valor">Valor</label>
                <Field type="number" id="valor" name="valor" className="form-control" />
                <ErrorMessage name="valor" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="area">Área (m²)</label>
                <Field type="number" id="area" name="area" className="form-control" />
                <ErrorMessage name="area" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="quartos">Número de Quartos</label>
                <Field type="number" id="quartos" name="quartos" className="form-control" />
                <ErrorMessage name="quartos" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="banheiros">Número de Banheiros</label>
                <Field type="number" id="banheiros" name="banheiros" className="form-control" />
                <ErrorMessage name="banheiros" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="descricao">Descrição</label>
                <Field as="textarea" id="descricao" name="descricao" className="form-control" />
                <ErrorMessage name="descricao" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="foto">Foto do Imóvel</label>
                <input
                  type="file"
                  id="foto"
                  name="foto"
                  className="form-control"
                  onChange={handleFileChange}
                />
                <ErrorMessage name="foto" component="div" className="text-danger" />
                {selectedFiles && (
                  <img src={URL.createObjectURL(selectedFiles)} alt="Preview" style={{ width: '100%', height: 'auto', marginTop: '10px' }} />
                )}
              </div>

              <div className="form-group">
                <label htmlFor="vagasGaragem">Número de Vagas de Garagem</label>
                <Field type="number" id="vagasGaragem" name="vagasGaragem" className="form-control" />
                <ErrorMessage name="vagasGaragem" component="div" className="text-danger" />
              </div>

              {/* Endereço */}
              <h3>Endereço</h3>

              <div className="form-group">
                <label htmlFor="cep">CEP</label>
                <Field type="text" id="cep" name="endereco.cep" className="form-control" />
                <ErrorMessage name="endereco.cep" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="logradouro">Logradouro</label>
                <Field type="text" id="logradouro" name="endereco.logradouro" className="form-control" />
                <ErrorMessage name="endereco.logradouro" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="numero">Número</label>
                <Field type="text" id="numero" name="endereco.numero" className="form-control" />
                <ErrorMessage name="endereco.numero" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="complemento">Complemento</label>
                <Field type="text" id="complemento" name="endereco.complemento" className="form-control" />
              </div>

              <div className="form-group">
                <label htmlFor="bairro">Bairro</label>
                <Field type="text" id="bairro" name="endereco.bairro" className="form-control" />
                <ErrorMessage name="endereco.bairro" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="cidade">Cidade</label>
                <Field type="text" id="cidade" name="endereco.cidade" className="form-control" />
                <ErrorMessage name="endereco.cidade" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="UF">UF</label>
                <Field type="text" id="UF" name="endereco.UF" className="form-control" />
                <ErrorMessage name="endereco.UF" component="div" className="text-danger" />
              </div>

              {/* Proprietário */}
              <h3>Proprietário</h3>

              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <Field type="text" id="nome" name="proprietario.nome" className="form-control" />
                <ErrorMessage name="proprietario.nome" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="CPF">CPF</label>
                <Field as={InputMask} mask="999.999.999-99" id="CPF" name="proprietario.CPF" className="form-control" />
                <ErrorMessage name="proprietario.CPF" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="telefone">Telefone</label>
                <Field as={InputMask} mask="(99) 99999-9999" id="telefone" name="proprietario.telefone" className="form-control" />
                <ErrorMessage name="proprietario.telefone" component="div" className="text-danger" />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Field type="email" id="email" name="proprietario.email" className="form-control" />
                <ErrorMessage name="proprietario.email" component="div" className="text-danger" />
              </div>

              <div className="form-group mt-3">
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                Enviar
              </button>
              </div>

              <div className="form-group mt-3">
              <button type="button" className="btn btn-secondary" onClick={resetForm}>
                Limpar
              </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CadastroForm;
