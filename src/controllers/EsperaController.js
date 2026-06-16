const EsperaServices = require('../services/EsperaServices');
const AlunaServices = require('../services/AlunaServices');


class EsperaController {

    async index(req, res) {
        try {
            const alunas = await EsperaServices.all();         
            return res.render('aluna/aguardando', { alunas: alunas.data });

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }

    async espera(req, res) {
        try {
            return res.render('aluna/espera', {});

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }

    async save(req, res) {
        try {

            const dados = {
                nome: req.body.nome,
                data_nascimento: req.body.data_nascimento,
                turma: req.body.turma,
                responsavel: req.body.responsavel,
                telefone: req.body.telefone
            };
            await EsperaServices.save(dados);
            return res.redirect('/aluna/aguardando');

        } catch (error) {
            req.flash('error', 'Erro ao salvar o plano: ' + error.message);
            return res.redirect('/aluna');
        }
    }

    async espera_realizada(req, res) {
        try {
            return res.render('aluna/espera_realizada');

        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }


    async delete(req, res) {
        try {
            const id = req.body.id;
            await EsperaServices.delete(id);
            req.flash('info', 'Aluna em espera excluido com sucesso');
            return res.redirect('/espera');
        } catch (error) {
            req.flash('error', `Erro: ${error.message}`);
            return res.redirect('error/index');
        }
    }

    async confirmar(req, res) {
        try {
            const id = req.body.id;
            const data = await EsperaServices.get(id);          
            await AlunaServices.save(data);
            await EsperaServices.delete(id);
            req.flash('info', 'Inscrição confirmada com sucesso');
            return res.redirect('/espera');
        } catch (error) {
            req.flash('error', `Erro: ${error.message}`);
            return res.redirect('error/index');
        }
    }

}

module.exports = new EsperaController();
