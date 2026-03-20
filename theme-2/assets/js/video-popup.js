export function videoPopup(){
    
const videoBtn = document.getElementById("videoBtn");
const videoPopup = document.getElementById("videoPopup");
const closePopup = document.getElementById("closePopup");
const video = document.getElementById("popupVideo");

videoBtn.onclick = () => {
  videoPopup.classList.remove("hidden");
  videoPopup.classList.add("flex");
  video.play();
}

closePopup.onclick = () => {
  videoPopup.classList.add("hidden");
  video.pause();
}

}