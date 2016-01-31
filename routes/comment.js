/**
 * Created by MuyBien on 1/30/16.
 */
var models = require('../models');

exports.addComment = function(req, res) {

    console.log('zzzzzzzzzzzzzzzzzzz');

    var form_data = req.body;
    var idNumber = form_data["projectID"];

    console.log(idNumber);

    models.Project.find({"_id": idNumber}).exec(function(err, project){
        if (err) return handleError(err);

            console.log(project);
            console.log(project[0]._id);

            var newComment = new models.Comment({
                'comment': form_data["comment"]
            });

            console.log(newComment);

            project[0].comments.push(newComment._id);

            console.log(project[0]);
            project[0].save(function(err) {
                if (err) return handleError(err);
            });

            newComment.save(function(err){
                if (err) return handleError(err);
                res.send(200);
            });

       // console.log("comment saved");
    });

    //models.Comment.find().exec(function(err, comment){
    //    if(err) return handleError(err);
    //    console.log(comment);
    //});

}