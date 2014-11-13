define(['angular'], function (angular) {
  'use strict';

  angular.module('lapApp.services.Project', []).factory('Project', function ($rootScope, $resource, FIREBASE_URL, Firebase, $firebase, User) {
    var ref = new Firebase(FIREBASE_URL + 'projects');
    var homeRef = new Firebase(FIREBASE_URL);
    var home = $firebase(homeRef);
    var projects = $firebase(ref);

    var Project = {
      all: function () {
        return home.$child('projects').$on('child_added', function() {
          $rootScope.upcoming = [];
          var timeInMs = Date.now();

          angular.forEach($rootScope.projects, function(p, projectId) {
            if (p.name !== '' && p.location !== '' && projectId !== '$id') {
              if(p.date > timeInMs) {
                $rootScope.upcoming.unshift(p);
              }
            }
          });
        });
      },
      create: function (proj, projId) {
        if (User.signedIn()) {
          projects[projId] = proj;

          return projects.$save(projId).then(function() {
            var object = {};
            var myVar = projId;
            object[myVar] = projId;
            var user = User.getCurrent();
            var projectId = projId;
 
            user.$child('projects').$update(object);
            return projectId;
          });
        }
      },
      find: function (projId) {
        return projects.$child(projId);
      },
      updateDonations: function (proj) {
        var p = Project.find(proj.id);

        p.donations = proj.donations;
        return projects.$child(proj.id).$update(p);
      },
      addVolunteer: function (projId, role, size, contact) {
        if (User.signedIn()) {
          var user = User.getCurrent();
          var volunteer = {};

          if(role !== null && size !== null && contact !== null) {
            volunteer.role = role;
            volunteer.size = size;
            volunteer.contact = contact;
          }
          
          volunteer.username = user.username;
          volunteer.uid = $rootScope.uid;
          volunteer.projId = projId;
          volunteer.date = Date.now();
          volunteer.image = $rootScope.currentUser.data.picture.data.url;
           
          projects.$child(projId).$child('volunteers').$add(volunteer).then(function () {
            var object = {};
            var myVar = projId;
            object[myVar] = projId;
            user.$child('projects').$update(object);
            var project = Project.find(projId);
            
            if (project.hasOwnProperty('volunteerCount')) {
              project.volunteerCount++;
            } else {
              project.volunteerCount = 1;
            }
            
            project.percentage = project.volunteerCount / project.target * 100;
            return projects.$child(projId).$update(project);
          });
        }
      },
      addComment: function (projId, comment) {
        if (User.signedIn()) {
          var user = User.getCurrent();

          comment.username = user.username;
          comment.uid = $rootScope.uid;
          comment.projId = projId;
          comment.date = Date.now();
          
          projects.$child(projId).$child('comments').$add(comment).then(function (ref) {
            projects.$child(projId).$child('comments').$child(ref.name()).$update({commentId: ref.name()});
            user.$child('comments').$child(ref.name()).$update({id: ref.name(), projId: projId});
          });
        }
      },
      deleteComment: function (project, comment) {
        if (User.signedIn()) {
          var user = User.findByUid($rootScope.uid);
           
          project.$child('comments').$remove(comment.commentId).then(function () {
            user.$child('comments').$remove(comment.commentId);
          });
        }
      }
    };

    return Project;
  });
});