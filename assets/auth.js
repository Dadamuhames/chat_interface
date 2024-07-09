$(document).on("submit", "form#registerForm", (e) => {
    e.preventDefault();
    const data = getFormData("#registerForm");
    
    registerRequest((data), (response) => {
        window.localStorage.setItem("accessToken", response.accessToken);
        window.localStorage.setItem("refreshToken", response.refreshToken);
        window.location.replace("/");
    });
})


$(document).on("submit", "form#loginForm", (e) => {
    e.preventDefault();
    const data = getFormData("#loginForm");

    loginRequest(data, (response) => {
        window.localStorage.setItem("accessToken", response.accessToken);
        window.localStorage.setItem("refreshToken", response.refreshToken);
        window.location.replace("/");
    });
})