(function () {
	var majorNavigationCollapsibleElements = document.querySelector('body > header').querySelectorAll('nav > ul, nav > aside'),
		majorNavigationList = document.querySelector('body > header > nav > ul'),
		majorNavigationButton = (function () {
			var button = document.createElement('button'),
				svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
				path = document.createElementNS('http://www.w3.org/2000/svg', 'path'),
				path2 = path.cloneNode(),
				path3 = path.cloneNode(),
				span = document.createElement('span');

			// Add attributes to the <button>
			button.setAttribute('type', 'button');
			button.setAttribute('aria-expanded', 'false');
			button.setAttribute('aria-label', 'Major Navigation, Menu button, collapsed');

			// Add attributes to the <path> elements
			path.setAttribute('d', 'M5 13h90v14H5z');
			path.style.transformOrigin = '80% 50%';
			path.style.transition = 'transform 0.2s ease-in-out';
			path2.setAttribute('d', 'M5 43h90v14H5z');
			path2.style.transformOrigin = '80% 50%';
			path2.style.transition = 'opacity 0.2s ease-in-out';
			path3.setAttribute('d', 'M5 73h90v14H5z');
			path3.style.transformOrigin = '80% 50%';
			path3.style.transition = 'transform 0.2s ease-in-out';

			// Add attributes to the <svg> and append the <path> elements to it
			svg.id = "icon-major-navigation";
			svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
			svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
			svg.setAttribute('viewBox', '0 0 100 100');
			svg.setAttribute('width', '16');
			svg.setAttribute('height', '16');
			svg.setAttribute('aria-hidden', 'true');
			svg.appendChild(path);
			svg.appendChild(path2);
			svg.appendChild(path3);

			span.appendChild(document.createTextNode(' Menu'));

			button.appendChild(svg);
			button.appendChild(span);

			button.addEventListener('click', toggleMajorNavigation);
 
			return button;
		}()),
		index;

	function toggleMajorNavigation(evt) {
		var button = evt.currentTarget,
			svg = button.querySelector('svg'),
			span = button.querySelector('span'),
			collapsibleElements = button.parentElement.parentElement.querySelectorAll('nav > ul, nav > aside'),
			index;

		if (button.getAttribute('aria-expanded') === 'false') {
			for(index = 0; index < collapsibleElements.length; index++) {
				collapsibleElements[index].hidden = false;
			}

			// Transform the hamburger icon into an x and change the button's visible text
			svg.querySelector('path:first-of-type').setAttribute('transform', 'rotate(-45)');
			svg.querySelector('path:nth-of-type(2)').setAttribute('opacity', '0');
			svg.querySelector('path:nth-of-type(3)').setAttribute('transform', 'rotate(45)');
			span.replaceChild(document.createTextNode(' Close'), span.childNodes[0]);

			button.setAttribute('aria-expanded', 'true');
			button.setAttribute('aria-label', 'Major Navigation, Menu button, expanded');
		} else if (button.getAttribute('aria-expanded') === 'true') {
			for(index = 0; index < collapsibleElements.length; index++) {
				collapsibleElements[index].hidden = true;
			}

			// Transform the x back into a hamburger icon and change the button's visible text again
			svg.querySelector('path:first-of-type').removeAttribute('transform');
			svg.querySelector('path:nth-of-type(2)').removeAttribute('opacity');
			svg.querySelector('path:nth-of-type(3)').removeAttribute('transform');
			span.replaceChild(document.createTextNode(' Menu'), span.childNodes[0]);

			button.setAttribute('aria-expanded', 'false');
			button.setAttribute('aria-label', 'Major Navigation, Menu button, collapsed');
		}
	}

	// Append the Major Navigation menu button to the <nav> element and hide the adjacent, non-visually-hidden content
	majorNavigationList.insertAdjacentElement('beforebegin', majorNavigationButton);
	
	for(index = 0; index < majorNavigationCollapsibleElements.length; index++) {
		majorNavigationCollapsibleElements[index].hidden = true;
	}

	// Add a data attribute to the HTML element to indicate that this file has been executed
	document.querySelector('html').dataset.js = 'true';
}());