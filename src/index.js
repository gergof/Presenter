import $ from 'jquery';
import './style';

import config from './config';

import Greeter from './greeter';
import Floaters from './floaters';
import Game from './game';

$(document).ready(() => {
	let configToUse = config;
	if (document.userConfig !== null) {
		configToUse = document.userConfig;
	}

	Greeter(configToUse, () => {
		//render floaters
		Floaters(configToUse);

		//render game
		Game(configToUse);
	});
});
