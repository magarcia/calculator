export default selector =>
  selector.charAt(0) === "#"
    ? document.getElementById(selector.substring(1, selector.length))
    : document.querySelectorAll(selector);
