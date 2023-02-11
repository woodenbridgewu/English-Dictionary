const inputEl = document.getElementById("input");
const infoTextEl = document.getElementById("info-text");
const meaningContainer = document.getElementById("meaning-container");
const titleEl = document.getElementById("title");
const meaningEl = document.getElementById("meaning");
const audioEl = document.getElementById("audio");

async function fetchApi(word) {
  try {
    infoTextEl.style.display = "block";
    infoTextEl.innerText = `搜尋中 "${word}"`;
    meaningContainer.style.display = "none";

    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res) => res.json());

    if (result.title) {
      meaningContainer.style.display = "block";
      infoTextEl.style.display = "none";
      audioEl.style.display = "none";
      titleEl.innerText = word;
      meaningEl.innerText = "搜尋無結果";
    } else {
      infoTextEl.style.display = "none";
      meaningContainer.style.display = "block";
      audioEl.style.display = "inline-flex"; //block
      titleEl.innerText = result[0].word;
      meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
      audioEl.src = result[0].phonetics[0].audio;
    }
  } catch (error) {
    console.log(error);
    infoTextEl.innerText = "發生錯誤，請再試一次";
  }
}

inputEl.addEventListener("keyup", (e) => {
  if (e.target.value && e.key === "Enter") {
    fetchApi(e.target.value);
  }
});
