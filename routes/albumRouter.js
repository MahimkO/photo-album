const router = require("express").Router();
const { Album, Photo } = require("../db/models");

router.route("/")
  // отрисовываем страницу с созданием нового альбома
  .get(async (req, res) => {
    res.render('album');
  })
  // создание нового альбома
  .post(async (req, res) => {
    const { title } = req.body;

    const userId = req.session?.user?.id;
    if (!userId) {
      return res.status(401).json({
        error: true,
        message: "Unauthorized",
      });
    }

    if (!title) {
      return res.status(400).json({
        error: true,
        message: "title is not exists",
      });
    }

    const album = await Album.findOne({where: {title, userId}});
    if (album) {
      return res.status(400).json({
        error: true,
        message: "album is already exists",
      });
    }

    const newAlbum = await Album.create({title, userId});
    res.status(200).json(newAlbum);
});

router.route('/:id')
  .get(async (req, res) => {
    console.log('params 123123 ======>', req.params);
    try {
      const photos = await Photo.findAll({where: {albumId: req.params.id}});
      console.log('Photos ===>', photos);
      res.render('photos', { photos });
    } catch (error) {
      res.render('photos', { photos: [] });
    }
   
  })

module.exports = router;
