import $ from 'jquery';

import GamePlane from './gamePlane';

const pagination = config => {
	let container = $('<div class="game"></div>');

	const loadPage = i => {
		let hasNext = Math.ceil(config.game.questions.length / 3) > i + 1;
		GamePlane(config, container, i, hasNext, () => {
			if (hasNext) {
				loadPage(i + 1);
			}
		});
	};

	loadPage(0);

	container.appendTo('#root');
};

export default pagination;
