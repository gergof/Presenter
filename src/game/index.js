import $ from 'jquery';

import { shuffle } from '../utils';

import interactions from './interactions';

const game = ({ images, game: { check, close, questions } }) => {
	let container = $('<div class="game"></div>');

	let imageOrder = shuffle([...questions.keys()]);
	let imageContainer = $('<div></div>');
	imageOrder.forEach(i => {
		let imageOuter = $('<div class="game__image__outer"></div>');

		let imageBox = $('<div class="game__image"></div>');
		$(
			'<img src="' + images[questions[i].image] + '" alt="image to match"/>'
		).appendTo(imageBox);
		imageBox.appendTo(imageOuter);

		imageBox.data('id', i);
		imageOuter.appendTo(imageContainer);
	});
	imageContainer.appendTo(container);

	let textContainer = $('<div class="game__text__container"></div>');
	questions.forEach((game, i) => {
		let textBox = $('<div class="game__text"></div>');

		let dropzone = $('<div class="game__text__dropzone"></div>');
		dropzone.data('id', i);
		dropzone.appendTo(textBox);

		let text = $('<div class="game__text__text"></div>');
		$('<p>' + game.text + '</p>').appendTo(text);
		text.appendTo(textBox);

		textBox.appendTo(textContainer);
	});

	let checkButton = $(
		'<button class="button" style="margin: 5px">' + check + '</button>'
	);
	checkButton.click(() => {
		$('.game__text__container')
			.children('.game__text')
			.each((i, el) => {
				let dropzone = $(el).children('.game__text__dropzone');

				if (dropzone.data('id') === dropzone.data('dropped')) {
					dropzone.addClass('game__text__dropzone__correct');
				} else {
					dropzone.addClass('game__text__dropzone__incorrect');
				}
			});
	});
	checkButton.appendTo(textContainer);

	let closeButton = $(
		'<button class="button" style="margin: 5px">' + close + '</button>'
	);
	closeButton.click(() => {
		container.addClass('game__close');
		setTimeout(() => {
			container.remove();
		}, 500);
	});
	closeButton.appendTo(textContainer);

	textContainer.appendTo(container);

	container.appendTo('#root');

	interactions();
};

export default game;
