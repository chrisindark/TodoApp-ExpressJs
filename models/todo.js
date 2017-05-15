var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
    text: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
});

mongoose.model('Todo', TodoSchema);
