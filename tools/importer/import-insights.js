/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroInsightsParser from './parsers/hero-insights.js';
import carouselResearchParser from './parsers/carousel-research.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/accenture-cleanup.js';
import sectionsTransformer from './transformers/accenture-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-insights': heroInsightsParser,
  'carousel-research': carouselResearchParser,
};

// TRANSFORMER REGISTRY
const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'insights',
  description: 'Accenture Insights hub page with featured research, perspectives, and thought leadership content',
  urls: ['https://www.accenture.com/ch-en/insights'],
  blocks: [
    {
      name: 'hero-insights',
      instances: ['.rad-homepage-hero'],
    },
    {
      name: 'carousel-research',
      instances: ['.tilecardcarouselv2 .rad-grid-card-carousel'],
    },
  ],
  sections: [
    {
      id: 'section-1',
      name: 'Hero',
      selector: '.rad-homepage-hero',
      style: null,
      blocks: ['hero-insights'],
      defaultContent: [],
    },
    {
      id: 'section-2',
      name: 'Enterprise',
      selector: '#block-enterprise',
      style: null,
      blocks: ['carousel-research'],
      defaultContent: ['#block-enterprise h2', '#block-enterprise p'],
    },
    {
      id: 'section-3',
      name: 'Digital Core',
      selector: '#block-digital-core',
      style: null,
      blocks: ['carousel-research'],
      defaultContent: ['#block-digital-core h2', '#block-digital-core p'],
    },
    {
      id: 'section-4',
      name: 'Talent',
      selector: '#block-talent',
      style: null,
      blocks: ['carousel-research'],
      defaultContent: ['#block-talent h2', '#block-talent p'],
    },
    {
      id: 'section-5',
      name: 'Supply Chain and Engineering',
      selector: '#block-supply-chain-engineering',
      style: null,
      blocks: ['carousel-research'],
      defaultContent: ['#block-supply-chain-engineering h2', '#block-supply-chain-engineering p'],
    },
    {
      id: 'section-6',
      name: 'Customer',
      selector: '#block-customer',
      style: null,
      blocks: ['carousel-research'],
      defaultContent: ['#block-customer h2', '#block-customer p'],
    },
    {
      id: 'section-7',
      name: 'Cybersecurity',
      selector: '#block-cybersecurity',
      style: null,
      blocks: ['carousel-research'],
      defaultContent: ['#block-cybersecurity h2', '#block-cybersecurity p'],
    },
    {
      id: 'section-8',
      name: 'Finance',
      selector: '#block-finance',
      style: null,
      blocks: ['carousel-research'],
      defaultContent: ['#block-finance h2', '#block-finance p'],
    },
    {
      id: 'section-9',
      name: 'Industry',
      selector: '#block-industry',
      style: null,
      blocks: ['carousel-research'],
      defaultContent: ['#block-industry h2', '#block-industry p'],
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
