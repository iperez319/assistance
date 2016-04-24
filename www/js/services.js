angular.module('app.services', [])

.factory('MembersFactory', function($http){

  return {

      getMembers: function(){

          return $http.get('https://baas.kinvey.com/appdata/kid_Zk0NE5LXpg/Members', {headers:{'Authorization': 'Basic a2lkX1prME5FNUxYcGc6YjZmMjU3NjU0YmIwNDY4YzllZTI1MjgyNTNhMmI3NWI='}});
      },
      getMember: function(id){

          return $http.get('https://baas.kinvey.com/appdata/kid_Zk0NE5LXpg/Members/' + id, {headers:{'Authorization': 'Basic a2lkX1prME5FNUxYcGc6YjZmMjU3NjU0YmIwNDY4YzllZTI1MjgyNTNhMmI3NWI='}});
      },
      getPermanents: function(){
       
        return $http.get('https://baas.kinvey.com/appdata/kid_Zk0NE5LXpg/Members/?query={"isPermanent":true}', {headers:{'Authorization': 'Basic a2lkX1prME5FNUxYcGc6YjZmMjU3NjU0YmIwNDY4YzllZTI1MjgyNTNhMmI3NWI='}});

      }

  };

})

.factory('AssistanceFactory', function($http){

  return {

    getAssistance: function(date)
    {
      return $http.get('https://baas.kinvey.com/appdata/kid_Zk0NE5LXpg/Assistance/?query={"Date":"' + date + '"}', {headers:{'Authorization': 'Basic a2lkX1prME5FNUxYcGc6YjZmMjU3NjU0YmIwNDY4YzllZTI1MjgyNTNhMmI3NWI='}});
    },
    setAssistance: function(object, id)
    {
        return $http.put('https://baas.kinvey.com/appdata/kid_Zk0NE5LXpg/Assistance/' + id, object, {headers:{'Authorization': 'Basic a2lkX1prME5FNUxYcGc6YjZmMjU3NjU0YmIwNDY4YzllZTI1MjgyNTNhMmI3NWI='}});
    }

  };

})

.factory('JobFactory', function($http){

  return{

    getJobs: function()
    {
      return $http.get('https://baas.kinvey.com/appdata/kid_Zk0NE5LXpg/Jobs/', {headers:{'Authorization': 'Basic a2lkX1prME5FNUxYcGc6YjZmMjU3NjU0YmIwNDY4YzllZTI1MjgyNTNhMmI3NWI='}});
    },
    getJob: function(id)
    {
      return $http.get('https://baas.kinvey.com/appdata/kid_Zk0NE5LXpg/Jobs/' + id, {headers:{'Authorization': 'Basic a2lkX1prME5FNUxYcGc6YjZmMjU3NjU0YmIwNDY4YzllZTI1MjgyNTNhMmI3NWI='}});
    }

  };

})

  // .filter('gradeAndName', function()
  // {
  //
  //
  //   return function(val, name, grade) {
  //
  //
  //     var out = [];
  //
  //     if (name == "" || name == undefined && grade == undefined || grade == "") {
  //       return val
  //     }
  //
  //     else {
  //       angular.forEach(val, function (item) {
  //
  //
  //         if (name != undefined || name != "") {
  //           if (item.Name.substring(0, name.length) == name) {
  //             if (grade != "None") {
  //               if (grade == item.Grade) {
  //                 out.push(item)
  //               }
  //             }
  //             else {
  //               out.push(item)
  //             }
  //
  //           }
  //         }
  //         else if (grade != "None") {
  //           if (item.Grade == grade)
  //           {
  //             out.push(item);
  //           }
  //         }
  //
  //       })
  //
  //       return out;
  //     }
  //   }
  // })

.service('BlankService', [function(){


}]);
