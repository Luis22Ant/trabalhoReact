import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from '../Table.module.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../Services/AuthService';

const TableUsuario = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();


 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7201/api/Login');
        setData(response.data);
      } catch (error) {
        console.error('Erro ao buscar dados da API', error);
      }
    };
    fetchData();
  }, []);

  const botaoSair = () => {
    navigate('/login');
  };



  const telaEdicao = (id) => {
    navigate(`/cadastroEdit/${id}`);
  };

  const deletarRegistro = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7201/api/login/${id}`);
      console.log('Delete successful', response);
      const newData = data.filter(item => item.id !== id);
      setData(newData);

    } catch (error) {
      console.error('Erro ao deletar o registro', error);
    }
  };

  const tabelaEstilo = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    width: '98%',
    marginLeft: '2vh',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 250px)',
  };

  const celulaEstilo = {
    border: '1px solid black',
    backgroundColor: 'gray',
    padding: '8px',
    textAlign: 'left',
  };

  const infoEstilo = {
    border: '1px solid black',
    backgroundColor: 'lightGray',
    padding: '8px',
    textAlign: 'left',
  };

  const containerEstilo = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  };

  const conteudoEstilo = {
    paddingBottom: '60px',
    width: '1150px',
    height: '320px',
    overflow: 'auto',
  };

  const rodapeEstilo = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    background: 'lightgray',
    padding: '10px',
    textAlign: 'right',
    border: '1px solid black',
  };

  return (
    <div className={styles.container} style={containerEstilo}>
      <nav className={styles.menu}>
        <div style={{ marginRight: '85%' }}>
          <FontAwesomeIcon style={{ height: '10vh' }} icon={faUser} />
        </div>

        <li className={styles.menuItem}>
          <Link to="/Table">Produtos</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/tableUsuario">Usuários</Link>
        </li>
      </nav>
      <div className='col-md-12' style={{ display: 'flex' }}>
        <div className='col-md-6'>
          <h2 style={{ marginLeft: '2vh' }}>Usuários</h2>
        </div>
      </div>



      <div style={conteudoEstilo}>
        <table style={tabelaEstilo}>
          <thead>
            <tr>
              <th style={celulaEstilo}> </th>
              <th style={celulaEstilo}></th>
              <th style={celulaEstilo}>ID</th>
              <th style={celulaEstilo}>USUÁRIO</th>
              <th style={celulaEstilo}>TIPO</th>
              <th style={celulaEstilo}>CPF</th>
              <th style={celulaEstilo}>HORA DO CADASTRO</th>
              <th style={celulaEstilo}>DATA DE NASCIMENTO</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={infoEstilo}>
                  <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => telaEdicao(item.id)} icon={faPencil} />
                </td>
                <td style={infoEstilo}>
                  <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={() => deletarRegistro(item.id)} icon={faTrash} />
                </td>
                <td style={infoEstilo}>{item.id}</td>
                <td style={infoEstilo}>{item.usuario}</td>
                <td style={infoEstilo}>{item.tipo}</td>
                <td style={infoEstilo}>{item.cpf}</td>
                <td style={infoEstilo}>{item.horaCadastro}</td>
                <td style={infoEstilo}>{item.dataNascimento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={rodapeEstilo}>
        <FontAwesomeIcon style={{ cursor: 'pointer' }} onClick={botaoSair} icon={faRightFromBracket} />
      </div>
    </div>
  );
};

export default TableUsuario;
