const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#main-nav");

menuButton?.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Ouvrir le menu" : "Fermer le menu");
  navigation?.classList.toggle("is-open", !isOpen);
});

navigation?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("is-open");
    menuButton?.setAttribute("aria-expanded", "false");
    menuButton?.setAttribute("aria-label", "Ouvrir le menu");
  });
});

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

const copyButton = document.querySelector("#copy-prompt");
const contactStatus = document.querySelector("#contact-status");
copyButton?.addEventListener("click", async () => {
  const message = "Bonjour, je découvre VisiPro et j’aimerais parler d’un projet pour mon commerce. Pouvez-vous me recontacter ?";
  try {
    await navigator.clipboard.writeText(message);
    if (contactStatus) contactStatus.textContent = "Message copié ! Collez-le dans votre canal de contact habituel.";
  } catch {
    if (contactStatus) contactStatus.textContent = message;
  }
  copyButton.innerHTML = "Message préparé <span aria-hidden=\"true\">✓</span>";
  window.setTimeout(() => {
    copyButton.innerHTML = "Préparer un message <span aria-hidden=\"true\">↗</span>";
  }, 2600);
});