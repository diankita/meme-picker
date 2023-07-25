import { catsData } from "/data.js";

// taking control of html elements
const emotionsRadios = document.querySelector("#emotion-radios");
const getImageBtn = document.querySelector("#get-image-btn");
const gifsOnlyCheckbox = document.querySelector("#gifs-only-checkbox");
const memeModal = document.querySelector("#meme-modal");
const memeModalInner = document.querySelector("#meme-modal-inner");
const memeModalCloseBtn = document.querySelector("#meme-modal-close-btn");

// adding event listeners
emotionsRadios.addEventListener("change", highlightSelectedEmotion);
getImageBtn.addEventListener("click", renderCatMeme);
memeModalCloseBtn.addEventListener("click", closeModal);
document.addEventListener("click", (e) => {
  if (e.target.id != "meme-modal" && e.target.id != "get-image-btn") {
    closeModal();
  }
});

// extracting emotions from catsData
// rendering them in form of radio inputs
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

// highligting the selected emotion
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

// getting an array matching user's selection
// reducing it to a single object
// rendering the object inside of the modal

function renderCatMeme() {
  const catObject = getSingleCatObject();
  memeModal.style.display = "flex";
  memeModalInner.innerHTML = `
    <img 
      class="cat-img" 
      src="./images/${catObject.image}"
      alt="${catObject.alt}"
    >`;
}

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray();

  if (catsArray.length === 1) {
    return catsArray[0];
  } else {
    const randomIndex = Math.floor(Math.random() * catsArray.length);
    return catsArray[randomIndex];
  }
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

// closing the modal
function closeModal() {
  memeModal.style.display = "none";
}
