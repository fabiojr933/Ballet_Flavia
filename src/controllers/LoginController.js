var crypto = require('crypto');

class LoginController {

  async index(req, res) {
    try {
      res.render('login/index');
    } catch (error) {
      req.flash('error', 'Erro: ' + error.message);
      return res.redirect('/login');
    }
  }

  async autenticar(req, res) {
    try {
      const { password } = req.body;

      if (password === '0108') {

        // salva a senha no localStorage via script
        req.session.user = {
          token: crypto.createHash('md5').update(password).digest("hex")
        }
        return res.send(`
        <script>
          localStorage.setItem('senha', '${password}');
          window.location.href = '/dashboard';
        </script>
      `);

      } else {
        req.flash('error', 'Senha inválida');
        return res.redirect('/login');
      }

    } catch (error) {
      return res.redirect('/login');
    }
  }

  async sair(req, res) {
    try {
      req.session.destroy(() => {
        return res.send(`
      <script>
        localStorage.removeItem('senha');
        window.location.href = '/login';
      </script>
    `);
      });
    } catch (error) {
      return res.redirect('/login');
    }
  }
}

module.exports = new LoginController();
