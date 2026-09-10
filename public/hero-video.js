(() => {
  const heroMedia = document.querySelector('.hero-media');
  if (!heroMedia) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let video = null;

  const removeVideo = () => {
    if (!video) return;
    video.pause();
    video.remove();
    video = null;
  };

  const mountVideo = () => {
    if (reducedMotion.matches || video) return;

    const node = document.createElement('video');
    node.className = 'hero-video';
    node.muted = true;
    node.defaultMuted = true;
    node.loop = true;
    node.playsInline = true;
    node.preload = 'auto';
    node.poster = '/media/deck97-hero-video-poster.webp';
    node.setAttribute('aria-hidden', 'true');
    node.setAttribute('tabindex', '-1');
    node.setAttribute('disablepictureinpicture', '');

    const source = document.createElement('source');
    source.src = '/media/deck97-hero-loop.mp4';
    source.type = 'video/mp4';
    node.appendChild(source);

    node.addEventListener('playing', () => node.classList.add('is-playing'), { once: true });
    node.addEventListener('error', removeVideo, { once: true });

    video = node;
    heroMedia.appendChild(node);
    node.play().catch(removeVideo);
  };

  const syncMotion = () => {
    if (reducedMotion.matches) removeVideo();
    else mountVideo();
  };

  syncMotion();
  reducedMotion.addEventListener?.('change', syncMotion);

  document.addEventListener('visibilitychange', () => {
    if (!video) return;
    if (document.hidden) video.pause();
    else if (!reducedMotion.matches) video.play().catch(() => {});
  });
})();
