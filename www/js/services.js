angular.module('starter.services', [])
    .provider('loginManager', function() {
    // In the provider function, you cannot inject any
    // service or factory. This can only be done at the
    // "$get" method.

    this.$get = function($firebaseSimpleLogin) {
        var dataRef = new Firebase("https://caterate.firebaseio.com");
        var loginObj = $firebaseSimpleLogin(dataRef);
        return {
            login: function () {
                return loginObj.$login('facebook').then(function () {
                    localStorage.setItem("isLoggedIn", true);
                });
            },
            logout: function () {
                loginObj.$logout('facebook');
                localStorage.removeItem("isLoggedIn");
            }
        };
    };

    this.isLoggedIn = function () {
            return !!localStorage.getItem("isLoggedIn");
    };
});