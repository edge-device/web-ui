// This is the function that runs automatically when page is loaded. This
// function loads whether user was just authorized and redirected back, or
// was already authorized and has a token.
$(function () {
    $("#createAccount").click(function () {
        var joinURL = "/v1/device/auth/join?email="+$("#emailAddress").val()
        console.log("Join URL: "+joinURL); // TODO: remove debug message
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        $.getJSON(joinURL)
        .fail(function() {
            console.log( "getJSON failed for adding user" );
            return;
        })
        .success(function() {
            console.log( "User added" ); // TODO: remove debug message
            window.location.replace("/signin");
        });
    });
});
