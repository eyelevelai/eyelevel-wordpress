var isSubmitting = false;

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

function loadContent() {
  var fcc = document.getElementById('formContent');
  var gcc = document.getElementById('gatedContent');
  gcc.classList.remove('hidden-container');
  fcc.classList.add('hidden-container');

}

function getFormData(id) {
  var elements = document.getElementById(id) ? document.getElementById(id).elements : [];
  var obj = {};
  var foundMissing = false;
  var foundError = false;
  for(var i = 0 ; i < elements.length ; i++){
    var item = elements.item(i);
    var name = item.name;
    if (item.type === 'checkbox') {
      obj[name] = item.checked;
    } else if (item.name !== 'submit') {
      obj[name] = item.value;
      var label = document.getElementById(item.name+'Label');
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
            if (name === 'given_name' || name === 'family_name' || name === 'company') {
              document.getElementById(id + "Status").innerHTML = 'Please enter a ' + label.innerHTML + ' between 3 and ' + item.maxLength + ' characters long';
            } else if (name === 'email') {
              document.getElementById(id + "Status").innerHTML = 'Please enter a valid email address';
            }
          }
        }
        if (isValid && (name === 'given_name' || name === 'family_name')) {
          isValid = validateName(item.value);
          if (!isValid) {
            label.style.color = "red";
            if (!foundError) {
              foundError = true;
              document.getElementById(id + "Status").innerHTML = 'Please enter a valid ' + label.innerHTML + ' using characters, spaces, periods, and hyphens';
            }
          }
        } else if (isValid && (name === 'email')) {
          isValid = validateEmail(item.value);
          if (!isValid) {
            label.style.color = "red";
            if (!foundError) {
              foundError = true;
              document.getElementById(id + "Status").innerHTML = 'Please enter a valid email address';
            }
          }
        }
        if (!foundError) {
          document.getElementById(id + "Status").innerHTML = "&nbsp;";
        }
      }
    }
  }
  if (foundError || foundMissing) {
    return;
  }
  return obj;
}

function sendViewData(data) {
  data.stopPropagation();
  data.preventDefault();
  if (isSubmitting) {
    return;
  }
  var prefix = data.target.id.replace('Submit', '');
  var formData = getFormData(prefix);
  if (formData) {
    var errMsg = document.getElementById(prefix + "Status");

    isSubmitting = true;
    formData.path = window.location.pathname;
    var XHR = new XMLHttpRequest();
    errMsg.innerHTML = "Submitting...";
    errMsg.style.color = 'red';
    XHR.addEventListener('load', function(event) {
      isSubmitting = false;
      var errMsg = document.getElementById(prefix + "Status");
      errMsg.style.color = 'red';
      if (event && event.target && event.target.status && event.target.response) {
        errMsg.innerHTML = event.target.response;
        if (event.target.status == 200) {
          errMsg.innerHTML = "&nbsp;";
          var pixel = document.createElement('img');
          pixel.setAttribute('src', 'https://px.ads.linkedin.com/collect/?pid=2193252&conversionId=2435668&fmt=gif');
          pixel.setAttribute('height', '1');
          pixel.setAttribute('width', '1');
          document.body.appendChild(pixel);
          if(typeof dataLayer != 'undefined'){ dataLayer.push({ event: 'viewFormSubmit' }); }
          loadContent();
        }
      } else {
        console.log(event.target);
        errMsg.innerHTML = 'Oops! Something went wrong. You can email us at&nbsp;<a href="mailto:info@eyelevel.ai">info@eyelevel.ai</a>.';
      }
    });

    XHR.addEventListener('error', function(event) {
      isSubmitting = false;
      var errMsg = document.getElementById(prefix + "Status");
      errMsg.style.color = 'red';
      if (event && event.target && event.target.status && event.target.response) {
        errMsg.innerHTML = event.target.response;
      } else {
        console.log(event.target);
        errMsg.innerHTML = 'Oops! Something went wrong. You can email us at&nbsp;<a href="mailto:info@eyelevel.ai">info@eyelevel.ai</a>.';
      }
    });

    XHR.open('POST', 'https://api.eyelevel.ai/register/new');
    XHR.setRequestHeader('Content-Type', 'application/json');
    XHR.send(JSON.stringify(formData));
  }
}

window.onload = function() {
  var viewSubmit = document.getElementById("viewForm");
  if (viewSubmit) {
    viewSubmit.addEventListener("submit", sendViewData);
  }
}
