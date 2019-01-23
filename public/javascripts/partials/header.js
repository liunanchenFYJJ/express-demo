
(function() {
    $('li a').each(function(i) {
        if ($(this).attr('href') == window.location.pathname) {
            $(this).addClass('active');
        }
    });
})()