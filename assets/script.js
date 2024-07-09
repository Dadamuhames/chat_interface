$(document).on("click", ".color", (e) => {
  $(".color").removeClass("selected");
  const theme = $(e.target).attr("data-color");
  document.body.setAttribute('data-theme', theme);
  $(e.target).addClass("selected");

  localStorage.setItem("color", theme);
})


$(document).on("click", ".dark-light", () => {
  document.body.classList.toggle('dark-mode');

  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("mode", 'dark')
  } else {
    localStorage.removeItem("mode")
  }
})