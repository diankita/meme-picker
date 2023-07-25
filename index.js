import { catsData } from "/data.js";

const emotionsRadios = document.querySelector("#emotion-radios");
const getImageBtn = document.querySelector("#get-image-btn");
const gifsOnlyCheckbox = document.querySelector("#gifs-only-checkbox");

emotionsRadios.addEventListener("change", highlightSelectedEmotion);
getImageBtn.addEventListener("click", getMatchingCatsArray);

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

function getMatchingCatsArray() {
  if (document.querySelector('input[type="radio"]:checked')) {
    const checkedRadioValue = document.querySelector(
      'input[type="radio"]:checked'
    ).value;

    const isGifChecked = gifsOnlyCheckbox.checked;

    const matchingCatsArray = catsData.filter(function (cat) {
      if (isGifChecked) {
        return cat.emotionTags.includes(checkedRadioValue) && cat.isGif;
      } else {
        return cat.emotionTags.includes(checkedRadioValue);
      }
    });
    return matchingCatsArray;
  }
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
