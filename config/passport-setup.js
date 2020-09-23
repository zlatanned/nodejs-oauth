const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github').Strategy;

const { FACEBOOK_CLIENT_ID, FACEBOOK_CLIENT_SECRET, GOOGLE_CLIENTID, GOOGLE_CLIENT_SECRET, GITHUB_CLIENT_SECRET, GITHUB_CLIENT_ID } = process.env;
const UserModel = require('../db/models/UserModel');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserModel.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy({
        //options for google strategy
        clientID: GOOGLE_CLIENTID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:3061/auth/google/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        UserModel.findOne({appId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new UserModel({
                    appId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture,
                    provider: profile.provider
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
)

passport.use(
    new FacebookStrategy({
        //options for facebook strategy
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: 'http://localhost:3061/auth/facebook/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        UserModel.findOne({appId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new UserModel({
                    appId: profile.id,
                    username: profile.displayName,
                    thumbnail: profile._json.picture,
                    provider: profile.provider
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
)

passport.use(
    new GithubStrategy({
        //options for google strategy
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: 'http://localhost:3061/auth/github/redirect'
    }, (accessToken, refreshToken, profile, done) => {
        //passport callback function
        console.log('github profile =?', profile);
        UserModel.findOne({appId: profile.id}).then((currentUser) => {
            if(currentUser){
                // already have this user
                console.log('user is: ', currentUser);
                done(null, currentUser);
            } else {
                // if not, create user in our db
                new UserModel({
                    appId: profile.id,
                    displayName: profile.displayName,
                    username: profile.username,
                    thumbnail: profile._json.avatar_url,
                    provider: profile.provider
                }).save().then((newUser) => {
                    console.log('created new user: ', newUser);
                    done(null, newUser);
                });
            }
        });
    })
)
