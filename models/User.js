"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User = /** @class */ (function () {
    function User(name) {
        this.name = name;
    }
    User.prototype.sayName = function () {
        console.log(this.name);
    };
    return User;
}());
exports.User = User;
