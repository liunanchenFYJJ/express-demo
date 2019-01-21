requirejs.config({
  baseUrl: 'lib',
  paths: {
      jquery: 'jquery.min',
      bootstrap: 'bootstrap.min',
  },
  shim: {
      'jquery': {
          exports: 'jquery'
      },
      bootstrap: {
        deps: ['jquery']
      }
  }
});

requirejs(['jquery'], function($) {
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

