import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faBox, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import styles from '../Table.module.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Table = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [marcaProduto, setTipoUsuario] = useState('');
  const [produtosFiltrados, setFiltro] = useState([]);
  const [filtroAtivo, setFiltroAtivo] = useState(false);

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

  const handleTipoUsuarioChange = (event) => {
    setTipoUsuario(event.target.value);
  };

  const filtrarProduto = () => {
    try {
      if (marcaProduto !== "") {
        setFiltroAtivo(true);
        const produtosFiltrados = data.filter((response) => response.marca === marcaProduto);
        setFiltro(produtosFiltrados);
      } else {
        setFiltroAtivo(false); 
      }
    } catch (error) {
      console.error('Erro ao filtrar produtos', error);
    }
  };

  const botaoSair = () => {
    navigate('/login');
  };

  const botaoIncluir = () => {
    navigate('/cadastroProduto');
  };

  const telaEdicao = (id) => {
    navigate(`/editarProduto/${id}`);
  };

  const deletarRegistro = async (id) => {
    try {
      const response = await axios.delete(`https://localhost:7201/api/Produtos/${id}`);
      console.log('Delete successful', response);
      const newData = data.filter((item) => item.id !== id);
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
          <FontAwesomeIcon style={{ height: '10vh' }} icon={faBox} />
        </div>

        <li className={styles.menuItem}>
          <Link to="/Table">Produtos</Link>
        </li>
        <li className={styles.menuItem}>
          <Link to="/tableUsuario">Usuários</Link>
        </li>
      </nav>

      <button
        className="btn btn-primary"
        style={{ marginBottom: '2vh', width: '12vh', marginLeft: '2vh', marginTop: '2vh' }}
        onClick={botaoIncluir}
      >
        Incluir
      </button>

      <div className='col-md-12' style={{ display: 'flex' }}>
        <div className='col-md-6'>
          <h2 style={{ marginLeft: '2vh' }}>Produtos</h2>
        </div>
        <div className='col-md-4' style={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
          <div style={{ marginRight: '2vh' }}>
            <select style={{ border: '1px solid black' }} value={marcaProduto} className='form-control' onChange={handleTipoUsuarioChange}>
              <option value="">Listar Todos</option>
              <option value="Apple">Apple</option>
              <option value="Sony">Sony</option>
              <option value="Nike">Nike</option>
              <option value="Dell">Dell</option>
              <option value="Samsung">Samsung</option>
              <option value="Diamond">Diamond</option>
              <option value="Adidas">Adidas</option>
            </select>
          </div>

       
        </div>
      </div>

      <div style={conteudoEstilo}>
        <table style={tabelaEstilo}>
          <thead style={{ position: 'sticky', top: '0px' }}>
            <tr>
              <th style={celulaEstilo}> </th>
              <th style={celulaEstilo}></th>
              <th style={celulaEstilo}>ID</th>
              <th style={celulaEstilo}>NOME</th>
              <th style={celulaEstilo}>VALOR</th>
              <th style={celulaEstilo}>QUANTIDADE</th>
              <th style={celulaEstilo}>MARCA</th>
              <th style={celulaEstilo}>DATA DO CADASTRO</th>
            </tr>
          </thead>
          <tbody>
            {filtroAtivo
              ? produtosFiltrados.map((item) => (
                  <tr key={item.id}>
                    <td style={infoEstilo}>
                      <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => telaEdicao(item.id)}
                        icon={faPencil}
                      />
                    </td>
                    <td style={infoEstilo}>
                      <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => deletarRegistro(item.id)}
                        icon={faTrash}
                      />
                    </td>
                    <td style={infoEstilo}>{item.id}</td>
                    <td style={infoEstilo}>{item.nome}</td>
                    <td style={infoEstilo}>{item.valor}</td>
                    <td style={infoEstilo}>{item.quantidade}</td>
                    <td style={infoEstilo}>{item.marca}</td>
                    <td style={infoEstilo}>{item.dataCadastro}</td>
                  </tr>
                ))
              : marcaProduto === ""
              ? data.map((item) => (
                  <tr key={item.id}>
                    <td style={infoEstilo}>
                      <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => telaEdicao(item.id)}
                        icon={faPencil}
                      />
                    </td>
                    <td style={infoEstilo}>
                      <FontAwesomeIcon
                        style={{ cursor: 'pointer' }}
                        onClick={() => deletarRegistro(item.id)}
                        icon={faTrash}
                      />
                    </td>
                    <td style={infoEstilo}>{item.id}</td>
                    <td style={infoEstilo}>{item.nome}</td>
                    <td style={infoEstilo}>{item.valor}</td>
                    <td style={infoEstilo}>{item.quantidade}</td>
                    <td style={infoEstilo}>{item.marca}</td>
                    <td style={infoEstilo}>{item.dataCadastro}</td>
                  </tr>
                ))
              : data
                  .filter((response) => response.marca === marcaProduto)
                  .map((item) => (
                    <tr key={item.id}>
                      <td style={infoEstilo}>
                        <FontAwesomeIcon
                          style={{ cursor: 'pointer' }}
                          onClick={() => telaEdicao(item.id)}
                          icon={faPencil}
                        />
                      </td>
                      <td style={infoEstilo}>
                        <FontAwesomeIcon
                          style={{ cursor: 'pointer' }}
                          onClick={() => deletarRegistro(item.id)}
                          icon={faTrash}
                        />
                      </td>
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

export default Table;
