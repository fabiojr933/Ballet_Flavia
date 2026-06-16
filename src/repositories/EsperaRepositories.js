const knex = require('../config/database');
const axios = require('axios');

class EsperaRepositories {

    async save(data) {
        const result = await knex('lista_espera')
            .insert(data)
            .returning(['id']);

        return {
            id: result[0].id,
            ...data
        };
    }

    async all() {
        const alunas = await knex('lista_espera').orderBy('created_at', 'asc');

        return { data: alunas };
    }

    async get(alunaId) {
        return await knex('lista_espera')
            .where({
                id: alunaId
            })
            .select(
                'nome',
                'data_nascimento',
                'turma',
                'responsavel',
                'telefone'
            )
            .first();
    }

    async delete(id) {

        return await knex('lista_espera')
            .where({ id })
            .del();

    }
}

module.exports = new EsperaRepositories();