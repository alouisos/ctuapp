module.exports = function(app, passport) {

// normal routes ===============================================================

	// show the home page (will also have our login links)
	app.get('/', function(req, res) {
		res.render('index.ejs');
	});

	app.get('/services', function(req,res) { 
		res.render('services.ejs')
	});

	app.get('/contact', function(req, res) { 
		res.render('contact.ejs')
	});

	app.get('/rescue-asdh', function(req, res) { 
		res.render('rescue-asdh.ejs')

	}); 
	
	app.get('/rescue-asdh-IE', function(req, res) { 
		res.render('rescue-asdh-IE.ejs')

	}); 


	app.get('/CCTU-portfolio', function(req, res) { 
		res.render('CCTU-portfolio.ejs')
	});

	// PROFILE SECTION =========================
	app.get('/erica-loggedin', isLoggedIn, function(req, res) {
		res.render('erica-loggedin.ejs', {
			user : req.user
		});
	});

	app.get('/rescue-asdh-loggedin', isLoggedIn, function(req, res) {
		res.render('rescue-asdh-loggedin.ejs', {
			user : req.user
		});
	});
		app.get('/earnest-loggedin', isLoggedIn, function(req, res) {
		res.render('earnest-loggedin.ejs', {
			user : req.user
		});
	});


app.get('/earnest', function(req, res) { 
	res.render('earnest.ejs')
	}); 

app.get('/erica-study', function(req,res) { 
	res.render('erica-study.ejs')
}); 

app.get('/cctu-cardio', function(req,res) { 
		res.render('cctu-cardio.ejs')
});

app.get('/cctu-cancer', function(req, res) { 
		res.render('cctu-cancer.ejs')
}); 

app.get('/cctu-surgery', function(req, res) { 
		res.render('cctu-surgery.ejs')
}); 

app.get('/cctu-paediatrics', function(req,res){ 
		res.render('cctu-paediatrics.ejs')
		}); 
app.get('/cctu-other', function(req,res){ 
		res.render('cctu-other.ejs')
	});

app.get('/cctu-news', function(req,res) { 
	res.render('cctu-news.ejs')
});

app.get('/cctu-vasculitis', function(req,res) {
		res.render('cctu-vasculitis.ejs')
	});

app.get('/erica-stratified', function(req, res) { 
	res.render("erica-stratified.ejs"); 
	}); 

app.get('/erica', function(req,res) { 
	res.render('erica.ejs')
	}); 

	// LOGOUT ==============================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/erica');
	});

app.get('/logout-earnest', function(req, res) {
		req.logout();
		res.redirect('/earnest');
	});


// =============================================================================
// AUTHENTICATE (FIRST LOGIN) ==================================================
// =============================================================================

	// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login-erica', function(req, res) {
			res.redirect('http://localhost:3000/login');
		});

		// process the login form
		app.post('/login-erica', passport.authenticate('local-login', {
			successRedirect : '/erica-loggedin', // redirect to the secure profile section
			failureRedirect : '/login-erica', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


		///

			// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login-earnest', function(req, res) {
			res.render('login-earnest.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login-earnest', passport.authenticate('local-login', {
			successRedirect : '/earnest-loggedin', // redirect to the secure profile section
			failureRedirect : 'login-earnest', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

			// locally --------------------------------
		// LOGIN ===============================
		// show the login form
		app.get('/login-rescue-asdh', function(req, res) {
			res.render('login-rescue-asdh.ejs', { message: req.flash('loginMessage') });
		});

		// process the login form
		app.post('/login-rescue-asdh', passport.authenticate('local-login', {
			successRedirect : '/rescue-asdh-loggedin', // redirect to the secure profile section
			failureRedirect : 'login-rescue-asdh', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

		// SIGNUP =================================
		// show the signup form
		app.get('/signup', function(req, res) {
			res.render('signup.ejs', { message: req.flash('signupMessage') });
		});

		// process the signup form
		app.post('/signup', passport.authenticate('local-signup', {
			successRedirect : '/', // redirect to the secure profile section
			failureRedirect : '/signup', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));


		//Forgot Password 

		app.get('/forgot', function(req, res) {
  res.render('forgot.ejs', {
    user: req.user
  });
});

app.use(function (req, res) { 
	res.render('404')
});

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/auth/facebook', passport.authenticate('facebook', { scope : 'email' }));

		// handle the callback after facebook has authenticated the user
		app.get('/auth/facebook/callback',
			passport.authenticate('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/auth/twitter', passport.authenticate('twitter', { scope : 'email' }));

		// handle the callback after twitter has authenticated the user
		app.get('/auth/twitter/callback',
			passport.authenticate('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

		// the callback after google has authenticated the user
		app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

// =============================================================================
// AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
// =============================================================================

	// locally --------------------------------
		app.get('/connect/local', function(req, res) {
			res.render('connect-local.ejs', { message: req.flash('loginMessage') });
		});
		app.post('/connect/local', passport.authenticate('local-signup', {
			successRedirect : '/profile', // redirect to the secure profile section
			failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
			failureFlash : true // allow flash messages
		}));

	// facebook -------------------------------

		// send to facebook to do the authentication
		app.get('/connect/facebook', passport.authorize('facebook', { scope : 'email' }));

		// handle the callback after facebook has authorized the user
		app.get('/connect/facebook/callback',
			passport.authorize('facebook', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

	// twitter --------------------------------

		// send to twitter to do the authentication
		app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

		// handle the callback after twitter has authorized the user
		app.get('/connect/twitter/callback',
			passport.authorize('twitter', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));


	// google ---------------------------------

		// send to google to do the authentication
		app.get('/connect/google', passport.authorize('google', { scope : ['profile', 'email'] }));

		// the callback after google has authorized the user
		app.get('/connect/google/callback',
			passport.authorize('google', {
				successRedirect : '/profile',
				failureRedirect : '/'
			}));

// =============================================================================
// UNLINK ACCOUNTS =============================================================
// =============================================================================
// used to unlink accounts. for social accounts, just remove the token
// for local account, remove email and password
// user account will stay active in case they want to reconnect in the future

	// local -----------------------------------
	app.get('/unlink/local', function(req, res) {
		var user            = req.user;
		user.local.email    = undefined;
		user.local.password = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// facebook -------------------------------
	app.get('/unlink/facebook', function(req, res) {
		var user            = req.user;
		user.facebook.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// twitter --------------------------------
	app.get('/unlink/twitter', function(req, res) {
		var user           = req.user;
		user.twitter.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});

	// google ---------------------------------
	app.get('/unlink/google', function(req, res) {
		var user          = req.user;
		user.google.token = undefined;
		user.save(function(err) {
			res.redirect('/profile');
		});
	});


};

// route middleware to ensure user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}


