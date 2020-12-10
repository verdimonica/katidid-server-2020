const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const eventSchema = new Schema(
    {
        pampersBrown: { type:  Boolean},
        pampersBlue: { type: Boolean},
        nap: { type: Boolean},
        meal: { type: Boolean},
        comment: { type: String },
        date: {type: Date, default: Date.now}
    }
)

module.exports = eventsSchema;