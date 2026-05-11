/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-video.js
  function parse(element, { document }) {
    const video = element.querySelector("video.hero_custom__background, video");
    let backgroundCell = null;
    if (video) {
      const sourceEl = video.querySelector("source[src]");
      const videoSrc = sourceEl ? sourceEl.getAttribute("src") : video.getAttribute("src");
      if (videoSrc) {
        const videoLink = document.createElement("a");
        videoLink.href = videoSrc;
        videoLink.textContent = videoSrc;
        backgroundCell = [videoLink];
      }
    }
    const heading = element.querySelector('#hero_headline_h1 h1, h1, [class*="headline"] h1');
    const subheading = element.querySelector(".hero_custom__body__hero_text h2, h2");
    const description = element.querySelector(
      "p.hero_custom__body__hero_text__title, .hero_custom__body__hero_text p:not(:empty)"
    );
    const ctaWrapper = element.querySelector("a.hero_custom__cta_1");
    const ctaTextEl = element.querySelector(".hero_cta_2 .cta_span, .cta_span");
    let ctaLink = null;
    if (ctaWrapper) {
      const href = ctaWrapper.getAttribute("href");
      const ctaText = ctaTextEl ? ctaTextEl.textContent.trim() : "Learn more";
      ctaLink = document.createElement("a");
      ctaLink.href = href;
      ctaLink.textContent = ctaText;
    }
    const cells = [];
    if (backgroundCell) {
      cells.push(backgroundCell);
    }
    const contentDiv = document.createElement("div");
    if (heading) {
      const h1 = document.createElement("h1");
      h1.textContent = heading.textContent.trim();
      contentDiv.appendChild(h1);
    }
    if (subheading) {
      const h2 = document.createElement("h2");
      h2.textContent = subheading.textContent.trim();
      contentDiv.appendChild(h2);
    }
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      contentDiv.appendChild(p);
    }
    if (ctaLink) {
      const p = document.createElement("p");
      p.appendChild(ctaLink);
      contentDiv.appendChild(p);
    }
    if (contentDiv.childNodes.length > 0) {
      cells.push([contentDiv]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-video", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-research.js
  function parse2(element, { document }) {
    const cards = element.querySelectorAll(".rad-content-grid-card");
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".rad-content-grid-card__full-image img.cmp-image__image") || card.querySelector(".rad-content-grid-card__half-image img.cmp-image__image") || card.querySelector("img.cmp-image__image");
      const textContent = [];
      const label = card.querySelector(".rad-content-grid-card__label");
      if (label) {
        const labelText = label.textContent.trim();
        if (labelText) {
          const em = document.createElement("em");
          em.textContent = labelText;
          textContent.push(em);
        }
      }
      const title = card.querySelector(".rad-content-grid-card__title");
      if (title) {
        const titleText = title.textContent.trim();
        if (titleText) {
          const h3 = document.createElement("h3");
          h3.textContent = titleText;
          textContent.push(h3);
        }
      }
      const descriptionEl = card.querySelector(".rad-content-grid-card__content p");
      if (descriptionEl) {
        const descText = descriptionEl.textContent.trim();
        if (descText) {
          const p = document.createElement("p");
          p.textContent = descText;
          textContent.push(p);
        }
      }
      const ctaLink = card.querySelector(".rad-content-grid-card__back-content a.rad-button");
      if (ctaLink) {
        const href = ctaLink.getAttribute("href") || "";
        const ctaTextEl = ctaLink.querySelector(".rad-button__text");
        const ctaText = ctaTextEl ? ctaTextEl.textContent.trim() : ctaLink.textContent.trim();
        if (href && ctaText) {
          const a = document.createElement("a");
          a.href = href;
          a.textContent = ctaText;
          const p = document.createElement("p");
          p.appendChild(a);
          textContent.push(p);
        }
      }
      if (img || textContent.length > 0) {
        const imageCell = img ? [img] : [];
        cells.push([imageCell, textContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-research", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-quote.js
  function parse3(element, { document }) {
    const image = element.querySelector(".cmp-image img, img.cmp-image__image");
    const quoteHeading = element.querySelector(
      "h4.rad-carousel-block__title, .rad-carousel-block__title, h4, h3, h2"
    );
    const attribution = element.querySelector(
      ".rad-carousel-block__body p, .rad-carousel-block__body, .rad-carousel-image-and-text__slide-text p"
    );
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
      [col1, col2]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-quote", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-casestudy.js
  function parse4(element, { document }) {
    const slides = element.querySelectorAll(
      ".flickity-slider .rad-carousel-image-and-text__slide, .rad-carousel-image-and-text__slide"
    );
    const uniqueSlides = [...new Set(slides)];
    const cells = [];
    uniqueSlides.forEach((slide) => {
      const image = slide.querySelector(".cmp-image img.cmp-image__image, .cmp-image img, img");
      if (image && !image.getAttribute("src")) {
        const lazySrc = image.getAttribute("data-flickity-lazyload") || image.getAttribute("data-src") || image.getAttribute("data-lazy");
        if (lazySrc) {
          image.setAttribute("src", lazySrc);
        }
      }
      const title = slide.querySelector(
        "h3.rad-carousel-image-and-text__slide-title, .rad-carousel-image-and-text__slide-title, h3, h2"
      );
      const description = slide.querySelector(
        "p.rad-carousel-image-and-text__slide-body, .rad-carousel-image-and-text__slide-body, p"
      );
      const cta = slide.querySelector(
        "a.rad-carousel-image-and-text__slide-cta, .rad-carousel-image-and-text__slide-cta, a.rad-button"
      );
      const col1 = [];
      if (image) {
        col1.push(image);
      }
      const col2 = [];
      if (title) {
        col2.push(title);
      }
      if (description) {
        col2.push(description);
      }
      if (cta) {
        const cleanLink = document.createElement("a");
        cleanLink.href = cta.href;
        const ctaText = cta.querySelector(".rad-button__text");
        cleanLink.textContent = ctaText ? ctaText.textContent.trim() : cta.textContent.trim();
        col2.push(cleanLink);
      }
      if (col1.length > 0 || col2.length > 0) {
        cells.push([col1, col2]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-casestudy", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-awards.js
  function parse5(element, { document }) {
    const sectionHeading = element.querySelector(".rad-awards__headline, .rad-awards__stage h2");
    const cards = element.querySelectorAll('.rad-awards-card, .cmp-floating-awards-card > div[class*="rad-awards-card"]');
    const cells = [];
    cards.forEach((card) => {
      const title = card.querySelector("h3.rad-awards-card__title, .rad-awards-card__cover h3");
      const descriptionContainer = card.querySelector(".rad-awards-card__rte, .rad-awards-card__description");
      const paragraphs = descriptionContainer ? Array.from(descriptionContainer.querySelectorAll("p")) : [];
      const ctaLink = card.querySelector("a.rad-button, a.rad-button--ghost, .rad-awards-card__detail a");
      const cardContent = [];
      if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        cardContent.push(h3);
      }
      paragraphs.forEach((p) => {
        const para = document.createElement("p");
        para.innerHTML = p.innerHTML;
        cardContent.push(para);
      });
      if (ctaLink) {
        const link = document.createElement("a");
        link.href = ctaLink.href;
        const buttonText = ctaLink.querySelector(".rad-button__text");
        link.textContent = buttonText ? buttonText.textContent.trim() : ctaLink.textContent.trim();
        cardContent.push(link);
      }
      if (cardContent.length > 0) {
        cells.push([cardContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-awards", cells });
    if (sectionHeading) {
      const heading = document.createElement("h2");
      heading.textContent = sectionHeading.textContent.trim();
      element.replaceWith(heading, block);
    } else {
      element.replaceWith(block);
    }
  }

  // tools/importer/parsers/columns-cta.js
  function parse6(element, { document }) {
    const image = element.querySelector(
      ".rad-mixed-media-and-text__primary-image, .rad-mixed-media-and-text__media img"
    );
    const eyebrow = element.querySelector(
      ".rad-mixed-media-and-text__label"
    );
    const heading = element.querySelector(
      'h3.rad-mixed-media-and-text__title, h2.rad-mixed-media-and-text__title, [class*="mixed-media-and-text__title"]'
    );
    const description = element.querySelector(
      'p.rad-mixed-media-and-text__description, [class*="mixed-media-and-text__description"]'
    );
    const ctaLink = element.querySelector(
      "a.rad-button--tertiary, a.rad-button"
    );
    const col1 = [];
    if (image) {
      col1.push(image);
    }
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
      const link = document.createElement("a");
      link.href = ctaLink.getAttribute("href");
      link.textContent = ctaLink.textContent.trim();
      col2.push(link);
    }
    const cells = [
      [col1, col2]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-news.js
  function parse7(element, { document }) {
    const sectionHeading = element.querySelector(".rad-news-header");
    const cardCells = element.querySelectorAll(".rad-news-carousel-cell");
    const cells = [];
    cardCells.forEach((cell) => {
      const cardLink = cell.querySelector("a.rad-news-card");
      if (!cardLink) return;
      const href = cardLink.getAttribute("href") || "";
      const eyebrow = cardLink.querySelector("p.rad-news-eyebrow, .rad-news-eyebrow");
      const title = cardLink.querySelector("h3.rad-news-title, .rad-news-title");
      const cardContent = [];
      if (eyebrow) {
        const datePara = document.createElement("p");
        datePara.textContent = eyebrow.textContent.trim();
        cardContent.push(datePara);
      }
      if (title && href) {
        const h3 = document.createElement("h3");
        const link = document.createElement("a");
        link.href = href;
        link.textContent = title.textContent.trim();
        h3.appendChild(link);
        cardContent.push(h3);
      } else if (title) {
        const h3 = document.createElement("h3");
        h3.textContent = title.textContent.trim();
        cardContent.push(h3);
      }
      if (cardContent.length > 0) {
        cells.push([cardContent]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-news", cells });
    if (sectionHeading) {
      const heading = document.createElement("h2");
      heading.textContent = sectionHeading.textContent.trim();
      element.replaceWith(heading, block);
    } else {
      element.replaceWith(block);
    }
  }

  // tools/importer/transformers/accenture-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-consent-sdk"
      ]);
      WebImporter.DOMUtils.remove(element, [
        ".cmp-skip-link"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "header.customexperiencefragment"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "footer.customexperiencefragment"
      ]);
      const emptyCustomHtml = element.querySelector("#custom-html-css-js");
      if (emptyCustomHtml) {
        const customHtmlParent = emptyCustomHtml.closest(".custom-html");
        if (customHtmlParent) {
          customHtmlParent.remove();
        }
      }
      WebImporter.DOMUtils.remove(element, [
        "#ClickTaleDiv"
      ]);
      WebImporter.DOMUtils.remove(element, [
        "cs-native-frame-holder",
        "iframe",
        "noscript",
        "link"
      ]);
    }
  }

  // tools/importer/transformers/accenture-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document };
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      for (const section of reversedSections) {
        if (!section.selector) continue;
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: {
              style: section.style
            }
          });
          if (sectionEl.nextSibling) {
            sectionEl.parentNode.insertBefore(sectionMetadata, sectionEl.nextSibling);
          } else {
            sectionEl.parentNode.appendChild(sectionMetadata);
          }
        }
        const isFirst = sections.indexOf(section) === 0;
        if (!isFirst) {
          const hr = document.createElement("hr");
          sectionEl.parentNode.insertBefore(hr, sectionEl);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-video": parse,
    "cards-research": parse2,
    "columns-quote": parse3,
    "carousel-casestudy": parse4,
    "cards-awards": parse5,
    "columns-cta": parse6,
    "cards-news": parse7
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Accenture Switzerland homepage with hero, featured content sections, and corporate navigation",
    urls: ["https://www.accenture.com/ch-en"],
    blocks: [
      {
        name: "hero-video",
        instances: ["#reinvent-hero .hero_custom"]
      },
      {
        name: "cards-research",
        instances: [".tilegridv2 .rad-card-grid"]
      },
      {
        name: "columns-quote",
        instances: [".carousel-block #carouselslide-aa3197550e"]
      },
      {
        name: "carousel-casestudy",
        instances: [".client-carousel #carousel-719ce40a65"]
      },
      {
        name: "cards-awards",
        instances: [".floatingcardblock .rad-awards"]
      },
      {
        name: "columns-cta",
        instances: [".mixedmediatextblock .rad-mixed-media-and-text"]
      },
      {
        name: "cards-news",
        instances: [".rad-news .rad-news-container"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: "#reinvent-hero",
        style: null,
        blocks: ["hero-video"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Content Card Grid",
        selector: ".tilegridv2.tilegrid",
        style: "dark",
        blocks: ["cards-research"],
        defaultContent: []
      },
      {
        id: "section-3",
        name: "Executive Quote",
        selector: ".layoutdivision .carousel-block",
        style: "dark",
        blocks: ["columns-quote"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "360 Value Header",
        selector: ".header.teaser #header-4db5a9b6f2",
        style: "dark",
        blocks: [],
        defaultContent: [".rad-header__headline", ".rad-header__sub-headline", ".rad-header__cta-button a"]
      },
      {
        id: "section-5",
        name: "Client Case Studies Carousel",
        selector: ".client-carousel",
        style: "dark",
        blocks: ["carousel-casestudy"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Awards and Recognition",
        selector: ".floatingcardblock",
        style: "dark",
        blocks: ["cards-awards"],
        defaultContent: [".rad-awards__headline"]
      },
      {
        id: "section-7",
        name: "Careers",
        selector: ".mixedmediatextblock",
        style: "dark",
        blocks: ["columns-cta"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Accenture News",
        selector: ".rad-news",
        style: "dark",
        blocks: ["cards-news"],
        defaultContent: []
      },
      {
        id: "section-9",
        name: "Foresight App Banner",
        selector: ".radforesight .rad-foresight-banner",
        style: "dark-purple",
        blocks: [],
        defaultContent: [".rad-foresight-banner__headline", ".rad-foresight-banner__subheader", ".rad-foresight-banner__buttons"]
      }
    ]
  };
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
