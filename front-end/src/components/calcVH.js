// https://stackoverflow.com/questions/39384154/calculating-viewport-height-on-chrome-android-with-css
export const setVh = (ref, offset = 0) => {
  const vH = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  ref.setAttribute('style', `height:${vH - offset}px;`);
};

export const setContentVh = (ref) => {
  setVh(ref, 56);
};
