const express = require('express');
// const fetchEmailsAndSave = require('./Email_Controllers/Fetch_Email');
const { get_emails, get_html_content, get_single_html_content, get_residential_emails_from_florida, getallresidentialemailnewyork, getallcommercialemailflorida, getallcommercialemailnewyork, saved_emails, fave_email, follow_brand, get_user_follow_brands, filter_search, commercialrealestateother, residentialrealestateother } = require('./Email_Controllers/Email_Controller');
const { fetchEmailsAndSave } = require('./Email_Controllers/Fetch_Email');
const { login, signup, google_signup, facebook_signup } = require('./Authentication_Controllers/AuthController');
const { Upload_Brand, get_all_brands, filtered_email, check_for_more_email_brand, Delete_brand_and_Email, like_post } = require('./Brand_Controllers/Brand_Controller');
const { admin_signup, admin_login, gmail_code } = require('./Admin_Controller/Admin_Controller');

const router = express.Router();





router.post('/fetchemail',fetchEmailsAndSave)


router.get('/get-emails',get_emails)

router.get('/html/:id', get_html_content);


router.get('/getsinglehtml/:id',get_single_html_content)


router.post('/signup', signup);


router.post('/login', login);

router.post('/upload-brand', Upload_Brand);
router.post('/upload-brand1', filtered_email);


router.get('/getallbrands',get_all_brands)


router.get('/getallresidentialemailflorida',get_residential_emails_from_florida)

router.get('/getallresidentialemailnewyork',getallresidentialemailnewyork)

router.get('/getallcommercialemailflorida',getallcommercialemailflorida)

router.get('/getallcommercialemailnewyork',getallcommercialemailnewyork)

router.get('/commercialrealestateother',commercialrealestateother)

router.get('/residentialrealestateother',residentialrealestateother)

router.post('/saved-emails', saved_emails);

router.get('/getfavorite_emails/:id',fave_email)

router.post('/follow-emails', follow_brand);

router.get('/getfollowbrands/:id',get_user_follow_brands)


router.get('/search_filter/:id',filter_search)

router.post('/admin-signup', admin_signup);


router.post('/admin-login', admin_login);


router.post('/gmailcode', gmail_code);


router.post('/google-signup', google_signup);

router.post('/facebook-signup', facebook_signup);




router.get('/check_for_more_email_brand',check_for_more_email_brand)

router.post ('/deletebrandandemail',Delete_brand_and_Email)



router.post ('/like_post',like_post)







module.exports = router;
