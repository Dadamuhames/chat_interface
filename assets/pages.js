$(document).ready(() => {
    fillChats();

    $("#app .chat-area-main").on("scroll", (e) => {
        var pos = $(e.target).scrollTop();

        if (pos == 0) {
            loadMoreMessages();
        }
    })
});
    