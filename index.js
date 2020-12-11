import path from 'path'
import express from 'express'
import compression from 'compression'
import bodyParser from 'body-parser'
import session from 'cookie-session'
import passport from 'passport'
import passportLocal from 'passport-local'
import dotenv from 'dotenv'

dotenv.config();

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LocalStrategy = passportLocal.Strategy;

let users = [
  {
    id: 1,
    name: "Jude",
    email: "user@email.com",
    password: "password"
  },
  {
    id: 2,
    name: "Emma",
    email: "emma@email.com",
    password: "password2"
  }
];


(async () => {
    // const db = await open({ filename: path.join('.', 'data', 'top.db'), driver: sqlite3.cached.Database })
	const app = express();
	const port = process.env.PORT || 5000;
	
passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },

    (username, password, done) => {
      let user = users.find((user) => {
        return user.email === username && user.password === password
      })

      if (user) {
        done(null, user)
      } else {
        done(null, false, { message: 'Incorrect username or password'})
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  let user = users.find((user) => {
    return user.id === id
  })

  done(null, user)
});
	app.use(session({
	  secret: 'dfgsdg3465t54gsvjcinjbn32edx',
	  resave: false,
	  saveUninitialized: true,
	  cookie: { secure: true }
	}));
	app.use(passport.initialize());
	app.use(passport.session());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(express.static('public'));
	// ['path', 'altPath'].forEach(function(path) {
	  // app.get(path, function(req, res) { etc. });
	// });
	// app.get('/ren.js', async (req,res) => { res.json(ren) });
	// app.get('/topct.js', async (req,res) => { res.json(topct) });
	// app.get('/grd.js', async (req,res) => { res.json(grd) });
	// app.get('/districts.js', async (req,res) => { res.json(districts) });
	// app.get('/', async(req,res) => {
		// res.sendFile(path.join(__dirname, 'public', 'index.html'));
	// });
	// app.get('/full', async(req,res) => {
		// if (req.isAuthenticated()){
			// res.sendFile(path.join(__dirname, 'public', 'indexAll.html'));
		// } else {
			// res.redirect('/login');
		// }
	// });

	// app.get('/login', passport.authenticate('local', { successRedirect: '/full' }));
	app.post('/api/login', function(req, res, next) {
	  passport.authenticate("local", (err, user, info) => {
		  // console.log(user, info);
		if (err) {
		  return next(err);
		}

		if (!user) {
		  return res.status(400).send([user, "Cannot log in", info]);
		}

		req.login(user, err => {
		  res.send("Logged in");
		});
	  })(req, res, next);
});

	app.get('/api/logout', (req, res) => {
		console.log("logging out");
		req.logout();
		// res.redirect('/login');
		return res.send();
	});
	
	app.get("/api/data", function(req, res) {

const data  = [
  { pid: 1, phrase: 'мне какое дело' },
  { pid: 2, phrase: 'все равно' },
  { pid: 3, phrase: 'да пожалуйста' },
  { pid: 4, phrase: 'делай что хочешь' },
  { pid: 5, phrase: 'дело твое' },
  { pid: 6, phrase: 'плевать' },
  { pid: 7, phrase: 'нет так нет' },
  { pid: 8, phrase: 'бог с ним' },
  { pid: 9, phrase: 'да ну' },
  { pid: 10, phrase: 'ну и ладно' },
  { pid: 11, phrase: 'ну и пожалуйста' },
  { pid: 12, phrase: 'тебе виднее' },
  { pid: 13, phrase: 'что ты' },
  { pid: 14, phrase: 'бог его знает' },
  { pid: 15, phrase: 'черт его знает' },
  { pid: 16, phrase: 'а смысл' },
  { pid: 17, phrase: 'без понятия' },
  { pid: 18, phrase: 'тебя не касается' },
  { pid: 19, phrase: 'вот еще' },
  { pid: 20, phrase: 'да ну' },
  { pid: 21, phrase: 'да так' },
  { pid: 22, phrase: 'еще чего' },
  { pid: 23, phrase: 'и речи быть не может' },
  { pid: 24, phrase: 'ишь чего захотел' },
  { pid: 25, phrase: 'как бы не так' },
  { pid: 26, phrase: 'какая разница' },
  { pid: 27, phrase: 'не подумаю' },
  { pid: 28, phrase: 'ни в коем случае' },
  { pid: 29, phrase: 'ни за что' },
  { pid: 30, phrase: 'почем я знаю' }];

  return res.json(data);
});

const authMiddleware = (req, res, next) => {
  if (!req.isAuthenticated()) {
    res.status(401).send('You are not authenticated')
  } else {
    return next()
  }
};

app.get("/api/user", authMiddleware, (req, res) => {
  let user = users.find(user => {
    return user.id === req.session.passport.user
  })

  console.log([user, req.session])

  res.send({ user: user })
});

app.all("/", (req,res) => {
	res.send("hi");
});


	app.listen(port);  
	console.log("Running at Port "+ port);
})()

