import './style.css' ;
import './input-elements.css' ;
import {secretButton , secretParagraph} from './dom-loader'

var showSecret = false;



 ready(function() {
	secretButton.addEventListener('click', toggleSecretState);
updateSecretParagraph();
var alertMe= 'Hello world webpack is running'
alert(alertMe)
})

function toggleSecretState() {
    showSecret = !showSecret;
    updateSecretParagraph();
    updateSecretButton()
}

function updateSecretButton() {
    if (showSecret) {
        secretButton.textContent = 'Hide the Secret';
    } else {
        secretButton.textContent = 'Show the Secret';
    }
}

function updateSecretParagraph() {
    if (showSecret) {
        secretParagraph.style.display = 'block';
    } else {
        secretParagraph.style.display = 'none';
    }
}
function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
