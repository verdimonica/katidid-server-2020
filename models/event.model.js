const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        pampersBrown: {type:  Boolean},
        pampersBlue: {type: Boolean},
        nap: {type: Boolean},
        meal: {type: Boolean},
        comment: {type: String},
        date: {type: Date, default: Date.now},
        childId: {type: Schema.Types.ObjectId, ref:"Child"}
    }
)

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;