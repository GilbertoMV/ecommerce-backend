import express from 'express';
import passport from 'passport';

const router = express.Router();

// Ruta para iniciar la autenticación con Facebook
router.get('/login', passport.authenticate('facebook',{ scope: [ 'email' ] } ));

router.get('/',
  passport.authenticate('facebook', { failureRedirect: '/' }),
  function(req, res) {
    // Autenticación exitosa, redirige a la página de perfil
    const { token } = req.user;
    res.redirect(`/products?token=${token}`);    
  });

export default router;