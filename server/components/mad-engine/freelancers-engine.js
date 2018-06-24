'use strict';

var _ = require('lodash');
var User = require('api/user/user.model');


module.exports.search = function (project, cb) {
  if (_.isEmpty(project.skills)) {
    return cb(new Error("No Skills defined for Pet"));
  }

  User.find({
    $and: [
      {"role": "freelancer"},
      {skills: {$in: project.skills}},
      {_id: {$nin: project.okFreelancers}},
      {_id: {$nin: project.nokFreelancers}}
    ]
  }, function (err, users) {
    if (err) {
      return cb(err);
    }

    cb(null, users);
  })
};
