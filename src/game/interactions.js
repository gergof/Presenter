import $ from 'jquery';
import interact from 'interactjs';

const interactions = () => {
	interact('.game__image').draggable({
		inertia: true,
		modifiers: [
			interact.modifiers.restrict({
				restriction: '.game',
				endOnly: true,
				elementRect: { top: 0, left: 0, bottom: 1, right: 1 }
			})
		],
		onmove: e => {
			let x = (parseFloat($(e.target).data('x')) || 0) + (e.dx || 0);
			let y = (parseFloat($(e.target).data('y')) || 0) + (e.dy || 0);

			$(e.target).css('transform', `translate(${x}px, ${y}px)`);
			//$(e.target).css('top', `${y}px`);
			//$(e.target).css('left', `${x}px`);
			$(e.target).data('x', x);
			$(e.target).data('y', y);
		}
	});

	interact('.game__text__dropzone').dropzone({
		accept: '.game__image',
		overlap: 0.3,
		ondropactivate: e => {
			$(e.target).addClass('game__text__dropzone__active');
		},
		ondragenter: e => {
			$(e.relatedTarget).addClass('game__image__active');
		},
		ondragleave: e => {
			$(e.relatedTarget)
				.removeClass('game__image__active')
				.removeClass('game__image__dropped');
			$(e.target)
				.removeClass('game__text__dropzone__correct')
				.removeClass('game__text__dropzone__incorrect');

			$(e.target).data('dropped', null);
		},
		ondrop: e => {
			$(e.relatedTarget).addClass('game__image__dropped');
			$(e.target)
				.removeClass('game__text__dropzone__correct')
				.removeClass('game__text__dropzone__incorrect');

			$(e.target).data('dropped', $(e.relatedTarget).data('id'));

			let x =
				$(e.target).offset().left -
				$(e.relatedTarget)
					.parent()
					.offset().left +
				3;
			let y =
				$(e.target).offset().top -
				$(e.relatedTarget)
					.parent()
					.offset().top +
				3;
			$(e.relatedTarget).css('transform', `translate(${x}px, ${y}px`);
		},
		ondropdeactivate: e => {
			$(e.target).removeClass('game__text__dropzone__active');
		}
	});

	return () => {
		interact('.game__image').unset();
		interact('.game__text__dropzone').unset();
	};
};

export default interactions;
