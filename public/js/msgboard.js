requirejs.config({
  baseUrl: 'js/lib',
  paths: {
    jquery: 'jquery.min',
    bootstrap: 'bootstrap.min',
    handlebars: 'handlebars.min',
    utilmodule: '../utilmodule'
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

requirejs(['jquery', 'handlebars', 'utilmodule', 'bootstrap'], function($, Handlebars, utilmodule) {
  utilmodule.headerActive();
  
  $(function() {
    // timeformat
    Handlebars.registerHelper("timeformat", function(time) {
      return time.substr(0, time.length - 14);
    })
    // 模版
    let template = Handlebars.compile($('#context').html());

    $.ajax({
      type: 'get',
      url: `http://${location.host}/getmessage`,
      data: { page: 1 },
      success: function(data) {
        // 数据
        $('#body').html(template(data.data));
        $('#body').height() > window.innerHeight - 40 ? $('#body').css('overflow', 'auto').height(window.innerHeight - 80) : $('#body').height('auto');
        $('.panel-body').each(function(i) {
          $(this).html(data.data[i].article);
        });
      },
      error: function(error) {
        console.log(error);
      }
    });

    // resize
    // $(window).resize(function() {
    //   window.location.reload();
    // });

    $('#submit').click(function() {
      let name = $('#name').val();
      let content = $('#content').val();
      if (name == '' || content == '') {
        console.log('不可为空');
        return;
      }
      $.ajax({
        type: 'post',
        url: `http://${location.host}/addmessage`,
        data: {
          name: name,
          content: content
        },
        success: function(e) {
          // $('#myModal').modal('hide');
          window.location.reload();
        },
        error: function(error) {
          console.log(error);
        }
      });
    })

  });
});
