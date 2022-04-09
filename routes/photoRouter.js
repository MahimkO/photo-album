const router = require("express").Router();
const upload = require("../middleware/uploadMiddle");
const { Photo, Album } = require("../db/models");

router.route("/")
  // отрисовываем страницу загрузки фоток
  .get(async (req, res) => {
    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({
        error: true,
        message: 'Unauthorized',
      });
    }

    const albums = await Album.findAll({where: {userId}});

    res.render("photo", { albums });
  })
  // сохраняет новую фотку на сервере и записывает путь к ней в БД
  .post(upload.single("img"), async (req, res) => {
    const { title, albumId } = req.body;

    try {
      const newPhoto = await Photo.create({
        title,
        albumId,
        url: '../../../img/' + req.file.filename,
      });
      
      res.json(newPhoto);
    } catch (error) {
      res.status(500).json({
        error: true,
        message: error.message,
      });
    }
  });

module.exports = router;
