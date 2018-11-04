import mongoose from '../db';

const Schema = mongoose.Schema;
const ListingSchema = new Schema({
    agent_id: { type: String },
    lsting_type: { type: String },
    detail: {
        title: { type: String },
        title_lang: { type: String },
        description: { type: String },
        description_lang: { type: String },
        property_type: { type: String },
        price: { type: Number },
        previous_price: { type: Number },
        price_unit: { type: String },
        living_area: { type: Number },
        lot_size: { type: Number },
        beds: { type: Number },
        baths: { type: Number },
        build: { type: String },
        zoning: { type: String },
        credit_check: { type: Boolean},
        income_report: { type: Boolean},
        background_check: { type: Boolean}
    },
    images: [{
        fieldname:{ type: String },
        originalname:{ type: String },
        encoding:{ type: String },
        mimetype:{ type: String  },
        destination:{ type: String },
        filename:{ type: String },
        path:{ type: String },
        size:{ type: Number },
    }],
    location: {
        street: { type: String },
        city: { type: String },
        county: { type: String },
        gpcode: { type: String },
        state: { type: String },
        zipcode: { type: String },
    },
    status: {
        visible: { type: Boolean},
        provide: { type: String },
        top: { type: Boolean},
        available: { type: Boolean},
        hide_address:{ type: Boolean},
        views:{ type: Number,default:0 },
    },
    created_at: { type : Date, default: Date.now },
    last_updated: { type : Date, default: Date.now }
})

export default mongoose.model('Listing',ListingSchema);