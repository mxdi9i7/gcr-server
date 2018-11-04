var pagination = require('./pagination')
import Listings from '../database/model/listings'
import openHouseDates from '../database/model/openHouseDates'
import Users from '../database/model/users'

//只显示查询的前20个结果
const HOUSE_SEARCH_PAGE = 20;

isPhoneNumber = (str) => {
    var isAllNumber = /\d+$/.test(str);
    if (isAllNumber && str.length > 5) {
        return true;
    } else {
        return false;
    }
}

keyword = (req, res, next) => {
    var { type, query } = req.query;
    var decodeURI = decodeURIComponent(query);
    if (isPhoneNumber(decodeURI)) {
        if (!query) { res.json([]) } else {
            Users.findOne({ tel: decodeURI }, (err, docs) => {
                if (err) {
                    console.log(err);
                } else {
                    if (docs) {
                        Listings.find({ listing_type: type, agent_id: "" + docs.agent_id }, (err, docs) => {
                            if (err) {
                                console.log(err);
                            }
                            var pageData = pagination(docs, HOUSE_SEARCH_PAGE, 1);
                            res.json(pageData);
                        })
                    } else {
                        var pageData = pagination(docs, HOUSE_SEARCH_PAGE, 1)
                        res.json(pageData);
                    }
                }
            })
        }
    } else {
        if (!query) { res.json([]) } else {
            Listings.find({
                $and: [
                    { listing_type: type },
                    {
                        $or: [
                            { 'detail.title': { $regex: decodeURI, $options: 'i' } },
                            { 'location.address': { $regex: decodeURI, $options: 'i' } },
                            { 'location.city': { $regex: decodeURI, $options: 'i' } },
                            { 'location.zipcode': { $regex: decodeURI, $options: 'i' } },
                            { 'location.state': { $regex: decodeURI, $options: 'i' } },
                            { 'location.zone': { $regex: decodeURI, $options: 'i' } }
                        ]
                    }]
            }, (err, docs) => {
                if (err) {
                    console.log(err)
                }
                var pageData = pagination(docs, HOUSE_SEARCH_PAGE, 1)
                res.json(pageData)
            })
        }
    }
}
/*
filter = (req, res) => {
    "use strict";
    var {
        queryType,
        minPrice,
        maxPrice,
        zoning,
        city,
    } = req.query;
    if (!minPrice && maxPrice) {
        Listings.find({
            $and: [
                { type: { $regex: queryType, $options: 'i' } },
                { 'location.city': { $regex: city, $options: 'i' } },
                { 'location.zone': { $regex: zoning, $options: 'i' } }
            ]
        }, (err, docs) => {
            if (err) {
                res.status(500).json({
                    messgae: err
                })
            } else {
                res.send(docs);
            }
        })
    } else {
        if (minPrice && maxPrice) {
            Listings.find({
                $and: [
                    { type: { $regex: queryType, $options: 'i' } },
                    { 'location.city': { $regex: city, $options: 'i' } },
                    { 'location.zone': { $regex: zoning, $options: 'i' } },
                    { price: { $lt: maxPrice } },
                    { price: { $gt: minPrice } }
                ]
            }, (err, docs) => {
                if (err) {
                    res.status(500).json({
                        messgae: err
                    })
                } else {
                    res.send(docs);
                }
            })
        }
    }
}
*/
module.exports.keyword = keyword;
module.exports.filter = filter;