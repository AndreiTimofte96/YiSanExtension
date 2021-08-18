chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

	
		$(document).ready(function(){
			const HOST_NAME = 'filmeplay-ro.blogspot.com';
			const {hostname, pathname, href} = window.location;
			if (hostname !== HOST_NAME || pathname.length <= 1) return;

			// ----------------------------------------------------------
				// This part of the script triggers when page is done loading
				console.log("Hello. This message was sent from scripts/inject.js");
			// ----------------------------------------------------------

			window.scrollTo(0, 500);

			const _pathname = pathname; 
			const episodeNo = _pathname.split('.html')[0].slice(-2);

			let previous  = Number(episodeNo) - 1;
			let next = Number(episodeNo) + 1;

			previous = previous < 10 ? `0${String(previous)}` : String(previous);
			next = next < 10 ? `0${String(next)}` : String(next);

			const previousUrl = href.replace(episodeNo, previous)
			const nextUrl = href.replace(episodeNo, next);
		
			const btnStyle = "background-color: darkorchid; border: none; padding: 10px 20px; ";
			const aStyle = "color: white;"
			const previousBtn = `<button style="${btnStyle}"><a style="${aStyle}" href=${previousUrl}> Previous </a></button>`;
			const	nextBtn = `<button style="margin-left: auto; ${btnStyle}"><a  style="${aStyle}" href=${nextUrl}> Next </a></button>`;
			const htmlContent = `<div id="extension-content" style="display: flex; justify-content: space-between; width: 640px">
				${previous > 0 ? previousBtn : ''}
				${next > 0 ? nextBtn : ''}
			</div>`;


			$(htmlContent).insertAfter('iframe[width=640]');
		});

	}
	}, 10);
});