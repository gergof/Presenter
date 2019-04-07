import $ from 'jquery';
import './style';

import config from './config';

import Greeter from './greeter';
import Floaters from './floaters';
import Game from './game';

$(document).ready(() => {
	Greeter(config, () => {
		Floaters(config);
		//test
		Game(config);
	});
});
