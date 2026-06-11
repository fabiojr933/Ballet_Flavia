const configuracao = require('../services/ConfiguracaoServices');
const WhatsappServices = require('../services/WhatsappServices');

class QrcodeController {

    async index(req, res) {
        try {
            let data = await configuracao.all();
            const status = await WhatsappServices.status();
            // 1. Caso não exista configuração inicial (Primeiro acesso)          
            if (data.length === 0) {
                await WhatsappServices.excluirUsuario();
                const usuario = await WhatsappServices.CriarUsuario();

                const data_user = {
                    nome: usuario.data.name,
                    id: usuario.data.id
                };

                await configuracao.save(data_user);
                await WhatsappServices.Connect();
                await new Promise(resolve => setTimeout(resolve, 3000));
                // Buscando o status inicial/QR Code
                const conectar = await WhatsappServices.status();
                await new Promise(resolve => setTimeout(resolve, 3000));
                return res.render('qrcode/index', { qrcode: conectar.data.qrcode });
            }
            if (status.data.connected === false && status.data.loggedIn === false) {
                await WhatsappServices.Connect();
                await new Promise(resolve => setTimeout(resolve, 3000));
                const conectar = await WhatsappServices.status();
                return res.render('qrcode/index', { qrcode: conectar.data.qrcode });
            }
            if (status.data.connected === true && status.data.loggedIn === false) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                const conectar = await WhatsappServices.status();
                return res.render('qrcode/index', { qrcode: conectar.data.qrcode });
            }
            if (status.data.connected === true && status.data.loggedIn === true) {
                await new Promise(resolve => setTimeout(resolve, 3000));
                return res.render('whatsapp/index', { dispositivo: status.data.name || "WhatsApp" });
            }

        } catch (error) {
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


/*
1. Existe usuário?
   NÃO -> cria usuário

2. Consulta status
   connected = false
      -> Connect()
      -> QRCode()

3. connected = true && loggedIn = false
      -> QRCode()

4. connected = true && loggedIn = true
      -> Página principal do WhatsApp


      Uma observação importante: no WUZAPI, o endpoint /admin/users/{id} retorna informações administrativas do usuário, 
      mas para saber se o WhatsApp está conectado normalmente é mais confiável consultar /session/status usando o token 
      daquele usuário. Isso evita vários problemas de sincronização que costumam ocorrer usando apenas /admin/users/{id}.

*/