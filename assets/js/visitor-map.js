// Scale the map and its location dots together when the available width changes.
document.querySelectorAll('.visitor-map-widget').forEach((widget) => {
  const resizeMap = () => {
    widget.style.setProperty('--visitor-map-scale', widget.clientWidth / 500);
  };
  resizeMap();
  if ('ResizeObserver' in window) {
    new ResizeObserver(resizeMap).observe(widget);
  } else {
    window.addEventListener('resize', resizeMap);
  }
});
