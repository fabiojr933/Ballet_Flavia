const CampanhaRepositories = require('../repositories/CampanhaRepositories');

class CampanhaServices {

    async all() {
        try {
            return await CampanhaRepositories.all();
        } catch (error) {
            throw new Error('Erro ao listar campanhas: ' + error.message);

        }
    }

    async save(data) {
        try {

            if (!data.nome) {
                throw new Error('Nome é obrigatório');
            }
            if (!data.mensagem) {
                throw new Error('Mensagem é obrigatório');
            }
            if (!data.repete) {
                throw new Error('Repete é obrigatório');
            }

            return await CampanhaRepositories.save(data);

        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            if (!id) {
                throw new Error('Campanha não informado');
            }
            return await CampanhaRepositories.update(id, data);
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {

            if (!id) {
                throw new Error('Precisa selecionar uma campanha');
            }

            const resultado = await CampanhaRepositories.delete(id);

            if (!resultado) {
                throw new Error('Campanha não encontrado');
            }
            return resultado;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new CampanhaServices();