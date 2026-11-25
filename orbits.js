const orbits = document.querySelector(".orbits");
const toggle = document.querySelector(".motion-toggle");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let started = false;
let pausedByVisitor = false;

function updateMotion() {
  toggle.hidden = reducedMotion.matches;

  if (reducedMotion.matches) {
    orbits.pauseAnimations();
    orbits.setCurrentTime(0);
    orbits.classList.remove("is-animated");
    return;
  }

  if (!started) {
    for (const motion of orbits.querySelectorAll("animateMotion, animateTransform, animate")) {
      motion.beginElement();
    }
    started = true;
  }

  orbits.classList.add("is-animated");
  if (pausedByVisitor) {
    orbits.pauseAnimations();
  } else {
    orbits.unpauseAnimations();
  }
  toggle.textContent = pausedByVisitor ? "Play animation" : "Pause animation";
}

if (typeof orbits.pauseAnimations === "function" &&
    typeof orbits.querySelector("animateMotion").beginElement === "function") {
  toggle.addEventListener("click", () => {
    pausedByVisitor = !pausedByVisitor;
    updateMotion();
  });
  reducedMotion.addEventListener("change", updateMotion);
  updateMotion();
}
