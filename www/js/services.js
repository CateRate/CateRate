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

// organization service
app.factory("organizationService", function($firebase) {
    var baseUrl = 'https://caterate.firebaseio.com/Organizations';
    return {
        index: function() {
            return $firebase(new Firebase(baseUrl));
        },
        get: function(id) {
            return $firebase(new Firebase(baseUrl + "/" + id));
        },
        getBranchesByOrganizationId: function(id) {
            var branchesBaseUrl = 'https://caterate.firebaseio.com/Branches';
            var branches = [];
            var organization = new Firebase(baseUrl + "/" + id);
            organization.on('value', function(snapshot) {
                angular.forEach(Object.keys(snapshot.val().Branches), function(branchId) {
                    new Firebase(branchesBaseUrl + "/" + branchId).on("value", function(branchesSnapshot) {
                        var branch = branchesSnapshot.val();
                        branches.push(angular.copy(branch));
                    });
                })
            })
            return branches;
        }
    };
});

// brunches service
app.factory("branchesService", function($firebase) {
    var baseUrl = 'https://caterate.firebaseio.com/Branches';

    return {
        index: function() {
            return $firebase(new Firebase(baseUrl));
        },
        get: function(id) {
            return $firebase(new Firebase(baseUrl + "/" + id));
        },
        getPlacesByBranchId: function(id) {
            var placesBaseUrl = 'https://caterate.firebaseio.com/Places';
            var places = [];
            var branch = new Firebase(baseUrl + "/" + id);
            branch.on('value', function(snapshot) {
                angular.forEach(Object.keys(snapshot.val().Places), function(placeId) {
                    new Firebase(placesBaseUrl + "/" + placeId).on("value", function(placesSnapshot) {
                        var place = placesSnapshot.val();
                        places.push(angular.copy(place));
                    });
                })
            })
            return places;
        },

        getOrganizationByBranchId: function(id) {
            var OrganizationsBaseUrl = 'https://caterate.firebaseio.com/Organizations';
            var organization;
            var branch = new Firebase(baseUrl + "/" + id);
            branch.on('value', function (snapshot) {
                new Firebase(OrganizationsBaseUrl + "/" + snapshot.organizationId).on("value", function (orgSnapshot) {
                    organization = orgSnapshot.val();
                });
                return organization;
            })
        }
    };
});