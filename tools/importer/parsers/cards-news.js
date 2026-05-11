/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-news variant.
 * Base block: cards (no images variant - text only)
 * Source: https://www.accenture.com/ch-en
 * Selector: .rad-news .rad-news-container
 * Generated: 2026-05-11
 *
 * Extracts news cards from the Accenture news carousel section.
 * The section heading "Accenture news" (.rad-news-header) is placed as
 * default content before the cards block table.
 *
 * Each card contains:
 *   - Date eyebrow (p.rad-news-eyebrow): e.g. "April 22, 2026"
 *   - Headline title (h3.rad-news-title): news article title
 *   - Link (a.rad-news-card): href to newsroom article
 *
 * Target structure: single-column cards table (one cell per row with
 * date + linked title).
 */
export default function parse(element, { document }) {
  // Extract the section heading as default content (placed before the block)
  const sectionHeading = element.querySelector('.rad-news-header');

  // Find all news card cells within the carousel
  // Cards are inside .rad-news-carousel-cell elements within the Flickity slider
  const cardCells = element.querySelectorAll('.rad-news-carousel-cell');

  const cells = [];

  cardCells.forEach((cell) => {
    // Each cell contains an anchor (.rad-news-card) wrapping date and title
    const cardLink = cell.querySelector('a.rad-news-card');
    if (!cardLink) return;

    const href = cardLink.getAttribute('href') || '';

    // Extract date eyebrow
    const eyebrow = cardLink.querySelector('p.rad-news-eyebrow, .rad-news-eyebrow');

    // Extract headline title
    const title = cardLink.querySelector('h3.rad-news-title, .rad-news-title');

    // Build the card cell content
    const cardContent = [];

    // Add date as a paragraph
    if (eyebrow) {
      const datePara = document.createElement('p');
      datePara.textContent = eyebrow.textContent.trim();
      cardContent.push(datePara);
    }

    // Add title as a linked heading
    if (title && href) {
      const h3 = document.createElement('h3');
      const link = document.createElement('a');
      link.href = href;
      link.textContent = title.textContent.trim();
      h3.appendChild(link);
      cardContent.push(h3);
    } else if (title) {
      const h3 = document.createElement('h3');
      h3.textContent = title.textContent.trim();
      cardContent.push(h3);
    }

    // Each card is a single-column row (no image column)
    if (cardContent.length > 0) {
      cells.push([cardContent]);
    }
  });

  // Create the block table
  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-news', cells });

  // Place the heading as default content before the block
  if (sectionHeading) {
    const heading = document.createElement('h2');
    heading.textContent = sectionHeading.textContent.trim();
    element.replaceWith(heading, block);
  } else {
    element.replaceWith(block);
  }
}
