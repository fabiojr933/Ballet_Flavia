const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const dashboard = require('../controllers/DashboardController');
const campanha = require('../controllers/CampanhaController');
const qrcode = require('../controllers/QrcodeController');
const login = require('../controllers/LoginController');
const aluna = require('../controllers/AlunaController');
const chamada = require('../controllers/ChamadaController');
const configuracao = require('../controllers/ConfiguracaoController');
const espera = require('../controllers/EsperaController');


router.get('/', authMiddleware, dashboard.index);

// dashboard
router.get('/dashboard', authMiddleware, dashboard.index);
router.post('/dashboard', authMiddleware, dashboard.index);

// campanha
router.get('/campanha', authMiddleware, campanha.index);
router.post('/campanha', authMiddleware, campanha.save);
router.get('/campanha/cancelar/:id', authMiddleware, campanha.cancelar);
router.get('/campanha/excluir/:id', authMiddleware, campanha.excluir);

//espera
router.get('/aluna/espera', espera.espera);
router.get('/espera', espera.index);
router.post('/aluna/espera/salvar', espera.save);
router.get('/aluna/aguardando', espera.espera_realizada);
router.post('/aluna/espera/confirmar', authMiddleware, espera.confirmar);
router.post('/aluna/espera/deletar', authMiddleware, espera.delete);
router.post('/aluna/espera/confirmar', authMiddleware, espera.confirmar);

// aluna
router.get('/aluna', authMiddleware, aluna.index);
router.get('/aluna/excluir/:id', authMiddleware, aluna.delete);
router.post('/aluna/salvar', authMiddleware, aluna.save);

// qrcode
router.get('/qrcode', authMiddleware, qrcode.index);
router.get('/whatsapp', authMiddleware, qrcode.whatsapp);

// chamada
router.get('/chamada', authMiddleware, chamada.index);
router.get('/chamada/realizada', authMiddleware, chamada.realizado);
router.get('/historico', authMiddleware, chamada.historico);
router.get('/relatorio', authMiddleware, chamada.relatorio);
router.post('/chamada', authMiddleware, chamada.realizar_chamada);
router.put('/chamada/:id', authMiddleware, chamada.alterarChamada);

// configuracao
router.get('/configuracao', authMiddleware, configuracao.index);
router.post('/configuracao', authMiddleware, configuracao.save);


// login
router.get('/login', login.index);
router.post('/login/autenticar', login.autenticar);
router.get('/login/sair', login.sair);



module.exports = router;