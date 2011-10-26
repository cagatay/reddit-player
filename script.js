function reddit_request(callback, subreddit) {
    /* no subreddit means reddit homepage */
    var reddit = "http://www.reddit.com/";
    var suffix = ".json";

    var url = reddit + (
        typeof subreddit !== 'undefined' ? ("r/" + subreddit) : ""
    ) + suffix;

    var req = new Request.JSON({
        url: url,
        onSuccess: callback,
        onError: function(text, error) {
            console.log(error);
        }
    }).get();
}

function showPost(which) {
    function setContent() {
        var current = (which === 0) ? 0 : (window.current + which);
        var post = window.posts[current].data;

        $("post_title").innerHTML = post.title;
        $("post").src = post.url;

        window.current = current;
    }

    return setContent;
}

window.addEvent('domready', function () {
    $("next").addEvent('click', showPost(1));
    $("previous").addEvent('click', showPost(-1));
    reddit_request(function (res) {
        window.posts = res.data.children;
        showPost(0)();
    }, "all");
});
