/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-awards variant.
 * Base block: cards (no images variant)
 * Source: https://www.accenture.com/ch-en
 * Selector: .floatingcardblock .rad-awards
 * Generated: 2026-05-11
 *
 * Extracts award cards from .rad-awards section.
 * The section heading (.rad-awards__headline) is placed as default content
 * before the cards block table. Each card has a title (h3), description
 * paragraphs, and a CTA link.
 */
export default function parse(element, { document }) {
  // Extract the section heading as default content (placed before the block)
  const sectionHeading = element.querySelector('.rad-awards__headline, .rad-awards__stage h2');

  // Find all award cards
  const cards = element.querySelectorAll('.rad-awards-card, .cmp-floating-awards-card > div[class*="rad-awards-card"]');

  const cells = [];

  cards.forEach((card) => {
    // Extract title from h3
    const title = card.querySelector('h3.rad-awards-card__title, .rad-awards-card__cover h3');

    // Extract description paragraphs from the detail section
    const descriptionContainer = card.querySelector('.rad-awards-card__rte, .rad-awards-card__description');
    const paragraphs = descriptionContainer
      ? Array.from(descriptionContainer.querySelectorAll('p'))
      : [];

    // Extract CTA link
    const ctaLink = card.querySelector('a.rad-button, a.rad-button--ghost, .rad-awards-card__detail a');

    // Build the card cell content: title + description + CTA
    const cardContent = [];

    if (title) {
      // Create a clean h3 for the card title
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      cardContent.push(h3);
    }

    paragraphs.forEach((p) => {
      const para = document.createElement('p');
      para.innerHTML = p.innerHTML;
      cardContent.push(para);
    });

    if (ctaLink) {
      // Create a clean link preserving href and text
      const link = document.createElement('a');
      link.href = ctaLink.href;
      const buttonText = ctaLink.querySelector('.rad-button__text');
      link.textContent = buttonText ? buttonText.textContent.trim() : ctaLink.textContent.trim();
      cardContent.push(link);
    }

    // Each card is a single-column row (no image column)
    // Wrap in array: outer = row, inner = single cell with all content
    if (cardContent.length > 0) {
      cells.push([cardContent]);
    }
  });

  // Create the block table
  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-awards', cells });

  // Place the heading as default content before the block
  if (sectionHeading) {
    const heading = document.createElement('h2');
    heading.textContent = sectionHeading.textContent.trim();
    element.replaceWith(heading, block);
  } else {
    element.replaceWith(block);
  }
}
