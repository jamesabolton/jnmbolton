var messageDelay = 3500;  // How long to display status messages (in milliseconds)

function refresh() {
	$('.flexslider').flexslider({
		animation: 'fade',              //String: Select your animation type, 'fade' or 'slide'
		slideDirection: 'horizontal',   //String: Select the sliding direction, 'horizontal' or 'vertical'
		slideshow: true,                //Boolean: Animate slider automatically
		slideshowSpeed: 3000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
		animationDuration: 600,         //Integer: Set the speed of animations, in milliseconds
		directionNav: true
	});

	// scroll about me
	$("#scroll-about").mCustomScrollbar({
		//scrollInertia:600,
		//autoHideScrollbar:false,
		//autoDraggerLength:false,
		scrollButtons: { enable: true }
	});
}

function navLoadBegin() {
	$('#content').slideUp('slow');
	$('#canvasloader-container').remove();
	$('#wrapper').append('<div id="canvasloader-container"></div>');
	loader();
	$('#canvasloader-container').fadeIn('slow');

	$('#nav li a').removeClass('active');
}

function navLoadSuccess() {
	$('#content').slideDown('slow', 'swing', hideLoader());
	$(this).addClass('active');
}

function hideLoader() {
	$('#canvasloader-container').fadeOut('slow');
}

function navLoadComplete() {
	refresh();

	// scroll years
	$("#scroll").mCustomScrollbar({
		scrollInertia: 600,
		autoHideScrollbar: false,
		autoDraggerLength: false,
		scrollButtons: { enable: true },
		callbacks: {
			whileScrolling: function () { WhileScrolling(); }
		}
	});

	function WhileScrolling() {
		$("ul.box-years li a.current").removeClass("current");
		if (mcs.top >= -780) {
			$("#y1").addClass("current");
		}
		else if (mcs.top >= -1580) {
			$("#y2").addClass("current");
		}
		else if (mcs.top >= -2380) {
			$("#y3").addClass("current");
		}
		else if (mcs.top >= -3180) {
			$("#y4").addClass("current");
		}
		else if (mcs.top >= -3980) {
			$("#y5").addClass("current");
		}
	}

	$("ul.box-years a[rel~='year1_scrollTo']").click(function (e) {
		e.preventDefault();
		$("#scroll").mCustomScrollbar("scrollTo", "#year1");
	});
	$("ul.box-years a[rel~='year2_scrollTo']").click(function (e) {
		e.preventDefault();
		$("#scroll").mCustomScrollbar("scrollTo", "#year2");
	});
	$("ul.box-years a[rel~='year3_scrollTo']").click(function (e) {
		e.preventDefault();
		$("#scroll").mCustomScrollbar("scrollTo", "#year3");
	});
	$("ul.box-years a[rel~='year4_scrollTo']").click(function (e) {
		e.preventDefault();
		$("#scroll").mCustomScrollbar("scrollTo", "#year4");
	});
	$("ul.box-years a[rel~='year5_scrollTo']").click(function (e) {
		e.preventDefault();
		$("#scroll").mCustomScrollbar("scrollTo", "#year5");
	});

	// progress bar - skills

	$('.my-progress-bar').simpleProgressBar();

	// portfolio responsive

	var $container = $('#porfolio-container');

	$container.imagesLoaded(function () {
		$container.masonry({
			itemSelector: '.box',
			isAnimated: true,
			isFitWidth: true
		});
	});

	// lightbox

	$("a[rel^='prettyPhoto']").prettyPhoto({
		social_tools: false,
		theme: 'light_rounded',
		horizontal_padding: 0
	});

	// map

	var $map = $('#map');

	if ($map.length) {

		$map.gMap({
			scrollwheel: true,
			zoom: 15,
			markers: [
				{
					latitude: 33.151292,
					longitude: -96.691737,
					html: "<h3>James Bolton</h3>4909 Sugar Valley Rd<br/>McKinney, TX 75070",
					popup: false,
					icon: {
						image: "/Content/Images/gmap_pin.png",
						iconsize: [26, 46],
						iconanchor: [12, 46]
					}
				}
			]
		});
	}

	// contact form

	// Init the form once the document is ready
	$(init);

	// Initialize the form	
	function init() {
		// Hide the form initially.
		// Make submitForm() the form's submit handler.	  
		$('#formContact').hide().submit(submitForm)

		// When the "Send us an email" link is clicked:
		// 1. Fade the content out
		// 2. Display the form
		// 3. Move focus to the first field
		// 4. Prevent the link being followed

		$('a[href="#contactForm"]').click(function () {
			$('.send h3 a').addClass('active');
			$('#contact').fadeTo('slow', 1);
			$('#formContact').fadeIn('slow', function () {
				$('#senderName').focus();
			})

			return false;
		});

		// When the "Escape" key is pressed, close the form
		$('#formContact').keydown(function (event) {
			if (event.which == 27) {
				$('#formContact').fadeOut();
				$('#contact').fadeTo('slow', 1);
			}
		});
	}
}

// When the "Send us an email" link is clicked:
// 1. Fade the content out
// 2. Display the form
// 3. Move focus to the first field
// 4. Prevent the link being followed
function contactSendBegin() {
	$('#sendingMessage').fadeIn().delay(1000).fadeOut();
	$("#formContact").fadeOut();
}

function contactSendSuccess() {
	// Form submitted successfully:
	// 1. Display the success message
	// 2. Clear the form fields
	// 3. Fade the content back in

	$('#successMessage').fadeIn().delay(messageDelay).fadeOut();
	$('#senderName').val("");
	$('#senderEmail').val("");
	$('#message').val("");

	$('#contact').delay(messageDelay + 1000).fadeTo('slow', 1);
}

function contactSendComplete() {
	$('#sendingMessage').fadeOut();
}

function contactSendFailure() {
	// Form submission failed: Display the failure message,
	// then redisplay the form
	$('#failureMessage').delay(1200).fadeIn().delay(messageDelay).fadeOut();
	$('#contactForm').delay(messageDelay + 1400).fadeIn();
}

function loader() {
	var cl = new CanvasLoader('canvasloader-container');
	cl.setColor('#D94D4A'); // default is '#000000'
	cl.setShape('spiral'); // default is 'oval'
	cl.setDiameter(30); // default is 40
	cl.setDensity(11); // default is 40
	cl.setRange(1.1); // default is 1.3
	cl.setSpeed(1); // default is 2
	cl.setFPS(14); // default is 24
	cl.show(); // Hidden by default
}

function submitForm() {
	var contactForm = $('#formContact');

	if (!$('#Name').val() || !$('#EmailAddress').val() || !$('#Message').val()) {

		// No; display a warning message and return to the form
		$('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
		contactForm.fadeOut().delay(messageDelay).fadeIn();

	} else {

		// Yes; submit the form to the PHP script via Ajax

		$('#sendingMessage').fadeIn().delay(1000).fadeOut();
		contactForm.fadeOut();

		var _tokenForm = $(this).parents().find("#__AjaxAntiForgeryForm");

		// Current Form we are using
		var _currentForm = $(this).closest('form');

		// Element to update passed in from AjaxOptions
		var _updateElement = $(_currentForm).attr("data-ajax-update");

		// Serialize the array
		var arr = $(_currentForm).serializeArray();

		//Merge TokenForm with the CurrentForm
		$.merge(arr, $(_tokenForm).serializeArray());

		// The AJAX Form Post stuff
		$.ajax({
			type: "POST",
			url: $(_currentForm).attr('action'),
			data: arr,
			success: function (data) {
				$(_updateElement).html(data);
			}
		});
	}
	return false;
}

$(document).ready(function () {
	// Animations
	$('header h1, header h2, header h3, nav#nav ul li a').addClass('start');

	// Twitter plugin
	$('#twitter').relatedTweets({
		debug: true
	   , from_users: 'boltojam'
	   , status: 1
	   , realtime: 0
	   , enter_time: 800
	   , exit_time: 600
	   , n: 10
	   , show_avatar: 1
	   , show_author: 0
	});

	navLoadComplete();
});



/*
	// Loader
	var loader = function () {
		var cl = new CanvasLoader('canvasloader-container');
		cl.setColor('#D94D4A'); // default is '#000000'
		cl.setShape('spiral'); // default is 'oval'
		cl.setDiameter(30); // default is 40
		cl.setDensity(11); // default is 40
		cl.setRange(1.1); // default is 1.3
		cl.setSpeed(1); // default is 2
		cl.setFPS(14); // default is 24
		cl.show(); // Hidden by default
	}

	// Load Ajax Content 
	var hash = window.location.hash.substr(1);
	var href = $('#nav li a').each(function () {
		var href = $(this).attr('href');
		if (hash == href.substr(0, href.length - 5)) {
			var toLoad = hash + '.html #content';
			$('#content').load(toLoad)
		}
	});

	$('#nav li a').click(function () {

		var toLoad = $(this).attr('href') + ' #content';
		$('#content').slideUp('slow', loadContent);
		$('#canvasloader-container').remove();
		$('#wrapper').append('<div id="canvasloader-container"></div>');
		loader();
		$('#canvasloader-container').fadeIn('slow');
		window.location.hash = $(this).attr('href').substr(0, $(this).attr('href').length - 5);
		function loadContent() {
			$('#content').load(toLoad, '', showNewContent())
		}
		function hideLoader() {
			$('#canvasloader-container').fadeOut('slow');
		}
		function showNewContent() {
			$('#content').slideDown('slow', 'swing', hideLoader());
		}
		return false;
	});
	
	// Menú   	
	$('#nav li a').click(function () {
		$('#nav li a').removeClass('active');
	});
	$('#nav li a').click(function () {
		$(this).addClass('active');
	});

	refresh();

		// Complete Load ajax
	$(document).ajaxComplete(function () {
		refresh();

		// scroll years
		$("#scroll").mCustomScrollbar({
			scrollInertia: 600,
			autoHideScrollbar: false,
			autoDraggerLength: false,
			scrollButtons: { enable: true },
			callbacks: {
				whileScrolling: function () { WhileScrolling(); }
			}
		});

		function WhileScrolling() {
			$("ul.box-years li a.current").removeClass("current");
			if (mcs.top >= -780) {
				$("#y1").addClass("current");
			}
			else if (mcs.top >= -1580) {
				$("#y2").addClass("current");
			}
			else if (mcs.top >= -2380) {
				$("#y3").addClass("current");
			}
			else if (mcs.top >= -3180) {
				$("#y4").addClass("current");
			}
			else if (mcs.top >= -3980) {
				$("#y5").addClass("current");
			}
		}

		$("ul.box-years a[rel~='year1_scrollTo']").click(function (e) {
			e.preventDefault();
			$("#scroll").mCustomScrollbar("scrollTo", "#year1");
		});
		$("ul.box-years a[rel~='year2_scrollTo']").click(function (e) {
			e.preventDefault();
			$("#scroll").mCustomScrollbar("scrollTo", "#year2");
		});
		$("ul.box-years a[rel~='year3_scrollTo']").click(function (e) {
			e.preventDefault();
			$("#scroll").mCustomScrollbar("scrollTo", "#year3");
		});
		$("ul.box-years a[rel~='year4_scrollTo']").click(function (e) {
			e.preventDefault();
			$("#scroll").mCustomScrollbar("scrollTo", "#year4");
		});
		$("ul.box-years a[rel~='year5_scrollTo']").click(function (e) {
			e.preventDefault();
			$("#scroll").mCustomScrollbar("scrollTo", "#year5");
		});

		// progress bar - skills

		$('.my-progress-bar').simpleProgressBar();

		// portfolio responsive

		var $container = $('#porfolio-container');

		$container.imagesLoaded(function () {
			$container.masonry({
				itemSelector: '.box',
				isAnimated: true,
				isFitWidth: true
			});
		});

		// lightbox

		$("a[rel^='prettyPhoto']").prettyPhoto({
			social_tools: false,
			theme: 'light_rounded',
			horizontal_padding: 0
		});

		// map

		var $map = $('#map');

		if ($map.length) {

			$map.gMap({
				scrollwheel: true,
				zoom: 15,
				markers: [
					{
						latitude: 33.151292,
						longitude: -96.691737,
						html: "<h3>James Bolton</h3>4909 Sugar Valley Rd<br/>McKinney, TX 75070",
						popup: false,
						icon: {
							image: "/Content/Images/gmap_pin.png",
							iconsize: [26, 46],
							iconanchor: [12, 46]
						}
					}
				]
			});

		}

		// contact form

		var messageDelay = 3500;  // How long to display status messages (in milliseconds)

		// Init the form once the document is ready
		$(init);

		// Initialize the form	
		function init() {

			// Hide the form initially.
			// Make submitForm() the form's submit handler.	  
			$('#contactForm').hide().submit(submitForm)

			// When the "Send us an email" link is clicked:
			// 1. Fade the content out
			// 2. Display the form
			// 3. Move focus to the first field
			// 4. Prevent the link being followed

			$('a[href="#contactForm"]').click(function () {
				$('.send h3 a').addClass('active');
				$('#contact').fadeTo('slow', 1);
				$('#contactForm').fadeIn('slow', function () {
					$('#senderName').focus();
				})

				return false;
			});


			// When the "Escape" key is pressed, close the form
			$('#contactForm').keydown(function (event) {
				if (event.which == 27) {
					$('#contactForm').fadeOut();
					$('#contact').fadeTo('slow', 1);
				}
			});

		}


		// Submit the form via Ajax

		function submitForm() {
			var contactForm = $(this);

			// Are all the fields filled in?

			if (!$('#senderName').val() || !$('#senderEmail').val() || !$('#message').val()) {

				// No; display a warning message and return to the form
				$('#incompleteMessage').fadeIn().delay(messageDelay).fadeOut();
				contactForm.fadeOut().delay(messageDelay).fadeIn();

			} else {

				// Yes; submit the form to the PHP script via Ajax

				$('#sendingMessage').fadeIn().delay(1000).fadeOut();
				contactForm.fadeOut();

				$.ajax({
					url: contactForm.attr('action') + "?ajax=true",
					type: contactForm.attr('method'),
					data: contactForm.serialize(),
					success: submitFinished
				});
			}

			// Prevent the default form submission occurring
			return false;
		}


		// Handle the Ajax response

		function submitFinished(response) {
			response = $.trim(response);
			$('#sendingMessage').fadeOut();

			if (response == "success") {

				// Form submitted successfully:
				// 1. Display the success message
				// 2. Clear the form fields
				// 3. Fade the content back in

				$('#successMessage').fadeIn().delay(messageDelay).fadeOut();
				$('#senderName').val("");
				$('#senderEmail').val("");
				$('#message').val("");

				$('#contact').delay(messageDelay + 1000).fadeTo('slow', 1);

			} else {

				// Form submission failed: Display the failure message,
				// then redisplay the form
				$('#failureMessage').delay(1200).fadeIn().delay(messageDelay).fadeOut();
				$('#contactForm').delay(messageDelay + 1400).fadeIn();
			}
		}


	});

*/