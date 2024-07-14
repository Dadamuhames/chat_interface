const ROUTERS_MAP = {
    "chats": chatInner,
    "chatCreate": createChatPage
}


const routingFn = () => {
    $(document).ready(() => {
        onRoutChange();

        $(document).on("click", "a", (e) => {
            if (window.location.hash == $(e.target).attr("href")) return;
            onRoutChange($(e.target).attr("href"));
        })
    })
}