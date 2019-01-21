// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
'use strict'
requirejs.config({
    baseUrl: '/lib',
    paths: {
        // javascripts: '../javascripts',
        jquery: 'jquery.min',
        handlebars: 'handlebars.min'
    },
    shim: {
        'jquery': {
            exports: '$'
        }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.
requirejs(['jquery', 'handlebars'], function($, Handlebars) {
    console.log('msg');
    $(function() {
        // timeformat
        Handlebars.registerHelper("timeformat", function(time) {
          return time.substr(0, time.length - 14);
        })
        // 模版
        let template = Handlebars.compile($('#context').html());
    
        $.ajax({
          type: 'get',
          url: `http://${location.host}/getdiary`,
          data: { page: 1 },
          success: function(data) {
            // 数据
            $('#body').html(template(data.data));
            $('#body').height() > window.innerHeight - 40 ? $('#body').css('overflow', 'auto').height(window.innerHeight - 80) : $('#body').height('auto');
          },
          error: function(error) {
            console.log(error);
          }
        });
    
        // resize
        $(window).resize(function() {
          window.location.reload();
        })
    });
});
