const configuracao = require('../services/ConfiguracaoServices');
const WhatsappServices = require('../services/WhatsappServices');

class QrcodeController {

    async index(req, res) {
        try {
            let data = await configuracao.all();

            // 1. Caso não exista configuração inicial (Primeiro acesso)
            console.log(data)
            if (data.length === 0) {
                const usuario = await WhatsappServices.CriarUsuario();

                const data_user = {
                    nome: usuario.data.name,
                    id: usuario.data.id
                };

                await configuracao.save(data_user);
                await WhatsappServices.Connect();

                // Buscando o status inicial/QR Code
                const statusInicial = await WhatsappServices.status();

                return res.render('qrcode/index', {
                    qrcode: statusInicial.data.qrcode // Verifique se o seu service retorna 'qrcode' ou 'QRCode'
                });
            }

            // 2. Verifica o status do usuário existente
            let status = await WhatsappServices.StatusUser(data[0].id);
            console.log('*********1***********')
            console.log(status)
            // Extrai o objeto de status para facilitar a leitura
            const userStatus = status.data[0] || null;

            console.log('*****2*******')
            console.log(userStatus)
            // 3. Lógica de Redirecionamento/Renderização

            // Caso A: Desconectado ou sem dados
            if (!userStatus || userStatus.connected === false) {
                console.log('*****3*******')
                await WhatsappServices.Connect();
                const qr = await WhatsappServices.qrcode();
                console.log('qrcode')
                console.log(qr)
                return res.render('qrcode/index', {
                    qrcode: qr.data.QRCode
                });
            }

            // Caso B: Conectado mas aguardando login (Escaneamento do QR)
            else if (userStatus.connected === true && userStatus.loggedIn === false) {
                console.log('*****4*******')
                const qr = await WhatsappServices.qrcode();

                return res.render('qrcode/index', {
                    qrcode: qr.data.QRCode
                });
            }      


            // Caso C: Tudo OK (Conectado e Logado)
            else {
                console.log('*****5*******')
                // Aqui renderiza a página de sucesso que ajustamos antes
                return res.render('whatsapp/index', {
                    dispositivo: userStatus.name || "WhatsApp" // Opcional: enviar o nome do aparelho
                });
            }

        } catch (error) {
            console.log('*****6*******')
            console.error('Erro no Controller Index:', error);
            req.flash('error', 'Erro interno: ' + error.message);
            return res.render('error/index');
        }
    }

    async whatsapp(req, res) {
        try {
            return res.render('whatsapp/index', {});
        } catch (error) {
            req.flash('error', 'Erro: ' + error.message);
            return res.render('error/index');
        }
    }

}

module.exports = new QrcodeController();
