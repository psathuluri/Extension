window.addEventListener('DOMContentLoaded', function() {
    // your button here
    var link = document.getElementById('btnOpenNewTab');
    var link2 = document.getElementById('btnSee');
    var link3 = document.getElementById('btnCourse');
    // onClick's logic below:
    link.addEventListener('click', function() {
        var newURL = "http://avacadra.com/";
        chrome.tabs.create({ url: newURL });
    });
    link2.addEventListener('click', function() {
        var newURL = "https://utdirect.utexas.edu/registrar/waitlist/wl_see_my_waitlists.WBX";
        chrome.tabs.create({ url: newURL });
    });
    link3.addEventListener('click', function() {
        var newURL = "https://registrar.utexas.edu/schedules";
        chrome.tabs.create({ url: newURL });
    });

    
});



