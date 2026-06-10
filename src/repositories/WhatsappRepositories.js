const knex = require('../config/database');
const axios = require('axios');

class WhatsappRepositories {

    async CriaUsuario() {
        try {

            const response = await axios.post(
                `${process.env.SERVIDOR_ZAP}/admin/users`,
                {
                    name: 'Ballet',
                    token: `${process.env.APIKEY}`,
                    events: "All",
                },
                {
                    headers: {
                        Authorization: process.env.ADMIN_TOKEN,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;

        } catch (error) {

            console.error('Erro ao criar usuário:');

            if (error.response) {
                console.error(error.response.status);
                console.error(error.response.data);

                throw new Error(error.response.data);
            }
            throw new Error(error.message);
        }
    }

    async Connect() {
        try {
            const response = await axios.post(
                `${process.env.SERVIDOR_ZAP}/session/connect`,
                {
                    Subscribe: ['Message', 'ChatPresence'],
                    Immediate: true
                },
                {
                    headers: {
                        token: `${process.env.APIKEY}`,
                        'Content-Type': 'application/json'
                    }
                }
            );

            return response.data;

        } catch (error) {

            console.error('Erro ao conectar sessão:');

            if (error.response) {
                console.error(error.response.status);
                console.error(error.response.data);

                throw new Error(error.response.data);
            }
            throw new Error(error.message);
        }
    }

    async status() {
        try {
            const response = await axios.get(
                `${process.env.SERVIDOR_ZAP}/session/status`,
                {
                    headers: {
                        accept: 'application/json',
                        token: `${process.env.APIKEY}`
                    }
                }
            );

            return response.data;


        } catch (error) {

            console.error('Erro ao obter QR Code:');

            if (error.response) {
                console.error(error.response.status);
                console.error(error.response.data);

                throw new Error(error.response.data);
            }
            throw new Error(error.message);
        }
    }

    async qrcode() {
        try {
            const response = await axios.get(
                `${process.env.SERVIDOR_ZAP}/session/qr`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        token: `${process.env.APIKEY}`
                    }
                }
            );

            return response.data;


        } catch (error) {

            console.error('Erro ao obter QR Code:');

            if (error.response) {
                console.error(error.response.status);
                console.error(error.response.data);

                throw new Error(error.response.data);
            }
            throw new Error(error.message);
        }
    }

    async StatusUser(id) {
        try {
            const response = await axios.get(
                `${process.env.SERVIDOR_ZAP}/admin/users/${id}`,
                {
                    headers: {
                        accept: 'application/json',
                        Authorization: process.env.ADMIN_TOKEN,
                    }
                }
            );

            return response.data;


        } catch (error) {

            console.error('Erro ao obter status');

            if (error.response) {
                console.error(error.response.status);
                console.error(error.response.data);

                throw new Error(error.response.data);
            }
            throw new Error(error.message);
        }
    }
async excluirUsuario() {
    try {

        // Busca os usuários
        const lista = await axios.get(
            `${process.env.SERVIDOR_ZAP}/admin/users`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.ADMIN_TOKEN
                }
            }
        );

        console.log('Usuários:', lista.data);

        if (!lista.data.success || !lista.data.data?.length) {
            throw new Error('Nenhum usuário encontrado.');
        }

        // Procura o usuário Ballet
        const usuario = lista.data.data.find(
            item => item.name === 'Ballet'
        );

        if (!usuario) {
            throw new Error('Usuário Ballet não encontrado.');
        }

        console.log('Usuário encontrado:', usuario);

        // Exclui o usuário
        const response = await axios.delete(
            `${process.env.SERVIDOR_ZAP}/admin/users/${usuario.id}`,
            {
                headers: {
                    accept: 'application/json',
                    Authorization: process.env.ADMIN_TOKEN
                }
            }
        );

        console.log('Usuário excluído:', response.data);

        return response.data;

    } catch (error) {

        console.error('Erro ao excluir usuário:');

        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);

            throw new Error(
                typeof error.response.data === 'string'
                    ? error.response.data
                    : JSON.stringify(error.response.data)
            );
        }

        throw new Error(error.message);
    }
}
}

module.exports = new WhatsappRepositories();