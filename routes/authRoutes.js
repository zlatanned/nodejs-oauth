const router = require('express').Router();
const passport = require('passport');

//auth login route
router.get('/login', (req,res) =>{
    res.render('login', { user: req.user });
});

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}));

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
});

// auth with facebook
router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/redirect', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/profile/');
});

// auth with github
router.get('/github', passport.authenticate('github'));

router.get('/github/redirect', passport.authenticate('github'), (req, res) => {
    res.redirect('/profile/');
});

//auth login route
router.get('/logout', (req,res) =>{
    //handle with passport
    req.logOut();
    res.redirect('/');
});

module.exports = router;
