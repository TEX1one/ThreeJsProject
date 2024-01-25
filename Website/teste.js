let currentIndex = 0;
const images = ["/imagens/Foto5.jpg", "/imagens/Teste.png", "/imagens/Foto2.jpg"]; // Add more image URLs as needed

function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = images.length - 1;
    } else if (currentIndex >= images.length) {
        currentIndex = 0;
    }

    const currentImage = document.getElementById("current-image");
    const imageFraction = document.getElementById("image-fraction");

    currentImage.src = images[currentIndex];
    imageFraction.textContent = `${-currentIndex + 3}/${images.length}`;
}

document.addEventListener("DOMContentLoaded", function () {
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    prevBtn.addEventListener("click", function () {
        changeImage(-1);
    });

    nextBtn.addEventListener("click", function () {
        changeImage(1);
    });
});
