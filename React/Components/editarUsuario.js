import React, { useState, useEffect } from 'react';
import AuthService from '../Services/AuthService';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../LoginForm.module.css';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

const CadastroEdit = () => {
    const [formValues, setFormValues] = useState({
        usuario: '',
        senha: '',
        tipo: '',
        cpf: '',
        dataNascimento: '',
    });
    
    const { id } = useParams();

    const navigate = useNavigate();

    const botaoVoltar = () => {
        navigate('/tableUsuario');
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get(`https://localhost:7201/api/Login/${id}`);
            console.log(response.data);
            setFormValues(response.data);
          } catch (error) {
            console.error('Erro ao buscar dados da API', error);
          }
        };
        fetchData();
      }, [id]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await AuthService.editarUsuario(
                id,
                formValues.usuario,
                formValues.senha,
                formValues.tipo,
                formValues.cpf,
                formValues.dataNascimento
            );

            console.log('Atualizado com sucesso', response);
    
        } catch (error) {
            console.error('Erro na atualização', error);
        }
    };

    return (
        <div className={`container ${styles.teste}`} >
            <h1 style={{ textAlign: 'center' }}>Editar Usuário</h1>
            <form onSubmit={handleSubmit}>
            {Object.keys(formValues).map((key) =>(key !== 'id' && key !== 'horaCadastro') && (
                <div className="col-md-6">
                    <label className="form-label">{key}:</label>
                    <input type="text" className="form-control" name={key} value={formValues[key]} onChange={handleChange} />
                </div>
                   ))}
                <div className="col-md-9" style={{ textAlign: 'right',position:'absolute',top:'34vh'}}>
                        <FontAwesomeIcon style={{ height: '18vh' }} icon={faUser} />
                    </div>
                    <div style={{marginTop: '2vh'  }}>
                    <button type="submit" className="btn btn-primary" >
                    Confirmar
                </button>&nbsp;&nbsp;&nbsp;
                <button onClick={botaoVoltar} type="submit" className="btn btn-secondary">
                    Voltar
                </button>
                    </div>
          
            </form>
        </div>
    );
};

export default CadastroEdit;
