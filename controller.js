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
      })
  },

  postLogin: (req,res,next) => {
    const db = req.app.get('db');
    db.post_login([
      req.body.username,
      req.body.password
    ])
      .then(r => {
        req.session.userid = r[0].id;
        r.sessionUserId = req.session.userid;
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('post login failed');
      })
  },

  postPic: (req,res,next) => {
    console.log('tryna post pic...');
    console.log(req.session);
    console.log(req.session.userid);
    const db = req.app.get('db');
    db.post_pic([
      req.body.pic,
      req.session.userid
    ])
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('post pic failed');
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
      })
  },

  searchPosts: (req,res,next) => {
    const db = req.app.get('db');
    console.log('searching');
    console.log(req.query.mine);
    console.log(req.query.term);
    console.log('let\'s see what the session is ...');
    console.log(req.session);
    console.log(req.session.userid);
    db.search_posts([
      req.query.mine,
      `%${req.query.term}%`,
      req.session.userid
    ])
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('search posts failed');
      })
  },

  getPost: (req,res,next) => {
    const db = req.app.get('db');
    db.get_post([req.params.id])
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('get post failed');
      })
  },

  newPost: (req,res,next) => {
    const db = req.app.get('db');
    db.new_post([
      req.body.title,
      req.body.content,
      req.body.img_url,
      req.session.userid
    ])
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('get post failed');
      })
  },

  logout: (req,res,next) => {
    console.log('WATCH OUT!');
    console.log('I AM DESTROYING THE SESSION!');
    req.session.destroy();
    res.status(204).send();
  },

  getApiAuthMe: (req,res,next) => {
    const db = req.app.get('db');
    db.get_user([req.session.userid])
      .then(r => {
        res.status(200).send(r);
      })
      .catch(err => {
        res.status(500).send('get api auth me failed');
      })
  },
  
  getSession: (req,res,next) => {
    console.log(req.session);
    console.log(req.sessionID);
    res.send({session: req.session,sessionID: req.sessionID});
  }

}
