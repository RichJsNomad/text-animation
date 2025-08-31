const typewriterText = document.getElementById("typewriter-text");
const cursor = document.getElementById("cursor");

let currentText = "";
let currentIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

async function fetchProgrammingQuote() {
  const programmingQuotes = [
    "Talk is cheap. Show me the code.",
    "Code is poetry written in logic.",
    "Programming is thinking, not typing.",
    "First solve the problem, then write the code.",
    "The best error message is the one that never shows up.",
    "Code never lies, comments sometimes do.",
    "Programming is the art of algorithm design and the craft of debugging errant code.",
    "Debugging is twice as hard as writing the code in the first place.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Experience is the name everyone gives to their mistakes.",
    "The most important property of a program is whether it accomplishes the intention of its user.",
    "Programs must be written for people to read, and only incidentally for machines to execute.",
    "Walking on water and developing software from a specification are easy if both are frozen.",
    "If debugging is the process of removing software bugs, then programming must be the process of putting them in.",
    "There are only two hard things in Computer Science: cache invalidation and naming things.",
    "Code is like humor. When you have to explain it, it's bad.",
    "Programming isn't about what you know; it's about what you can figure out.",
    "The function of good software is to make the complex appear to be simple.",
    "Software is like entropy: It is difficult to grasp, weighs nothing, and obeys the Second Law of Thermodynamics.",
    "Clean code always looks like it was written by someone who cares."
  ];
  
  try {
    // Try Quotable API first
    const response = await axios.get("https://api.quotable.io/random?tags=technology");
    return response.data.content;
  } catch (error) {
    console.log("API unavailable, using local quotes");
    // Use local programming quotes as fallback
    const randomIndex = Math.floor(Math.random() * programmingQuotes.length);
    return programmingQuotes[randomIndex];
  }
}

function typeWriter() {
  if (!isDeleting && currentIndex < currentText.length) {
    typewriterText.textContent += currentText.charAt(currentIndex);
    currentIndex++;
    setTimeout(typeWriter, typingSpeed);
  } else if (!isDeleting && currentIndex === currentText.length) {
    setTimeout(() => {
      isDeleting = true;
      typeWriter();
    }, 3000);
  } else if (isDeleting && currentIndex > 0) {
    typewriterText.textContent = currentText.substring(0, currentIndex - 1);
    currentIndex--;
    setTimeout(typeWriter, typingSpeed / 2);
  } else if (isDeleting && currentIndex === 0) {
    isDeleting = false;

    setTimeout(async () => {
      currentText = await fetchProgrammingQuote();
      typeWriter();
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  // Show loading text
  typewriterText.textContent = "Loading...";

  // Get first quote
  currentText = await fetchProgrammingQuote();

  // Clear loading text and start typewriter
  typewriterText.textContent = "";
  setTimeout(typeWriter, 1000);
});
