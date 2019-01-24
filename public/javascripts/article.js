requirejs.config({
    baseUrl: 'lib',
    paths: {
        jquery: 'jquery.min'
    }
})

requirejs([], function() {
    console.log($);
});

// TODO：里面 外面是否没有区别？
console.log($);
$.ajax({
   url: '',
   type: 'POST',
   data: {},
   success: function() {},
   error: function() {} 
});