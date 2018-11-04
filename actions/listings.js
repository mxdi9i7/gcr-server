import Listings from '../database/model/listings'
const mongoose = require('mongoose');

function create(req, res) {
    const data = req.body;
    const listings = new Listings({
        agent_id: data.agent_id,
        listing_type: data.listingType,
        detail: {
            title: data.title,
            description: data.description,
            property_type: req.body.property_type,
            price: Number(data.price || 0),
            living_area: Number(data.living_area || 0),
            lot_size: Number(data.lot_size || 0),
            beds: Number(data.beds || 0),
            baths: Number(data.baths || 0),
            build: data.yearBuilt,
            zoning: data.zoning,
        },
        images: req.files,
        location: {
            street: data.street,
            city: data.city,
            county: data.county,
            gpcode: data.gpcode,
            state: data.state,
            zipcode: data.zipcode,
        },
        status: {
            hide_address: data.visible,
            views: 0
        }
    });     

    listings.save((err, docs) => {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                message: 'Successfully created listing!'
            });
        }
    });
}
function fetchListingByAgent(req, res) {
    const agent_id = req.query.id;
    Listings.find({agent_id}).exec((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                data,
                message: 'Successfully created listing!'
            });
        }
    })
}
function fetchListings(req, res) {
    Listings.find().limit(12).sort({_id: -1}).exec((err, data) => {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                data,
                message: 'Successfully created listing!'
            });
        }
    })
}

function removeListingByID(req, res) {
    Listings.findOneAndRemove({_id: req.body.id}, (err, doc) => {
        if (err) {
            res.json({
                success: false,
                message: err
            });
        } else {
            res.json({
                success: true,
                doc,
                message: 'Successfully removed listing!'
            });
        }
    })
}

export {
    fetchListingByAgent,
    create,
    fetchListings,
    removeListingByID
};
