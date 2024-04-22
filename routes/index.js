var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post")
const passport = require('passport');
const upload = require("./multer");
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate())); 

// home page login route
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// register page route
router.get('/register', function(req, res, next) {
  res.render('register');
});
// profile page route 
router.get('/profile', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user}).populate("postsid");
  res.render('profile', {user});
});
// show all post page route 
router.get('/show/postsid', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user}).populate("postsid");
  res.render('show', {user});
});
// feed page route 
router.get('/feed', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.find().populate("userid");
  res.render('feed', {user, post});
});
// add post page route 
router.get('/add', isLoggedIn, async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  res.render('add', {user});
});
// create post route 
router.post('/createpost', isLoggedIn, upload.single("postimage"), async function(req, res, next) {
  const user = await userModel.findOne({username: req.session.passport.user});
  const post = await postModel.create({
    userid: user._id,
    title: req.body.posttitle,
    description: req.body.postdesc,
    postImage: req.file.filename,
  })
  user.postsid.push(post._id);
  await user.save();
  res.redirect("/profile");
});
router.post('/fileupload', isLoggedIn, upload.single("image"), async function(req, res, next) {
const user = await userModel.findOne({username: req.session.passport.user});
user.profileImage = req.file.filename;
await user.save();
res.redirect("/profile");
});
// register route 
router.post("/register", function(req, res){
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact,
    name: req.body.fullname,
  })
  userModel.register(data, req.body.password).then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile");
    })
  })
})
// login route 
router.post("/login", passport.authenticate("local", {successRedirect: "/profile", failureRedirect: "/"}), function(req, res){})
// logout route
router.get("/logout", function(req, res, next){
  req.logout(function(error){
    if(error) {return next(error);}
    res.redirect("/")
  })
})
// isLoggedIn middleware
function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){return next();}
  res.redirect("/")
}

module.exports = router;
