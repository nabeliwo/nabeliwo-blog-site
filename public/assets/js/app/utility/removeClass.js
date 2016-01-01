export default (el, removedClass) => {
  const classArr = el.className.trim().split(' ');
  const adjustedArr = classArr.filter(className => className !== removedClass);
  const finalClassName = adjustedArr.join(' ');

  el.className = finalClassName;
}
