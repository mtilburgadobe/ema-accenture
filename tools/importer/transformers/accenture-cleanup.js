/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: Accenture site-wide cleanup.
 * Removes non-authorable content from the Accenture CH-EN site.
 * All selectors verified against migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // OneTrust cookie consent SDK (line 1497 in cleaned.html)
    // <div id="onetrust-consent-sdk">
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-consent-sdk',
    ]);

    // Skip navigation links (lines 3-4 in cleaned.html)
    // <a href="#main" class="cmp-skip-link">
    // <a href="#footer" class="cmp-skip-link">
    WebImporter.DOMUtils.remove(element, [
      '.cmp-skip-link',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Global header with navigation (line 8 in cleaned.html)
    // <header class="customexperiencefragment experiencefragment">
    WebImporter.DOMUtils.remove(element, [
      'header.customexperiencefragment',
    ]);

    // Global footer with links, foresight banner, and tracking (line 1408 in cleaned.html)
    // <footer class="customexperiencefragment experiencefragment">
    WebImporter.DOMUtils.remove(element, [
      'footer.customexperiencefragment',
    ]);

    // Empty custom HTML wrapper at end of main content (line 1400-1404 in cleaned.html)
    // <div class="cmp-custom__html__wrapper" id="custom-html-css-js">
    const emptyCustomHtml = element.querySelector('#custom-html-css-js');
    if (emptyCustomHtml) {
      const customHtmlParent = emptyCustomHtml.closest('.custom-html');
      if (customHtmlParent) {
        customHtmlParent.remove();
      }
    }

    // ClickTale analytics div (line 1774 in cleaned.html)
    // <div id="ClickTaleDiv">
    WebImporter.DOMUtils.remove(element, [
      '#ClickTaleDiv',
    ]);

    // Native frame holder and tracking iframes (lines 1770-1779 in cleaned.html)
    // <cs-native-frame-holder>, <iframe id="universal_pixel_1grs3ho">, doubleclick iframe
    WebImporter.DOMUtils.remove(element, [
      'cs-native-frame-holder',
      'iframe',
      'noscript',
      'link',
    ]);
  }
}
