class AuthService {
    // static async login(usuario, senha) {

    //     const apiUrl = 'https://cba8-186-235-109-67.ngrok-free.app/api/Login'
    //     console.log(usuario)
    //     try {
    //       const response = await fetch(apiUrl, {
    //         method: 'POST',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //           usuario,
    //           senha,
    //         }),

    //       });


    //       if (!response.ok) {
    //         console.log(usuario)
    //         throw new Error('Login failed');
    //       } else {
    //         const data = await response.json();
    //           return data;
    //       }

    //     } catch (error) {
    //       console.error(error);
    //       throw new Error('Login failed');
    //     }
    //   }


    static async RegistrarUsuario(usuario, senha, cpf, dataNascimento) {
        const apiUrl = `https://457c-186-235-109-67.ngrok-free.app/api/Login/cadastro`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    usuario,
                    senha,
                    cpf,
                    dataNascimento,
                }),
            });

            if (!response.ok) {
                console.error(`Erro no registro para ${usuario}: ${response.statusText}`);
               return false;
            }

            const data = await response.json();
            return true;
        } catch (error) {
            console.error(`Erro no registro para ${usuario}: ${error.message}`);
            throw new Error('Registro falhou');
        }
    }
}
export default AuthService