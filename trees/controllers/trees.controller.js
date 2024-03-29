const TreeModel = require('../models/trees.model');
const crypto = require('crypto');

exports.insert = (req, res) => {
    /*
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    */

    TreeModel.createTree(req.body)
        .then((result) => {
            res.status(201).send({id: result._id});
        });
};

exports.list = (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100000 ? parseInt(req.query.limit) : 100000;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }
    TreeModel.list(limit, page)
        .then((result) => {
            res.status(200).send(result);
        })
};

exports.getById = (req, res) => {
    TreeModel.findById(req.params.Id)
        .then((result) => {
            res.status(200).send(result);
        });
};


exports.patchById = (req, res) => {

    TreeModel.patchTree(req.params.Id, req.body)
        .then((result) => {
            res.status(204).send({});
        });

};

exports.removeById = (req, res) => {
    TreeModel.removeById(req.params.Id)
        .then((result)=>{
            res.status(204).send({});
        });
};

exports.removeAll = (req, res) => {
    TreeModel.removeAll()
        .then((result)=>{
            res.status(204).send({});
        });
};
