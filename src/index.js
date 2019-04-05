import $ from 'jquery';
import './style';

import config from './config';

import Greeter from './greeter';
import Floaters from './floaters';

$(document).ready(() => {
	Greeter(config, () => {
		Floaters(config);
	});
});
