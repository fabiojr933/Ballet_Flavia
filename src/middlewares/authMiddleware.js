module.exports = function authMiddleware(req, res, next) {
    if (!req.session.user) {
        req.flash('info', 'Você precisa estar autenticado para acessar esta página.');
        return res.redirect('/login');
    }
    return next();
};
