// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Facoltà = require('./facolta');
var Corsi =require('./corsi');
var ExamPassed =require ('./esamisvolti');
var bcrypt = require ('bcrypt-nodejs');
var bCrypt = require('bcrypt');

var studentSchema = new Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    address:{ type: String, required: true },
    bod: { type: Date,  required: true  }, 
    matricola: { type: String, required: true, unique: true },
     codFacolta: { type: String, ref: 'Facoltà', required: true }, 
    email: { type: String, required: true, unique: true, validate: function(email) {
        return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
    } },
    phone: { type: Number, unique:true,required:true},
    username: { type: String, required: true },
    password: { type: String, required: true },
    gender: {type: String, required:true, enum: ['F','M'] }, 
    annoCorso: {type: String, enum: ['1','2','3','FuoriCorso']},
  /*   esamifatti:[ExamPassed.schema], */
    pianoDiStudio:[Corsi.schema],
    ruolo: {
        type: String,
        enum: ['student','admin','prof','user'],
        default: 'student' },
    },
        {
            versionKey: false
        });
        

 
studentSchema.methods.comparePassword = function (passw, cb) {
    bCrypt.compare(passw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

//-----STUDENTI-----
var Student = mongoose.model('Student', studentSchema);
module.exports = Student;