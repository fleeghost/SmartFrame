const App = angular.module('app', ['ui.router', 'ngAnimate'])
    .config(function ($stateProvider) {
        $stateProvider.state('/', {
            url: '/',
            templateUrl: './modules/Home/View/Login.html'
        });
    })
