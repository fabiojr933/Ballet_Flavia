const DashboardRepositories = require('../repositories/DashboardRepositories');

class DashboardServices {

    async all() {
        try {
            return await DashboardRepositories.all();
        } catch (error) {
            throw new Error('Erro ao listar: ' + error.message);

        }
    }
    async agendadoAll() {
        try {
            return await DashboardRepositories.agendadoAll();
        } catch (error) {
            throw new Error('Erro ao listar: ' + error.message);

        }
    }
}

module.exports = new DashboardServices();