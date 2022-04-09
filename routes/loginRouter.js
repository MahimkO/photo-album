const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db/models');

router.route('/')
  // ручка по отрисовке страницы авторизации
  .get(async (req, res) => {
    res.render('login');
  })
  // рука по выполнению авторизации
  .post(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: true, message: 'no login or password'});
    };
    
    try {
      const currentUser = await User.findOne({where: { email }});
      if (currentUser && await bcrypt.compare(password, currentUser.password)) {
        req.session.user = { id: currentUser.id, name: currentUser.name };
        return res.json({ success: true });
      }
      return res.status(400).json({
        error: true,
        message: 'Login or password is incorrect',
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  });

module.exports = router;