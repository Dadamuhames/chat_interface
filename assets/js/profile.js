$(document).ready(() => {
    getProfile((response) => {

        let image = response.image == null ? getProfileImage(response.name) : `<img src="${response.image}" width="100" height="100" class="rounded-circle">`

        $("#profile_image").html(image);
        $("#profile_username").text(`@${response.username}`);
        $("#profile_name").text(response.name);
        $("title").text(response.name);
    })
})