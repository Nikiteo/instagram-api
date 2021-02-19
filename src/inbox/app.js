/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
const findButton = document.querySelector('.find');
const clientInfo = document.querySelector('.search_client');
const competitorFirstInfo = document.querySelector('.search_competitor_first');
const competitorSecondInfo = document.querySelector('.search_competitor_second');
const competitorThirdInfo = document.querySelector('.search_competitor_third');
const clientColumn = document.querySelector('.client_column');
const competitorFirst = document.querySelector('.competitor_1');
const competitorSecond = document.querySelector('.competitor_2');
const competitorThird = document.querySelector('.competitor_3');

const getInstaInfo = (sUserName, sColumnName) => {
  const xhr = new XMLHttpRequest();
  const url = `https://www.instagram.com/${sUserName}/?__a=1`;
  xhr.open('GET', url);
  xhr.responseType = 'json';
  xhr.send();

  xhr.addEventListener('readystatechange', (e) => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const request = xhr.response.graphql.user;
      const arrIgtv = request.edge_felix_video_timeline.edges;
      const arrIgtvLikes = [];
      const arrPublics = request.edge_owner_to_timeline_media.edges;
      const arrPublicsLikes = [];
      const arrPublicsComments = [];
      const undefinedPublics = '-';

      sColumnName.innerHTML = `<div><b>${sUserName}</b></div>`;
      sColumnName.innerHTML += `<div><img width="100" src="${request.profile_pic_url}"></div>`;
      sColumnName.innerHTML += `<div>${request.full_name}</div>`;

      if (request.category_name) {
        sColumnName.innerHTML += `<div>${request.category_name}</div>`;
      } else {
        sColumnName.innerHTML += `<div>${undefinedPublics}</div>`;
      }

      if (request.biography) {
        sColumnName.innerHTML += `<div>${request.biography}</div>`;
      } else {
        sColumnName.innerHTML += `<div>${undefinedPublics}</div>`;
      }

      if (request.external_url) {
        sColumnName.innerHTML += `<div><a href="${request.external_url}">${request.external_url}</a></div>`;
      } else {
        sColumnName.innerHTML += `<div>${undefinedPublics}</div>`;
      }

      sColumnName.innerHTML += `<div>${request.edge_follow.count}</div>`;
      sColumnName.innerHTML += `<div>${request.edge_followed_by.count}</div>`;
      sColumnName.innerHTML += `<div>${request.edge_owner_to_timeline_media.count}</div>`;

      for (let i = 0; i < arrPublics.length; i += 1) {
        arrPublicsLikes.push(arrPublics[i].node.edge_liked_by.count);
        arrPublicsComments.push(arrPublics[i].node.edge_media_to_comment.count);
      }

      if (arrPublicsLikes.length === 0) {
        sColumnName.innerHTML += `<div>${undefinedPublics}</div>`;
        sColumnName.innerHTML += `<div>${undefinedPublics}</div>`;
      } else {
        const likesSum = Math.round(arrPublicsLikes.reduce((a, b) => (a + b)) / arrPublics.length);
        const commentsSum = Math.round(arrPublicsComments.reduce((a, b) => (a + b)) / arrPublics.length);
        sColumnName.innerHTML += `<div>${likesSum}</div>`;
        sColumnName.innerHTML += `<div>${commentsSum}</div>`;
      }

      sColumnName.innerHTML += `<div>${request.highlight_reel_count}</div>`;

      for (let i = 0; i < arrIgtv.length; i += 1) {
        arrIgtvLikes.push(arrIgtv[i].node.edge_liked_by.count);
      }

      if (arrIgtvLikes.length === 0) {
        sColumnName.innerHTML += `<div>${undefinedPublics}</div>`;
        sColumnName.innerHTML += `<div>${undefinedPublics}</div>`;
      } else {
        const igtvLikesSum = Math.round(arrIgtvLikes.reduce((a, b) => (a + b)) / arrIgtv.length);
        sColumnName.innerHTML += `<div>${request.edge_felix_video_timeline.count}</div>`;
        sColumnName.innerHTML += `<div>${igtvLikesSum}</div>`;
      }
    }
  });
};

findButton.addEventListener('click', (e) => {
  e.preventDefault();
  getInstaInfo(clientInfo.value, clientColumn);
  setTimeout(getInstaInfo, 1000, competitorFirstInfo.value, competitorFirst);
  setTimeout(getInstaInfo, 1000, competitorSecondInfo.value, competitorSecond);
  setTimeout(getInstaInfo, 1000, competitorThirdInfo.value, competitorThird);
});
