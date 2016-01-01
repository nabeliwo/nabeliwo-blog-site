export default (el, addedClass) => {
  const className = el.className.trim();

  if (className.indexOf(addedClass) === -1) {
    el.className += ' ' + addedClass;
  }
}
