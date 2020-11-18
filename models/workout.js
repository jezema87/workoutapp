const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        type: {
            type: String,
            trim: true,
            required: "resistance"
        },
        name: {
            type: String,
            trim: true,
            required: "Bicep Curl"
        },
        duration: {
            type: Number,
            unique: false
        },
        weight: {
            type: Number,
            unique: false
        },
        reps: {
            type: Number,
            unique: false
        },
        sets: {
            type: Number,
            unique: false
        },
        distance: {
            type: Number,
            unique: false
        }
    }],

    totalDuration: Number
});

WorkoutSchema.methods.updateTotalDuration = function() {
    let currentDuration = 0;
    for(const d of this.exercises) {
        currentDuration = currentDuration + d.duration;
    }
    this.totalDuration = currentDuration;
    return this.totalDuration;
};

const Workout = mongoose.model("Workout", WorkoutSchema);

module.exports = Workout;




