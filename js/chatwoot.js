/**
 * Chatwoot website widget (donbrico.net).
 * Token: Chatwoot → Settings → Inboxes → Website channel → Installation.
 */
(function () {
  var CHATWOOT_WEBSITE_TOKEN = "Lh4G8U5jNtuBe8gEWnzW8i2j";
  if (!CHATWOOT_WEBSITE_TOKEN) {
    return;
  }

  window.chatwootSettings = {
    position: "right",
    type: "standard",
    launcherTitle: "Chat with us",
  };

  var BASE_URL = "https://support.donbrico.net";
  var d = document;
  var t = "script";
  var g = d.createElement(t);
  var s = d.getElementsByTagName(t)[0];
  g.src = BASE_URL + "/packs/js/sdk.js";
  g.defer = true;
  g.async = true;
  s.parentNode.insertBefore(g, s);
  g.onload = function () {
    if (window.chatwootSDK) {
      window.chatwootSDK.run({
        websiteToken: CHATWOOT_WEBSITE_TOKEN,
        baseUrl: BASE_URL,
      });
    }
  };
})();
