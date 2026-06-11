const knex = require('../config/database');
const axios = require('axios');

class ProcessarRepositories {

    async buscarPendentes() {

        return knex('campanhas')
            .where('ativo', true)
            .where('status', 'PENDENTE')
            .where('proxima_execucao', '<=', new Date());
    }

    async atualizar(id, dados) {

        return knex('campanhas')
            .where('id', id)
            .update(dados);
    }

    async marcarProcessando(id) {

        return knex('campanhas')
            .where('id', id)
            .update({
                status: 'PENDENTE'
            });
    }


    async enviar_mensagem(aluna, campanha) {
      
        try {

            const response = await axios.post(
                `${process.env.SERVIDOR_ZAP}/chat/send/text`,
                {
                    Phone: `55${aluna.telefone}`,
                    Body: campanha.mensagem
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
                campanha_id: campanha.id,
                mensagem: campanha.mensagem,
                numero: aluna.telefone,
                status: 'ENVIADO'
            });

            return response.data;

        } catch (error) {

            await knex('mensagem_enviada').insert({
                campanha_id: campanha.id,
                mensagem: campanha.mensagem,
                numero: aluna.telefone,
                status: 'ERROR'
            });

        }
    }

}

module.exports = new ProcessarRepositories();