export default function decorate(block) {
  const rows = [...block.children];
  const imageRow = rows[0];
  const contentRow = rows[1];

  block.textContent = '';

  const picture = imageRow?.querySelector('picture');
  if (picture) {
    picture.classList.add('hero-insights-bg');
    block.append(picture);
  }

  if (contentRow) {
    const content = document.createElement('div');
    content.classList.add('hero-insights-content');
    [...contentRow.querySelectorAll('h1, h2, h3, h4, h5, h6, p')].forEach((el) => {
      content.append(el);
    });
    if (content.children.length === 0) {
      [...contentRow.querySelectorAll(':scope > div')].forEach((div) => {
        [...div.childNodes].forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            const p = document.createElement('p');
            p.textContent = node.textContent.trim();
            content.append(p);
          } else if (node.nodeType === Node.ELEMENT_NODE) {
            content.append(node);
          }
        });
      });
    }
    block.append(content);
  }
}
