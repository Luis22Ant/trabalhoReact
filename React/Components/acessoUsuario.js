import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from '../Table.module.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const AcessoUsuario = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7201/api/Produtos');
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
          <FontAwesomeIcon style={{ height: '10vh' }} icon={faBox} />
        </div>

        <li className={styles.menuItem}>
          <Link to="/acessoUsuario">Produtos</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/tableUsuarioUsuario">Usuários</Link>
        </li>
      </nav>
      <h2 style={{ marginLeft: '2vh' }}>Produtos</h2>

      <div style={conteudoEstilo}>
        <table style={tabelaEstilo}>
          <thead style={{ position: 'sticky', top: '0px' }}>
            <tr>
              <th style={celulaEstilo}>ID</th>
              <th style={celulaEstilo}>NOME</th>
              <th style={celulaEstilo}>VALOR</th>
              <th style={celulaEstilo}>QUANTIDADE</th>
              <th style={celulaEstilo}>MARCA</th>
              <th style={celulaEstilo}>DATA DO CADASTRO</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.id}>
                <td style={infoEstilo}>{item.id}</td>
                <td style={infoEstilo}>{item.nome}</td>
                <td style={infoEstilo}>{item.valor}</td>
                <td style={infoEstilo}>{item.quantidade}</td>
                <td style={infoEstilo}>{item.marca}</td>
                <td style={infoEstilo}>{item.dataCadastro}</td>
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

export default AcessoUsuario;
