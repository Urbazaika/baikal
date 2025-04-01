let scrollY = 0;
let lastY = scrollY;

let isScroll = false;

let carouselIt = document.querySelectorAll(".carousel-item");
let indicators = document.querySelector(".indicators");
let indicator = document.querySelectorAll(".indicator");

window.onscroll = (e) => {
	lastY = scrollY;
	scrollY = window.pageYOffset;
	if (scrollY >= 300 && scrollY < 500) {
		carouselIt[0].classList.add("hide");
		carouselIt[1].classList.remove("hide");
		carouselIt[2].classList.add("hide");

		indicators.classList.remove("hide");
		indicator[0].classList.add("full")
		indicator[1].classList.remove("full")
		return;
	}
	if (scrollY >= 500) {
		carouselIt[0].classList.add("hide");
		carouselIt[1].classList.add("hide");
		carouselIt[2].classList.remove("hide");

		indicator[0].classList.remove("full")
		indicator[1].classList.add("full")
		return;
	} else {
		carouselIt[0].classList.remove("hide");
		carouselIt[1].classList.add("hide");
		carouselIt[2].classList.add("hide");

		indicators.classList.add("hide");
		indicator[0].classList.remove("full")
		indicator[1].classList.remove("full")
	}


	// console.log(scrollY);
	// if (scrollY > 0 && !isScroll) {
	// 	window.scrollTo({
	// 		top: 870,
	// 		behavior: "smooth",
	// 	});
	// 	isScroll = true;
	// }
	// if (screenY == 0) {
	// 	isScroll = false;
	// }
};


let currentSlide = 2; // Начинаем с третьего слайда

const leftTexts = [
    "Текст для левой панели - Слайд 1",
    "Текст для левой панели - Слайд 2",
    "Текст для левой панели - Слайд 3", // Новый слайд
];

const rightTexts = [
    "Текст для правой панели - Слайд 1",
    "Текст для правой панели - Слайд 2",
    "Текст для правой панели - Слайд 3", // Новый слайд
];

function switchSlides() {
    const leftPanel = document.querySelector('.left-panel');
    const rightPanel = document.querySelector('.right-panel');

    // Увеличиваем индекс текущего слайда
    currentSlide = (currentSlide + 1) % leftTexts.length;

    // Добавляем классы для анимации
    leftPanel.classList.add('slide-down');
    rightPanel.classList.add('slide-up');

    // Обновляем текст через некоторое время после анимации
    setTimeout(() => {
        document.getElementById('left-text').innerText = leftTexts[currentSlide];
        document.getElementById('right-text').innerText = rightTexts[currentSlide];

        // Убираем классы анимации после обновления текста
        leftPanel.classList.remove('slide-down');
        rightPanel.classList.remove('slide-up');
        
        // Перемещаем правую панель обратно вниз
        rightPanel.style.transform = 'translateY(0)';
        
        // Перемещаем левую панель обратно вверх
        leftPanel.style.transform = 'translateY(0)';
        
        // Устанавливаем задержку перед следующей анимацией
        setTimeout(() => {
            rightPanel.style.transform = '';
            leftPanel.style.transform = '';
        }, 50);
        
    }, 500); // Время должно совпадать с временем анимации в CSS
}

window.addEventListener('wheel', (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение прокрутки страницы

    if (event.deltaY < 1) {
        switchSlides('up'); // Прокрутка вверх
    } else if (event.deltaY > 1) {
        switchSlides('down'); // Прокрутка вниз
    }
});
