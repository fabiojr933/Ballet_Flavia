const EsperaRepositories = require('../repositories/EsperaRepositories');

class EsperaServices {

    async all() {
        try {
            return await EsperaRepositories.all();
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

            return await EsperaRepositories.save(data);

        } catch (error) {
            throw error;
        }
    }

    async get(id) {
        if (!id) {
            throw new Error('Aluna não informado');
        }
        return await EsperaRepositories.get(id);
    }

    async delete(id) {
        try {

            if (!id) {
                throw new Error('Precisa selecionar uma aluna');
            }

            const resultado = await EsperaRepositories.delete(id);

            if (!resultado) {
                throw new Error('Aluna não encontrado');
            }
            return resultado;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = new EsperaServices();