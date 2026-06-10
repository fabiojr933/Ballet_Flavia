const WhatsappRepositories = require('../repositories/WhatsappRepositories');

class WhatsappServices {

    async CriarUsuario() {
        try {
            return await WhatsappRepositories.CriaUsuario();
        } catch (error) {
            throw new Error('Erro ao criar usuario: ' + error.message);

        }
    }

        async excluirUsuario() {
        try {
            return await WhatsappRepositories.excluirUsuario();
        } catch (error) {
            throw new Error('Erro ao criar usuario: ' + error.message);

        }
    }

    async Connect() {
        try {
            return await WhatsappRepositories.Connect();
        } catch (error) {
            throw new Error('Erro ao conectar: ' + error.message);

        }
    }

    async status() {
        try {
            return await WhatsappRepositories.status();
        } catch (error) {
            throw new Error('Erro ao gerar qrcode: ' + error.message);

        }
    }

    async qrcode() {
        try {
            return await WhatsappRepositories.qrcode();
        } catch (error) {
            throw new Error('Erro ao gerar qrcode: ' + error.message);

        }
    }

    async StatusUser(id) {
        try {
            return await WhatsappRepositories.StatusUser(id);
        } catch (error) {
            throw new Error('Erro ao gerar status: ' + error.message);

        }
    }
}

module.exports = new WhatsappServices();