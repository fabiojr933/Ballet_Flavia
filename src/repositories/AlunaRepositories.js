const knex = require('../config/database');
const axios = require('axios');

class AlunaRepositories {

    async save(data) {
        const result = await knex('alunas')
            .insert(data)
            .returning(['id']);

        return {
            id: result[0].id,
            ...data
        };
    }

    async all() {
        const alunas = await knex('alunas').orderBy('created_at', 'asc');
        const total = await knex('alunas').count('id as total').first();

        return {
            data: alunas,
            total: total.total
        };
    }

    async get(alunaId) {

        return await knex('alunas')
            .where({
                id: alunaId
            })
            .first();

    }

    async update(id, data) {
        const updatedRows = await knex('alunas')
            .where({ id })
            .update(data);

        if (updatedRows === 0) {
            throw new Error('Aluna não encontrado');
        }

        return {
            id,
            ...data
        };
    }

    async delete(id) {

        return await knex('alunas')
            .where({ id })
            .del();

    }

    async enviar_mensagem_falta(aluna, mensagem) {

        try {

            const response = await axios.post(
                `${process.env.SERVIDOR_ZAP}/chat/send/text`,
                {
                    Phone: `55${aluna.telefone}`,
                    Body: mensagem
                },
                {
                    headers: {
                        //  Authorization: `Bearer ${process.env.ADMIN_TOKEN}`,
                        token: process.env.APIKEY,
                        'Content-Type': 'application/json'
                    }
                }
            );

            await knex('mensagem_enviada').insert({
                campanha_id: null,
                mensagem: mensagem,
                numero: aluna.telefone,
                status: 'ENVIADO'
            });

            return response.data;

        } catch (error) {

            await knex('mensagem_enviada').insert({
                campanha_id: null,
                mensagem: mensagem,
                numero: aluna.telefone,
                status: 'ERROR'
            });

        }
    }
    async taxaPresenca() {
        const resultado = await knex('chamadas')
            .select('status')
            .count('id as total')
            .groupBy('status');

        const presentes = Number(resultado.find(x => x.status === 'PRESENTE')?.total || 0);
        const ausentes = Number(resultado.find(x => x.status === 'AUSENTE')?.total || 0);

        const total = Number(presentes) + Number(ausentes);

        const taxaPresenca = total > 0 ? ((Number(presentes) / total) * 100).toFixed(2) : '0.00';

        return `${taxaPresenca}%`;
    }
}

module.exports = new AlunaRepositories();