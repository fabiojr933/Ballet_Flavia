const ProcessarRepositories = require('../repositories/ProcessarRepositories');
const AlunasService = require('../services/AlunaServices');

class AlunaServices {

    async processar() {

        const campanhas = await ProcessarRepositories.buscarPendentes();

        for (const campanha of campanhas) {

            try {

                // await ProcessarRepositories.marcarProcessando(campanha.id);
                await this.enviar(campanha);
                await this.atualizarProximaExecucao(campanha);
            } catch (error) {
                await ProcessarRepositories.atualizar(campanha.id, { status: 'PENDENTE' });
            }
        }
    }

    async enviar(campanha) {

        const alunas = await AlunasService.all();

        for (const aluna of alunas.data) {

            campanha.mensagem = campanha.mensagem
                .replace(/{{nome_aluna}}/g, aluna.nome)
                .replace(/{{responsavel}}/g, aluna.responsavel)
                .replace(/{{professora}}/g, 'Prof°: Flavia')
                .replace(/{{turma}}/g, aluna.turma === '1' ? 'Turma 4/6 anos' : 'Turma 7/11 anos');

               
            await ProcessarRepositories.enviar_mensagem(
                aluna,
                campanha
            );
        }
    }

    async atualizarProximaExecucao(campanha) {

        let proxima = new Date(campanha.proxima_execucao);
        switch (campanha.repete) {
            case 'NAO':
                await ProcessarRepositories.atualizar(campanha.id, { status: 'ENVIADO', ativo: false });
                break;

            case 'DIARIO':
                proxima.setDate(proxima.getDate() + 1);
                await ProcessarRepositories.atualizar(campanha.id, { proxima_execucao: proxima, status: 'PENDENTE' });
                break;

            case 'SEMANAL':
                proxima.setDate(proxima.getDate() + 7);
                await ProcessarRepositories.atualizar(campanha.id, { proxima_execucao: proxima, status: 'PENDENTE' });
                break;

            case 'MENSAL':
                proxima.setMonth(proxima.getMonth() + 1);
                await ProcessarRepositories.atualizar(campanha.id, { proxima_execucao: proxima, status: 'PENDENTE' });
                break;
        }
    }
}

module.exports = new AlunaServices();