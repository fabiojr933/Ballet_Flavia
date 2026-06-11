const ConfiguracaoServices = require("../services/ConfiguracaoServices");

class ConfiguracaoController {
async index(req, res) {
  try {
    const data = await ConfiguracaoServices.all();

    const config = data?.[0] || {};

    const dados_config = {
      mensagem_falta: config.mensagem_falta || '',
      mensagem_aniversario: config.mensagem_aniversario || '',
      mensagem_lembrete_horario: config.mensagem_lembrete_horario || '',
    };

    return res.render('configuracao/index', { dados_config });

  } catch (error) {
    req.flash('error', 'Erro: ' + error.message);
    return res.redirect('/login');
  }
}
  async save(req, res) {
    try {
      const data = {
        mensagem_falta: req.body.msg_falta,
        mensagem_aniversario: req.body.msg_aniversario,
        mensagem_lembrete_horario: req.body.msg_horario,
      }
      await ConfiguracaoServices.update(data);
      req.flash('info', 'Configuração atualizada sucesso!');
      return res.redirect('/configuracao');
    } catch (error) {
      req.flash('error', 'Erro: ' + error.message);
      return res.redirect('/login');
    }
  }
}

module.exports = new ConfiguracaoController();

/*
// Exemplo de como você vai trocar os parâmetros no backend na hora do disparo:
let mensagemTemplate = config.msg_falta; // Ex: "Olá {{nome}}, sentimos sua falta no dia {{data}}!"

// Substituição dinâmica
let mensagemFormatada = mensagemTemplate
    .replace(/{{nome}}/g, aluna.nome)
    .replace(/{{data}}/g, chamada.data)
    .replace(/{{turma}}/g, chamada.turma === '1' ? 'Turma Baby' : 'Turma Infantil');

// Agora é só passar a 'mensagemFormatada' para o serviço da API do WhatsApp!

*/