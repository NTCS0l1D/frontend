"use client"

import React, { createContext } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import InputMask from 'react-input-mask';
import { FaCheck, FaTrash } from 'react-icons/fa';
import { Button, Col, Row } from 'react-bootstrap';

// Esquema de validação com Yup
const validationSchema = Yup.object({
  tipo: Yup.string().required('Obrigatório'),
  finalidade: Yup.string().required('Obrigatório'),
  valor: Yup.number().required('Obrigatório'),
  area: Yup.number().required('Obrigatório'),
  quartos: Yup.number().required('Obrigatório'),
  banheiros: Yup.number().required('Obrigatório'),
  descricao: Yup.string().required('Obrigatório'),
  fotos: Yup.mixed().required('Envie pelo menos uma foto do imóvel'),
  vagasGaragem: Yup.number().required('Obrigatório'),
  endereco: Yup.object({
    cep: Yup.string().required('Obrigatório'),
    logradouro: Yup.string().required('Obrigatório'),
    numero: Yup.string().required('Obrigatório'),
    complemento: Yup.string(),
    bairro: Yup.string().required('Obrigatório'),
    cidade: Yup.string().required('Obrigatório'),
    UF: Yup.string().required('Obrigatório'),
  }),
  proprietario: Yup.object({
    nome: Yup.string().required('Obrigatório'),
    CPF: Yup.string().required('Obrigatório'),
    telefone: Yup.string().required('Obrigatório'),
    email: Yup.string().email('E-mail inválido').required('Obrigatório'),
  }),
});

const FormularioImovel = () => {
  // Valores iniciais do formulário
  const initialValues = {
    tipo: '',
    finalidade: '',
    valor: '',
    area: '',
    quartos: '',
    banheiros: '',
    descricao: '',
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

  const handleSubmit = (values) => {
    console.log('Dados do formulário:', values);
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange, handleBlur, handleSubmit, errors, touched, setFieldValue }) => (
          <Form noValidate onSubmit={handleSubmit}>
            {/* Dados do Imóvel */}
            <h4 className="text-center mb-4">Dados do Imóvel</h4>
            <Row className="mb-3">
              <Col>
                <label htmlFor="tipo">Tipo:</label>
                <Field as="select" name="tipo" className="form-control">
                  <option value="">Selecione</option>
                  <option value="casa">Casa</option>
                  <option value="apartamento">Apartamento</option>
                  {/* Adicione mais opções conforme necessário */}
                </Field>
                {errors.tipo && touched.tipo ? <div className="error">{errors.tipo}</div> : null}
              </Col>
              <Col>
                <label htmlFor="finalidade">Finalidade:</label>
                <Field as="select" name="finalidade" className="form-control">
                  <option value="">Selecione</option>
                  <option value="venda">Venda</option>
                  <option value="aluguel">Aluguel</option>
                </Field>
                {errors.finalidade && touched.finalidade ? <div className="error">{errors.finalidade}</div> : null}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="valor">Valor:</label>
                <Field type="number" name="valor" className="form-control" />
                {errors.valor && touched.valor ? <div className="error">{errors.valor}</div> : null}
              </Col>
              <Col>
                <label htmlFor="area">Área (m²):</label>
                <Field type="number" name="area" className="form-control" />
                {errors.area && touched.area ? <div className="error">{errors.area}</div> : null}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="quartos">Quartos:</label>
                <Field type="number" name="quartos" className="form-control" />
                {errors.quartos && touched.quartos ? <div className="error">{errors.quartos}</div> : null}
              </Col>
              <Col>
                <label htmlFor="banheiros">Banheiros:</label>
                <Field type="number" name="banheiros" className="form-control" />
                {errors.banheiros && touched.banheiros ? <div className="error">{errors.banheiros}</div> : null}
              </Col>
              <Col>
                <label htmlFor="vagasGaragem">Vagas de Garagem:</label>
                <Field type="number" name="vagasGaragem" className="form-control" />
                {errors.vagasGaragem && touched.vagasGaragem ? <div className="error">{errors.vagasGaragem}</div> : null}
              </Col>
            </Row>
            <div className="mb-3">
              <label htmlFor="descricao">Descrição:</label>
              <Field as="textarea" name="descricao" className="form-control" rows="3" />
              {errors.descricao && touched.descricao ? <div className="error">{errors.descricao}</div> : null}
            </div>
            <div>
            <label htmlFor="descricao">Descrição</label>
            <Field name="descricao" as="textarea" />
            <ErrorMessage name="descricao" component="div" />
          </div>
           {/* Campo para upload de fotos */}
           <div>
            <label htmlFor="fotos">Fotos do Imóvel</label>
            <input
              id="fotos"
              name="fotos"
              type="file"
              multiple
              onChange={(event) => {
                setFieldValue("fotos", event.currentTarget.files);
              }}
            />
            <ErrorMessage name="fotos" component="div" />
          </div>

            {/* Endereço */}
            <h4 className="text-center mb-4">Endereço</h4>
            <Row className="mb-3">
              <Col>
                <label htmlFor="cep">CEP:</label>
                <InputMask
                  mask="99999-999"
                  value={values.endereco.cep}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  name="endereco.cep"
                />
                {errors.endereco?.cep && touched.endereco?.cep ? <div className="error">{errors.endereco.cep}</div> : null}
              </Col>
              <Col>
                <label htmlFor="logradouro">Logradouro:</label>
                <Field name="endereco.logradouro" className="form-control" />
                {errors.endereco?.logradouro && touched.endereco?.logradouro ? <div className="error">{errors.endereco.logradouro}</div> : null}
              </Col>
              <Col>
                <label htmlFor="numero">Número:</label>
                <Field name="endereco.numero" className="form-control" />
                {errors.endereco?.numero && touched.endereco?.numero ? <div className="error">{errors.endereco.numero}</div> : null}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="bairro">Bairro:</label>
                <Field name="endereco.bairro" className="form-control" />
                {errors.endereco?.bairro && touched.endereco?.bairro ? <div className="error">{errors.endereco.bairro}</div> : null}
              </Col>
              <Col>
                <label htmlFor="cidade">Cidade:</label>
                <Field name="endereco.cidade" className="form-control" />
                {errors.endereco?.cidade && touched.endereco?.cidade ? <div className="error">{errors.endereco.cidade}</div> : null}
              </Col>
              <Col>
                <label htmlFor="UF">UF:</label>
                <Field name="endereco.UF" className="form-control" />
                {errors.endereco?.UF && touched.endereco?.UF ? <div className="error">{errors.endereco.UF}</div> : null}
              </Col>
            </Row>

            {/* Proprietário */}
            <h4 className="text-center mb-4">Proprietário</h4>
            <Row className="mb-3">
              <Col>
                <label htmlFor="nome">Nome do Proprietário:</label>
                <Field name="proprietario.nome" className="form-control" />
                {errors.proprietario?.nome && touched.proprietario?.nome ? <div className="error">{errors.proprietario.nome}</div> : null}
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label htmlFor="CPF">CPF do Proprietário:</label>
                <InputMask
                  mask="999.999.999-99"
                  value={values.proprietario.CPF}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  name="proprietario.CPF"
                />
                {errors.proprietario?.CPF && touched.proprietario?.CPF ? <div className="error">{errors.proprietario.CPF}</div> : null}
              </Col>
              <Col>
                <label htmlFor="telefone">Telefone do Proprietário:</label>
                <InputMask
                  mask="(99) 99999-9999"
                  value={values.proprietario.telefone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="form-control"
                  name="proprietario.telefone"
                />
                {errors.proprietario?.telefone && touched.proprietario?.telefone ? <div className="error">{errors.proprietario.telefone}</div> : null}
              </Col>
            </Row>
            <div className="mb-3">
              <label htmlFor="email">E-mail do Proprietário:</label>
              <Field type="email" name="proprietario.email" className="form-control" />
              {errors.proprietario?.email && touched.proprietario?.email ? <div className="error">{errors.proprietario.email}</div> : null}
            </div>

            {/* Botões */}
            <div className="d-flex justify-content-center mt-4">
              <Button variant="success" type="submit">
                <FaCheck /> Salvar
              </Button>
              <Button variant="danger" type="button" className="ms-3">
                <FaTrash /> Limpar
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormularioImovel;
