angular.module('starter.services', [])
    .provider('loginManager', function() {
    // In the provider function, you cannot inject any
    // service or factory. This can only be done at the
    // "$get" method.

    this.$get = function($firebaseSimpleLogin, userService) {
        var dataRef = new Firebase("https://caterate.firebaseio.com");
        var loginObj = $firebaseSimpleLogin(dataRef);
        return {
            login: function () {
                return loginObj.$login('facebook').then(function (user) {
                    localStorage.setItem("userId", user.id);
                    userService.addUser(user.id, user.displayName);
                });
            },
            logout: function () {
                loginObj.$logout('facebook');
                localStorage.removeItem("userId");
            }
        };
    };

    this.isLoggedIn = function () {
            return !!localStorage.getItem("userId");
    };
});

// organization service
app.factory("organizationService", function($firebase, $rootScope) {
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
                        branch.id = branchId;
                        branches.push(angular.copy(branch));
                        if(!$rootScope.$$phase){
                            $rootScope.$apply();
                        }
                    });
                })
            })
            return branches;
        }
    };
});

// brunches service
app.factory("branchesService", function($firebase, $rootScope) {
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
                        place.id = placeId;
                        places.push(angular.copy(place));
                        if(!$rootScope.$$phase){
                            $rootScope.$apply();
                        }
                    });
                })
            })
            return places;
        },

        getOrganizationByBranchId: function(id) {

            var orgBaseUrl = 'https://caterate.firebaseio.com/Organizations';
            var orgs = [];
            var branch = new Firebase(baseUrl + "/" + id);
            branch.on('value', function(snapshot) {
                    new Firebase(orgBaseUrl + "/" + snapshot.val().organizationId).on("value", function(orgSnapshot) {
                        var org = orgSnapshot.val();
                        orgs.push(angular.copy(org));
                        if(!$rootScope.$$phase){
                            $rootScope.$apply();
                        }
                    });
                })
            return orgs;
        }
    };
});

// places service
app.factory("placesService", function($firebase, $rootScope) {
    var baseUrl = 'https://caterate.firebaseio.com/Places';

    return {
        index: function () {
            return $firebase(new Firebase(baseUrl));
        },
        get: function (id) {
            return $firebase(new Firebase(baseUrl + "/" + id));
        },
        getBranchByPlaceId: function (id) {
            var branchBaseUrl = 'https://caterate.firebaseio.com/Branches';
            var branches = [];
            var place = new Firebase(baseUrl + "/" + id);
            place.on('value', function (snapshot) {
                new Firebase(branchBaseUrl + "/" + snapshot.val().branchId).on("value", function (branchSnapshot) {
                    var branch = branchSnapshot.val();
                    branches.push(angular.copy(branch));
                    if(!$rootScope.$$phase){
                        $rootScope.$apply();
                    }
                });
            })
            return branches;
        },
        likeFood: function (userId, placeId, foodId, isLike, currentLikes, currentDislikes, isLiker) {
            var baseUrl = 'https://caterate.firebaseio.com/Places/' + placeId + '/Foods/' + foodId;


            if(isLiker === isLike){

                var deleteUrl = baseUrl + "/likers/" + userId;
                new Firebase(deleteUrl).remove();

                if(isLike){
                    new Firebase(baseUrl + "/likes").set(currentLikes - 1);
                }else {
                    new Firrebase(baseUrl + "/dislikes").set(currentDislikes - 1);
                }
            }else if( (isLiker != undefined) && (isLiker && !isLike) || (!isLiker && isLike)) {

                var changeUrl = baseUrl + "/likers";
                var liker = {};
                liker[userId] = isLike;
                new Firebase(changeUrl).update(liker);

                if(isLike){
                    new Firebase(baseUrl + "/likes").set(currentLikes + 1);
                    new Firebase(baseUrl + "/dislikes").set(currentDislikes - 1);
                }else {
                    new Firebase(baseUrl + "/dislikes").set(currentDislikes + 1);
                    new Firebase(baseUrl + "/likes").set(currentLikes - 1)
                }
            }else {

                var likersList = new Firebase(baseUrl + "/likers");
                var liker = {};
                liker[userId] = isLike;
                likersList.update(liker);

                if(isLike){
                    var likesList = new Firebase(baseUrl + "/likes");
                    likesList.set(currentLikes + 1);
                }else{
                    var dislikesList = new Firebase(baseUrl + "/dislikes");
                    dislikesList.set(currentDislikes + 1);
                }
            }
        },
        reportTraffic: function (placeId,foodId, trafficReport, currentTraffic) {
            console.log(trafficReport);
                  var baseUrl = 'https://caterate.firebaseio.com/Places/' + placeId  + '/Foods/' + foodId ;
            var trafficRef = new Firebase(baseUrl);
            var trafficLevel = {};
            trafficLevel['traffic'] = (trafficReport + 2*currentTraffic) / 3;
            console.log(trafficLevel['traffic']);

            trafficRef.update(trafficLevel);
        }
    };
});

// user service
app.factory("userService", function($firebase, $rootScope, placesService, branchesService) {
    var baseUrl = 'https://caterate.firebaseio.com/Users';

    return {
        index: function () {
            return $firebase(new Firebase(baseUrl));
        },
        get: function (id) {
            return $firebase(new Firebase(baseUrl + "/" + id));
        },
        getPlacesByUserId: function (id) {
            var placesBaseUrl = 'https://caterate.firebaseio.com/Places';
            var places = [];
            var user = new Firebase(baseUrl + "/" + id);
            user.on('value', function(snapshot) {
                angular.forEach(Object.keys(snapshot.val().Places), function(placeId) {
                    new Firebase(placesBaseUrl + "/" + placeId).on("value", function(placesSnapshot) {
                        var place = placesSnapshot.val();
                        place.id = placeId;
                        places.push(angular.copy(place));

                        if(!$rootScope.$$phase){
                            $rootScope.$apply();
                        }
                    });
                })
            })
            return places;
        },
        addPlacesToUser: function (placesIds) {
            var placesBaseUrl = 'https://caterate.firebaseio.com/Places';
            var userPlaces = new Firebase(baseUrl + "/" + localStorage.getItem("userId") + "/" + "Places");
            angular.forEach(placesIds, function (placeId) {
                var place = {};
                place[placeId] = true;
                userPlaces.update(place);
            });
        },
        addUser: function (userId, userName) {
            var user = {};
            user[userId] = { name: userName };
            $firebase(new Firebase(baseUrl)).$update(user);
        }
    };
});