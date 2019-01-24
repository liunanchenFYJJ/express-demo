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
      return time.substr(0, time.length - 7);
    })
    //testbtn
    let isbtn = true;
    let btnTest = Handlebars.compile($('#addNewArticle').html());
    btnTest(isbtn);
    // 模版
    let template = Handlebars.compile($('#context').html());

    // 获取文章列表
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

    //
    $('.btn btn-primary btn-xs learnmore').on('click', function() {
      console.log('sadf');
    });
  });
})

// 文章详情
function learnmore(e) {
  // childNodes vs. children
  console.log(e.parentNode.parentNode);
  console.log(e.parentNode.parentNode.childNodes);
  console.log(e.parentNode.parentNode.children[0].children[1].innerHTML);
  let id = e.parentNode.parentNode.children[0].children[1].innerHTML;
  // 跳转article详情
  window.location.href = `/article/${id}`;
  // $.ajax({
  //   url: `/article/${id}`,
  //   type: 'GET',
  //   success: function(e) {
  //     console.log(e);
  //   },
  //   error: function() {

  //   }
  // })
}
