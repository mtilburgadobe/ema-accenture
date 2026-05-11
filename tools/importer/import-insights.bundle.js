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

  // tools/importer/import-insights.js
  var import_insights_exports = {};
  __export(import_insights_exports, {
    default: () => import_insights_default
  });

  // tools/importer/parsers/hero-insights.js
  function parse(element, { document }) {
    const bgImage = element.querySelector(".rad-homepage-hero__background .cmp-image__image, .rad-homepage-hero__background img");
    const heading = element.querySelector(".rad-homepage-hero__headline, h1");
    const description = element.querySelector(".rad-homepage-hero__content-copy p, .rad-homepage-hero__content-copy");
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
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
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-insights", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-research.js
  function parse2(element, { document }) {
    var _a;
    const viewAllWrapper = element.querySelector(".rad-grid-card-carousel__view-all-button-wrapper");
    let viewAllLink = null;
    if (viewAllWrapper) {
      const linkEl = viewAllWrapper.querySelector("a");
      if (linkEl) {
        viewAllLink = document.createElement("p");
        const a = document.createElement("a");
        a.href = linkEl.href;
        a.textContent = linkEl.textContent.trim() || "See all";
        viewAllLink.appendChild(a);
      }
    }
    const cardWrappers = element.querySelectorAll(".rad-grid-card-carousel__card-wrapper");
    const cells = [];
    cardWrappers.forEach((cardWrapper) => {
      var _a2, _b;
      const card = cardWrapper.querySelector('.rad-content-grid-card, [class*="rad-content-grid-card"]');
      if (!card) return;
      const imgEl = card.querySelector(".rad-content-grid-card__full-image img, .rad-content-grid-card__half-image img");
      const imageCell = [];
      if (imgEl) {
        const img = document.createElement("img");
        img.src = imgEl.src;
        img.alt = imgEl.alt || "";
        imageCell.push(img);
      }
      const contentCell = [];
      const labelEl = card.querySelector(".rad-content-grid-card__label");
      if (labelEl) {
        const labelText = labelEl.textContent.trim();
        if (labelText) {
          const em = document.createElement("em");
          em.textContent = labelText;
          const labelP = document.createElement("p");
          labelP.appendChild(em);
          contentCell.push(labelP);
        }
      }
      const titleEl = card.querySelector(".rad-content-grid-card__title");
      if (titleEl) {
        const titleText = titleEl.textContent.trim();
        if (titleText) {
          const h3 = document.createElement("h3");
          h3.textContent = titleText;
          contentCell.push(h3);
        }
      }
      const descEl = card.querySelector(".rad-content-grid-card__content p");
      if (descEl) {
        const p = document.createElement("p");
        p.textContent = descEl.textContent.trim();
        contentCell.push(p);
      }
      const ctaEl = card.querySelector("a.rad-button--ghost");
      const ctaCoverEl = card.querySelector("a.rad-content-grid-card__cta-cover");
      const ctaHref = ctaEl ? ctaEl.href : ctaCoverEl ? ctaCoverEl.href : null;
      const ctaText = ctaEl ? ((_b = (_a2 = ctaEl.querySelector(".rad-button__text")) == null ? void 0 : _a2.textContent) == null ? void 0 : _b.trim()) || ctaEl.textContent.trim() : "Read more";
      if (ctaHref) {
        const ctaP = document.createElement("p");
        const a = document.createElement("a");
        a.href = ctaHref;
        a.textContent = ctaText;
        ctaP.appendChild(a);
        contentCell.push(ctaP);
      }
      if (imageCell.length > 0 || contentCell.length > 0) {
        cells.push([imageCell, contentCell]);
      }
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-research", cells });
    if (viewAllLink) {
      (_a = block.parentElement) == null ? void 0 : _a.insertBefore(viewAllLink, block);
      if (!block.parentElement) {
        const wrapper = document.createElement("div");
        wrapper.appendChild(viewAllLink);
        wrapper.appendChild(block);
        element.replaceWith(wrapper);
        return;
      }
    }
    element.replaceWith(block);
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

  // tools/importer/import-insights.js
  var parsers = {
    "hero-insights": parse,
    "carousel-research": parse2
  };
  var transformers = [
    transform,
    transform2
  ];
  var PAGE_TEMPLATE = {
    name: "insights",
    description: "Accenture Insights hub page with featured research, perspectives, and thought leadership content",
    urls: ["https://www.accenture.com/ch-en/insights"],
    blocks: [
      {
        name: "hero-insights",
        instances: [".rad-homepage-hero"]
      },
      {
        name: "carousel-research",
        instances: [".tilecardcarouselv2 .rad-grid-card-carousel"]
      }
    ],
    sections: [
      {
        id: "section-1",
        name: "Hero",
        selector: ".rad-homepage-hero",
        style: null,
        blocks: ["hero-insights"],
        defaultContent: []
      },
      {
        id: "section-2",
        name: "Enterprise",
        selector: "#block-enterprise",
        style: null,
        blocks: ["carousel-research"],
        defaultContent: ["#block-enterprise h2", "#block-enterprise p"]
      },
      {
        id: "section-3",
        name: "Digital Core",
        selector: "#block-digital-core",
        style: null,
        blocks: ["carousel-research"],
        defaultContent: ["#block-digital-core h2", "#block-digital-core p"]
      },
      {
        id: "section-4",
        name: "Talent",
        selector: "#block-talent",
        style: null,
        blocks: ["carousel-research"],
        defaultContent: ["#block-talent h2", "#block-talent p"]
      },
      {
        id: "section-5",
        name: "Supply Chain and Engineering",
        selector: "#block-supply-chain-engineering",
        style: null,
        blocks: ["carousel-research"],
        defaultContent: ["#block-supply-chain-engineering h2", "#block-supply-chain-engineering p"]
      },
      {
        id: "section-6",
        name: "Customer",
        selector: "#block-customer",
        style: null,
        blocks: ["carousel-research"],
        defaultContent: ["#block-customer h2", "#block-customer p"]
      },
      {
        id: "section-7",
        name: "Cybersecurity",
        selector: "#block-cybersecurity",
        style: null,
        blocks: ["carousel-research"],
        defaultContent: ["#block-cybersecurity h2", "#block-cybersecurity p"]
      },
      {
        id: "section-8",
        name: "Finance",
        selector: "#block-finance",
        style: null,
        blocks: ["carousel-research"],
        defaultContent: ["#block-finance h2", "#block-finance p"]
      },
      {
        id: "section-9",
        name: "Industry",
        selector: "#block-industry",
        style: null,
        blocks: ["carousel-research"],
        defaultContent: ["#block-industry h2", "#block-industry p"]
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
  var import_insights_default = {
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
  return __toCommonJS(import_insights_exports);
})();
