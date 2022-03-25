module.exports = {

  getHealth: (_, res) => {
    res.send('seemingly ok... ... ...');
  },

  postRegistration: (req, res) => {
    const db = req.app.get('db');
    db.post_registration([
      req.body.username,
      req.body.password,
    ])
      .then((r) => {
        res.status(200).send(r);
      })
      .catch(() => {
        res.status(500).send('post registration failed');
      });
  },

  postLogin: (req, res) => {
    const db = req.app.get('db');
    db.post_login([
      req.body.username,
      req.body.password,
    ])
      .then((r) => {
        req.session.userid = r[0].id;
        res.status(200).send({ ...r, sessionUserId: req.session.userid });
      })
      .catch(() => {
        res.status(500).send('post login failed');
      });
  },

  postPic: (req, res) => {
    const db = req.app.get('db');
    db.post_pic([
      req.body.pic,
      req.session.userid,
    ])
      .then((r) => {
        res.status(200).send(r);
      })
      .catch(() => {
        res.status(500).send('post pic failed');
      });
  },

  getPosts: (req, res) => {
    const db = req.app.get('db');
    db.get_posts()
      .then((r) => {
        res.status(200).send(r);
      })
      .catch(() => {
        res.status(500).send('get posts failed');
      });
  },

  searchPosts: (req, res) => {
    const db = req.app.get('db');
    db.search_posts([
      req.query.mine,
      `%${req.query.term}%`,
      req.session.userid,
    ])
      .then((r) => {
        res.status(200).send(r);
      })
      .catch(() => {
        res.status(500).send('search posts failed');
      });
  },

  getPost: (req, res) => {
    const db = req.app.get('db');
    db.get_post([req.params.id])
      .then((r) => {
        res.status(200).send(r);
      })
      .catch(() => {
        res.status(500).send('get post failed');
      });
  },

  newPost: (req, res) => {
    const db = req.app.get('db');
    db.new_post([
      req.body.title,
      req.body.content,
      req.body.img_url,
      req.session.userid,
    ])
      .then((r) => {
        res.status(200).send(r);
      })
      .catch(() => {
        res.status(500).send('get post failed');
      });
  },

  logout: (req, res) => {
    req.session.destroy();
    res.status(204).send();
  },

  getApiAuthMe: (req, res) => {
    const db = req.app.get('db');
    db.get_user([req.session.userid])
      .then((r) => {
        res.status(200).send(r);
      })
      .catch(() => {
        res.status(500).send('get api auth me failed');
      });
  },

  getSession: (req, res) => {
    res.send({ session: req.session, sessionID: req.sessionID });
  },

  getReact: (_, res) => {
    res.sendFile(`${__dirname}/build/index.html`);
  },

  checkUsername: (req, res) => {
    const db = req.app.get('db');
    db.check_username([req.query.username])
      .then((r) => {
        res.status(200).send(r);
      })
      .catch(() => {
        res.status(500).send('check username failed');
      });
  },

};
