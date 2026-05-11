/* eslint-disable */
/* global WebImporter */

/**
 * Parser: carousel-casestudy
 * Base block: carousel
 * Source: https://www.accenture.com/ch-en
 * Selector: .client-carousel #carousel-719ce40a65
 * Generated: 2026-05-11
 *
 * Client case study carousel with 5 slides. Each slide has an image on
 * the left and text content (title, description, CTA) on the right.
 *
 * Source HTML structure (validated):
 *   section#carousel-719ce40a65.rad-carousel-image-and-text
 *     div.flickity-viewport > div.flickity-slider
 *       div.rad-carousel-image-and-text__slide  (repeated per slide)
 *         div.cmp-image > img.cmp-image__image            (slide image)
 *         div.rad-carousel-image-and-text__slide-text
 *           h3.rad-carousel-image-and-text__slide-title   (slide title)
 *           p.rad-carousel-image-and-text__slide-body     (description)
 *           a.rad-carousel-image-and-text__slide-cta      (Read more link)
 *
 * Target: Carousel block with 2 columns per the block library spec.
 *   Each row represents one slide: [image] | [title + description + CTA]
 */
export default function parse(element, { document }) {
  // --- Locate all slides ---
  // Validated selector: div.rad-carousel-image-and-text__slide inside flickity-slider
  // Also handle cases where flickity wrapper may not be present (fallback)
  const slides = element.querySelectorAll(
    '.flickity-slider .rad-carousel-image-and-text__slide, .rad-carousel-image-and-text__slide',
  );

  // Deduplicate: if both selectors match the same element, Set removes duplicates
  const uniqueSlides = [...new Set(slides)];

  const cells = [];

  uniqueSlides.forEach((slide) => {
    // --- Column 1: Image ---
    // Validated selector: img.cmp-image__image inside div.cmp-image
    // Some images are lazy-loaded by Flickity: they have the URL in
    // data-flickity-lazyload instead of src. Promote that attribute so
    // the importer picks up the image URL.
    const image = slide.querySelector('.cmp-image img.cmp-image__image, .cmp-image img, img');
    if (image && !image.getAttribute('src')) {
      const lazySrc = image.getAttribute('data-flickity-lazyload')
        || image.getAttribute('data-src')
        || image.getAttribute('data-lazy');
      if (lazySrc) {
        image.setAttribute('src', lazySrc);
      }
    }

    // --- Column 2: Text content ---
    // Validated selectors from .rad-carousel-image-and-text__slide-text container
    const title = slide.querySelector(
      'h3.rad-carousel-image-and-text__slide-title, .rad-carousel-image-and-text__slide-title, h3, h2',
    );

    const description = slide.querySelector(
      'p.rad-carousel-image-and-text__slide-body, .rad-carousel-image-and-text__slide-body, p',
    );

    // CTA link - extract the anchor element itself; inner divs (button text, icon)
    // will be handled by the importer framework
    const cta = slide.querySelector(
      'a.rad-carousel-image-and-text__slide-cta, .rad-carousel-image-and-text__slide-cta, a.rad-button',
    );

    // Build column 1 (image)
    const col1 = [];
    if (image) {
      col1.push(image);
    }

    // Build column 2 (text content: title + description + CTA)
    const col2 = [];
    if (title) {
      col2.push(title);
    }
    if (description) {
      col2.push(description);
    }
    if (cta) {
      // Create a clean anchor with just the text and href,
      // stripping the nested icon/button divs
      const cleanLink = document.createElement('a');
      cleanLink.href = cta.href;
      const ctaText = cta.querySelector('.rad-button__text');
      cleanLink.textContent = ctaText ? ctaText.textContent.trim() : cta.textContent.trim();
      col2.push(cleanLink);
    }

    // Only add the row if we have meaningful content
    if (col1.length > 0 || col2.length > 0) {
      cells.push([col1, col2]);
    }
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-casestudy', cells });
  element.replaceWith(block);
}
