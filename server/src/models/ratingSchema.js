import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ragpickerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'RagPicker',
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    ratingstars: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    }
}, {
    timestamps: true
});

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;
