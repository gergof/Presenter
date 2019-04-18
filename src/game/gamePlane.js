import $ from 'jquery';

import { shuffle } from '../utils';

import interactions from './interactions';

const gamePlane = (
	{ images, game: { check, nextPage, congrats, close, questions } },
	parent,
	page,
	hasNext,
	goNext
) => {
	let removeInteract = null;
	let container = $('<div class="game__inner"></div>');

	//slice questions
	let questionSet = questions.slice(page * 3, page * 3 + 3);

	let imageOrder = shuffle([...questionSet.keys()]);
	let imageContainer = $('<div class="game__image__container"></div>');
	imageOrder.forEach(i => {
		let imageOuter = $('<div class="game__image__outer"></div>');

		let imageBox = $('<div class="game__image"></div>');
		$(
			'<img src="' + images[questionSet[i].image] + '" alt="image to match"/>'
		).appendTo(imageBox);
		imageBox.appendTo(imageOuter);

		imageBox.data('id', i);
		imageOuter.appendTo(imageContainer);
	});
	imageContainer.appendTo(container);

	let textContainer = $('<div class="game__text__container"></div>');
	questionSet.forEach((game, i) => {
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
		let correct = true;
		$('.game__text__container')
			.children('.game__text')
			.each((i, el) => {
				let dropzone = $(el).children('.game__text__dropzone');

				dropzone
					.removeClass('game__text__dropzone__correct')
					.removeClass('game__text__dropzone__incorrect');

				if (dropzone.data('id') === dropzone.data('dropped')) {
					dropzone.addClass('game__text__dropzone__correct');
				} else {
					correct = false;
					dropzone.addClass('game__text__dropzone__incorrect');
				}
			});

		if (correct) {
			if (hasNext) {
				nextButton.addClass('game__nextButton__visible');
			} else {
				nextButton.remove();
				congratsText.addClass('game__congrats__visible');
			}
		}
	});
	checkButton.appendTo(textContainer);

	let closeButton = $(
		'<button class="button" style="margin: 5px">' + close + '</button>'
	);
	closeButton.click(() => {
		removeInteract();

		parent.addClass('game__close');
		setTimeout(() => {
			parent.remove();
		}, 500);
	});
	closeButton.appendTo(textContainer);

	$('<br/>').appendTo(textContainer);
	let nextButton = $(
		'<button class="button game__nextButton">' + nextPage + '</button>'
	);
	nextButton.click(() => {
		removeInteract();

		container.addClass('game__inner__leave');
		setTimeout(() => {
			container.remove();

			if (hasNext) {
				goNext();
			}
		}, 500);
	});
	nextButton.appendTo(textContainer);

	let congratsText = $('<p class="game__congrats">' + congrats + '</p>');
	congratsText.appendTo(textContainer);

	textContainer.appendTo(container);

	container.appendTo(parent);

	removeInteract = interactions();
};

export default gamePlane;
