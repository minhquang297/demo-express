var Contract = require('../models/contract.model');

module.exports.index = async function(req, res) {
    var contracts = await Contract.find();
    res.render('contracts/index', {
        contracts: contracts
    })
};

module.exports.search = async function(req, res) {
    var q = req.query.q;
    var contracts = await Contract.find();
    var matchedContracts = contracts.filter(function(contract) {
        return contract.address.toLowerCase().indexOf(q.toLowerCase()) !== -1;
    })

    res.render('contracts/index', {
        contracts: matchedContracts
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
    Contract.findOneAndUpdate({ id: req.body.id }, req.body, { new: true }, (err, doc) => {
        if (err) return res.status(500).send(err);
        return res.redirect('/contracts')
    });
}