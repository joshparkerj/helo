module.exports = {

  getHealth: (req,res,next) => {
    res.send('seemingly ok... ... ...');
  },

  postRegistration: (req,res,next) => {
    const db = req.app.get('db');
    db.post_registration([
      req.body.username,
      req.body.password
    ])
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('post registration failed');
        console.error(err);
      })
  },

  postLogin: (req,res,next) => {
    const db = req.app.get('db');
    db.post_login([
      req.body.username,
      req.body.password
    ])
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('post login failed');
        console.error(err);
      })
  }

}
