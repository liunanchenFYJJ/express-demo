// 定义一个方法 且 依赖于 jquery
define(['jquery'], function($) {
    'use strict';
    let add = function(x, y) {
        console.log($);
        return x + y;
    }
    return { add };
});