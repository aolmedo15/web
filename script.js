document.addEventListener('DOMContentLoaded', () => {
    const btnOpen = document.getElementById('btn-open-invitation');
    const envelope = document.querySelector('.envelope');
    const envelopeScreen = document.getElementById('envelope-screen');
    const invitationScreen = document.getElementById('invitation-screen');
    const weddingMusic = document.getElementById('wedding-music');

    btnOpen.addEventListener('click', () => {
        // 1. Play music
        // We catch the error just in case the browser policy still blocks it or the file is missing
        weddingMusic.play().catch(error => {
            console.log("Audio play failed / user interaction not fully recognized:", error);
        });

        // 2. Open the envelope (trigger CSS animation)
        envelope.classList.add('open');

        // 3. Wait a moment for the envelope animation, then fade it out and show the invitation
        setTimeout(() => {
            envelopeScreen.classList.add('fading-out');

            setTimeout(() => {
                envelopeScreen.style.display = 'none';

                // Show the main invitation
                invitationScreen.classList.remove('hidden');
                invitationScreen.classList.add('visible');
            }, 800); // Wait for the fade-out to finish

        }, 1200); // Time to let the letter come out of the envelope
    });

    // Optional: Add RSVP button alert to demonstrate interaction
    const btnRsvp = document.querySelector('.btn-rsvp');
    if (btnRsvp) {
        btnRsvp.addEventListener('click', () => {
            alert("¡Gracias! En una versión final, este botón podría redirigir a WhatsApp o a un formulario de confirmación.");
        });
    }

    // Carousel Logic
    const images = document.querySelectorAll('.carousel-img');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentImgIndex = 0;

    function showImage(index) {
        images.forEach(img => img.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        images[index].classList.add('active');
        dots[index].classList.add('active');
    }

    if (images.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentImgIndex = (currentImgIndex + 1) % images.length;
            showImage(currentImgIndex);
        });

        prevBtn.addEventListener('click', () => {
            currentImgIndex = (currentImgIndex - 1 + images.length) % images.length;
            showImage(currentImgIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentImgIndex = index;
                showImage(currentImgIndex);
            });
        });

        // Auto slide
        setInterval(() => {
            currentImgIndex = (currentImgIndex + 1) % images.length;
            showImage(currentImgIndex);
        }, 4000);
    }

    // Countdown Logic
    const countDownDate = new Date("Aug 22, 2026 17:00:00").getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById("cd-days").innerHTML = "00";
            document.getElementById("cd-hours").innerHTML = "00";
            document.getElementById("cd-mins").innerHTML = "00";
            document.getElementById("cd-secs").innerHTML = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("cd-days").innerHTML = days < 10 ? '0' + days : days;
        document.getElementById("cd-hours").innerHTML = hours < 10 ? '0' + hours : hours;
        document.getElementById("cd-mins").innerHTML = minutes < 10 ? '0' + minutes : minutes;
        document.getElementById("cd-secs").innerHTML = seconds < 10 ? '0' + seconds : seconds;

    }, 1000);

    // Intersection Observer for Scroll Animations
    const observerOptions = {
        root: document.querySelector('.glass-panel'),
        rootMargin: '0px',
        threshold: 0.15
    };

    const animateOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const scrollItems = document.querySelectorAll('.scroll-animate');
    scrollItems.forEach(item => {
        animateOnScroll.observe(item);
    });
});
