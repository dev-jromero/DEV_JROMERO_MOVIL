angular.module('auth.fb', ['auth.storage'])
.factory('AuthFbFallbackProvider', ['$q', function($q){
    //provider using the OpenFb library
    var getLib = function(){
        if(typeof openFB === 'undefined'){
            console.log('The OpenFb librari in not installed');
            return;
        }
        return openFB;
    };

    var login = function(){
        var deferred = $q.defer();
        var lib = getLib();
        var onFbError = function(response){
            deferred.reject(response.error);
        };
        lib.login(function(result){
            if (result.status === 'connected') {
                lib.api({path: '/v2.2/me', success: function(fb_data){
                    //create a user for the sign up
                    var fbUserRaw = {
                        loginType: 'FB',
                        FB_id: fb_data.id,
                        name: fb_data.first_name,
                        lastName: fb_data.last_name,
                        email: fb_data.email,
                        password: "ukelele",
                        photo: "defaultavatar.jpg"
                    }
                    //getting the user photo
                    var photoParams = {
                        'type':'normal',
                        'redirect': false
                    };
                    lib.api({path: '/me/picture', params:photoParams, success: function(fb_photo_data){
                        fbUserRaw.photoURL = fb_photo_data.data.url;
                        deferred.resolve(fbUserRaw);
                    }, error: onFbError});
                }, error: onFbError });
            } else {
                onFbError(result);
            }
        }, {scope: 'email, user_friends'});
        return deferred.promise;
    };

    return {
        login: login
    };
}])
.factory('AuthFbService', ['AuthFbFallbackProvider', function(AuthFbFallbackProvider){
    var currentProvider = undefined;
    var getProvider = function(){
        if (typeof(currentProvider) === 'undefined') {
            currentProvider = AuthFbFallbackProvider;
        }
        return currentProvider;
    };

    var setProvider = function(provider){
        currentProvider = provider;
    };

    var login = function(){
        var provider = getProvider();
        //Probably it will be ok if we save the facebook session in the storage
        return provider.login();
    };

    return {
        getProvider: getProvider,
        setProvider: setProvider,
        login: login
    };
}]);
