// 入口
console.log('im in>>>')
requirejs.config({
    baseUrl: 'lib',
    paths: {
        jquery: 'jquery.min',
        test: '../javascripts/testmodule',
    }
});

// // Start loading the main app file. Put all of
// // your application logic in there.
// requirejs(['test']);

// require([], function() {
//     console.log('run app');
// })

requirejs(['jquery', 'test'], function($, test) {
    console.log('run app js');
    console.log(test.add(1, 4));
})
