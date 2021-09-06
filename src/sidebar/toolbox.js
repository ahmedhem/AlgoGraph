const toggle_button = document.querySelector(".toolbox .toggle");
const toolbox = document.querySelector(".toolbox");

export function resize_site() {
  const sidebar = document.querySelector("#sidebar-space");
  sidebar.style.display = sidebar.style.display === "block" ? "none" : "block";
  document.querySelector("body").classList.toggle("sidebar-open-space");
}

toggle_button.onclick = () => {
  toggle_button.classList.toggle("active_toolbox");
  toolbox.classList.toggle("active_toolbox");

  resize_site();
};

toggle_button.click();
