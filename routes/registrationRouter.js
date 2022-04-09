const router = require("express").Router();
const bcrypt = require('bcrypt');
const { User } = require("../db/models");

router.route("/")
  // ручка по отрисовке страницы регистрации
  .get(async (req, res) => {
    res.render("registration");
  })

  // ручка для регистрации пользователя и возвращения его на фронт
  .post(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        error: true,
        message: "no name, email or password allowed"
      });
    }

    try {
      const user = await User.findOne({ where: { email: email } });
      if (user) {
        return res.status(400).json({
          error: true,
          message: "This user is already exists",
        });
      }

      const secretPass = await bcrypt.hash(password, Number(process.env.ROUNDS));
      const newUser = await User.create({...req.body, password: secretPass});
      req.session.user = { id: newUser.id, name: newUser.name };
      return res.status(200).json({
        user: newUser,
      });
    } catch (error) {
      return res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  });

module.exports = router;
