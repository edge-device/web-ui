// This is the function that runs automatically when page is loaded. This
// function loads whether user was just authorized and redirected back, or
// was already authorized and has a token.
$(function () {
    console.log("Self-invoking polaris-auth"); // TODO: remove debug message
    $("#user_name").text(localStorage.getItem("username"));
    var baseURL = "https://polaris.westus3.cloudapp.azure.com/";
    var tokenURL = baseURL + "v1/device/auth/token?code=";
    var refreshURL = baseURL + "v1/device/auth/token/refresh";
    var homePath = "/home/"
    if ($("meta[name='is-login-page']").attr("content") == "yes") {
        loginPage = true;
    } else {
        loginPage = false;
    }
    if (localStorage.access_token) {
        console.log("Found access token"); // TODO: remove debug message
        var accessTokenValid = isTokenValid(localStorage.access_token);
        var refreshTokenValid = isTokenValid(localStorage.refresh_token);
        if (!accessTokenValid && !refreshTokenValid) {
            console.log("Access & refresh tokens invalid"); // TODO: remove debug message
            if (!loginPage) {
                window.location.replace("/signin");
            }
        } else if (!accessTokenValid) {
            var payload = {};
            payload.user_id = localStorage.username;
            payload.refresh_token = localStorage.refresh_token;
            $.post(refreshURL, JSON.stringify(payload))
                .done(function (data) {
                    console.log("Refresh successful");
                    localStorage.setItem("access_token", data.access_token);
                    localStorage.setItem("refresh_token", data.refresh_token);
                    var accObj = jwt_decode(data.access_token);
                    localStorage.setItem("username", accObj.user);
                    if (loginPage) {
                        window.location.replace(homePath);
                    }
                })
                .fail(function(jqXHR, status, err){
                    console.log("Refresh not successful, redirect to /signin");
                    localStorage.removeItem("access_token")
                    localStorage.removeItem("refresh_token")
                    if (!loginPage) {
                        window.location.replace("/signin");
                    }
                });

        } else if (loginPage) {
            window.location.replace(homePath);
        };
    } else if (!loginPage) {
        window.location.replace("/signin");
    };

    // Set login button URL to Google OAuth signin page.
    $("#GithubLogin").click(function () {
        location.href = "https://github.com/login/oauth/authorize?client_id=d46f377df25a400e9c03";
    });

    // Check for GitHub auth code, and exchange for Polaris tokens if user authorized
    params = getQueryParams(window.location.href);
    if ("code" in params) {
        console.log("Github auth code found"); // TODO: remove debug message
        var getTokURL = tokenURL + params.code;
        console.log("getTokURL = "+getTokURL); // TODO: remove debug message
        $.getJSON(getTokURL, function (data) {
            console.log("Access token: \n"+data.access_token); // TODO: remove debug message
            console.log("Refresh token: \n"+data.refresh_token); // TODO: remove debug message
            localStorage.setItem("access_token", data.access_token);
            localStorage.setItem("refresh_token", data.refresh_token);
            var accObj = jwt_decode(data.access_token);
            console.log("Username: \n"+accObj.user); // TODO: remove debug message
            localStorage.setItem("username", accObj.user);
            window.location.replace(homePath); 
        })
        .fail(function() {
        console.log( "getJSON failed for getting tokens" );
        });
    };
});

// getQueryParams() takes a URL with query parameters and returns map of params
function getQueryParams(url) {
    var params = {};
    var parser = document.createElement("a");
    parser.href = url;
    var query = parser.search.substring(1);
    var queryString = query.split('&');
    for (var i = 0; i < queryString.length; i++) {
        var keyPair = queryString[i].split('=');
        params[keyPair[0]] = decodeURIComponent(keyPair[1]);
    }
    return params;
};

// isTokenValid() is used to test if a JWT is expired or valid
function isTokenValid(jwt) {
    var jwtObj = jwt_decode(jwt);
    var currentTime = Date.now() / 1000;
    if (currentTime > jwtObj.exp) {
        return false;
    } else {
        return true;
    }
};

// logout() is used to log the user out
function logout() {
    // TODO: refresh tokens if needed
    var auth = "Bearer " + localStorage.access_token;
    var jwtObj = jwt_decode(localStorage.refresh_token);
    var revokeURL = $("meta[name='rms-base-url']").attr("content") + "auth/token/" + jwtObj.tid;
    $.ajax({
        url: revokeURL,
        method: "DELETE",
        header: {"Authorization": auth}
    });
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    window.location.replace("/signin");
};
