import $ from 'jquery';
import './style';

$(document).ready(() => {
	$('#root').html('test');
	setTimeout(() => $('#root').html('it works'), 2000);
});
