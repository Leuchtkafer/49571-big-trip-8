const renderHtmlString = (parentNode, htmlString) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, `text/html`);
  const fragment = document.createDocumentFragment();
  html.body.childNodes.forEach((node) => {
    fragment.appendChild(node);
  });
  parentNode.appendChild(fragment);
};

const createElement = (template) => {
  const parentNode = document.createElement(`div`);
  renderHtmlString(parentNode, template);

  return parentNode.firstChild;
};

const getRandom = () => Math.floor(Math.random() * 10);

export {createElement, getRandom, renderHtmlString};
