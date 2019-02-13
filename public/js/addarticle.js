requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        jquery: 'jquery.min',
        bootstrap: 'bootstrap.min',
        ckeditor: 'ckeditor'
    },
    shim: {
        jquery: {
            exports: 'jquery'
        },
        bootstrap: {
            deps: ['jquery']
        }
    }
});

requirejs(['jquery', 'ckeditor', 'bootstrap'], function($, ClassicEditor) {

    $(function() {
        let myEditor = ClassicEditor
        .create( document.querySelector( '#editor' ) )
        .catch( error => {
            console.error( error );
        } );

        $('#submit').on('click', function() {
            let title = $('#title').val();
            myEditor.then( editor => {
                console.log(editor.getData());
                // todo: 正则来验证输入合法性
                if (editor.getData() == '<p>&nbsp;</p>' || title == '') {
                    return;
                };
                $.ajax({
                    url: `http://${location.host}/addArticle`,
                    data: {
                        content: editor.getData(),
                        title: title,
                        createBy: 'cln'
                    },
                    type: 'POST',
                    success: function(e) {
                        console.log(e);
                        window.location.href = '/';
                    },
                    error: function() {
                        console.log(e);
                    }
                })
            } )
        })
    })
});