var express = require('express');
var router = express.Router();
const multer = require('multer');

const indexController = require('../config/controller/indexController')

const storage = multer.diskStorage({
    destination:(req, file, res)=>{
        res(null, 'uploads')
    },
    filename: (req, file, res)=>{
        res(null,Date.now()+'-'+file.originalname)
    }
})

var upload = multer({storage:storage});

/* GET home page. */
router.get('/', indexController.index);

router.post('/addPlanetary', indexController.addPlanetary);

router.post('/editPlanetary/:id', indexController.editPlanetary);

router.post('/deletePlanetary/:id', indexController.deletePlanetary);

router.get('/search', indexController.searchPlanetary);


router.get('/getPlanetary', indexController.getPlanetary);


module.exports = router;
