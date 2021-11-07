const addEvent = (eventType, selector, $target, callback) => {
  const children = [...$target.querySelectorAll(selector)];
  const isTarget = (target) =>
    children.includes(target) || target.closest(selector);
  $target.addEventListener(eventType, (event) => {
    if (!isTarget(event.target)) return false;
    callback(event);
  });
};

export default addEvent;
