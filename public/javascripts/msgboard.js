requirejs.config({
  baseUrl: 'lib',
  paths: {
    jquery: 'jquery.min',
    handlebars: 'handlebars.min'
  }
});

requirejs(['jquery', 'handlebars'], function($, Handlebars) {
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
        $('.panel-body').each(function(i) {
          $(this).html(data.data[i].article);
        });
      },
      error: function(error) {
        console.log(error);
      }
    });

    // resize
    $(window).resize(function() {
      window.location.reload();
    });
  });
});
