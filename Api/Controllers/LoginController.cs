using ApiLojaEletronicos.Entities;
using ApiLojaEletronicos.Persistence;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Globalization;

namespace ApiLojaEletronicos.Controllers
{
    [Route("api/Login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly LoginDbContext _context;
        public LoginController(LoginDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            var login = _context.Login;
            if (login == null)
                return NotFound();

            return Ok(login);
        }

        [HttpGet("{id}")]
        public ActionResult GetById(Guid id)
        {
            var login = _context.Login
              .SingleOrDefault(d => d.Id == id);
            if (login == null)
                return NotFound();

            return Ok(login);
        }
        [HttpPost("login")]
        public ActionResult Login(Login login)
        {
            var user = _context.Login.SingleOrDefault(u => u.Usuario == login.Usuario && u.Senha == login.Senha);

            if (user == null)
            {
       
                return Unauthorized();
            }
            else
            {

                return Ok(new { TipoLogin = user.Tipo });
            }

   

        }

        [HttpPost("cadastro")]
        public ActionResult Cadastro(Login novoUsuario)
        {
            novoUsuario.HoraCadastro = DateTime.Now;
            var user = _context.Login.SingleOrDefault(u => u.Usuario == novoUsuario.Usuario && u.Senha == novoUsuario.Senha);
           

            if (user != null)
            {
                return Conflict("Usuário com o mesmo nome de usuário já existe.");
            }

            _context.Login.Add(novoUsuario);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = novoUsuario.Id }, new { Mensagem = "Usuário criado com sucesso!" });

        }


        [HttpPut("{id}")]
        public ActionResult Update(Guid id, Login logins)
        {
            var login = _context.Login.SingleOrDefault(d => d.Id == id);
            if (login == null)
                return NotFound();

            login.Update(logins.Usuario, logins.Senha, logins.Cpf, logins.Tipo, logins.DataNascimento);

            _context.Login.Update(login);

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]

        public ActionResult Delete(Guid id)
        {
            var login = _context.Login.SingleOrDefault(d => d.Id == id);
            if (login == null)
                return NotFound();

            _context.Login.Remove(login);

            _context.SaveChanges();
            return NoContent();
        }
    }
}
