requirejs.config({
  baseUrl: 'js/lib',
  paths: {
      jquery: 'jquery.min',
      bootstrap: 'bootstrap.min',
      header: '../partials/header'
  },
  shim: {
      'jquery': {
        exports: 'jquery'
      },
      bootstrap: {
        deps: ['jquery']
      },
      header: {
        deps: ['jquery']
      }
  }
});

requirejs(['jquery', 'header'], function($) {
  $(function() {
    $('.header li').each(function() {
      let path_name = window.location.href.split('/')[3];
      let a_href = $(this).children()[0].href;
      
      // if (a_href) {
      //   let sub_a_href = a_href.split('/')[3];
      //   if (sub_a_href == path_name) {
      //     $(this).addClass('active').siblings().removeClass('active');
      //   }
      // }
      //if ($(this).hasClass(class_name)) {
        //$(this).addClass('active').siblings().removeClass('active');
      //}
    });

    $.ajax({
      type: 'get',
      url: `http://${location.host}/getArticleList`,
      data: { page: 1 },
      success: function(data) {
        // console.log(data.data);
        // 数据
        $('#body').html(template(data.data));
        $('#body').height() > window.innerHeight - 40 ? $('#body').css('overflow', 'auto').height(window.innerHeight - 80) : $('#body').height('auto');
        // handlebars渲染纯文本，手动渲染富文本
        $('.panel-body').each(function(i) {
          $(this).html(data.data[i].content);
        });
      },
      error: function(error) {
        console.log(error);
      }
    });

  });
});

