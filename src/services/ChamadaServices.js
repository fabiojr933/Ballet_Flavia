const ChamadaRepositories = require('../repositories/ChamadaRepositories');
const config = require('../repositories/ConfiguracaoRepositories');
const AlunaServices = require('../services/AlunaServices');

class ChamadaServices {

    async save(data) {
        try {
            return await ChamadaRepositories.save(data);
        } catch (error) {
            throw error;
        }
    }

    async all() {
        try {
            return await ChamadaRepositories.all();
        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            return await ChamadaRepositories.update(id, data);
        } catch (error) {
            throw error;
        }
    }

    async relatorio() {
        try {
            return await ChamadaRepositories.relatorio();
        } catch (error) {
            throw error;
        }
    }

    async Ausente(data) {
        try {
            const alunas = await AlunaServices.get(parseInt(data.aluna_id));
        
            let mensagem = await config.all();
            mensagem = mensagem[0].mensagem_falta
                .replace(/{{nome_aluna}}/g, alunas.nome)
                .replace(/{{responsavel}}/g, alunas.responsavel)
                .replace(/{{professora}}/g, 'Prof°: Flavia')
                .replace(/{{turma}}/g, alunas.turma === '1' ? 'Turma 4/6 anos' : 'Turma 7/11 anos');

            await AlunaServices.enviar_mensagem_falta(alunas, mensagem);
        } catch (error) {
      
        }
    }

}

module.exports = new ChamadaServices();