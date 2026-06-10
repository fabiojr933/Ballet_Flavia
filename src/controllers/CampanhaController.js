const AlunaService = require('../services/AlunaServices');
const CampanhaServices = require('../services/CampanhaServices');
const ConfiguracaoServices = require('../services/ConfiguracaoServices'); 

class CampanhaController {

    async index(req, res) {
        try {
            const total_alunas = await AlunaService.all();
            const companhas = await CampanhaServices.all();
            const config = await ConfiguracaoServices.all();
            return res.render('campanha/index', { total: total_alunas.total, companha: companhas.data, config: config[0] || {} });

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }

    async save(req, res) {
        try {           
            const proxima_execucao = new Date(`${req.body.data_agendamento}T${req.body.hora_agendamento}:00`);
            const data = {
                nome: req.body.nome,
                mensagem: req.body.mensagem,
                enviar_todos: req.body.enviar_todos == 1 ? 'SIM' : 'NAO',
                repete: req.body.repete,
                proxima_execucao: proxima_execucao
            }
           
            await CampanhaServices.save(data);
            return res.redirect('/campanha');

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }

    
    async cancelar(req, res) {
        try {
            const data = {
                status: 'CANCELADO'
            }
            const id = req.params.id;
            await CampanhaServices.update(id, data);
            req.flash('info', 'Campanha cancelada com sucesso');
            return res.redirect('/campanha');
        } catch (error) {
            req.flash('error', `Erro: ${error.message}`);
            return res.redirect('/admin/plano');
        }
    }


    async excluir(req, res) {
        try {
            const id = req.params.id;
            await CampanhaServices.delete(id);
            req.flash('info', 'Campanha excluido com sucesso');
            return res.redirect('/campanha');
        } catch (error) {
            req.flash('error', `Erro: ${error.message}`);
            return res.redirect('/admin/plano');
        }
    }

}

module.exports = new CampanhaController();
