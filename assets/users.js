const fillChats = () => {
  getChats((response) => {
    for (let chat of response.content) {
      let newMessages = chat.newMessagesCount != 0 ? `<span class="new_message_span">${chat.newMessagesCount}</span>` : "";

      let image = chat.image == null ? getProfileImage(chat.name) : `<img class="msg-profile" src="${chat.image}"/>`

      $("#users_list").append(
        `<a class="msg chats-in-list" href="#chats/${chat.uuid}" data-chat-id="${chat.uuid}">
          ${image}
          <div class="msg-detail">
            <div class="msg-username">${chat.name}</div>
            <div class="msg-content">
              <span class="msg-message">@${chat.username}</span>
            </div>
          </div>
          ${newMessages}
        </a>
      `)
    }
  });
}

const chatInner = (url) => {
  $("#userSearchModal").modal("hide")
  localStorage.removeItem("messagesPage");
  localStorage.removeItem("totalPages")
  let uuid = url.split("/")[url.split("/").length - 1];

  getChatInner(uuid, (response) => {
    let image = response.image == null ? getProfileImage(response.name) : `<img class="user-profile" src="${response.image}"/>`
    let imageBig = response.image == null ? image : `<img class="msg-profile group" src="${response.image}"/>`

    $("#message_block_header").html(`
            <div class="chat-area-header">
                <div class="chat-area-title">${response.name}</div>
                <div class="chat-area-group">
                  ${image}
                </div>
            </div>`);


    $("#message_footer_block").html(`
            <div class="chat-area-footer">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-image">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <path d="M21 15l-5-5L5 21" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-paperclip">
                <path
                  d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" /></svg>
              <input type="text" id="message_input" placeholder="Type something here..." data-chat-id="${uuid}" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-smile">
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2M9 9h.01M15 9h.01" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"
                class="feather feather-thumbs-up">
                <path
                  d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
            </div>`);


    $("#companion_profile").html(
      `
        <div class="detail-area-header">
          ${imageBig}
          <div class="detail-title">${response.name}</div>
          <div class="detail-subtitle">@${response.user.username}</div>
        </div>
        <div class="detail-changes">
          <input type="text" placeholder="Search in Conversation">
          <div class="detail-change">
            Change Color
            <div class="colors">
              <div class="color blue selected" data-color="blue"></div>
              <div class="color purple" data-color="purple"></div>
              <div class="color green" data-color="green"></div>
              <div class="color orange" data-color="orange"></div>
            </div>
          </div>
          <div class="detail-change">
            Change Emoji
            <svg xmlns="http://www.w3.org/2000/svg" viewbox="0 0 24 24"
              fill="none" stroke="currentColor" stroke-width="2"
              stroke-linecap="round" stroke-linejoin="round"
              class="feather feather-thumbs-up">
              <path
                d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3zM7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" /></svg>
          </div>
        </div>`);

    fillMessages(response.uuid);
    $(`.chats-in-list[data-chat-id='${uuid}'] > span.new_message_span`).remove();

    const theme = localStorage.getItem("color");


    if (theme) {
      $(".color").removeClass("selected");
      document.body.setAttribute('data-theme', theme);

      $(`.color[data-color='${theme}']`).addClass("selected");

      console.log($('.color'))
    }
  })
}



$(document).on("click", "#openUsersModal", (e) => {
  $("#userSearchModal").modal("show")
})


$(document).on("input", "[name='search_users']", (e) => {
  let search = $(e.target).val();

  $("#users_search_list").html("")

  if (search.length >= 3) {
    $("#users_search_list").html(
      `<div class="d-flex justify-content-center">
        <div class="spinner-border" role="status" style="height: 50px;width:50px">
          <span class="sr-only">Loading...</span>
        </div>
      </div>`)
    searchUsers(search, (response) => {
      $("#users_search_list").html("");
      let users = response.content;

      for (let user of users) {
        let chatUrl = `#chatCreate/${user.id}`;

        if (user.chatUUID != null) {
          chatUrl = `#chats/${user.chatUUID}`
        }

        let image = user.image == null ? getProfileImage(user.name) : `<img class="msg-profile" src="${user.image}"/>`

        $("#users_search_list").append(`
          <a class="msg" href="${chatUrl}">
              ${image}
              <div class="msg-detail">
              <div class="msg-username">${user.name}</div>
              <div class="msg-content">
                  <span class="msg-message">@${user.username}</span>
              </div>
              </div>
          </a>
        `);
      }
    })
  }
})


const createChatPage = (url) => {
  let userId = url.split("/")[url.split("/").length - 1];

  createChatRequest(userId, (response) => {
    $("#userSearchModal").modal("hide")
    onRoutChange(`#chats/${response.uuid}`)
  })
}


