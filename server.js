require('dotenv').config();
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT;
const fs = require('fs');
const mongoose = require('mongoose');
const md5 = require('md5');
const cookieParser = require('cookie-parser');

const {
  OAuth2Client
} = require('google-auth-library');
const CLIENT_ID = '233771810045-vqh6ifm1q20hoa5j4sh6cj83gdojmgbb.apps.googleusercontent.com'
const client = new OAuth2Client(CLIENT_ID);

app.use(cookieParser());
app.use(express.urlencoded({
  extended: true
}));
app.use(express.static('public'));
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

app.set('view engine', 'ejs');

//connecting to our userDatebase
mongoose.connect('mongodb://localhost:27017/userDB', {
  useNewUrlParser: true
});

const userSchema = {
  email: String,
  password: String,
  Fname: String,
  Lname: String,
  Date: String,
};

const User = new mongoose.model("User", userSchema);

const featuresSchema = {
  type: String,
  featureName: String,
  featureDesc: String
};
const Features = new mongoose.model('features', featuresSchema);
// home route
app.get('/', (req, res) => {
  res.render('homepage')
});

app.get('/join', (req, res) => {
  res.render('join-page');
});

app.get("/register", (req, res) => {
  res.render('register')
});

app.get('/login', (req, res) => {
  res.render('login')
});

app.get('/form', (req, res) => {
  res.render('form')
});
app.post('/edit', (req, res) => {
  res.render('edit-profile', {
    email: req.body.email
  });
})

app.post('/register', (req, res) => {
  const newUser = new User({
    Fname: req.body.Fname,
    Lname: req.body.Lname,
    Date: req.body.date,
    email: req.body.username,
    password: md5(req.body.password)
  });

  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.render('homepage2', {
        title: `Welcome to Neo Meet, ${req.body.Fname}`,
        email: req.body.username
      })
    }
  });
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const password = md5(req.body.password);
  User.findOne({
    email: username
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (foundUser.password === password) {
          res.render('homepage2', {
            title: `Welcome back, ${foundUser.Fname}`,
            email: foundUser.email
          })
        } else {
          res.send('Wrong Password!');
        }
      } else {
        res.send('User Not Found!');
      }
    }
  })
});

//CRUD OPERATIONS
app.post('/changeUser', (req, res) => {
  User.findOne({
    email: req.body.email
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        User.findOneAndUpdate(req.body.email, {
          $set: {
            'email': req.body.newUser
          }
        }, {
          upsert: true
        }, function(err) {
          if (err) return res.send(500, {
            error: err
          });
          return res.render('successChange');
        });
      } else {
        res.send('User Not Found!');
      }
    }
  })
});
app.post('/changePass', (req, res) => {
  User.findOne({
    email: req.body.email
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        if (md5(req.body.oldPass) == foundUser.password) {
          User.findOneAndUpdate(req.body.email, {
            $set: {
              'password': md5(req.body.newPass)
            }
          }, {
            upsert: true
          }, function(err) {
            if (err) return res.send(500, {
              error: err
            });
            return res.render('successChange');
          });
        } else {
          res.send('Incorrect Old Password')
        }
      } else {
        res.send('User Not Found!');
      }
    }
  })
});
app.post('/deleteUser', (req, res) => {
  User.deleteOne({
      email: req.body.email
    },
    function(err) {
      if (err) res.json(err);
      else res.render('deleted');
    });
});

// ADMIN_SECTION admin route
app.get('/admin', (req, res) => {
  res.render('admin', {
    title: "Enter Credentials to Login"
  })
})

// login admin router
app.post('/admin-login', (req, res) => {
  if (req.body.username == process.env.ADMIN_USER && req.body.pass == process.env.ADMIN_PASS) {
    res.render('panel')
  } else {
    res.status(401).end("Invalid Username");
  }
});

//admin logout route
app.post('/admin-logout', (req, res) => {
  res.render("admin", {
    title: "Logged Out Successfully..."
  });
});

app.post('/delete', (req, res) => {
  User.findOne({
    email: req.body.userName
  }, function(err, foundUser) {
    if (err) {
      console.log(err);
    } else {
      if (foundUser) {
        User.deleteOne({
            email: req.body.userName
          },
          function(err) {
            if (err) res.json(err);
            else res.render('deleted');
          });
      } else {
        res.send('User Not Found!');
      }
    }
  })
});

app.post("/update", (req, res) => {
  const newFeature = new Features({
    type: "feature",
    featureName: req.body.featureName,
    featureDesc: req.body.featureDesc,
  });

  newFeature.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send('added successfully');
    }

  });
});
app.post("/update2", (req, res) => {
  const newFeature = new Features({
    type: "feature2",
    featureName: req.body.featureName,
    featureDesc: req.body.featureDesc,
  });

  newFeature.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send('added successfully');
    }

  });
});
app.post("/update3", (req, res) => {
  const newFeature = new Features({
    type: "feature3",
    featureName: req.body.featureName,
    featureDesc: req.body.featureDesc,
  });

  newFeature.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.send('added successfully');
    }

  });
});

app.get('/update', (req, res) => {
  Features.findOne({
    type: "feature"
  }, function(err, found) {
    if (err) {
      console.log(err);
    } else if (found) {
      const JSObj = {
        name: found.featureName,
        desc: found.featureDesc
      };
      const JSONString = JSON.stringify(JSObj);
      res.json(JSONString);
    }
  })
});
app.get('/update2', (req, res) => {
  Features.findOne({
    type: "feature2"
  }, function(err, found) {
    if (err) {
      console.log(err);
    } else if (found) {
      const JSObj = {
        name: found.featureName,
        desc: found.featureDesc
      };
      const JSONString = JSON.stringify(JSObj);
      res.json(JSONString);
    }
  })
});
app.get('/update3', (req, res) => {
  Features.findOne({
    type: "feature3"
  }, function(err, found) {
    if (err) {
      console.log(err);
    } else if (found) {
      const JSObj = {
        name: found.featureName,
        desc: found.featureDesc
      };
      const JSONString = JSON.stringify(JSObj);
      res.json(JSONString);

    }
  })
});

//  FORM

app.post("/sendFormData" ,(req, res) => {

  const fname = req.body.fname;
  const lname = req.body.lname;
  const email = req.body.email;
  const number = req.body.number;
  const issue = req.body.issue

  fs.appendFileSync("responses.txt", `Response from ${fname} ${lname},
        Email: ${email}
        Phone Number: ${number}
        Issue: ${issue} \n \n `, "UTF-8", {
    'flags': 'a+'
  });

  res.send(`Thank you ${fname} ${lname}, We will reply to you as soon as possible!
      Response will be sent to: ${email}
      And to: ${number}
      Issue: ${issue}`);

});

// signing in with google

app.post('/google', (req, res) => {
  let token = req.body.token;

  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
  }
  verify()
    .then(() => {
      res.cookie('session-token', token);
      res.send('success')
    })
    .catch(console.error);

})

app.get('/profile', isAuthenticated, (req, res) => {
  let user = req.user;
  res.render('homepage2', {
    title: `Welcome back, ${user.name}`, email: ''
  });
})

app.get('/logout', (req, res) => {
  res.clearCookie('session-token');
  res.redirect('/');
})

function isAuthenticated(req, res, next) {
  let token = req.cookies['session-token'];
  let user = {};
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: CLIENT_ID,
    });
    const payload = ticket.getPayload();
    user.name = payload.name;
    user.email = payload.email;
    user.picture = payload.picture;
  }
  verify()
    .then(() => {
      req.user = user;
      next();
    })
    .catch(err => {
      res.redirect('/')
    })

}

app.listen(port, () => {
  console.log(`Listening to the server on PORT: ${port}`)
});
