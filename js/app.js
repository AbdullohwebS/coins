// LocalStorage ma'lumotlarini olish
let coins = parseInt(localStorage.getItem("coins")) || 0;
let energy = parseInt(localStorage.getItem("energy")) || 500;
const maxEnergy = 500;
let boostLevel = parseInt(localStorage.getItem("boostLevel")) || 1;
let boostCost = parseInt(localStorage.getItem("boostCost")) || 100;
let lastEnergyRestore =
  parseInt(localStorage.getItem("lastEnergyRestore")) || Date.now();

// HTML dagi elementlarni yangilash
document.getElementById("coins").innerText = coins;
document.getElementById("energy").innerText = energy;
document.getElementById("boostLevel").innerText = boostLevel;
document.getElementById("boostCost").innerText = boostCost;

// Coin ishlash
function earnCoin(event) {
  if (energy > 0) {
    coins += boostLevel;
    energy--;
    localStorage.setItem("coins", coins);
    localStorage.setItem("energy", energy);
    document.getElementById("coins").innerText = coins;
    document.getElementById("energy").innerText = energy;

    showFloatingText(event);
  }
}

// Floating text chiqishi
function showFloatingText(event) {
  let floatingText = document.createElement("div");
  floatingText.classList.add("floating-text");

  let x = event.pageX || event.touches?.[0]?.pageX;
  let y = event.pageY || event.touches?.[0]?.pageY;

  floatingText.style.left = `${x}px`;
  floatingText.style.top = `${y}px`;
  floatingText.innerText = `+${boostLevel}`;

  document.body.appendChild(floatingText);
  setTimeout(() => floatingText.remove(), 1000);
}

// Boost panelni ochish
function openBoostPanel() {
  document.getElementById("boostPanel").style.display = "block";
}

// Boost panelni yopish
function closeBoostPanel() {
  document.getElementById("boostPanel").style.display = "none";
}

// Boostni yangilash
function upgradeBoost() {
  if (coins >= boostCost) {
    coins -= boostCost;
    boostLevel++;
    boostCost = Math.floor(boostCost * 1.5);

    localStorage.setItem("coins", coins);
    localStorage.setItem("boostLevel", boostLevel);
    localStorage.setItem("boostCost", boostCost);

    document.getElementById("coins").innerText = coins;
    document.getElementById("boostLevel").innerText = boostLevel;
    document.getElementById("boostCost").innerText = boostCost;

    showMessage("Ko‘tarildi! 🚀", "green");
  } else {
    showMessage("Coin yetarli emas! ❌", "red");
  }
}

// Xabar chiqarish
function showMessage(text, color = "gold") {
  let message = document.createElement("div");
  message.classList.add("floating-text");
  message.style.color = color;
  message.style.position = "fixed";
  message.style.left = "50%";
  message.style.top = "50%";
  message.style.transform = "translate(-50%, -50%)";
  message.style.padding = "12px 20px";
  message.style.borderRadius = "10px";
  message.style.fontSize = "22px";
  message.style.textAlign = "center";
  message.style.fontWeight = "bold";
  message.style.zIndex = "9999";
  message.innerText = text;

  document.body.appendChild(message);
  setTimeout(() => message.remove(), 1000);
}

// Energiya tiklanishi
function restoreEnergy() {
  let now = Date.now();
  let elapsedMinutes = Math.floor((now - lastEnergyRestore) / 60000);

  if (elapsedMinutes >= 5) {
    energy = maxEnergy;
    lastEnergyRestore = now;
    localStorage.setItem("energy", energy);
    localStorage.setItem("lastEnergyRestore", lastEnergyRestore);
    document.getElementById("energy").innerText = energy;
    console.log("Energiya tiklandi!");
  } else {
    console.log(`Energiya tiklanishi uchun ${5 - elapsedMinutes} daqiqa qoldi`);
  }
}

// Energiya tiklanishini har 1 daqiqada tekshirish
restoreEnergy();
setInterval(restoreEnergy, 60000);

// Mobil uchun touch bosilishini to'xtatish
document.querySelector(".boost-btn").addEventListener(
  "touchstart",
  function (event) {
    event.preventDefault();
  },
  { passive: true }
);
