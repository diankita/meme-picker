import { catsData } from "/data.js";

const emotionsRadios = document.querySelector("#emotion-radios");

emotionsRadios.addEventListener("change", highlightSelectedEmotion);

function highlightSelectedEmotion(e) {
  const selectedEmotionID = e.target.id;

  const radioClassArray = document.getElementsByClassName("radio");
  for (let radio of radioClassArray) {
    radio.classList.remove("highlight");
  }

  document
    .getElementById(selectedEmotionID)
    .parentElement.classList.add("highlight");
}

function getEmotionsArray(cats) {
  const emotionsArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags)
      if (!emotionsArray.includes(emotion)) {
        emotionsArray.push(emotion);
      }
  }
  return emotionsArray;
}

function renderEmotionsRadios(cats) {
  const emotionsList = getEmotionsArray(cats);
  let emotionsHtml = "";

  for (let emotion of emotionsList) {
    emotionsHtml += `
    <div class="radio">
      <label for="${emotion}">${emotion}</label>
      <input type="radio" name="radio" id="${emotion}" value="${emotion}" />
   </div>`;
  }
  emotionsRadios.innerHTML = emotionsHtml;
}
renderEmotionsRadios(catsData);
