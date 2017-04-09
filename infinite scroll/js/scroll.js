'use strict';
window.onscroll = function () {
	if ((window.innerHeight + window.pageYOffset) >= document.body.scrollHeight) {
		ajax({
			type: 'GET',
			url: 'https://jsonplaceholder.typicode.com/users ',
			onSuccess: function (response) {

				var jsonObj = JSON.parse(response);


				console.log(jsonObj[1]);
				for (var i = 0; i < jsonObj.length; i++) {

					var parId = document.createElement('p');
					var parName = document.createElement('p');
					var parURL = document.createElement('p');
					
					

					parId.innerHTML = 'User ID' + jsonObj[i].id;
					parName.innerHTML = 'User Name' + jsonObj[i].name;
					parURL.innerHTML = 'User URL' + jsonObj[i].email;


					document.body.appendChild(parId);
					document.body.appendChild(parName);
					document.body.appendChild(parURL);

				}


			}

		});
	}
}

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