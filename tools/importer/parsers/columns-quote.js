/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-quote
 * Base block: columns
 * Source: https://www.accenture.com/ch-en
 * Selector: .carousel-block #carouselslide-aa3197550e
 * Generated: 2026-05-11
 *
 * Executive quote layout: portrait image on the left, large quote text
 * with attribution on the right. Source is a carousel slide used as a
 * two-column layout.
 *
 * Source HTML structure (validated):
 *   div#carouselslide-aa3197550e.rad-carousel-image-and-text
 *     div.rad-carousel-image-and-text__slide
 *       div.cmp-image > img.cmp-image__image        (portrait image)
 *       div.rad-carousel-image-and-text__slide-text
 *         h4.rad-carousel-block__title               (quote text)
 *         div.rad-carousel-block__body > p            (attribution)
 *
 * Target: Columns block with 2 columns per the block library spec.
 *   Row 1: [image] | [quote heading + attribution paragraph]
 */
export default function parse(element, { document }) {
  // --- Extract image (column 1) ---
  // Validated selector: img.cmp-image__image inside div.cmp-image
  const image = element.querySelector('.cmp-image img, img.cmp-image__image');

  // --- Extract quote heading (column 2, first element) ---
  // Validated selector: h4.rad-carousel-block__title
  const quoteHeading = element.querySelector(
    'h4.rad-carousel-block__title, .rad-carousel-block__title, h4, h3, h2',
  );

  // --- Extract attribution (column 2, second element) ---
  // Validated selector: .rad-carousel-block__body p
  const attribution = element.querySelector(
    '.rad-carousel-block__body p, .rad-carousel-block__body, .rad-carousel-image-and-text__slide-text p',
  );

  // --- Build cells array matching Columns block library structure ---
  // Columns block: each row is an array of cells (one per column).
  // This variant has 1 content row with 2 columns: [image, text content].
  const col1 = [];
  if (image) {
    col1.push(image);
  }

  const col2 = [];
  if (quoteHeading) {
    col2.push(quoteHeading);
  }
  if (attribution) {
    col2.push(attribution);
  }

  const cells = [
    [col1, col2],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-quote', cells });
  element.replaceWith(block);
}
