(function(d,t) {
  var BASE_URL="https://support.donbrico.net";
  var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
  g.src=BASE_URL+"/packs/js/sdk.js";
  g.defer = true;
  g.async = true;
  s.parentNode.insertBefore(g,s);
  g.onload=function(){
    window.chatwootSDK.run({
      websiteToken: 'Lh4G8U5jNtuBe8gEWnzW8i2j',
      baseUrl: BASE_URL
    })
  }
})(document,"script");

window.chatwootSettings = {
  hideMessageBubble: false,
  position: 'right',
  locale: 'en',
  type: 'standard'
};
