'use strict';

function ajax(ajaxOptions) {

	var options = {
		type: ajaxOptions.type || "GET",
		url: ajaxOptions.url || "",
		onSuccess: ajaxOptions.onSuccess || function () {},
		onError: ajaxOptions.onError || function () {},
		dataType: ajaxOptions.dataType || 'text'

	};



	function httpSuccess(httpRequest) {

		try {
			return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == 'undefined');
		} catch (err) {
			return false;
		}
	}


	var httpReq = new XMLHttpRequest();
	httpReq.open(options.type, options.url, true);

	httpReq.onreadystatechange = function () {

		if (httpReq.readyState == 4) {

			if (httpSuccess(httpReq) && httpReq.readyState == 4) {

				if (httpReq.readyState)

					var returnData = (options.dataType == 'xml') ? httpReq.responseXML : httpReq.responseText;

				options.onSuccess(returnData);


			} else {
				options.onError(httpReq.statusText);
			}

		}
	}



	httpReq.send();

}

ajax({
	type: 'GET',
	url: 'http://echo.jsontest.com/userId/108/userName/Akademia108/userURL/akademia108.pl',
	onSuccess: function (response) {
		console.log('hurra! Pobrałem dane' + response);
	},
	onError: function (status) {
		alert('Połączenie o statusie' + status);

	}

});