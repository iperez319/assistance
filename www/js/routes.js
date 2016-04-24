angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider



    .state('tabsController.assistance', {
      url: '/assistance',
      views: {
        'tab1': {
          templateUrl: 'templates/assistance.html',
          controller: 'assistanceCtrl'
        }
      }
    })





    .state('tabsController.memberDetail', {
      url: '/memberDetails',
      views: {
        'tab2': {
          templateUrl: 'templates/memberDetail.html',
          controller: 'memberDetailCtrl'
        }
      }
    })





    .state('tabsController.members', {
      url: '/members',
      views: {
        'tab2': {
          templateUrl: 'templates/members.html',
          controller: 'membersCtrl'
        }
      }
    })





    .state('tabsController.searchMember', {
      url: '/searchMember',
      views: {
        'tab1': {
          templateUrl: 'templates/searchMember.html',
          controller: 'searchMemberCtrl'
        }
      }
    })





    .state('tabsController.jobs', {
      url: '/jobs',
      views: {
        'tab3': {
          templateUrl: 'templates/jobs.html',
          controller: 'jobsCtrl'
        }
      }
    })




    .state('tabsController', {
      url: '/tabs',
      abstract:true,
      templateUrl: 'templates/tabsController.html'
    })




    .state('tabsController.more', {
      url: '/more',
      views: {
        'tab4': {
          templateUrl: 'templates/more.html',
          controller: 'moreCtrl'
        }
      }
    })





    .state('tabsController.assistanceHistory', {
      url: '/assistanceHistory',
      views: {
        'tab4': {
          templateUrl: 'templates/assistanceHistory.html',
          controller: 'assistanceHistoryCtrl'
        }
      }
    })





    .state('tabsController.jobDetail', {
      url: '/jobDetail',
      views: {
        'tab3': {
          templateUrl: 'templates/jobDetail.html',
          controller: 'jobDetailCtrl'
        }
      }
    })





    .state('tabsController.job', {
      url: '/addButtlon',
      views: {
        'tab3': {
          templateUrl: 'templates/job.html',
          controller: 'jobCtrl'
        }
      }
    })





    .state('tabsController.job2', {
      url: '/job-FromMember',
      views: {
        'tab2': {
          templateUrl: 'templates/job2.html',
          controller: 'job2Ctrl'
        }
      }
    })





    .state('tabsController.settings', {
      url: '/settings',
      views: {
        'tab4': {
          templateUrl: 'templates/settings.html',
          controller: 'settingsCtrl'
        }
      }
    })





    .state('tabsController.excuses', {
      url: '/excuses',
      views: {
        'tab4': {
          templateUrl: 'templates/excuses.html',
          controller: 'excusesCtrl'
        }
      }
    })

    .state('tabsController.addJob', {
      url: '/addJob',
      views: {
        'tab3': {
          templateUrl: 'templates/addJob.html',
          controller: 'addJobCtrl'
        }
      }
    })


    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tabs/assistance');

});
