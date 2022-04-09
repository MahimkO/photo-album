const addToLocals = (req, res, next) => {
  res.locals.userId = req.session?.user.id;
  res.locals.userEmale = req.session?.userEmale;
  res.locals.userName = req.session?.userName;
  next();
};

module.exports = { addToLocals };
