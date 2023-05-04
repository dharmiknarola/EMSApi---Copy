const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    FirstName: String,
    LastName: String,
    Age: Number,
    DateOfJoining: {type: Date, default: new Date()},
    Title: String,
    Department: String,
    EmployeeType: String,
    CurrentStatus: { type: Boolean, required: true }

});

const Employee = mongoose.model('management', UserSchema, "management");
module.exports = Employee;