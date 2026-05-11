/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-research variant.
 * Base block: cards
 * Source: https://www.accenture.com/ch-en
 * Selector: .tilegridv2 .rad-card-grid
 * Generated: 2026-05-11
 *
 * Extracts a grid of content cards, each with:
 *   - Full-bleed image (from dynamicmedia.accenture.com)
 *   - Category label (Case Study, Research Report, Perspective)
 *   - Title
 *   - Description text
 *   - CTA link ("Expand")
 *
 * Target structure: 2-column cards table (image | text content per row)
 */
export default function parse(element, { document }) {
  // Select all card elements within the grid container
  const cards = element.querySelectorAll('.rad-content-grid-card');

  const cells = [];

  cards.forEach((card) => {
    // --- Column 1: Image ---
    // Cards may have full-image or half-image depending on variant
    const img = card.querySelector('.rad-content-grid-card__full-image img.cmp-image__image')
      || card.querySelector('.rad-content-grid-card__half-image img.cmp-image__image')
      || card.querySelector('img.cmp-image__image');

    // --- Column 2: Text content ---
    const textContent = [];

    // Category label (e.g. "Case Study", "Research Report", "Perspective")
    const label = card.querySelector('.rad-content-grid-card__label');
    if (label) {
      const labelText = label.textContent.trim();
      if (labelText) {
        const em = document.createElement('em');
        em.textContent = labelText;
        textContent.push(em);
      }
    }

    // Title - render as a heading (h3)
    const title = card.querySelector('.rad-content-grid-card__title');
    if (title) {
      const titleText = title.textContent.trim();
      if (titleText) {
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        textContent.push(h3);
      }
    }

    // Description text
    const descriptionEl = card.querySelector('.rad-content-grid-card__content p');
    if (descriptionEl) {
      const descText = descriptionEl.textContent.trim();
      if (descText) {
        const p = document.createElement('p');
        p.textContent = descText;
        textContent.push(p);
      }
    }

    // CTA link - extract from back-content area
    const ctaLink = card.querySelector('.rad-content-grid-card__back-content a.rad-button');
    if (ctaLink) {
      const href = ctaLink.getAttribute('href') || '';
      const ctaTextEl = ctaLink.querySelector('.rad-button__text');
      const ctaText = ctaTextEl ? ctaTextEl.textContent.trim() : ctaLink.textContent.trim();
      if (href && ctaText) {
        const a = document.createElement('a');
        a.href = href;
        a.textContent = ctaText;
        const p = document.createElement('p');
        p.appendChild(a);
        textContent.push(p);
      }
    }

    // Only add row if we have meaningful content
    if (img || textContent.length > 0) {
      const imageCell = img ? [img] : [];
      cells.push([imageCell, textContent]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-research', cells });
  element.replaceWith(block);
}
