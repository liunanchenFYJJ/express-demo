requirejs.config({
    baseUrl: '/lib',
    paths: {
        jquery: 'jquery.min'
    }
});

requirejs([jquery], function($) {
    $(function() {
        // 每次刷新页面清除 localstorage
        window.onbeforeunload = function() {
            window.localStorage.removeItem('name');
        }
        // 判断是否登陆过
        let hasname = window.localStorage.getItem('name');
        if (!hasname) {
            $('#form').hide();
            // $('#mask').hide();
        } else {
            $('#user').hide();
        }
        
        const socket = io();
        // 先取个nickname
        $('#user input').keyup(function(e) {
            if (e.which == 13) {
                let username = $('#user>input').val();
                if (username) {
                    socket.emit('login', { username: username });
                    window.localStorage.setItem('name', username);
                    $('#user').hide();
                    $('#mask').hide();
                    $('#form').show();
                }
            }
        });
        
        socket.on('loginsuccess', function(data) {
            console.log(`welcome ${data.username}`);
            $('#messages').append($('<li>').html(`<h3>welcome!</h3><p style="color: red; display: inline-block">${data.username}</p>`));
        })
        
        $('form').submit(function() {
            let msg = $('#m').val();
            let name = window.localStorage.getItem('name');
            socket.emit('chatroom', { username: name, msg: msg });
            $('#m').val('');
            return false;
        });
        socket.on('chatroom', function(data) {
            let userstr = $('<li>').html(`<p style="color: red; display: inline-block">${data.username}:</p> ${data.msg}`);
            $('#messages').append(userstr);
        });
        
    });
});