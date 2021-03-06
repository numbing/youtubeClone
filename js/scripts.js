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
            var prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function (i, item) {
                //get output
                var output = getOutput(item);

                //display the result
                $('#result').append(output);
            });
            var buttons = getButtons(prevPageToken, nextPageToken);
            //display buttons
            $('#buttons').append(buttons);
        }
    );

}

//next page function
function nextPage() {
    var token = $('#next-button').data('token');
    var q =$('#next-button').data('query');
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
            pageToken:token,
            type: 'video',
            key: 'AIzaSyDu3ULXjhGO0V-cEk5nmwrZWw1VrHp2IlA'
        },
        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function (i, item) {
                //get output
                var output = getOutput(item);

                //display the result
                $('#result').append(output);
            });
            var buttons = getButtons(prevPageToken, nextPageToken);
            //display buttons
            $('#buttons').append(buttons);
        }
    );
}

//prev function
function prevPage() {
    var token = $('#prev-button').data('token');
    var q =$('#prev-button').data('query');
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
            pageToken:token,
            type: 'video',
            key: 'AIzaSyDu3ULXjhGO0V-cEk5nmwrZWw1VrHp2IlA'
        },
        function (data) {
            var nextPageToken = data.nextPageToken;
            var prevPageToken = data.prevPageToken;

            console.log(data);

            $.each(data.items, function (i, item) {
                //get output
                var output = getOutput(item);

                //display the result
                $('#result').append(output);
            });
            var buttons = getButtons(prevPageToken, nextPageToken);
            //display buttons
            $('#buttons').append(buttons);
        }
    );
}

function getOutput(item) {
    var videoId = item.id.videoId;
    var title = item.snippet.title;
    var description = item.snippet.description;
    var thumb = item.snippet.thumbnails.high.url;
    var channelTitle = item.snippet.channelTitle;
    var videoDate = item.snippet.publishedAt;

    //buildin output string
    var output = '<li>' +
        '<div class="list-left">' +
        '<img src="' + thumb + '">' +
        '</div>' +
        '<div class="list-right">' +
        '<h3><a  href="http://www.youtube.com/embed/'+videoId+'" target="_blank">'+title +'</a></h3>' +
        '<small> By <span class="cTitle">' + channelTitle + '</span>on' + videoDate + '</small>' +
        '<p>' + description + '</p>' +
        '</div>' +
        '</li>' +
        '<div class="clearfix"></div> ' +
        '';

    return output;
}

function getButtons(prevPageToken, nextPageToken) {
    if (!prevPageToken) {
        var btnoutput = '<div class="button-container">' +
            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            'onclick="nextPage();">Next page</button></div>';


    } else {
        var btnoutput = '<div class="button-container">' +
            '<button id="prev-button" class="paging-button" data-token="' + prevPageToken + '" data-query="' + q + '"' +
            'onclick="prevPage();">prev page</button>' +

            '<button id="next-button" class="paging-button" data-token="' + nextPageToken + '" data-query="' + q + '"' +
            'onclick="nextPage();">Next page</button></div>';

    }
    return btnoutput;
}

