/ route register and login screen
/register route -- register user
/login route -- login user
/profile route -- profile page with boards
/upload route -- post upload kry gy
/feed route -- feed page with all different pins
/save/:pinid route -- pin ko kisi board me save kry gy
/delete/:pinid route -- pin ko kisi board se delete kry gy
/edit route -- edit kry gy post ko
/logout route -- logout user

jb ap Navbar component file banao gy tu ap chahty hain k apka navbar kuch pages pr show ho kuch pr na ho jisy login and register pages pr navbar show na ho tu is k leye apko un routes pr ja kr waha se parameter pass krna hoga fr osey ejs/html/react jsx wali file ya jo ap ne separate se navbar component banaya os me ja kr codition apply krni hai k aghr navbar true hai then show ho else show na ho
route wali file me
router.get("/profile", isLoggedIn, async function(req, res, next){
res.render("/profile", {nav: true})
})
ejs file me
<% if(nav === true ){ %>
navbar code here
<% } %>
