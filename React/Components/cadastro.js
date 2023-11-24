import React, { useState } from 'react';
import AuthService from '../Services/AuthService';
import { useNavigate } from 'react-router-dom';
import styles from '../LoginForm.module.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {notification} from 'antd'

const CadastroForm = () => {
  const [formValues, setFormValues] = useState({
    Usuario: '',
    Senha: '',
    Tipo: '',
    CPF: '',
    DataNascimento: '',
  });

  const navigate = useNavigate();

  const botaoVoltar = () => {
    navigate('/login');
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

      const response = await AuthService.cadastro(
        formValues.Usuario,
        formValues.Senha,
        formValues.Tipo,
        formValues.CPF,
        formValues.DataNascimento
      );

      console.log('Cadastrado com sucesso', response);
      notification.success({
				message: 'Cadastrado com sucesso!',
				description: 'Cadastrado com sucesso.',
			});
      navigate('/');

    } catch (error) {
      console.error('Erro no cadastro', error);

    }
  };

  return (
    <div className={`container ${styles.teste}`} >
      <h1 style={{ textAlign: 'center' }}>Cadastrar Usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="col-md-6">
          <label className="form-label">Usuário:</label>
          <input type="text" className="form-control" name="Usuario" value={formValues.Usuario} onChange={handleChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Senha:</label>
          <input type="password" className="form-control" name="Senha" value={formValues.Senha} onChange={handleChange} />
        </div>
        <div className="col-md-12" style={{ display: 'flex',height:'14vh' }}>
          <div className="col-md-6">
            <label className="form-label">CPF:</label>
            <input type="text" className="form-control" name="CPF" value={formValues.CPF} onChange={handleChange} />
          </div>
          <div className="col-md-6" style={{ textAlign: 'center' }}>
            <FontAwesomeIcon style={{ height: '18vh' }} icon={faUser} />
          </div>
        </div>

        <div className="col-md-6" >
          <label className="form-label">Data de Nascimento:</label>
          <input type="text" className="form-control" placeholder='dd/mm/yyyy' name="DataNascimento" value={formValues.DataNascimento} onChange={handleChange} />
        </div>
        <div className="col-md-12" style={{ marginBottom: '2vh' }}>
          <div className="col-md-6">
            <label className="form-label"></label>
            <select type="text" className="form-control" name="Tipo" value={formValues.Tipo} onChange={handleChange}>
              <option value="">Tipo</option>
              <option value="Admin">Admin</option>
              <option value="Usuario">Usuário</option>
            </select>
          </div>



        </div>
        <button type="submit" className="btn btn-primary">
          Confirmar
        </button>&nbsp;&nbsp;&nbsp;
        <button onClick={botaoVoltar} type="submit" className="btn btn-secondary">
          Voltar
        </button>
      </form>
    </div>
  );
};

export default CadastroForm;
