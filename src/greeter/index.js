import $ from 'jquery';

const greeter = (
	{ images, greeter: { image, title, text, buttonText } },
	cb
) => {
	let container = $('<div id="greeter" class="greeter"></div>');
	$('<h1>' + title + '</h1>').appendTo(container);
	$('<img src="' + images[image] + '" alt="greeter image"/>').appendTo(
		container
	);
	$('<p>' + text + '</p>').appendTo(container);

	let button = $('<button class="button">' + buttonText + '</button>');
	button.click(() => {
		button.off('click');
		container.addClass('greeter__close');
		setTimeout(() => {
			container.remove();
			cb();
		}, 500);
	});
	button.appendTo(container);

	container.appendTo('#root');
};

export default greeter;
