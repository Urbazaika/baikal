let scrollY = 0;

window.onscroll = (e) => {
	scrollY = window.pageYOffset;
	scrollX = window.pageXOffset;
	console.log(scrollY);
	console.log(scrollX);
	let isScroll = false;
	if (scrollY > 0 && !isScroll) {
		window.scrollBy({
			top: 870,
			behavior: "smooth",
		});
	}
};
