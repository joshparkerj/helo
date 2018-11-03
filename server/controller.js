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
  },

  postPic: (req,res,next) => {
    const db = req.app.get('db');
    console.log(req.body.userid);
    db.post_pic([
      req.body.pic,
      req.body.userid
    ])
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('post pic failed');
        console.error(err);
      })
  },

  getPosts: (req,res,next) => {
    const db = req.app.get('db');
    db.get_posts()
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('get posts failed');
        console.error(err);
      })
  },

  searchPosts: (req,res,next) => {
    const db = req.app.get('db');
    db.get_posts([
      req.query.mine,
      req.query.term,
      req.query.myid
    ])
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('search posts failed');
        console.error(err);
      })
  }

}
