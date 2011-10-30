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
        if (which === 1) {
            $$(".current")[0].removeClass("current").addClass("previous");
            $$(".next")[0].removeClass("next").addClass("current");
            return;
        }
        var current = (which === 0) ? 0 : (window.current + which);
        var post = window.posts[current].data;
        console.log(post);

        var post_title = $$(".title")[0];
        var post_subreddit = $$(".subreddit")[0];
        var post_score = $$(".score")[0];
        var post_ups = $("up");
        post_title.innerHTML = post.title;
        post_subreddit.innerHTML = post.subreddit;
        post_score.innerHTML = post.score;
        post_ups.innerHTML = post.ups;
        post_title.href = post.url;
        $$(".post")[0].src = post.url;

        window.current = current;
    }

    return setContent;
}

window.addEvent('domready', function () {
    $("up").addEvent('click', showPost(1));
    $("down").addEvent('click', showPost(-1));
    reddit_request(function (res) {
        window.posts = res.data.children;
        showPost(0)();
    }, "all");
});
