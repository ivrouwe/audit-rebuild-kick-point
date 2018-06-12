(function () {
	var majorNavigation = document.querySelector('body > header > nav'),
		majorNavigationList = majorNavigation.querySelector('ul'),
		majorNavigationAside = majorNavigation.querySelector('aside'),
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
		majorNavigationBreak = document.createElement('br'),
		majorNavigationGroup = document.createElement('div'),
		sidebars = document.querySelectorAll('body > aside[data-sidebar]'),
		resizeTimeout,
		index;

	function resizeHandler() {
		var majorNavigationButton = majorNavigation.querySelector('[type="button"][aria-expanded][aria-label]'),
			adjacentContent = majorNavigationButton.parentElement.querySelector('nav > div'),
			logoLink = adjacentContent.querySelector('ul > li:first-of-type > a');

		if (window.innerWidth >= 992) {
			adjacentContent.hidden = false;
			adjacentContent.removeAttribute('aria-hidden');
			logoLink.removeAttribute('tabindex');
			majorNavigationButton.hidden = true;
		} else {
			adjacentContent.hidden = true;
			adjacentContent.setAttribute('aria-hidden', 'true');
			logoLink.setAttribute('tabindex', '-1');
			majorNavigationButton.hidden = false;
		}
	}

	function resizeThrottler() {
		// ignore resize events as long as an resizeHandler execution is in the queue
		if ( !resizeTimeout ) {
			resizeTimeout = setTimeout(function() {
			resizeTimeout = null;
			resizeHandler();

			// The resizeHandler will execute at a rate of 15fps
			}, 66);
		}
	}

	function sidebarEnhancements(slug) {
		switch (slug) {
			case 'advertisements':

			(function() {
				var advertisementsSidebar = document.querySelector('body > aside.advertisements'),
					advertisements = advertisementsSidebar.querySelectorAll('article.advertisement'),
					buttonPreviousAd = (function() {
						var button = document.createElement('button'),
							svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
							use = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
							span = document.createElement('span');

							// Add attributes and properties to the <button>
							button.setAttribute('type', 'button');
							button.setAttribute('data-action', 'back');
							button.disabled = true;

							// Add href values to the <use> element
							use.setAttribute('href', '#icon-previous');
							use.setAttribute('xlink:href', '#icon-previous');

							// Add attributes to the <svg> and append the <use> element to it
							svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
							svg.setAttribute('viewBox', '25 0 574 1024');
							svg.setAttribute('width', '16');
							svg.setAttribute('height', '16');
							svg.appendChild(use);
							
							// Add a class to the <span> and insert text inside it
							span.classList.add('visually-hidden');
							span.appendChild(document.createTextNode(' Previous Advertisement'));
							
							// Append child elements to the <button> and add an event listener to it
							button.appendChild(svg);
							button.appendChild(span);

							button.addEventListener('click', advertisementsHandler);

							return button;
					}()),
					buttonNextAd = (function() {
						var button = document.createElement('button'),
							svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
							use = document.createElementNS('http://www.w3.org/2000/svg', 'use'),
							span = document.createElement('span');

							// Add attributes to the <button>
							button.setAttribute('type', 'button');
							button.setAttribute('data-action', 'forward');

							// Add href values to the <use> element
							use.setAttribute('href', '#icon-next');
							use.setAttribute('xlink:href', '#icon-next');

							// Add attributes to the <svg> and append the <use> element to it
							svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
							svg.setAttribute('viewBox', '-25 0 574 1024');
							svg.setAttribute('width', '16');
							svg.setAttribute('height', '16');
							svg.appendChild(use);
							
							// Add a class to the <span> and insert text inside it
							span.classList.add('visually-hidden');
							span.appendChild(document.createTextNode('Next Advertisement '));
							
							// Append child elements to the <button> and add an event listener to it
							button.appendChild(span);
							button.appendChild(svg);

							button.addEventListener('click', advertisementsHandler);

							return button;

					}()),
					buttons = [buttonPreviousAd, buttonNextAd],
					definitionList,
					definitionTerm,
					definitionDescription,
					userControls,
					index;

				function advertisementsHandler(evt) {
					var userControls = evt.currentTarget.parentElement.parentElement.parentElement,
						advertisements = userControls.parentElement,
						activeAd = advertisements.parentElement.querySelector('aside.advertisements > dl:not([hidden])'),
						buttonPreviousAd = userControls.querySelector('[type="button"][data-action="back"]'),
						buttonNextAd = userControls.querySelector('[type="button"][data-action="forward"]');
					
					if(evt.currentTarget.dataset.action === 'back') {
						advertisements.dataset.action = 'back';

						if(activeAd.previousElementSibling.previousElementSibling.tagName !== 'DL') {
							evt.currentTarget.disabled = true;
						} else {
							evt.currentTarget.disabled = false;
						}

						buttonNextAd.disabled = false;
						activeAd.hidden = true;
						activeAd.previousElementSibling.hidden = false;
						activeAd.previousElementSibling.childNodes[0].focus();
					} else if (evt.currentTarget.dataset.action === 'forward') {
						advertisements.dataset.action = 'forward';
						
						if(activeAd.nextElementSibling.nextElementSibling.tagName !== 'DL') {
							evt.currentTarget.disabled = true;
						} else {
							evt.currentTarget.disabled = false;
						}

						buttonPreviousAd.disabled = false;
						activeAd.hidden = true;
						activeAd.nextElementSibling.hidden = false;
						activeAd.nextElementSibling.childNodes[0].focus();
					}
				}

				advertisementsSidebar.querySelector('ul').remove();

				for (index = 0; index < advertisements.length; index++) {
					definitionList = document.createElement('dl');
					definitionTerm = document.createElement('dt');
					definitionDescription = document.createElement('dd');
					definitionTerm.classList.add('visually-hidden');
					definitionTerm.setAttribute('tabindex', '-1');
					definitionTerm.appendChild(document.createTextNode('Advertisement ' + (index + 1) + ' of ' + advertisements.length));
					definitionDescription.appendChild(advertisements[index]);
					definitionList.appendChild(definitionTerm);
					definitionList.appendChild(definitionDescription);

					if (index > 0) {
						definitionList.hidden = true;
					}

					advertisementsSidebar.appendChild(definitionList);
				}

				userControls = (function() {
					var userControls = document.createElement('section'),
						heading = document.createElement('h3'),
						list = document.createElement('ul'),
						listItem;

					userControls.classList.add('advertisements-user-controls');
					userControls.id = 'advertisements-user-controls';
					userControls.setAttribute('aria-labelledby', 'advertisements-user-controls');

					heading.classList.add('visually-hidden');
					heading.id = 'advertisements-user-controls-heading';
					heading.appendChild(document.createTextNode('User Controls'));

					for (index = 0; index < buttons.length; index++) {
						listItem = document.createElement('li');

						listItem.appendChild(buttons[index]);
						list.appendChild(listItem);
					}

					userControls.appendChild(heading);
					userControls.appendChild(list);

					return userControls;
				}());

				advertisementsSidebar.appendChild(userControls);
			}());
		}
	}

	function toggleMajorNavigation(evt) {
		var button = evt.currentTarget,
			svg = button.querySelector('svg'),
			span = button.querySelector('span'),
			group = button.parentElement.querySelector('div'),
			logoAnchor = button.parentElement.querySelector('div > ul > li:first-of-type > a');

		if (button.getAttribute('aria-expanded') === 'false') {
			logoAnchor.setAttribute('tabindex', '0');
			group.setAttribute('aria-hidden', 'false');
			group.hidden = false;

			// Transform the hamburger icon into an x and change the button's visible text
			svg.querySelector('path:first-of-type').setAttribute('transform', 'rotate(-45)');
			svg.querySelector('path:nth-of-type(2)').setAttribute('opacity', '0');
			svg.querySelector('path:nth-of-type(3)').setAttribute('transform', 'rotate(45)');
			span.replaceChild(document.createTextNode(' Close'), span.childNodes[0]);

			button.setAttribute('aria-expanded', 'true');
			button.setAttribute('aria-label', 'Major Navigation, Menu button, expanded');
		} else if (button.getAttribute('aria-expanded') === 'true') {
			logoAnchor.setAttribute('tabindex', '-1');
			group.setAttribute('aria-hidden', 'true');
			group.hidden = true;

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
	majorNavigationList.insertAdjacentElement('beforebegin', majorNavigationGroup);
	majorNavigationGroup.appendChild(majorNavigationList);
	majorNavigationGroup.appendChild(majorNavigationAside);
	majorNavigationGroup.setAttribute('aria-hidden', 'true');
	majorNavigationGroup.hidden = true;
	majorNavigationList.querySelector('li:first-of-type > a').setAttribute('tabindex', '-1');
	majorNavigationGroup.insertAdjacentElement('afterend', majorNavigationBreak);
	majorNavigationGroup.insertAdjacentElement('afterend', majorNavigationBreak.cloneNode());

	resizeHandler();
	window.addEventListener('resize', resizeThrottler);

	if (sidebars.length) {
		for(index = 0; index < sidebars.length; index++) {
			sidebarEnhancements(sidebars[index].dataset.sidebar);		
		}
	}

	// Add a data attribute to the HTML element to indicate that this file has been executed
	document.querySelector('html').dataset.js = 'true';
}());