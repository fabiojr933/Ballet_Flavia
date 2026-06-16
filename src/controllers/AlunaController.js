const AlunaService = require('../services/AlunaServices');

class AlunaController {

    async index(req, res) {
        try {
            const alunas = await AlunaService.all();
            return res.render('aluna/index', { alunas: alunas.data });

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
            if (!req.body.id) {
                await AlunaService.save(dados);
                req.flash('info', 'Aluna cadastrado com sucesso!');
            } else {
                await AlunaService.update(req.body.id, dados);
                req.flash('info', 'Aluna atualizado com sucesso!');

            }

            return res.redirect('/aluna');

        } catch (error) {
            req.flash('error', 'Erro ao salvar o plano: ' + error.message);
            return res.redirect('/aluna');
        }
    } 


    async delete(req, res) {
        try {
            const id = req.params.id;
            await AlunaService.delete(id);
            req.flash('info', 'Aluna excluido com sucesso');
            return res.redirect('/aluna');
        } catch (error) {
            req.flash('error', `Erro: ${error.message}`);
            return res.redirect('/admin/plano');
        }
    }

}

module.exports = new AlunaController();
