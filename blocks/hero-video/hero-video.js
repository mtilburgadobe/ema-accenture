export default function decorate(block) {
  const rows = [...block.children];
  const videoRow = rows[0];
  const contentRow = rows[1];

  const videoLink = videoRow?.querySelector('a');
  const videoSrc = videoLink?.getAttribute('href');

  block.textContent = '';

  if (videoSrc && videoSrc.endsWith('.mp4')) {
    const video = document.createElement('video');
    video.classList.add('hero-video-bg');
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('loop', '');
    video.setAttribute('playsinline', '');
    video.muted = true;

    const source = document.createElement('source');
    source.setAttribute('src', videoSrc);
    source.setAttribute('type', 'video/mp4');
    video.append(source);
    block.append(video);
  }

  if (contentRow) {
    const content = contentRow.querySelector(':scope > div');
    if (content) {
      content.classList.add('hero-video-content');
      block.append(content);
    }
  }
}
