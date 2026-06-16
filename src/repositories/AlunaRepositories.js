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

        // 1. Captura as presenças puras
        const presentes = Number(resultado.find(x => x.status.toUpperCase() === 'PRESENTE')?.total || 0);

        // 2. Captura os atestados
        const atestados = Number(resultado.find(x => x.status.toUpperCase() === 'ATESTADO')?.total || 0);

        // 3. Captura e soma as faltas (padrão antigo e novo)
        const ausentes = Number(resultado.find(x => x.status.toUpperCase() === 'AUSENTE')?.total || 0);
        const faltas = Number(resultado.find(x => x.status.toUpperCase() === 'FALTA')?.total || 0);
        const faltasComuns = ausentes + faltas;

        // 4. Agrupa atestados junto com as faltas no total de ausências
        const totalFaltasEAtendidos = faltasComuns + atestados;

        // 5. O total de aulas é a soma de tudo
        const totalGeralAulas = presentes + totalFaltasEAtendidos;

        // 6. Calcula a taxa considerando o atestado como peso negativo
        const taxaPresenca = totalGeralAulas > 0
            ? ((presentes / totalGeralAulas) * 100).toFixed(2)
            : '0.00';

        return `${taxaPresenca}%`;
    }
}

module.exports = new AlunaRepositories();