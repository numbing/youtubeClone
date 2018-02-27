// @searchbar !handler

$(function () {
    var searchField = $('#query');
    var icon = $('#search-btn');
    //focus event handler
    $(searchField).on('focus', function () {
        $(this).animate({
            width: '100%'
        }, 400);

        $(icon).animate({
            right: '10px'
        }, 400);
    });

    //blur  event handler
    $(searchField).on('blue', function () {
        if (searchField.val() === '') {
            $(searchField).animate({
                width: '45%'

            }, 400, function () {
            });
            $(icon).animate({
                right: '360px'

            }, 400, function () {
            });
        }

    })
    $('#search-form').submit(function (e) {
        e.preventDefault();
    });
});

function search() {
    //clear result
    $('#result').html('');
    $('#buttons').html('');

    //get form input
    q = $('#query').val();
    //run get request on api
    $.get(
        "https://www.googleapis.com/youtube/v3/search", {
            part: 'snippet, id',
            q: q,
            type: 'video',
            key: 'AIzaSyDu3ULXjhGO0V-cEk5nmwrZWw1VrHp2IlA'
        },
        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevtPageToken = data.prevtPageToken;

            console.log(data);
        }
    );

}

