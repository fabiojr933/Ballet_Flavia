const knex = require('../config/database');
const axios = require('axios');

class AniversarioRepositories {
    async buscarAniversariantes() {
        return knex('alunas')
            .whereRaw(
                "TO_CHAR(data_nascimento, 'MM-DD') = TO_CHAR(CURRENT_DATE, 'MM-DD')"
            );
    }

    async enviar_mensagem(aluna, mensagem) {
        try {           
            const response = await axios.post(
                `${process.env.SERVIDOR_ZAP}/chat/send/text`,
                {
                    Phone: `55${aluna.telefone}`,
                    Body: mensagem
                },
                {
                    headers: {
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
}

module.exports = new AniversarioRepositories();