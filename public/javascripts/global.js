// Userlist data array for filling in info box
var userListData = [];
var ident = '';
var groupNum = '';
var messageContent = 0;


// DOM Ready =============================================================
$(document).ready(function() {
    // ====== GET VALUES, SET UP ======
    // These lines size the buttons according to the detected size of the mobile screen.
    // 1. Find the height of the screen, and the width of the container. 

    var width = $(document).width();
    var height = $(document).height();
    console.log("height: " + height);
    console.log("browser width: " + width);
    var conWidth = $('#container').width();
    console.log("container width: " + conWidth);
    
    // using these, calculate how big the buttons should be (45% the width of the container)
    var buttonWidth = Math.floor(conWidth*0.45);
    console.log("button width: " + buttonWidth);

    // Determine a line height for the text. I used 80% of the button width; this works pretty well.
    var lineHeight = Math.floor(buttonWidth * 0.8);
    console.log("line height of p: " + lineHeight);

    // Determine a top margin for the 
    var topMargin = Math.floor(height* 0.3);

    // 2. Set these values to the relevant elements: insert buttons, study buttons, text elements. 
    $( ".insertButton1" ).css( "height", buttonWidth );
    $( ".insertButton2" ).css( "height", buttonWidth );
    $(".buttonText").css( "line-height", lineHeight*0.9+"px");
    $(".buttonText").css( "font-size", lineHeight*0.15+"px");
    $(".errorButton").css("height", height);
    $(".isGoodButton").css("height", height);
    // Position the alert box near the centre of the screen.
    $("#insideOverlay").css("margin", topMargin + "px auto 0 auto");
    $("#insideOverlay").css("font-size", Math.floor(height/20) + "px");
    
    // Add User button click
    // 3. Add behaviours that happen when a button is clicked. When clicked:
    // a. Slide the group selector up
    // b. show the study buttons
    // c. adjust the text size for the study buttons

    // Then, start with the #second div hidden. 

    $('#overlay').hide();
    $('#second').hide(); // start with the study buttons hidden
    // Add User button click
    $('.insertButton1').on('click', function() {
        addUserGroup1();        // add the user
        // $('#overlay').fadeIn();
        $('#insideOverlay').html('<p>Please take a moment to fill out your short survey. <br />Please quote your username, which is:</p> <p class="username">' + ident + '</p>');
        $('#first').hide();     // hide the group buttons
        $('#second').show();    // show the study buttons
    });

    $('.insertButton2').on('click', function(){
        addUserGroup2(); //addUser the user
        $('#first').hide();     // hide the group buttons
        $('#second').show();    // show the study buttons
    });

    // Update doc on button click
    $('.errorButton').on('click', addError);

    // Update doc on isgood button click
    $('.isGoodButton').on('click', addIsGood);


    // When a message is received by the client from the server:
    // $('#overlay').hide();
    socket.on("start_broadcast", function() {
        // code here to make UI active when performance begins
    });
    socket.on("pause_broadcast", function() {
        // code here to pause performance, grey UI and show username
    });
    socket.on("resume_broadcast", function() {
        // code here to make UI active again - get rid of pause screen
    });
    socket.on("end_broadcast", function() {
        // code here to stop performance, grey UI, show username and thank for participating
    });
});


// Functions =============================================================


// Add User
function addUserGroup1() {

    groupNum = "group 1";
    ident = makeWords(2);

    console.log('your ident is: ' + ident);
    console.log('your group number is: ' + groupNum);

        // If it is, compile all user info into one object
        var newUser = {
            'ident' : ident,
            'group': groupNum,
            'date_created': Date()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                console.log('user added');
                // window.location.href = "http://localhost:3000";
                //console.log('ident: ' + newUser.ident);
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error');
            }
        });
};

// Add User
function addUserGroup2() {

    groupNum = "group 2";
    ident = makeWords(2);

    console.log('your ident is: ' + ident);
    console.log('your group number is: ' + groupNum);


        // If it is, compile all user info into one object
        var newUser = {
            'ident' : ident,
            'group': groupNum,
            'date_created': Date()
        }

        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/users/adduser',
            dataType: 'JSON'
        }).done(function( response ) {

            // Check for successful (blank) response
            if (response.msg === '') {

                console.log('user ' + newUser.ident + ' added, redirecting from global.js ...');
                //console.log('ident: ' + newUser.ident);
            }
            else {

                // If something goes wrong, alert the error message that our service returned
                alert('Error');
            }
        });
};


function addError(event) {
    event.preventDefault();
        // If it is, compile all user info into one object
        var identifyMe = {
            'ident': ident
        }
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            url: '/users/errors',
            data: identifyMe,
            dataType: 'JSON'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                console.log("successfully updated ERROR fields with ident " + ident);
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                console.log('Error detected. Response was: ' + response);
            }
        });
};

function addIsGood(event) {
    event.preventDefault();
        // Send the identifier variable to the database:
        var identifyMe = {
            'ident': ident
        }
        // Use AJAX to post the object to our adduser service
        $.ajax({
            type: 'POST',
            url: '/users/isgood',
            data: identifyMe,
            dataType: 'JSON'
        }).done(function( response ) {
            // Check for successful (blank) response
            if (response.msg === '') {
                console.log("successfully updated GOOD fields with ident " + ident);
            }
            else {
                // If something goes wrong, alert the error message that our service returned
                console.log('Error detected. Response was: ' + response);
            }
        });
};
function makeWords(options) {
    var output = words(options);
    console.log("initial string: " + output);
    var capped = output[0] + output[1].charAt(0).toUpperCase() + output[1].substring(1);
    console.log('output: ' + capped);
    return capped;
}