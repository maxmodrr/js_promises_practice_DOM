'use strict';

const clicks = ['click', 'contextmenu'];

const firstPromise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error(`First promise was rejected`)), 3000);

  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });
});

const secondPromise = new Promise((resolve) => {
  clicks.forEach((e) => {
    document.addEventListener(e, () => {
      resolve('Second promise was resolved');
    });
  });
});

const thirdPromise = new Promise((resolve) => {
  clicks.forEach((e) => {
    document.addEventListener(e, () => {
      clicks.splice(clicks.indexOf(e), 1);

      if (clicks.length === 0) {
        resolve('Third promise was resolved');
      }
    });
  });
});

const success = () => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('success');
  document.body.append(div);
};

const error = () => {
  const div = document.createElement('div');

  div.setAttribute('data-qa', 'notification');
  div.classList.add('error');
  document.body.append(div);
};

firstPromise.then(success).catch(error);
secondPromise.then(success);
thirdPromise.then(success);
