'use strict';

const apiUrl = 'https://mate-academy.github.io/phone-catalogue-static/api';

// General API Call function
const request = (endpoint, params = {}) => {
  return fetch(apiUrl + endpoint, params)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(
          new Error(`
            ${response.status}: ${response.statusText}
          `)
        );
      }

      return response.json();
    });
};

// Gets phones list from API
const getPhones = () => {
  return request('/phones.json');
};

// Gets phone's details by id from API
const getDetails = (phoneId) => {
  return request(`/phones/${phoneId}.json`);
};

// Gets all phones' details by ids from API
const getPhonesDetails = () => {
  return getPhones()
    .then(phones => {
      const getDetailsPromises = [];

      phones.forEach(({ id }) =>
        getDetailsPromises.push(getDetails(id))
      );

      return Promise.allSettled(getDetailsPromises);
    });
};

// Gets all phones' details by ids from API
// Additionally stores data to array preserving order of received responses
const getDetailsOrdered = (phoneId, resultsOrdered) => {
  return new Promise((resolve, reject) => {
    getDetails(phoneId)
      .then(details => {
        resultsOrdered.push(details);
        resolve(details);
      })
      .catch(reject);
  });
};

// Gets only first received phone's details by id from API
const getFirstReceivedDetails = () => {
  return getPhones()
    .then(phones => {
      const getDetailsPromises = [];

      phones.forEach(({ id }) =>
        getDetailsPromises.push(getDetails(id))
      );

      return Promise.race(getDetailsPromises);
    });
};

// Gets all successful received phones' details by ids from API
const getAllSuccessfulDetails = () => {
  return getPhonesDetails()
    .then(results =>
      results
        .filter(result => result.status === 'fulfilled')
        .map(({ value }) => value)
    );
};

// Gets only three fastest received phones' details by ids from API
const getThreeFastestDetails = () => {
  return new Promise((resolve, reject) => {
    getPhones()
      .then(phones => {
        const getDetailsPromises = [];
        const resultsOrdered = [];

        phones.forEach(({ id }) =>
          getDetailsPromises.push(getDetailsOrdered(id, resultsOrdered))
        );

        Promise
          .allSettled(getDetailsPromises)
          .then(() => resolve(resultsOrdered.slice(0, 3)))
          .catch(reject);
      });
  });
};

// Adds received phones' details to page
const addPhonesList = (title, className, phonesList) => {
  waitingMessage.remove();

  const container = document.createElement('div');

  container.className = className;
  container.innerHTML = `<h2>${title}</h2>`;

  const list = document.createElement('ul');

  container.append(list);
  document.body.append(container);

  phonesList.forEach(phone => {
    list.insertAdjacentHTML('beforeend', `
      <li>${phone.name} <span hidden>${phone.id.toUpperCase()}</span></li>
    `);
  });
};

// Shows waiting message
const waitingMessage = document.createElement('p');

waitingMessage.textContent = 'Fetching phones...';
document.body.append(waitingMessage);

// Task #1 solution
getFirstReceivedDetails()
  .then(firstPhone => {
    addPhonesList(
      'First Received',
      'first-received',
      [firstPhone],
    );
  })
  .catch(error => {
    alert(error.message);
  });

// Task #2 solution
getAllSuccessfulDetails()
  .then(allPhones => {
    addPhonesList(
      'All Successful',
      'all-successful',
      allPhones,
    );
  })
  .catch(error => {
    alert(error.message);
  });

// Task #3 solution
getThreeFastestDetails()
  // eslint-disable-next-line no-console
  .then(phones => console.log(phones));
