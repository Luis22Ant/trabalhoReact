import React, { useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../LoginForm.module.css';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const EditarProduto = () => {
  const [formValues, setFormValues] = useState({
    nome: '',
    valor: '',
    Quantidade: '',
    marca: '',
  });


  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7201/api/Produtos/${id}`);
        console.log(response.data);
        setFormValues(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      }
    };
    fetchData();
  }, [id]);

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
   
      const response = await AuthService.editarProduto(id, formValues.nome, formValues.valor, formValues.quantidade, formValues.marca);

      console.log('Produto atualizado com sucesso', response);
    
      navigate('/table');
    } catch (error) {
      console.error('Erro na atualização', error);
 
    }
  };

  return (
    <div className={`container ${styles.teste}`}>
      <h1 style={{ textAlign: 'center' }}>Editar Produto</h1>
      <form onSubmit={handleSubmit}>
      {Object.keys(formValues).map((key) =>   (key !== 'id' && key !== 'isDelete' && key !== 'dataCadastro') && (
          <div className="col-md-6">
            <label className="form-label">{key}:</label>
            <input type="text" className="form-control" name={key} value={formValues[key]} onChange={handleChange} />
          </div>
        ))}
         <div className="col-md-9" style={{ textAlign: 'right',position:'absolute',top:'33vh' }}>
            <FontAwesomeIcon style={{ height: '1vh' }} icon={faBoxOpen} />
          </div>
        <div style={{ marginTop: '3%' }}>
          <button type="submit" className="btn btn-primary">
            Confirmar
          </button>&nbsp;&nbsp;&nbsp;
          <button type="button" onClick={botaoVoltar} className="btn btn-secondary">
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarProduto;






