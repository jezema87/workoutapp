var db = require("../models");
const {Workout} = require("../models");
let mongoose = require("mongoose");

module.exports = function(app) {

    app.get("/api/workouts", (req,res) => {
        db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout)
        })
        .catch(err => {
            res.json(err);
        });
    });

    app.post("/api/workouts", (req, res) => {
        const workout = new db.Workout(req.body);
        workout.updateTotalDuration();
    
        db.Workout.create(workout)
        .then(results => {
            res.json(results);
        });
    });

    app.put("/api/workouts/:id", (req,res) => {
        db.Workout.findOne({
            _id: req.params.id
        }).then (dbWorkout => {
            let currentDuration = dbWorkout.totalDuration + req.body.duration;
            db.Workout.updateOne({
                _id: req.params.id
            }, {$push: {
                exercises: req.body
            }, totalDuration: currentDuration
        }).then(dbWorkout => {
            res.json(dbWorkout);
        }).catch(err=> {
            res.json(err);
        })
    });
});

    app.get("/api/workouts/range", (req,res) => {
        db.Workout.find({})
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
    });

};