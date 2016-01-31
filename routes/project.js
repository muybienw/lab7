var models = require('../models');

exports.projectInfo = function(req, res) { 
  var projectID = req.params.id;

  // query for the specific project and
  // call the following callback

  function afterQuery(err, projects) {
    if(err) console.log(err);
    res.json(projects[0]);
  }

  console.log("projectID is :");
  console.log(projectID);

  models.Project.find({"_id" : projectID}).exec(afterQuery);
}

exports.addProject = function(req, res) {
  var form_data = req.body;

  //console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
  //console.log(form_data);
  //console.log(form_data['project_title']);

  // make a new Project and save it to the DB
  // YOU MUST send an OK response w/ res.send();
  var newPost = new models.Project({
    'title': form_data["project_title"],
    'date': new Date(form_data["date"]),
    'summary': form_data["summary"],
    'image': form_data["image_url"]
  });


  newPost.save(function(err){
    if(err) console.log(err);
    res.send(200);
  });

}

exports.deleteProject = function(req, res) {
  var projectID = req.params.id;

  // find the project and remove it
  // YOU MUST send an OK response w/ res.send();

  models.Project.find({"_id" : projectID}).remove().exec(function(err){
    if(err) console.log(err);
    res.send(200);
  });

}