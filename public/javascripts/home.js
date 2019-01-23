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
      return time.substr(0, time.length - 6);
    })
    //testbtn
    let isbtn = true;
    let btnTest = Handlebars.compile($('#addNewArticle').html());
    btnTest(isbtn);
    // 模版
    let template = Handlebars.compile($('#context').html());

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

    // 新增文章
    $('#addNewArticle').on('click', function() {
      window.location.href = '/newarticle';
    });

    //
    $(window).resize(function() {
      window.location.reload();
    });
  });
})
