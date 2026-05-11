/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroVideoParser from './parsers/hero-video.js';
import cardsResearchParser from './parsers/cards-research.js';
import columnsQuoteParser from './parsers/columns-quote.js';
import carouselCasestudyParser from './parsers/carousel-casestudy.js';
import cardsAwardsParser from './parsers/cards-awards.js';
import columnsCtaParser from './parsers/columns-cta.js';
import cardsNewsParser from './parsers/cards-news.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/accenture-cleanup.js';
import sectionsTransformer from './transformers/accenture-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-video': heroVideoParser,
  'cards-research': cardsResearchParser,
  'columns-quote': columnsQuoteParser,
  'carousel-casestudy': carouselCasestudyParser,
  'cards-awards': cardsAwardsParser,
  'columns-cta': columnsCtaParser,
  'cards-news': cardsNewsParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Accenture Switzerland homepage with hero, featured content sections, and corporate navigation',
  urls: ['https://www.accenture.com/ch-en'],
  blocks: [
    {
      name: 'hero-video',
      instances: ['#reinvent-hero .hero_custom'],
    },
    {
      name: 'cards-research',
      instances: ['.tilegridv2 .rad-card-grid'],
    },
    {
      name: 'columns-quote',
      instances: ['.carousel-block #carouselslide-aa3197550e'],
    },
    {
      name: 'carousel-casestudy',
      instances: ['.client-carousel #carousel-719ce40a65'],
    },
    {
      name: 'cards-awards',
      instances: ['.floatingcardblock .rad-awards'],
    },
    {
      name: 'columns-cta',
      instances: ['.mixedmediatextblock .rad-mixed-media-and-text'],
    },
    {
      name: 'cards-news',
      instances: ['.rad-news .rad-news-container'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '#reinvent-hero',
      style: null,
      blocks: ['hero-video'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Content Card Grid',
      selector: '.tilegridv2.tilegrid',
      style: 'dark',
      blocks: ['cards-research'],
      defaultContent: [],
    },
    {
      id: 'section-3',
      name: 'Executive Quote',
      selector: '.layoutdivision .carousel-block',
      style: 'dark',
      blocks: ['columns-quote'],
      defaultContent: [],
    },
    {
      id: 'section-4',
      name: '360 Value Header',
      selector: '.header.teaser #header-4db5a9b6f2',
      style: 'dark',
      blocks: [],
      defaultContent: ['.rad-header__headline', '.rad-header__sub-headline', '.rad-header__cta-button a'],
    },
    {
      id: 'section-5',
      name: 'Client Case Studies Carousel',
      selector: '.client-carousel',
      style: 'dark',
      blocks: ['carousel-casestudy'],
      defaultContent: [],
    },
    {
      id: 'section-6',
      name: 'Awards and Recognition',
      selector: '.floatingcardblock',
      style: 'dark',
      blocks: ['cards-awards'],
      defaultContent: ['.rad-awards__headline'],
    },
    {
      id: 'section-7',
      name: 'Careers',
      selector: '.mixedmediatextblock',
      style: 'dark',
      blocks: ['columns-cta'],
      defaultContent: [],
    },
    {
      id: 'section-8',
      name: 'Accenture News',
      selector: '.rad-news',
      style: 'dark',
      blocks: ['cards-news'],
      defaultContent: [],
    },
    {
      id: 'section-9',
      name: 'Foresight App Banner',
      selector: '.radforesight .rad-foresight-banner',
      style: 'dark-purple',
      blocks: [],
      defaultContent: ['.rad-foresight-banner__headline', '.rad-foresight-banner__subheader', '.rad-foresight-banner__buttons'],
    },
  ],
};

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
