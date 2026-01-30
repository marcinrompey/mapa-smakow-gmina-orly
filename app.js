const tooltip = document.getElementById("tooltip");
const tooltipImg = document.getElementById("tooltipImg");
const stage = document.getElementById("stage");

const INFO = {
  kaszyce: "img/info/kaszyce.png",
  ciemiierzowice: "img/info/ciemiierzowice.png",
  olszynka: "img/info/olszynka.png",
  waclawice: "img/info/waclawice.png",
  trojczyce: "img/info/trojczyce.png",
  hnatkowice: "img/info/hnatkowice.png",
  drohojow: "img/info/drohojow.png",
  orly: "img/info/orly.png",
  zadabrowie: "img/info/zadabrowie.png",
  niziny: "img/info/niziny.png",
  walawa: "img/info/walawa.png",
  malkowice: "img/info/malkowice.png",
  dunkowiczki: "img/info/dunkowiczki.png",
};

function show(key, label) {
  const src = INFO[key];
  if (!src) return;
  tooltipImg.src = src;
  tooltipImg.alt = label || key;
  tooltip.style.display = "block";
  tooltip.setAttribute("aria-hidden", "false");
}

function hide() {
  tooltip.style.display = "none";
  tooltip.setAttribute("aria-hidden", "true");
}

function move(e) {
  const rect = stage.getBoundingClientRect();
  tooltip.style.left = (e.clientX - rect.left) + "px";
  tooltip.style.top  = (e.clientY - rect.top) + "px";
}

document.querySelectorAll('area[data-key]').forEach(area => {
  const key = area.dataset.key;
  const label = area.getAttribute("alt") || key;

  area.addEventListener("mouseenter", (e) => { move(e); show(key, label); });
  area.addEventListener("mousemove",  (e) => { move(e); show(key, label); });
  area.addEventListener("mouseleave", hide);

  // mobile: tap
  area.addEventListener("click", (e) => {
    e.preventDefault();
    const src = INFO[key];
    const isVisible = tooltip.style.display === "block" && tooltipImg.src.includes(src);
    if (isVisible) hide();
    else {
      const rect = stage.getBoundingClientRect();
      tooltip.style.left = (rect.width * 0.55) + "px";
      tooltip.style.top  = (rect.height * 0.55) + "px";
      show(key, label);
    }
  });
});

// klik poza mapą chowa
document.addEventListener("click", (e) => {
  if (!e.target.closest("#tooltip") && !e.target.closest("map")) hide();
});
