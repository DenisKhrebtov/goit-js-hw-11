!function(){function e(e){return e&&e.__esModule?e.default:e}var t={};Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")};var n={};function r(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}Object.defineProperty(n,"__esModule",{value:!0}),n.default=function(e,t,n){t&&r(e.prototype,t);n&&r(e,n);return e};var a=function(){"use strict";function r(){e(t)(this,r),this.searchQuery="",this.page=1}return e(n)(r,[{key:"fetchArticles",value:function(){var e=this,t="".concat("https://pixabay.com/api","/?key=").concat("30053223-4606077d2ff36cbc858d0fd80","&q=").concat(this.searchQuery,"&image_type=photo&page=").concat(this.page,"&per_page=40");return fetch(t).then((function(e){return e.json()})).then((function(t){var n=t.articles;return e.incrementPage(),n}))}},{key:"incrementPage",value:function(){this.page+=1}},{key:"resetPage",value:function(){this.page=1}},{key:"query",get:function(){return this.searchQuery},set:function(e){this.searchQuery=e}}]),r}(),i=function(){"use strict";function r(n){var a=n.selector,i=n.hidden,u=void 0!==i&&i;e(t)(this,r),this.refs=this.getRefs(a),u&&this.hide()}return e(n)(r,[{key:"getRefs",value:function(e){var t={};return t.button=document.querySelector(e),t.label=t.button.querySelector(".label"),t}},{key:"enable",value:function(){this.refs.button.disabled=!1,this.refs.label.textContent="Load more"}},{key:"disable",value:function(){this.refs.button.disabled=!0,this.refs.label.textContent="loading..."}},{key:"show",value:function(){this.refs.button.classList.remove("is-hidden")}},{key:"hide",value:function(){this.refs.button.classList.add("is-hidden")}}]),r}(),u={searchForm:document.querySelector(".search-form"),galleryContainer:document.querySelector(".gallery")},o=new i({selector:".load-more",hidden:!0}),s=new a;function c(){o.disable(),s.fetchArticles().then((function(e){appendArticlesMarkup(e),o.enable()}))}console.log(o),o.show(),u.searchForm.addEventListener("submit",(function(e){if(e.preventDefault(),s.query=e.currentTarget.elements.query.value,""===s.query)return alert("bred");o.show(),s.resetPage(),u.galleryContainer.innerHTML="",c()})),o.refs.button.addEventListener("click",c)}();
//# sourceMappingURL=index.81a342ad.js.map
