import $ from "jquery";
import moment from 'moment';

const ValidateSubmit = (agree = false, signup = false) => {
	var validation = true;
	$('[validationresult="true"]').remove();

	$('[validatefield="true"]').each(function () {
		$(this).css('border-color', '#dcdcdc');
		if ($(this).val() === "") {
			var message = $(this).attr("validationmessage");
			if (message !== "" && message !== null) {
				FieldError($(this), message);
			}
			validation = false;
		}

		if (signup === true) {

			var val = $(this).val();

			if ($(this).attr("type") === "email") {
				let regex = /[a-zA-Z0-9!@._-]+$/g;
				if (!val.match(regex)) {
					FieldError($(this), "Kindly enter a valid email address!");
					validation = false;
				}
			}

			if ($(this).attr("type") === "password") {
				let regex = /[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g;
				if (!val.match(regex)) {
					FieldError(
						$(this),
						"Password must have at least one uppercase, lowercase and special char e.g !@#%=*($-?."
					);
					validation = false;
				}
			}

		}

	});

	if (agree) {
		if ($("#agree").prop("checked") !== true) {
			$('[for="agree-result"]').after(
				'<small class="text-danger" validationresult="true"><br>kindly read and agree to continue.</small>'
			);

			validation = false;
		}
	}

	return validation;
};

const FieldError = (field, message) => {
	if (field.attr("validationoutput")) {
		var target = field.attr("validationoutput");
		field.css("border-color", "red");
		$(target).html(
			'<small class="text-danger" validationresult="true">' +
			message +
			"</small>"
		);
	} else {
		field.siblings('[validationresult="true"]').remove();
		field
			.css("border-color", "red")
			.after(
				'<small class="text-danger" validationresult="true">' +
				message +
				"</small>"
			);
	}
};

export function formatCurrency(amount, format = "ng-NG", field = null) {
	var $nF = new Intl.NumberFormat(format, {}).format(amount);
	if ($nF.indexOf(".") === -1) {
		$nF = $nF + ".00";
	}
	if (field !== null) {
		field.val($nF);
	}
	return $nF;
}

export function getCookie(cname) {
	let name = cname + "=";
	let decodedCookie = decodeURIComponent(document.cookie);
	let ca = decodedCookie.split(";");
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) === " ") {
			c = c.substring(1);
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length);
		}
	}
	return null;
}

export function deleteCookie(name, domain) {
	if (getCookie(name)) {
		setCookie(name, '', 0, domain)
	}
}

export function setCookie(cname, cvalue, exdays, domain) {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie =
		cname + "=" + cvalue + ";" + expires + ";path=/;domain=" + domain;
}

export function dateFormat(date) {

	var activity_date = moment(date).format('dddd DD, MMM h:mm a');

	var today = moment();
	var action_date = moment(date);

	var diff_days = today.diff(action_date, 'days');

	if (diff_days > 365) {
		activity_date = today.diff(action_date, 'years') + ' years ago';
	} else if (diff_days > 30) {
		activity_date = today.diff(action_date, 'months') + ' months ago';
	} else if (diff_days > 7) {
		activity_date = today.diff(action_date, 'weeks') + ' weeks ago';
	} else if (diff_days > 1) {
		activity_date = diff_days + ' days ago';
	}

	return activity_date;
}

export function getData(url) {

	return $.ajax({
		type: "GET",
		url: url,
		contentType: false,
		cache: false,
		processData: false,
		success: function (resp) {
			return resp;
		},
		error: function (error) {
			console.error(error);
			return error;
		}
	});
}


export function randomString(length) {
	const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
	return result;
}

export default ValidateSubmit;