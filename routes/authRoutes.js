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

// router.get('/:provider', (req, res) => {
//     //handle with passport
//     let { provider } = req.params;
//     res.send(`logging in witn ${provider}`);
// });

router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/profile/');
});

//auth login route
router.get('/logout', (req,res) =>{
    //handle with passport
    req.logOut();
    res.redirect('/');
});

module.exports = router;