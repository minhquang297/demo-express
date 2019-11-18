var Contract = require('../models/contract.model');

module.exports.index = async function(req, res) {
    var contracts = await Contract.find();
    res.render('contracts/index', {
        contracts: contracts
    })
};


module.exports.search = async function(req, res) { //search by date
    var date = req.query.date.split('/');
    var year = date[2];
    var day = date[1];
    var month = date[0];
    var dateToSearch = `${year}-${month}-${day}`
    var condition = req.query.statusSearch
    var contracts = await Contract.find(
        condition == '' ? {
            created_at: {
                "$gte": new Date(`${dateToSearch}T00:00:00.000Z`),
                "$lt": new Date(`${dateToSearch}T23:59:59.999Z`)
            }
        } : {
            $and: [{
                    created_at: {
                        "$gte": new Date(`${dateToSearch}T00:00:00.000Z`),
                        "$lt": new Date(`${dateToSearch}T23:59:59.999Z`)
                    }
                },
                {
                    status: `${req.query.statusSearch}`
                }
            ]
        }
    )
    res.render('contracts/index', {
        contracts: contracts
    });
};

module.exports.create = function(req, res) {
    res.render('contracts/create');
};

module.exports.get = function(req, res) {
    var id = req.params.id;
    Contract.findById(id, function(err, contract) {
        if (err) throw err;
        res.render('contracts/edit', {
            contract: contract
        })
    });
}

module.exports.getView = function(req, res) {
    var id = req.params.id;
    Contract.findById(id, function(err, contract) {
        if (err) throw err;
        res.render('contracts/view', {
            contract: contract
        })
    });
}

module.exports.postCreate = function(req, res) {
    var contract = new Contract({
        address: req.body.address,
        clientName: req.body.clientName,
        status: req.body.status
    })
    contract.save(function(err) {
        if (err) {
            return handleError(err);
        }
    })
    res.redirect('/contracts')
}

module.exports.updateContract = function(req, res) {
    Contract.findOneAndUpdate({ "_id": req.body.id }, req.body, { new: true }, (err, doc) => {
        if (err) {
            console.log(err);
            res.status(500).send();
        } else {
            res.redirect('/contracts');
        }
    });
};