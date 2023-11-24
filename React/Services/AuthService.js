class AuthService {
  static async login(usuario, senha) {
    const apiUrl = 'https://localhost:7201/api/Login/login';
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          senha,
        }),

      });
   
  
      if (!response.ok) {
        throw new Error('Login failed');
      } else {
        const data = await response.json();
          return data;
      }

    } catch (error) {
      // Trate o erro aqui, se necessário
      console.error(error);
      throw new Error('Login failed');
    }
  }


  static async cadastro(usuario, senha, tipo, cpf, dataNascimento) {
    const apiUrl = 'https://localhost:7201/api/Login/cadastro';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          senha,
          tipo,
          cpf,
          dataNascimento
        }),
      });

      // Agora, aguardamos a resposta do servidor usando response.json()
      const responseData = await response.json();

      // Exiba a resposta no console para fins de depuração
      console.log('Resposta do servidor:', responseData);

      if (!response.ok) {
        // Se a resposta não estiver ok, lance um erro
        throw new Error('Login failed');
      } else {
        // Se a resposta estiver ok, imprima 'Deu certo!'
        console.log('Deu certo!');
      }
    } catch (error) {
      // Trate o erro aqui, se necessário
      console.error(error);
      throw new Error('Login failed');
    }
  }


  static async cadastroProduto(nome, valor, quantidade, marca) {
    const apiUrl = 'https://localhost:7201/api/Produtos/cadastroProduto';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          valor,
          quantidade,
          marca
        }),
      });

      // Agora, aguardamos a resposta do servidor usando response.json()
      const responseData = await response.json();

      // Exiba a resposta no console para fins de depuração
      console.log('Resposta do servidor:', responseData);

      if (!response.ok) {
        // Se a resposta não estiver ok, lance um erro
        throw new Error('Insert produto failed');
      } else {
        // Se a resposta estiver ok, imprima 'Deu certo!'
        console.log('Deu certo!');
      }
    } catch (error) {
      // Trate o erro aqui, se necessário
      console.error(error);
      throw new Error('Insert produto failed');
    }
  }

  static async deletarProduto(id) {
    const apiUrl = `https://localhost:7201/api/Produtos/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id
        }),
      });

      // Verifica o status da resposta
      if (!response.ok) {
        throw new Error('delete produto failed');
      }

      // Se a resposta estiver ok, verifica se há conteúdo e faz o reload
      if (response.status === 204 || response.status === 200) {
        window.location.reload();
      } else {
        throw new Error('delete produto failed');
      }
    } catch (error) {
      console.error(error);
      throw new Error('delete produto failed');
    }
  }


  static async editarProduto(id, nome, valor, quantidade, marca) {
    const apiUrl = `https://localhost:7201/api/Produtos/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          valor,
          quantidade,
          marca
        }),
      });

      // Agora, aguardamos a resposta do servidor usando response.json()
      const responseData = await response.json();

      // Exiba a resposta no console para fins de depuração
      console.log('Resposta do servidor:', responseData);

      if (!response.ok) {
        throw new Error('Edit produto failed');
      }


      if (response.status === 204 || response.status === 200) {
        console.log("Atualizado com sucesso!")
      } else {
        throw new Error('Edit produto failed');
      }
    } catch (error) {
      // Trate o erro aqui, se necessário
      console.error(error);
      throw new Error('Edit produto failed');
    }
  }


  static async editarUsuario(id, usuario, senha, tipo, cpf, dataNascimento) {
    const apiUrl = `https://localhost:7201/api/Login/${id}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          usuario,
          senha,
          tipo,
          cpf,
          dataNascimento
        }),
      });

      // Agora, aguardamos a resposta do servidor usando response.json()
      const responseData = await response.json();

      // Exiba a resposta no console para fins de depuração
      console.log('Resposta do servidor:', responseData);

      if (!response.ok) {
        throw new Error('Edit login failed');
      }


      if (response.status === 204 || response.status === 200) {
        console.log("Atualizado com sucesso!")
      } else {
        throw new Error('Edit login failed');
      }
    } catch (error) {
      // Trate o erro aqui, se necessário
      console.error(error);
      throw new Error('Edit produto failed');
    }
  }

}

export default AuthService;
