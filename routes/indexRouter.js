const router = require('express').Router();
const { Album } = require('../db/models');

router.route('/')
// роутер домашней страницы
  .get(async (req, res) => {
    const userId = req.session?.user?.id;

    const albums = userId ? await Album.findAll({where: {userId}}) : [];

    res.render('home', { albums });
  });

router.route('/logout')
  .get(async (req, res) => {
    req.session.destroy();
    res.clearCookie('sid').redirect('/');
  })

module.exports = router;