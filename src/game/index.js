import $ from 'jquery';

import Pagination from './pagination';

const game = config => {
	let button = $(
		'<button class="button game__openButton">' + config.game.game + '</button>'
	);
	button.click(() => {
		//render game plane
		Pagination(config);
	});

	button.appendTo('#root');
};

export default game;
