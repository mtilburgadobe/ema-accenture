/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-video
 * Base block: hero
 * Source: https://www.accenture.com/ch-en
 * Selector: #reinvent-hero .hero_custom
 * Generated: 2026-05-11
 *
 * Target structure (from block library):
 *   Row 1: Background asset (video/image)
 *   Row 2: Heading + subheading + description + CTA link
 */
export default function parse(element, { document }) {
  // --- Extract background video ---
  // Source: <video class="hero_custom__background"><source src="...mp4">
  const video = element.querySelector('video.hero_custom__background, video');
  let backgroundCell = null;
  if (video) {
    const sourceEl = video.querySelector('source[src]');
    const videoSrc = sourceEl ? sourceEl.getAttribute('src') : video.getAttribute('src');
    if (videoSrc) {
      // Create an anchor linking to the video so the importer can resolve it as an asset
      const videoLink = document.createElement('a');
      videoLink.href = videoSrc;
      videoLink.textContent = videoSrc;
      backgroundCell = [videoLink];
    }
  }

  // --- Extract heading (H1) ---
  // Source: <div id="hero_headline_h1"><h1>Together We Reinvented</h1></div>
  const heading = element.querySelector('#hero_headline_h1 h1, h1, [class*="headline"] h1');

  // --- Extract subheading (H2) ---
  // Source: <div class="hero_custom__body__hero_text"><h2>Shaping tomorrow, today</h2>
  const subheading = element.querySelector('.hero_custom__body__hero_text h2, h2');

  // --- Extract description paragraph ---
  // Source: <p class="hero_custom__body__hero_text__title">In a world of constant change...</p>
  const description = element.querySelector(
    'p.hero_custom__body__hero_text__title, .hero_custom__body__hero_text p:not(:empty)',
  );

  // --- Extract CTA link ---
  // The entire hero content is wrapped in <a class="hero_custom__cta_1" href="...">
  // CTA text is in <span class="cta_span">See what we do</span>
  const ctaWrapper = element.querySelector('a.hero_custom__cta_1');
  const ctaTextEl = element.querySelector('.hero_cta_2 .cta_span, .cta_span');
  let ctaLink = null;
  if (ctaWrapper) {
    const href = ctaWrapper.getAttribute('href');
    const ctaText = ctaTextEl ? ctaTextEl.textContent.trim() : 'Learn more';
    ctaLink = document.createElement('a');
    ctaLink.href = href;
    ctaLink.textContent = ctaText;
  }

  // --- Build cells array matching block library structure ---
  // Row 1: Background asset (video link)
  // Row 2: Heading + subheading + description + CTA
  const cells = [];

  // Row 1: background video (optional per library spec)
  if (backgroundCell) {
    cells.push(backgroundCell);
  }

  // Row 2: single cell with heading, subheading, description, CTA
  // Wrap all content in a div so it stays in one cell (1-column layout)
  const contentDiv = document.createElement('div');
  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = heading.textContent.trim();
    contentDiv.appendChild(h1);
  }
  if (subheading) {
    const h2 = document.createElement('h2');
    h2.textContent = subheading.textContent.trim();
    contentDiv.appendChild(h2);
  }
  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    contentDiv.appendChild(p);
  }
  if (ctaLink) {
    const p = document.createElement('p');
    p.appendChild(ctaLink);
    contentDiv.appendChild(p);
  }

  if (contentDiv.childNodes.length > 0) {
    cells.push([contentDiv]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-video', cells });
  element.replaceWith(block);
}
