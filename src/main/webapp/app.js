'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'myApp.version',
    'ui.router',
    'duScroll',
    'slick',
    'ngMaterial',
    'ngLetterAvatar',
    'cgNotify',
    'ngStorage',
    'md.data.table',
    'ngCookies',
    'ngMessages',
    'ngImgCrop',
    'ui.calendar'
]).
config(function ($stateProvider, $urlRouterProvider, $compileProvider, $httpProvider) {

    $urlRouterProvider.otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        views: {
            nav: {
                templateUrl: 'shared/navbar/navbar.html',
                controller: 'navBarController'
            },
            content: {
                templateUrl: 'components/home/home.html',
                controller: 'homeController'
            }
        }
    });

    $stateProvider.state('login', {
        url: '/login/:selectedTab',
        views: {
            nav: {
                templateUrl: 'shared/navbar/navbar.html',
                controller: 'navBarController'
            },
            content: {
                templateUrl: 'components/login/login.html',
                controller: 'loginController'
            }
        }
    });

    $stateProvider.state('addMember', {
        url: '/addMember',
        views: {
            nav: {
                templateUrl: 'shared/navbar/navbar.html',
                controller: 'navBarController'
            },
            content: {
                templateUrl: 'components/members/addMember.html',
                controller: 'addMemberController'
            }
        }
    });

    $stateProvider.state('membersList', {
        url: '/membersList',
        views: {
            nav: {
                templateUrl: 'shared/navbar/navbar.html',
                controller: 'navBarController'
            },
            content: {
                templateUrl: 'components/members/members-list.html',
                controller: 'membersListController'
            }
        }
    });

    $compileProvider.preAssignBindingsEnabled(true);

    $httpProvider.interceptors.push('authenticationInterceptor');

}).
    directive('restrictSpaces', function () {
        return {
            restrict: 'A',
            link: function ($scope, $element) {
                $element.bind('input', function () {
                    $(this).val($(this).val().replace(/ /g, ''));
                });
            }
        }
}).
    controller('myAppController', function ($scope) {

});
    //var baseURL ='http://localhost:3000/jss';
    var baseURL = 'http://www.rnja.org/JainSamajServer';
