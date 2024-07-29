const site = window.location.pathname;
const parts = site.split('/');
console.log(parts)
const ttItem = parts.find(item => item.startsWith('tt'));

const AddCustomStyle = css => document.head.appendChild(document.createElement('style')).innerHTML = css;
AddCustomStyle(`
  .filmeto.watch-box{
    display:flex;
    padding : 4px;
    margin-right:8px;
    flex-direction: column;
  }
  .watch-button{
    background-color: #f1c40f;
    color: #000;
    padding: 7px 8px;
    border-radius: 4px;
    text-decoration: none;
    display: flex;
    justify-content: center;
  }
  .watch-button span{
    font-size: 13px;
    font-weight: 800;
  }
`);

const metaTag = document.querySelector('meta[property="og:type"]');
let contentValue = '';
if (metaTag) {
  contentValue = metaTag.getAttribute('content');// This will log "video.movie"
} else {
  console.error('Meta tag with property "og:type" not found.');
}
const BaseWatchLinkURL = 'https://vidsrc.xyz/embed/';
let watchLink = '';
if (contentValue === 'video.movie') {
  watchLink = `${BaseWatchLinkURL}movie/${ttItem}`;
} else if (contentValue === 'video.tv_show') {
  watchLink = `${BaseWatchLinkURL}tv/${ttItem}`;
} else {
  console.error('Content type not supported');
  watchLink = `${BaseWatchLinkURL}`;
}

//Create Box
const base_element = document.createElement('div');
base_element.setAttribute('class', 'filmeto watch-box');
//Create Title
const title_element = document.createElement('div');
title_element.setAttribute('class', 'sc-acdbf0f3-1 ioCFan');
title_element.innerHTML = 'WATCH TITLE';
base_element.appendChild(title_element);
//Create Button
const link_element = document.createElement('a');
link_element.setAttribute('class', 'watch-button');
link_element.setAttribute('href', watchLink);
link_element.setAttribute('target', '_blank');
base_element.appendChild(link_element);
//Create Text
const text_element = document.createElement('span');
text_element.innerHTML = 'WATCH';
link_element.appendChild(text_element);
//Inject in Page
const parentDiv = document.querySelector('.sc-3a4309f8-1.dOjKRs');
if (parentDiv) {
  parentDiv.insertBefore(base_element, parentDiv.firstChild);
} else {
  console.error('Parent div with class "sc-3a4309f8-1 dOjKRs" not found.');
}
