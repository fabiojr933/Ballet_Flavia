const knex = require('../config/database');

class DashboardRepositories {

    async all() {
        const mensagem_enviada = await knex('mensagem_enviada').count('id as total').where('status', 'ENVIADO');
        const campanha = await knex('campanhas').count('id as total');
        const contato = await knex('alunas').count('id as total');
        const mensagem_agendada = await knex('campanhas').count('id as total').whereIn('repete', ['DIARIO', 'MENSAL', 'SEMANAL']);

        return {
            mensagem_enviada: Number(mensagem_enviada[0].total),
            campanha: Number(campanha[0].total),
            contato: Number(contato[0].total),
            mensagem_agendada: Number(mensagem_agendada[0].total)
        };
    }

    async agendadoAll() {
        const mensagem_agendada = await knex('campanhas').select('*').whereIn('repete', ['DIARIO', 'MENSAL', 'SEMANAL']);
        return mensagem_agendada;
    }
}

module.exports = new DashboardRepositories();