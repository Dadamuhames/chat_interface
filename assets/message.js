$(document).on("keydown", "input#message_input", (e) => {
    if (e.key === 'Enter') {
        $("input#message_input").val("");
        let message = $("input#message_input").val();
        let chatUUID = $("input#message_input").attr("data-chat-id");

        let data = {
            chatUUID: chatUUID,
            message: message
        }

        sendmessage(data, (response) => {
            $(".app #no-message").remove();

            let date = formatTime(response.createdAt);

            $(".app .chat-area-main").append(`
                <div class="chat-msg owner messages_in_list" id="${response.uuid}">
                    <div class="chat-msg-profile">
                        <div class="chat-msg-date">${date} <span class='checked'>✓</span></div>
                    </div>
                    <div class="chat-msg-content">
                        <div class="chat-msg-text">${response.message}</div>
                    </div>
                </div>
            `)

            $("input#message_input").val("");
            $(".messages_in_list").last().get(0).scrollIntoView();
        })
    }
})


const onMessage = (message) => {
    let url = window.location.hash;
    let uuid = url.split("/")[url.split("/").length - 1];

    if (uuid == message.chat.uuid.toString()) {
        $(".app #no-message").remove();

        let date = formatTime(message.createdAt);

        $(".app .chat-area-main").append(`
                <div class="chat-msg messages_in_list id="${message.uuid}"">
                    <div class="chat-msg-profile">
                        <div class="chat-msg-date">${date}</div>
                    </div>
                    <div class="chat-msg-content">
                        <div class="chat-msg-text">${message.message}</div>
                    </div>
                </div>
            `)

        $(".messages_in_list").last().get(0).scrollIntoView();


        sendMessageRead(message.uuid)

        return;
    }

    if (!message.isChatNew) {
        $(`.chats-in-list[data-chat-id='${message.chat.uuid}']`).remove();
    }

    $("#users_list").prepend(`
        <a class="msg chats-in-list" href="#chats/${message.chat.uuid}" data-chat-id="${message.chat.uuid}">
            <img class="msg-profile"
                src="${message.chat.image}"
                alt />
            <div class="msg-detail">
                <div class="msg-username">${message.chat.name}</div>
                <div class="msg-content">
                    <span class="msg-message">${message.message}</span>
                </div>
            </div>
            <span class="new_message_span">${message.newMessagesCount}</span>
        </a>                  
    `)
}



const fillMessages = (uuid) => {
    getMessages(uuid, 0, (response) => {
        $("#loader").addClass("active");
        $(".app .chat-area-main").html("")
        if(response.content.length != 0) {
            $(".app #no-message").remove();
            $(".app .chat-area-main").html("");
        }

        localStorage.setItem("totalPages", response.totalPages);

        let lastDate;
        // let firstDate = response.content[response.content.length-1]?.createdAt
        // localStorage.setItem("lastDateForChat", formatDate(firstDate));

        response.content.reverse();

        for(let message of response.content) {
            let owner = message.isMyMessage ? "owner" : "";
            let check = message.isMyMessage ? "✓" : "";

            if (message.isReadByUser) {
                check = "✓✓"
            }

            let time = formatTime(message.createdAt);
            let formatedDate = formatDate(message.createdAt);

            if(lastDate != formatedDate) {
                lastDate = formatedDate;
                $(".app .chat-area-main").append(`<div class='date-in-chat' data-date="${lastDate}">${lastDate}</div>`)
            }

            $(".app .chat-area-main").append(`
                <div class="chat-msg ${owner} messages_in_list" id="${message.uuid}">
                    <div class="chat-msg-profile">
                        <div class="chat-msg-date">${time} <span class='checked'>${check}</span></div>
                    </div>
                    <div class="chat-msg-content">
                        <div class="chat-msg-text">${message.message}</div>
                    </div>
                </div>
            `)

            lastId = message.uuid;
            
        }

        if ($(".messages_in_list").last().get(0)) {
            $(".messages_in_list").last().get(0).scrollIntoView();

            let margion_footer = parseInt($('#message_footer_block').css('margin-top'), 10) - 15;
            $('#message_footer_block').css('margin-top', margion_footer);
        }

        $("#loader").removeClass("active");
    })


}

const loadMoreMessages = () => {
    let url = window.location.hash;
    let uuid = url.split("/")[url.split("/").length - 1];
    let page = localStorage.getItem("messagesPage") || 0;
    page = Number.parseInt(page)+1;

    let totalPages = localStorage.getItem("totalPages");

    if(page >= totalPages) return;

    let firstId;

    getMessages(uuid, page, (response) => {
        let firstDate = formatDate(response.content[0]?.createdAt);
        $(`.date-in-chat[data-date='${firstDate}']`).remove();

        localStorage.setItem("totalPages", response.totalPages);
        firstId = response.content[0]?.uuid;
        // response.content.reverse();

        for (let message of response.content) {
            let owner = message.isMyMessage ? "owner" : "";
            let check = message.isMyMessage ? "✓" : "";

            if (message.isReadByUser) {
                check = "✓✓"
            }

            let time = formatTime(message.createdAt);
            let formatedDate = formatDate(message.createdAt);

            if (firstDate != formatedDate) {
                $(".app .chat-area-main").prepend(`<div class='date-in-chat' data-date='${firstDate}'>${firstDate}</div>`)
                firstDate = formatedDate;
            }

            $(".app .chat-area-main").prepend(`
                <div class="chat-msg ${owner} messages_in_list" id="${message.uuid}">
                    <div class="chat-msg-profile">
                        <div class="chat-msg-date">${time}  <span class='checked'>${check}</span></div>
                    </div>
                    <div class="chat-msg-content">
                        <div class="chat-msg-text">${message.message}</div>
                    </div>
                </div>
            `)

            lastId = message.uuid;
        }

        $(".app .chat-area-main").prepend(`<div class='date-in-chat' data-date='${firstDate}'>${firstDate}</div>`)

        if ($(`.messages_in_list#${firstId}`).get(0)) {
            $(`.messages_in_list#${firstId}`).get(0).scrollIntoView();

            let margion_footer = parseInt($('#message_footer_block').css('margin-top'), 10) - 15;
            $('#message_footer_block').css('margin-top', margion_footer);
        }
    })

    localStorage.setItem("messagesPage", page);
}




const onMessageRead = (message) => {
    let url = window.location.hash;
    let pageUuid = url.split("/")[url.split("/").length - 1];

    if (pageUuid == message.chatUUID.toString()) {
        for (let uuid of message.messagesUUID) {
            $(`.messages_in_list#${uuid} .checked`).html("✓✓")
        }
    }
}