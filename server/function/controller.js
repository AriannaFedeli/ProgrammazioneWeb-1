Admin = require('../models/admin');
Prof = require('../models/professore');
Student = require('../models/student');
var jwt = require('jwt-simple');


exports.showProfile = function (req, res) {
    var token = getToken(req.headers);
    if (token) {
        var decoded = jwt.decode(token, process.env.SECRET);
        Prof.findOne({
            _id: decoded._id,
        }).exec(function (err, prof) {
            if (err)
                return res.json({ success: false, msg: 'il token non è valido' });
            if (prof)
                return res.json({ succes: true, msg: 'prof' });
            if (!prof) {
                Admin.findOne({
                    _id: decoded._id
                }).exec(function (err, admin) {
                    if (err)
                        return res.json({ success: false, msg: 'il token non è valido' });
                    if (admin)
                        return res.json({ succes: true, msg: 'admin' });
                    if (!admin) {
                        Student.findOne({
                            _id: decoded._id
                        }).exec(function (err, student) {
                            if (err)
                                return res.json({ success: false, msg: 'il token non è valido' });
                            if (student)
                                return res.json({ succes: true, msg: 'student' });
                            if (!student)
                                return res.json({ succes: false, msg: 'profilo non trovato' })
                        })
                    }
                })
            }
        })
    } else {
        return res.json({ success: false, msg: 'token non valido' })
    }
}