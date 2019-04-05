import $ from 'jquery';
import interact from 'interactjs';

const floaters = ({ images, floaters }) => {
	floaters.forEach(floater => {
		let container = $('<div class="floater"></div>');
		$('<h1>' + floater.title + '</h1>').appendTo(container);
		$(
			'<img src="' + images[floater.image] + '" alt="floater image"/>'
		).appendTo(container);
		floater.text.forEach(p => {
			$('<p>' + p + '</p>').appendTo(container);
		});
		container.appendTo('#root');
	});
};

export default floaters;
