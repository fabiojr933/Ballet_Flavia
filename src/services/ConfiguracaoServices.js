const ConfiguracaoRepositories = require('../repositories/ConfiguracaoRepositories');

class ConfiguracaoServices {

    async all() {
        try {
            return await ConfiguracaoRepositories.all();
        } catch (error) {
            throw new Error('Erro ao listar configuracao: ' + error.message);

        }
    }

    async save(data) {
        try {
            return await ConfiguracaoRepositories.save(data);
        } catch (error) {
            throw error;
        }
    }

    async update(data) {
        try {
            return await ConfiguracaoRepositories.update(data);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new ConfiguracaoServices();