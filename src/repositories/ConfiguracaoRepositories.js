const knex = require('../config/database');

class ConfiguracaoRepositories {

    async all() {
        return await knex('configuracao')
            .orderBy('created_at', 'asc');
    }


    async save(data) {
        const result = await knex('configuracao')
            .insert(data);

        return {
            data
        };
    }

    async update(data) {
        const updatedRows = await knex('configuracao')
            .update(data);

        if (updatedRows === 0) {
            throw new Error('configuração não encontrado');
        }
    }


}

module.exports = new ConfiguracaoRepositories();