if (!Array.prototype.remove) {
  Array.prototype.remove = function(val) {
    var i = this.indexOf(val);
         return i>-1 ? this.splice(i, 1) : [];
  };
}

function formatDate(date)
{

  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  var d = date.getDate();
  var month = date.getMonth();
  var year = date.getFullYear();

  return months[month] + " " + d + ", " + year;
}

angular.module('app.controllers', [])

.controller('assistanceCtrl', function($scope, AssistanceFactory, MembersFactory, $rootScope, $ionicLoading) {

  $ionicLoading.show({template:'Fetching...'});

  $scope.extras = [];
  $scope.permanents = [];
  $scope.showPage = true;


  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  var t = mm+'/'+dd+'/'+yyyy;
  $scope.date = formatDate(today);

    AssistanceFactory.getAssistance(t).then(function(response){

        $scope.response = response.data[0];
        $scope.OBJid = response.data[0]["_id"];
        $scope.workers = [];
        $scope.presenters = [];
        if(response.data[0] == undefined)
        {
        // No objects for this date
        $scope.showPage = false;
        }
        else {

            var r = response.data[0];
            var workers = r["Workers"].split(',');
            var presenters = r["Presenters"].split(',');

            for (var i = 0; i < workers.length; i++) {
              var current = workers[i].split('-');
              if(current[4] != "UNKNOWN")
              {
              $scope.workers.push({text: current[2] + " - " + current[3] + current[4], id: current[0], selected:false, excused: false});
            }
            else {

                $scope.workers.push({text: current[2] + " - " + current[3], id: current[0], selected:false, excused: false});

            }
            }
            for (var x = 0; x < presenters.length; x++) {
              var current = presenters[x].split('-');
              if(current[4] != "UNKOWN")
              {
              $scope.presenters.push({text: current[2] + " - " + current[3] + current[4], id: current[0], selected:false, excused: false});
            }
            else {

                $scope.presenters.push({text: current[2] + " - " + current[3], id: current[0], selected:false, excused: false});

            }
            }


        }


    });
    MembersFactory.getPermanents().then(function(response){

      for (var i = 0; i < response.data.length; i++) {
        var current = response.data[i];

        if (current["Homeroom"]== "UNKOWN") {

          $scope.permanents.push({text: current["Name"] + " - " + current["Grade"], id:current["_id"], selected:false, excused: false});

        }
        else {

          $scope.permanents.push({text: current["Name"] + " - " + current["Grade"] + current["Homeroom"], id:current["_id"], selected:false, excused: false});

        }

      }
  $ionicLoading.hide();
    });

  $scope.$on("$ionicView.enter", function(){

      if($rootScope.extras != undefined)
      {
         $scope.extras.push($rootScope.extras);
      }
      $rootScope.extras = undefined;

    });

  $scope.submit = function()
   {
     var presenters = $scope.presenters;
     var workers = $scope.workers;
     var permanents = $scope.permanents;
     var extras = $scope.extras;

     var present = [];
     var absent = [];
     var ext = [];
     var excused = [];

     for(var x = 0; x < presenters.length; x++)
      {
         var current = presenters[x];

         if(current.selected == true && current.excused == false)
         {
           // Present
           present.push(current.id + "-Presenter");
         }
         else if(current.selected == false && current.excused == false)
         {
           //Absent
           absent.push(current.id + "-Presenter");
         }
         else if(current.selected == true && current.excused == true)
         {
           //Excused
           excused.push(current.id + "-Presenter");
         }
         else if(current.selected == false && current.excused == true)
         {
           //Absent
           absent.push(current.id + "-Presenter");
         }
      }
    for(var x = 0; x < workers.length; x++)
     {
        var current = workers[x];

        if(current.selected && current.excused == false)
        {
          // Present
          present.push(current.id + "-Workers");
        }
        else if(current.selected == false && current.excused == false)
        {
          //Absent
          absent.push(current.id + "-Workers");
        }
        else if(current.selected && current.excused)
        {
          //Excused
          excused.push(current.id + "-Workers");
        }
        else if(current.selected == false && current.excused)
        {
          //Absent
          absent.push(current.id + "-Workers");
        }
     }
     for(var x = 0; x < permanents.length; x++)
      {
         var current = permanents[x];

         if(current.selected && current.excused == false)
         {
           // Present
           present.push(current.id + "-Permanents");
         }
         else if(current.selected == false && current.excused == false)
         {
           //Absent
           absent.push(current.id + "-Permanents");
         }
         else if(current.selected && current.excused)
         {
           //Excused
           excused.push(current.id + "-Permanents");
         }
         else if(current.selected == false && current.excused)
         {
           //Absent
           absent.push(current.id + "-Permanents");
         }
      }
      for(var x = 0; x < extras.length; x++)
       {
          var current = extras[x];

          if(current.selected)
          {
          ext.push(current.id +"-Extras");
        }
       }

        var resp = $scope.response;
        resp.Present = (present.join() != "")?present.join() : null;
        resp.Absent = (absent.join() != "")?absent.join(): null;
        resp.Extras = (ext.join() != "")?ext.join(): null;
        resp.Excused = (excused.join() != "")?excused.join(): null;


        console.log(JSON.stringify({Date : resp.Date, Workers : resp.Workers, Presenters : resp.Presenters, Present: resp.Present, Excused : resp.Excused, Absent : resp.Absent, Extras : resp.Extras}));

        AssistanceFactory.setAssistance(JSON.stringify({Date : resp.Date, Workers : resp.Workers, Presenters : resp.Presenters, Present: resp.Present, Excused : resp.Excused, Absent : resp.Absent, Extras : resp.Extras, Done: true}), $scope.OBJid).then(function(res){
          console.log("DONE");

        });
   };

    $scope.hold = function(object)
       {
          if(object.excused)
          {
              object.excused = false;
              object.selected = true;
          }
          else {
              object.excused = true;
              object.selected = true;

          }
       }
    $scope.delete = function(e)
    {
      console.log(e);
      $scope.extras.remove(e);
    }

})

.controller('memberDetailCtrl', function($scope, $rootScope, MembersFactory, $ionicLoading) {
    $ionicLoading.show({template: 'Fetching...'});
    var id = $rootScope.selected;
    $rootScope.selected = null;
    MembersFactory.getMember(id).then(function(response){

      var member = response.data;

      $scope.name = member["Name"];
      $scope.grade = member["Grade"].toString();
      $scope.homeroom = member["Homeroom"];
      $scope.email = member["Email"];
      $scope.phone = member.Phone;
      $scope.isPresenter = member.Presenter;

      var present = (member.Present == null)? 0: member.Present;
      var excused = (member.Excused == null)? 0: member.Excused;
      var extras = (member.Extras == null)? 0: member.Extras;
      var absent = (member.Absent == null)? 0: member.Absent;

      if(present == 0 && excused == 0 && extras == 0 && absent == 0)
      {
        $scope.showAssistance = false;
      }
      else {

        $scope.labels = ["Present", "Excused", "Extras", "Absent"];
        $scope.data = [present, excused, extras, absent];

        $scope.showAssistance = true;
      }


      $ionicLoading.hide();

      $scope.update = function()
      {

      };

  });




})

.controller('membersCtrl', function($scope, MembersFactory, $rootScope, $location, $state) {

    $scope.members = [];
  


    MembersFactory.getMembers().then(function(response){

    for (var i = 0; i < response.data.length; i++) {
      var current = response.data[i];
  if (current["Homeroom"] == "UNKNOWN") {
    $scope.members.push({text: current["Name"] + " - " + current["Grade"], id: current["_id"], Grade:current["Grade"], Name:current["Name"]});
  }
  else {

    $scope.members.push({text: current["Name"] + " - " + current["Grade"] + current["Homeroom"], id: current["_id"], Grade:current["Grade"], Name:current["Name"]});

  }


    }

    });

    $scope.click = function(object)
    {
      $rootScope.selected = object.id;
      $state.go('tabsController.memberDetail');


    };


  })

.controller('searchMemberCtrl', function($scope, $rootScope, $location, MembersFactory) {



  $scope.members = [];

  MembersFactory.getMembers().then(function(response){
  console.log(response.data);
    for (var i = 0; i < response.data.length; i++) {
      var current = response.data[i];
      if(current.isPermanent == true)
      {
        continue;
      }
  if (current["Homeroom"] == "UNKNOWN") {
    $scope.members.push({text:current["Name"] + " - " + current["Grade"], id:current["_id"], selected: true});
  }
  else {

    $scope.members.push({text: current["Name"] + " - " + current["Grade"] + current["Homeroom"], id:current["_id"], selected: true});

  }

  $scope.onClick = function(member)
  {
    $rootScope.extras = {};
    $rootScope.extras = (member);
    $location.path('tabsController.searchMember');
  };


    }

    });

})

.controller('jobsCtrl', function($scope, JobFactory, $rootScope, $state) {

    $scope.jobs = [];

    JobFactory.getJobs().then(function(response){

      var jobs = response.data;

      for(var y = 0; y < jobs.length; y++)
      {
        $scope.jobs.push({text: jobs[y].Description + " - " + jobs[y].Deadline, id: jobs[y]["_id"]});
      }
          console.log($scope.jobs);
    });

    $scope.click = function(object)
    {
      $rootScope.selectedJob = object.id;
      $state.go('tabsController.jobDetail');
    }

})

.controller('moreCtrl', function($scope) {
  
})

.controller('assistanceHistoryCtrl', function($scope) {

})

.controller('jobDetailCtrl', function($scope, $rootScope, JobFactory) {

  var id = $rootScope.selectedJob;
  $rootScope.selectedJob = null;

  JobFactory.getJob(id).then(function(response){

    $scope.description = response.data.Description;
    $scope.assigned = response.data.Assigned.split(',');
    $scope.completed = response.data.Completed;

  });


})

.controller('jobCtrl', function($scope) {

})

.controller('job2Ctrl', function($scope) {

})

.controller('settingsCtrl', function($scope) {

})

.controller('excusesCtrl', function($scope) {

})

.controller('addJobCtrl', function($scope){
  
  
  
})
;
