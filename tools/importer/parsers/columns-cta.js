/* eslint-disable */
/* global WebImporter */

/**
 * Parser for columns-cta variant.
 * Base block: columns
 * Source: https://www.accenture.com/ch-en
 * Selector: .mixedmediatextblock .rad-mixed-media-and-text
 * Generated: 2026-05-11
 *
 * Careers CTA section: split layout with image (left) and
 * eyebrow + heading + description + CTA link (right).
 */
export default function parse(element, { document }) {
  // --- Column 1: Image ---
  const image = element.querySelector(
    '.rad-mixed-media-and-text__primary-image, '
    + '.rad-mixed-media-and-text__media img'
  );

  // --- Column 2: Text content ---
  const eyebrow = element.querySelector(
    '.rad-mixed-media-and-text__label'
  );
  const heading = element.querySelector(
    'h3.rad-mixed-media-and-text__title, '
    + 'h2.rad-mixed-media-and-text__title, '
    + '[class*="mixed-media-and-text__title"]'
  );
  const description = element.querySelector(
    'p.rad-mixed-media-and-text__description, '
    + '[class*="mixed-media-and-text__description"]'
  );
  const ctaLink = element.querySelector(
    'a.rad-button--tertiary, '
    + 'a.rad-button'
  );

  // Build column 1 cell (image)
  const col1 = [];
  if (image) {
    col1.push(image);
  }

  // Build column 2 cell (text content)
  const col2 = [];
  if (eyebrow) {
    col2.push(eyebrow);
  }
  if (heading) {
    col2.push(heading);
  }
  if (description) {
    col2.push(description);
  }
  if (ctaLink) {
    // Create a clean link preserving href and text
    const link = document.createElement('a');
    link.href = ctaLink.getAttribute('href');
    link.textContent = ctaLink.textContent.trim();
    col2.push(link);
  }

  // Cells: one row with two columns (image | text content)
  const cells = [
    [col1, col2],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
