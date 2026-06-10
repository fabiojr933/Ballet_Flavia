const knex = require('../config/database');

class ChamadaRepositories {

    async save(data) {
        const result = await knex('chamadas')
            .insert(data)
            .returning(['id']);

        return {
            id: result[0].id,
            ...data
        };
    }

    async all() {
        const alunas_chamadas = await knex('alunas')
            .join('chamadas', 'alunas.id', 'chamadas.aluna_id')
            .select(
                'chamadas.id',
                'alunas.nome',
                'chamadas.aluna_id',
                knex.raw("TO_CHAR(chamadas.data, 'YYYY-MM-DD') as data"),
                'chamadas.turma',
                'chamadas.status'
            )
            .orderBy('alunas.created_at', 'asc');
        const resultado = await knex('alunas')
            .join('chamadas', 'alunas.id', 'chamadas.aluna_id')
            .select('chamadas.status')
            .count('chamadas.aluna_id as total')
            .groupBy('chamadas.status');

        return {
            alunas_chamadas: alunas_chamadas,
            total: resultado
        };
    }

    async update(id, data) {
        const updatedRows = await knex('chamadas')
            .where({ id })
            .update(data);

        if (updatedRows === 0) {
            throw new Error('Chamada não encontrado');
        }

        return {
            id,
            ...data
        };
    }

    async relatorio() {
        const resultado = await knex('alunas')
            .join('chamadas', 'alunas.id', 'chamadas.aluna_id')
            .select(
                'chamadas.status',
                'alunas.nome',
                'alunas.turma'
            )
            .count('chamadas.aluna_id as total')
            .groupBy(
                'chamadas.status',
                'alunas.nome',
                'alunas.turma'
            );

        const total = await knex('chamadas')
            .countDistinct('data as total_aulas')
            .first();

        return {
            chamadas: resultado,
            total: total
        };
    }

}

module.exports = new ChamadaRepositories();