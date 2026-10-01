// Typing effect (Home page එකේ විතරක් වැඩ කරනවා)
const target = document.querySelector(".typing-text span");

if (target) {
    const words = ["Web Developer", "Designer", "Student"];
    let w = 0, c = 0, deleting = false;

    function type() {
        const word = words[w];
        target.textContent = word.slice(0, c);

        if (!deleting && c === word.length) {
            deleting = true;
            return setTimeout(type, 1400);
        }
        if (deleting && c === 0) {
            deleting = false;
            w = (w + 1) % words.length;
        }
        c += deleting ? -1 : 1;
        setTimeout(type, deleting ? 50 : 100);
    }
    type();
}