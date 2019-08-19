let touchstartX = 0;
let touchendX = 0;
const threshold = 100;
const slider = document.getElementsByTagName("body");

function handleGesure() {
  if (touchstartX - touchendX > threshold)
    document.dispatchEvent(new CustomEvent("swiped-left"));
  if (touchendX - touchstartX > threshold)
    document.dispatchEvent(new CustomEvent("swiped-right"));
}

document.addEventListener("touchstart", e => {
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", e => {
  touchendX = e.changedTouches[0].screenX;
  handleGesure();
});
