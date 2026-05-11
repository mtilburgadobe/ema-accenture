/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-insights
 * Base block: hero
 * Source: https://www.accenture.com/ch-en/insights
 * Selector: .rad-homepage-hero
 * Generated: 2026-05-11
 *
 * Extracts a minimal hero banner with background image, H1 heading,
 * and descriptive paragraph from the Accenture insights hub page.
 */
export default function parse(element, { document }) {
  // Extract background image from .rad-homepage-hero__background
  const bgImage = element.querySelector('.rad-homepage-hero__background .cmp-image__image, .rad-homepage-hero__background img');

  // Extract H1 heading from .rad-homepage-hero__headline
  const heading = element.querySelector('.rad-homepage-hero__headline, h1');

  // Extract description paragraph from .rad-homepage-hero__content-copy
  const description = element.querySelector('.rad-homepage-hero__content-copy p, .rad-homepage-hero__content-copy');

  // Build cells array matching target structure:
  // Row 1: background image
  // Row 2: heading + description text
  const cells = [];

  // Row 1: Background image (optional - only add if present)
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Row 2: Heading and description combined in one cell
  const contentCell = [];
  if (heading) {
    contentCell.push(heading);
  }
  if (description) {
    contentCell.push(description);
  }
  if (contentCell.length > 0) {
    cells.push(contentCell);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-insights', cells });
  element.replaceWith(block);
}
