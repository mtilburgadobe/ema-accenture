/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Accenture section breaks and section metadata.
 * Inserts <hr> between sections and adds Section Metadata blocks for sections with a style.
 * Uses payload.template.sections from page-templates.json.
 * All selectors verified against migration-work/cleaned.html.
 *
 * Sections (from page-templates.json):
 *   1. Hero              - #reinvent-hero                              (style: null)    - line 662
 *   2. Content Card Grid - .tilegridv2.tilegrid                        (style: dark)    - line 708
 *   3. Executive Quote   - .layoutdivision .carousel-block             (style: dark)    - line 1054
 *   4. 360 Value Header  - .header.teaser #header-4db5a9b6f2          (style: dark)    - line 1076
 *   5. Client Case Studies - .client-carousel                          (style: dark)    - line 1094
 *   6. Awards            - .floatingcardblock                          (style: dark)    - line 1207
 *   7. Careers           - .mixedmediatextblock                        (style: dark)    - line 1291
 *   8. News              - .rad-news                                   (style: dark)    - line 1311
 *   9. Foresight Banner  - .radforesight .rad-foresight-banner         (style: dark-purple) - line 1413 (inside footer, removed by cleanup)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    // Process sections in reverse order to avoid offset issues when inserting elements
    const reversedSections = [...sections].reverse();

    for (const section of reversedSections) {
      if (!section.selector) continue;

      // Find the first element matching this section's selector
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Add Section Metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: {
            style: section.style,
          },
        });
        // Insert Section Metadata after the section element (or at the end of its parent)
        if (sectionEl.nextSibling) {
          sectionEl.parentNode.insertBefore(sectionMetadata, sectionEl.nextSibling);
        } else {
          sectionEl.parentNode.appendChild(sectionMetadata);
        }
      }

      // Add <hr> before non-first sections to create section breaks
      const isFirst = sections.indexOf(section) === 0;
      if (!isFirst) {
        const hr = document.createElement('hr');
        sectionEl.parentNode.insertBefore(hr, sectionEl);
      }
    }
  }
}
