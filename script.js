document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main > section');
    let currentSection = 0;

    const upButton = document.querySelector('.nav_up_button');
    const downButton = document.querySelector('.nav_down_button');
    const buttonHeight = 50; // Ustawiona wysokość przycisku z CSS

    function updateButtonVisibility() {
        if (currentSection === 0) {
            upButton.style.top = `-${buttonHeight}px`; // Wyjeżdża poza ekran
        } else {
            upButton.style.top = '10px'; // Wjeżdża na ekran
        }

        if (currentSection === sections.length - 1) {
            downButton.style.bottom = `-${buttonHeight}px`; // Wyjeżdża poza ekran
        } else {
            downButton.style.bottom = '10px'; // Wjeżdża na ekran
        }
    }

    function easeInOutQuad(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }

    function smoothScrollTo(endY, duration) {
        const startY = window.scrollY;
        const change = endY - startY;
        const startTime = performance.now();

        function animateScroll(currentTime) {
            const elapsedTime = currentTime - startTime;
            const nextY = easeInOutQuad(elapsedTime, startY, change, duration);

            window.scrollTo(0, nextY);

            if (elapsedTime < duration) {
                requestAnimationFrame(animateScroll);
            } else {
                window.scrollTo(0, endY);
            }
        }

        requestAnimationFrame(animateScroll);
    }

    function scrollToSection(sectionIndex) {
        const sectionTop = sections[sectionIndex].offsetTop;
        smoothScrollTo(sectionTop, 1000); // 1000 ms = 1 second
        currentSection = sectionIndex;
        updateButtonVisibility();
    }

    downButton.addEventListener('click', function() {
        if (currentSection < sections.length - 1) {
            scrollToSection(currentSection + 1);
        }
    });

    upButton.addEventListener('click', function() {
        if (currentSection > 0) {
            scrollToSection(currentSection - 1);
        }
    });

    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset + window.innerHeight / 2;
        for (let i = 0; i < sections.length; i++) {
            if (scrollPosition >= sections[i].offsetTop && scrollPosition < sections[i].offsetTop + sections[i].offsetHeight) {
                currentSection = i;
                break;
            }
        }
        updateButtonVisibility();
    });

    updateButtonVisibility();
});
document.querySelectorAll('.nav_button').forEach(button => {
    button.addEventListener('click', function() {
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300); // Czas trwania animacji powrotu do skali 1
    });
});