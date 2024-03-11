import{a as p,S as v,i as d}from"./assets/vendor-527658dd.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&o(i)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function o(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();p.defaults.baseURL="https://pixabay.com/api/";const S="42589102-bb5462888a4e95731e5ef7933";async function h(a,t){const r=new URLSearchParams({key:S,q:a,image_type:"photo",orientation:"horizontal",safesearch:!1,per_page:15,page:t});return(await p.get("",{params:r})).data}const u=document.querySelector("#form"),g=document.querySelector("div"),y=document.querySelector(".gallery"),l=document.querySelector(".load-more"),m=document.querySelector("span.load");let n,c,f=0;const L=new v(".gallery>.item-gallery a",{backgroundColor:"#EF4040",captionsData:"alt",captionDelay:250});u.addEventListener("submit",q);function b(a,t,r,o,e,s,i){let w=`
  <li class="item-gallery">
    <a class="load-link" href="${a}">
      <img class="load-image" src="${t}" width="360" alt="${r}" title="${r}">
    </a>
    <ul class="load-list">
      <li>
        <h2>Likes</h2>
        <p>${o}</p>
      </li>
      <li>
        <h2>Views</h2>
        <p>${e}</p>
      </li>
      <li>
        <h2>Comments</h2>
        <p>${s}</p>
      </li>
      <li>
        <h2>Downloads</h2>
        <p>${i}</p>
      </li>
    </ul>
  </li>
`;if(y.insertAdjacentHTML("beforeend",w),f>=1){const C=document.querySelector(".item-gallery").getBoundingClientRect().height;window.scrollBy({top:C*2,behavior:"smooth"})}}function q(a){if(a.preventDefault(),y.innerHTML="",f=0,c=u.elements.input.value.trim(),u.elements.input.value="",c===""){d.error({title:"Error",message:"Please enter a search query.",backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#B51B1B",position:"topRight"}),l.classList.add("is-hidden");return}l.classList.add("is-hidden"),g.classList.add("spinner"),n=1,h(c,n).then(t=>{if(t.hits.length===0)throw d.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),new Error("No images found");t.hits.map(r=>b(r.largeImageURL,r.webformatURL,r.tags,r.likes,r.views,r.comments,r.downloads)),l.classList.remove("is-hidden"),L.refresh(),f++}).catch(t=>console.log(t)).finally(()=>{g.classList.remove("spinner")})}l.addEventListener("click",B);async function B(){n++;try{m.classList.remove("is-hidden");const a=await h(c,n);a.hits.map(o=>b(o.largeImageURL,o.webformatURL,o.tags,o.likes,o.views,o.comments,o.downloads)),L.refresh();const t=a.totalHits||0,r=Math.ceil(t/15);m.classList.add("is-hidden"),n>=r&&(l.classList.add("is-hidden"),d.info({title:"Info",message:"We're sorry, but you've reached the end of search results.",backgroundColor:"#4CAF50",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#4CAF50",position:"topRight"}))}catch(a){d.error({title:"Error",message:`${a.message||"Something went wrong"}`,backgroundColor:"#EF4040",messageColor:"#fff",titleColor:"#fff",progressBarColor:"#B51B1B",position:"topRight"})}}
//# sourceMappingURL=commonHelpers.js.map
