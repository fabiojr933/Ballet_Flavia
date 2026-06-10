const AlunaRepositories = require('../repositories/AlunaRepositories');

class AlunaServices {

    async all() {
        try {
            return await AlunaRepositories.all();
        } catch (error) {
            throw new Error('Erro ao listar alunas: ' + error.message);

        }
    }

    async save(data) {
        try {

            if (!data.nome) {
                throw new Error('Nome é obrigatório');
            }
            if (!data.data_nascimento) {
                throw new Error('Data nascimento é obrigatório');
            }
            if (!data.responsavel) {
                throw new Error('Responsavel é obrigatório');
            }
            if (!data.turma) {
                throw new Error('Turma é obrigatório');
            }
            if (!data.telefone) {
                throw new Error('Tlefone é obrigatório');
            }

            return await AlunaRepositories.save(data);

        } catch (error) {
            throw error;
        }
    }

    async update(id, data) {
        try {
            if (!id) {
                throw new Error('Aluna não informado');
            }
            return await AlunaRepositories.update(id, data);
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {

            if (!id) {
                throw new Error('Precisa selecionar uma aluna');
            }

            const resultado = await AlunaRepositories.delete(id);

            if (!resultado) {
                throw new Error('Aluna não encontrado');
            }
            return resultado;
        } catch (error) {
            throw error;
        }
    }
    async get(id) {
        if (!id) {
            throw new Error('Aluna não informado');
        }
        return await AlunaRepositories.get(id);
    }
    async enviar_mensagem_falta(alunas, mensagem) {
        return await AlunaRepositories.enviar_mensagem_falta(alunas, mensagem);
    }

    async taxaPresenca() {
        return AlunaRepositories.taxaPresenca();
    }
}

module.exports = new AlunaServices();