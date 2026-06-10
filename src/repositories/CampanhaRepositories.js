const knex = require('../config/database');

class CampanhaRepositories {

    async save(data) {
    const result = await knex('campanhas')
        .insert(data)
        .returning(['id']);

    return {
        id: result[0].id,
        ...data
    };
}

async all() {
    const campanhas = await knex('campanhas').orderBy('status', 'desc');
    const total = await knex('campanhas').count('id as total').first();

    return {
        data: campanhas,
        total: total.total
    };
}

    async get(campanhaId) {

        return await knex('campanhas')
            .where({
                id: campanhaId
            })
            .first();

    }

    async update(id, data) {
        const updatedRows = await knex('campanhas')
            .where({ id })
            .update(data);

        if (updatedRows === 0) {
            throw new Error('Campanha não encontrado');
        }

        return {
            id,
            ...data
        };
    }

    async delete(id) {

        return await knex('campanhas')
            .where({ id })
            .del();

    }
}

module.exports = new CampanhaRepositories();