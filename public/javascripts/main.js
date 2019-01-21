// For any third party dependencies, like jQuery, place them in the lib folder.

// Configure loading modules from the lib directory,
// except for 'app' ones, which are in a sibling
// directory.
requirejs.config({
    baseUrl: '/lib',
    paths: {
        // javascripts: '../javascripts',
        jquery: 'jquery.min',
        bootstrap: 'bootstrap.min',
        handlebars: 'handlebars.min'
    },
    shim: {
        'jquery': {
            exports: '$'
        },
        bootstrap: {
          deps: ['jquery']
        }
    }
});

// Start loading the main app file. Put all of
// your application logic in there.

requirejs(['jquery', 'bootstrap'], function($, bootstrap, handlebars) {
  console.log('layout');

  $(function() {
    $('li').each(function() {
      let path_name = window.location.href.split('/')[3];
      let a_href = $(this).children()[0].href;
      
      if (a_href) {
        let sub_a_href = a_href.split('/')[3];
        if (sub_a_href == path_name) {
          $(this).addClass('active').siblings().removeClass('active');
        }
      }
      //if ($(this).hasClass(class_name)) {
        //$(this).addClass('active').siblings().removeClass('active');
      //}
    })

  });
});

