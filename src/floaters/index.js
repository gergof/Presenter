import $ from 'jquery';
import interact from 'interactjs';

const floaters = ({ images, floaters }) => {
	let floaterBox = $('<div class="floater__box"></div>');

	floaters.forEach(floater => {
		let outerContainer = $('<div class="floater__outer"></div>');
		let container = $('<div class="floater"></div>');

		let h1container = $('<div class="textContainer"></div>');
		$('<h1>' + floater.title + '</h1>').appendTo(h1container);
		h1container.appendTo(container);

		$(
			'<img src="' + images[floater.image] + '" alt="floater image"/>'
		).appendTo(container);

		let textContainer = $('<div class="textContainer"></div>');
		floater.text.forEach(p => {
			$('<p>' + p + '</p>').appendTo(textContainer);
		});
		textContainer.appendTo(container);

		container.appendTo(outerContainer);
		outerContainer.appendTo(floaterBox);
	});

	floaterBox.appendTo('#root');

	const toggleContainer = el => {
		if (el.hasClass('floater__open')) {
			el.removeClass('floater__open').removeClass('floater__open__done');
		} else {
			el.addClass('floater__open');
			setTimeout(() => el.addClass('floater__open__done'), 500);
		}
	};

	const onMove = e => {
		let x = (parseFloat($(e.target).data('x')) || 0) + (e.dx || 0);
		let y = (parseFloat($(e.target).data('y')) || 0) + (e.dy || 0);
		let angle = (e.angle || 0) + ($(e.target).data('angle') || 0);
		let scale = (e.scale || 1) * ($(e.target).data('scale') || 1);

		if (scale > 2 && !$(e.target).hasClass('floater__open')) {
			toggleContainer($(e.target));
			scale = 1;
		} else if (scale < 0.5 && $(e.target).hasClass('floater__open')) {
			toggleContainer($(e.target));
			scale = 1;
		}

		$(e.target).css(
			'transform',
			`translate(${x}px, ${y}px) rotate(${angle}deg) scale(${scale})`
		);

		$(e.target).data('x', x);
		$(e.target).data('y', y);
	};

	interact('.floater')
		.draggable({
			inertia: true,
			modifiers: [
				interact.modifiers.restrict({
					restriction: '.floater__box',
					endOnly: true,
					elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
				})
			],
			onmove: onMove
		})
		.gesturable({
			onstart: e => {
				$(e.target).data('angle', ($(e.target).data('angle') || 0) - e.angle);
			},
			onmove: onMove,
			onend: e => {
				$(e.target).data('angle', e.angle + ($(e.target).data('angle') || 0));
				$(e.target).data('scale', e.scale * ($(e.target).data('scale') || 1));
			}
		})
		.on('tap', e => {
			let target;
			if ($(e.target).is('div.floater')) {
				target = $(e.target);
			} else if (
				$(e.target)
					.parent()
					.is('div.floater')
			) {
				target = $(e.target).parent();
			} else {
				target = $(e.target)
					.parent()
					.parent();
			}

			toggleContainer(target);
		});
};

export default floaters;
