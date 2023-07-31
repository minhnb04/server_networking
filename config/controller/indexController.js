const Planetary = require('../../model/planetary');

class IndexController {
    async index(req, res, next) {
        await Planetary.find()
            .then((planetaries) => {
                res.render('index', { title: 'Planetarys Management', planetaries })
            })
            .catch((error) => {
                next(error)
            })
    }

    async addPlanetary(req, res, next) {

        var planetary = new Planetary(
            {
                title: req.body.title,
                url: req.body.url,
                date: req.body.date,
            })

        try {
            await planetary.save()
                .then((result) => {
                    res.redirect('/')
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    res.json(error)
                });
        } catch (err) {
            console.error(err);
        }
    }

    async editPlanetary(req, res, next) {
        try {
            await Planetary.updateOne({ _id: req.params.id },
                {
                    title: req.body.title,
                    url: req.body.url,
                    date: req.body.date,
                })
                .then((result) => {
                    console.log('Planetary edited:', result);
                    res.redirect('/')
                })
                .catch((error) => {
                    console.error('Error creating user:', error);
                    res.json(error)
                });
        } catch (err) {
            console.error(err);
        }
    }


    async deletePlanetary(req, res, next) {
        // const currentPlanetary = await Planetary.findById(req.params.id)
        await Planetary.deleteOne({ _id: req.params.id })
            .then(() => {
                return res.redirect('/')
            })
            .catch(next)
    }

    async searchPlanetary(req, res, next) {
        var keyword_search = req.query.keyword_search
        var query = Planetary.where({
            $or:[
                {planetaryName:{$regex:keyword_search, $options:'i'}},
                {quantity:{$regex:keyword_search, $options:'i'}},
                {price:{$regex:keyword_search, $options:'i'}},
                {date:{$regex:keyword_search, $options:'i'}},
            ]
        })

        await Planetary.find(query)
        .then((planetary)=>{
            var planetaries = planetary.map(function (planetary) {
                return {
                    _id: planetary._id,
                    title: planetary.title,
                    url: planetary.url,
                    date: planetary.date,
                }
            })
            console.log(planetaries);
            res.render('index', { title: 'Planetarys Management', planetaries })
        })
        .catch((error)=>{
            next(error)
        })

    }

}

module.exports = new IndexController;