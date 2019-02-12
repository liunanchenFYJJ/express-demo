requirejs.config({
    baseUrl: 'js/lib',
    paths: {
      jquery: 'jquery.min'
    }
});

requirejs(['jquery'], function($) {
    console.log('header')
    (function() {
        $('li a').each(function(i) {
            console.log(i)
            if ($(this).attr('href') == window.location.pathname) {
                $(this).addClass('active');
            }
        });
    })()
});