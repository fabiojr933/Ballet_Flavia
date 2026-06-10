const AniversarioRepositories = require('../repositories/AniversarioRepositories');
const config = require('../repositories/ConfiguracaoRepositories');
class AniversarioServices {

    async Verificar() {

        const niver = await AniversarioRepositories.buscarAniversariantes();
   
        for (const alunas of niver) {
            try {
                let mensagem = await config.all();
                mensagem = mensagem[0].mensagem_aniversario
                    .replace(/{{nome_aluna}}/g, alunas.nome)
                    .replace(/{{responsavel}}/g, alunas.responsavel)
                    .replace(/{{professora}}/g, 'Prof°: Flavia')
                    .replace(/{{turma}}/g, alunas.turma === '1' ? 'Turma 4/6 anos' : 'Turma 7/11 anos');

           
                await AniversarioRepositories.enviar_mensagem(alunas, mensagem);
            } catch (error) {
            }
        }
    }

}

module.exports = new AniversarioServices();