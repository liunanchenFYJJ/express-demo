// 定义一个方法 且 依赖于 jquery
define(['jquery'], function($) {
    'use strict';
    // let add = function(x, y) {
    //     console.log($);
    //     return x + y;
    // }
    let headerActive = function() {
        return $('.nav li a').each(function(i) {
            if ($(this).attr('href') == window.location.pathname) {
                $(this).css({color: "#000"})
                .parent().css({background: "#fff"});
            }
        });
    }
    return { headerActive };
});