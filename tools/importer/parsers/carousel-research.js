/* eslint-disable */
/* global WebImporter */

/**
 * Parser for carousel-research
 * Base block: carousel
 * Source: https://www.accenture.com/ch-en/insights
 * Selector: .tilecardcarouselv2 .rad-grid-card-carousel
 * Generated: 2026-05-11
 *
 * Produces a 2-column carousel table:
 *   Row per card: Column 1 = image | Column 2 = category (em) + title (h3) + description (p) + CTA link
 *
 * The "See all" link from .rad-grid-card-carousel__view-all-button-wrapper is extracted
 * and inserted BEFORE the block table as default content.
 */
export default function parse(element, { document }) {
  // Extract the "See all" link and place it before the block as default content
  const viewAllWrapper = element.querySelector('.rad-grid-card-carousel__view-all-button-wrapper');
  let viewAllLink = null;
  if (viewAllWrapper) {
    const linkEl = viewAllWrapper.querySelector('a');
    if (linkEl) {
      viewAllLink = document.createElement('p');
      const a = document.createElement('a');
      a.href = linkEl.href;
      a.textContent = linkEl.textContent.trim() || 'See all';
      viewAllLink.appendChild(a);
    }
  }

  // Extract all card wrappers
  const cardWrappers = element.querySelectorAll('.rad-grid-card-carousel__card-wrapper');

  const cells = [];

  cardWrappers.forEach((cardWrapper) => {
    const card = cardWrapper.querySelector('.rad-content-grid-card, [class*="rad-content-grid-card"]');
    if (!card) return;

    // Column 1: Image
    // Cards may have full-image or half-image variants
    const imgEl = card.querySelector('.rad-content-grid-card__full-image img, .rad-content-grid-card__half-image img');
    const imageCell = [];
    if (imgEl) {
      const img = document.createElement('img');
      img.src = imgEl.src;
      img.alt = imgEl.alt || '';
      imageCell.push(img);
    }

    // Column 2: Content (category label + title + description + CTA)
    const contentCell = [];

    // Category label as italic/em text
    const labelEl = card.querySelector('.rad-content-grid-card__label');
    if (labelEl) {
      const labelText = labelEl.textContent.trim();
      if (labelText) {
        const em = document.createElement('em');
        em.textContent = labelText;
        const labelP = document.createElement('p');
        labelP.appendChild(em);
        contentCell.push(labelP);
      }
    }

    // Title as h3
    const titleEl = card.querySelector('.rad-content-grid-card__title');
    if (titleEl) {
      const titleText = titleEl.textContent.trim();
      if (titleText) {
        const h3 = document.createElement('h3');
        h3.textContent = titleText;
        contentCell.push(h3);
      }
    }

    // Description paragraph
    const descEl = card.querySelector('.rad-content-grid-card__content p');
    if (descEl) {
      const p = document.createElement('p');
      p.textContent = descEl.textContent.trim();
      contentCell.push(p);
    }

    // CTA link - prefer the ghost button, fallback to cta-cover link
    const ctaEl = card.querySelector('a.rad-button--ghost');
    const ctaCoverEl = card.querySelector('a.rad-content-grid-card__cta-cover');
    const ctaHref = ctaEl ? ctaEl.href : (ctaCoverEl ? ctaCoverEl.href : null);
    const ctaText = ctaEl ? (ctaEl.querySelector('.rad-button__text')?.textContent?.trim() || ctaEl.textContent.trim()) : 'Read more';

    if (ctaHref) {
      const ctaP = document.createElement('p');
      const a = document.createElement('a');
      a.href = ctaHref;
      a.textContent = ctaText;
      ctaP.appendChild(a);
      contentCell.push(ctaP);
    }

    // Only add the row if we have at least some content
    if (imageCell.length > 0 || contentCell.length > 0) {
      cells.push([imageCell, contentCell]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-research', cells });

  // Insert the "See all" link before the block as default content
  if (viewAllLink) {
    block.parentElement?.insertBefore(viewAllLink, block);
    // If block has no parent yet, create a wrapper
    if (!block.parentElement) {
      const wrapper = document.createElement('div');
      wrapper.appendChild(viewAllLink);
      wrapper.appendChild(block);
      element.replaceWith(wrapper);
      return;
    }
  }

  element.replaceWith(block);
}
