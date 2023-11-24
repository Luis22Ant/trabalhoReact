import React, { useState } from 'react';
import AuthService from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import styles from '../LoginForm.module.css';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {notification} from 'antd';

const CadastroProduto = () => {
  const [formValues, setFormValues] = useState({
    Nome: '',
    Valor: '',
    Quantidade: '',
    Marca: '',
  });

  const navigate = useNavigate();

  const botaoVoltar = () => {
    navigate('/table');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const response = await AuthService.cadastroProduto(
        formValues.Nome,
        formValues.Valor,
        formValues.Quantidade,
        formValues.Marca
      );

      console.log('Produto cadastrado com sucesso', response);
      notification.success({
				message: 'Produto cadastrado com sucesso!',
				description: 'Produto cadastrado com sucesso.',
			});

      navigate('/table');
    } catch (error) {
      console.error('Erro no cadastro', error);
     
    }
  };

  return (
    <div className={`container ${styles.teste}`}>
      <h1 style={{ textAlign: 'center' }}>Cadastrar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Nome:</label>
          <input type="text" className="form-control" name="Nome" value={formValues.Nome} onChange={handleChange} />
        </div>
        <div className="col-md-12" style={{ display: 'flex' }}>
          <div className="col-md-6">
            <label className="form-label">Valor:</label>
            <input type="text" className="form-control" name="Valor" value={formValues.Valor} onChange={handleChange} />
          </div>
          <div className="col-md-6" style={{ textAlign: 'center' }}>
            <FontAwesomeIcon style={{ height: '10vh' }} icon={faBoxOpen} />
          </div>
        </div>

        <div className="col-md-6" style={{ marginBottom: '2vh' }}>
          <label className="form-label">Quantidade:</label>
          <input type="text" className="form-control" name="Quantidade" value={formValues.Quantidade} onChange={handleChange} />
        </div>
        <div className="col-md-6" style={{ marginBottom: '2vh' }}>
          <label className="form-label">Marca:</label>
          <input type="text" className="form-control" name="Marca" value={formValues.Marca} onChange={handleChange} />
        </div>
        <div style={{ marginTop: '3%' }}>
          <button type="submit" className="btn btn-primary">
            Confirmar
          </button>&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={botaoVoltar} className="btn btn-secondary">
            Voltar
          </button>
        </div>

      </form >
    </div >
  );
};

export default CadastroProduto;
