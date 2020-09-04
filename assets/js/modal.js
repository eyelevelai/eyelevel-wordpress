var activeButton = '';

var demoModal = document.querySelector("#demoModal");

function toggleDemoModal(event) {
		if (event && event.target && event.target.id && event.target.id.indexOf('demoButton') > -1) {
			activeButton = event.target.id;
			resetForm('demoButton');
		}
    demoModal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === demoModal) {
			toggleDemoModal();
    }
}

function validateLength(val, min, max) {
	if (val.length >= min && val.length <= max) {
		return true;
	}
	return false;
}

function validateName(val) {
	return /^[A-Za-z.-\s]+$/.test(val);
}

function validateEmail(val) {
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(val);
}

function resetForm(id) {
	var form = document.getElementById(id + 'Form');
	document.getElementById(id + "Status").innerHTML = '';
	document.getElementById(id + "Status").style.color = 'red';
	var elements = form ? form.elements : [];
	for(var i = 0 ; i < elements.length ; i++){
		var item = elements.item(i);
		if (item.type !== 'checkbox') {
			var label = document.getElementById(`${item.name}ModalLabel`);
			label.style.color = "#4a4a4a";
			item.value = '';
			item.innerHTML = '';
		} else {
			item.checked = false;
		}
	}
}

function getFormData(id) {
	var prefix = id.replace('Form', '');
	var elements = document.getElementById(id) ? document.getElementById(id).elements : [];
	var obj = { button: activeButton };
	var foundMissing = false;
	var foundError = false;
	for(var i = 0 ; i < elements.length ; i++){
		var item = elements.item(i);
		var name = item.name;
		if (item.name.indexOf('R') > -1) {
			name = item.name.replace('R', '');
		}
		if (item.type === 'checkbox') {
			obj[name] = item.checked;
		} else {
			obj[name] = item.value;
			var label = document.getElementById(`${item.name}ModalLabel`);
			if (!item.value.length) {
				label.style.color = "red";
				foundMissing = true;
			} else {
				label.style.color = "#4a4a4a";
				isValid = validateLength(item.value, 3, item.maxLength);
				if (!isValid) {
					label.style.color = "red";
					if (!foundError) {
						foundError = true;
						if (name === 'name' || name === 'company') {
							document.getElementById(prefix + "Status").innerHTML = `Please enter a ${label.innerHTML} between 3 and ${item.maxLength} characters long`;
						} else if (name === 'email') {
							document.getElementById(prefix + "Status").innerHTML = `Please enter a valid email address`;
						} else if (name === 'interest') {
							document.getElementById(prefix + "Status").innerHTML = `Please tell us what you're interested in learning about`;
						}
					}
				}
				if (isValid && (name === 'name')) {
					isValid = validateName(item.value);
					if (!isValid) {
						label.style.color = "red";
						if (!foundError) {
							foundError = true;
							document.getElementById(prefix + "Status").innerHTML = `Please enter a valid ${label.innerHTML} using characters, spaces, periods, and hyphens`;
						}
					}
				} else if (isValid && (name === 'email')) {
					isValid = validateEmail(item.value);
					if (!isValid) {
						label.style.color = "red";
						if (!foundError) {
							foundError = true;
							document.getElementById(prefix + "Status").innerHTML = `Please enter a valid email address`;
						}
					}
				}
				if (!foundError) {
					document.getElementById(prefix + "Status").innerHTML = '';
				}
			}
		}
	}
	if (foundError || foundMissing) {
		return;
	}
	return obj;
}

function sendEmailData(data) {
	var prefix = data.target.id;
	var email = document.getElementById(`${prefix}Input`);
	var status = document.getElementById(`${prefix}Status`);
	status.innerHTML = '';

	if (!validateLength(email.value, 3, email.maxLength)) {
		status.innerHTML = 'Please enter a valid email address';
		return;
	}
	if (!validateEmail(email.value)) {
		status.innerHTML = 'Please enter a valid email address';
		return;
	}
	
	var XHR = new XMLHttpRequest();

	XHR.addEventListener('load', function(event) {
		status.style.color = 'red';
		if (event && event.target && event.target.status && event.target.response) {
			status.innerHTML = event.target.response;
			if (event.target.status == 200) {
				status.style.color = 'green';
				if(typeof dataLayer != 'undefined'){ dataLayer.push({ event: 'emailFormSubmit' }); }
			}
		} else {
			console.log(event.target);
			status.innerHTML = `Oops! Something went wrong. You can email us at&nbsp;<a href="mailto:info@eyelevel.ai">info@eyelevel.ai</a>.`;
		}
	});

	XHR.addEventListener('error', function(event) {
		status.style.color = 'red';
		if (event && event.target && event.target.status && event.target.response) {
			status.innerHTML = event.target.response;
		} else {
			console.log(event.target);
			status.innerHTML = `Oops! Something went wrong. You can email us at&nbsp;<a href="mailto:info@eyelevel.ai">info@eyelevel.ai</a>.`;
		}
	});

	XHR.open('POST', 'https://api.eyelevel.ai/register/email');
	XHR.setRequestHeader('Content-Type', 'application/json');
	XHR.send(JSON.stringify({ email: email.value, path: window.location.pathname }));
}

function sendDemoData(data) {
	var prefix = data.target.id.replace('Submit', '');
	prefix = prefix.replace('Form', '');
	var formData = getFormData(data.target.id.replace('Submit', ''));
	if (formData) {
		formData.path = window.location.pathname;
  	var XHR = new XMLHttpRequest();

  	XHR.addEventListener('load', function(event) {
  		var errMsg = document.getElementById(prefix + "Status");
  		errMsg.style.color = 'red';
  		if (event && event.target && event.target.status && event.target.response) {
				errMsg.innerHTML = event.target.response;
				if (event.target.status == 200) {
					errMsg.style.color = 'green';
					if(typeof dataLayer != 'undefined'){ dataLayer.push({ event: 'demoFormSubmit' }); }
					setTimeout(function() {
						if(demoModal.classList.contains('show-modal')) {
							demoModal.classList.remove('show-modal');
						}
					}, 3000);
				}
			} else {
				console.log(event.target);
				errMsg.innerHTML = `Oops! Something went wrong. You can email us at&nbsp;<a href="mailto:info@eyelevel.ai">info@eyelevel.ai</a>.`;
			}
  	});

  	XHR.addEventListener('error', function(event) {
  		var errMsg = document.getElementById(prefix + "Status");
  		errMsg.style.color = 'red';
  		if (event && event.target && event.target.status && event.target.response) {
				errMsg.innerHTML = event.target.response;
			} else {
				console.log(event.target);
				errMsg.innerHTML = `Oops! Something went wrong. You can email us at&nbsp;<a href="mailto:info@eyelevel.ai">info@eyelevel.ai</a>.`;
			}
  	});

  	XHR.open('POST', 'https://api.eyelevel.ai/register/demo');
  	XHR.setRequestHeader('Content-Type', 'application/json');
  	XHR.send(JSON.stringify(formData));
	}
}

var demo1 = document.querySelector("#demoButton1");
if (demo1) {
	demo1.addEventListener("click", toggleDemoModal);
}

var demo2 = document.querySelector("#demoButton2");
if (demo2) {
	demo2.addEventListener("click", toggleDemoModal);
}

var closeDemoButton = document.querySelector("#demoModalClose");
if (closeDemoButton) {
	closeDemoButton.addEventListener("click", toggleDemoModal);
}

var demoModalSubmit = document.querySelector("#demoButtonFormSubmit");
if (demoModalSubmit) {
	demoModalSubmit.addEventListener("click", sendDemoData);
}

var emailSubmit = document.querySelector("#emailSubmit");
if (emailSubmit) {
	emailSubmit.addEventListener("click", sendEmailData);
}

window.addEventListener("click", windowOnClick);

function flipCard(event) {
	var card = document.getElementById(event.target.id.split('-')[0]);
	if(card.classList.contains('flipped')) {
		card.classList.remove('flipped');
	} else {
		card.classList.add('flipped');
		if(typeof dataLayer != 'undefined'){ dataLayer.push({ event: 'cardFlip' }); }
	}
}

var card = document.querySelector("#card_flip_1");
if (card) {
	card.addEventListener("click", flipCard);
	card = document.querySelector("#card_flip_2");
	card.addEventListener("click", flipCard);
	card = document.querySelector("#card_flip_3");
	card.addEventListener("click", flipCard);
	card = document.querySelector("#card_flip_4");
	card.addEventListener("click", flipCard);
}
