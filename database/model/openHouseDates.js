import mongoose from '../db';

const Schema = mongoose.Schema;
const opdSchema = new Schema({
    start_time: { type: Date },
    end_time: { type: Date },
    property_id: { type: String }
})

export default mongoose.model('openhouseDates',opdSchema);