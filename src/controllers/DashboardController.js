const DashboardServices = require('../services/DashboardServices');
const WhatsappServices = require('../services/WhatsappServices');
const AlunaServices = require('../services/AlunaServices');

class DashboardController {

    async index(req, res) {
        try {

            const data = await DashboardServices.all();
            
            const agendado = await DashboardServices.agendadoAll();
            const status = await WhatsappServices.status();
            const presenca = await AlunaServices.taxaPresenca();                   
            return res.render('dashboard/index', { data, agendado, status: status?.data?.connected || false, presenca });

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }
}

module.exports = new DashboardController();
