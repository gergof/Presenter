import $ from 'jquery';
import './style';

import config from './config';

import Greeter from './greeter';
import Floaters from './floaters';
import Game from './game';

$(document).ready(() => {
	Greeter(config, () => {
		//render floaters
		Floaters(config);

		//render game
		Game(config);
	});
});
