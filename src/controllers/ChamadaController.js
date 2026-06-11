const AlunaServices = require('../services/AlunaServices');
const ChamadaServices = require('../services/ChamadaServices');

class ChamadaController {

    async index(req, res) {
        try {
            const alunas = await AlunaServices.all();
            return res.render('chamada/index', { alunas: alunas.data, total_alunas: alunas.total });

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }

    async historico(req, res) {
        try {
            const dados = await ChamadaServices.all();
            return res.render('historico/index', { dados });

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }

    async relatorio(req, res) {
        try {
            const dados = await ChamadaServices.relatorio();
            return res.render('relatorio/index', { dados });

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }
    async realizar_chamada(req, res) {
        try {
            const promises = req.body.chamada.map(async (element) => {
                const dados = {
                    id: element.id,
                    data: req.body.data,
                    turma: req.body.turmaId,
                    status: element.status.toUpperCase(),
                    aluna_id: element.alunaId
                };

                await ChamadaServices.save(dados);

                if (dados.status === 'AUSENTE') {
                    await ChamadaServices.Ausente(dados);
                }
            });

            await Promise.all(promises);

            return res.status(200).send('ok');

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }
    async alterarChamada(req, res) {
        try {
            let data = { status: req.body.status };
            let id = req.params.id;
            await ChamadaServices.update(id, data);
            return res.status(200).send('ok');
        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }

    async realizado(req, res) {
        try {
            return res.render('chamada/realizado');
        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }
}

module.exports = new ChamadaController();
