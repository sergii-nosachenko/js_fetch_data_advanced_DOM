1. Replace `<your_account>` with your Github username in the link
    - [DEMO LINK](https://sergii-nosachenko.github.io/js_fetch_data_advanced_DOM/)
2. Follow [this instructions](https://mate-academy.github.io/layout_task-guideline/)
    - Run `npm run test` command to test your code;
    - Run `npm run test:only -- -n` to run fast test ignoring linter;
    - Run `npm run test:only -- -l` to run fast test with additional info in console ignoring linter.

### Task: Fetch data (advanced)

API Url:
- Details URL: https://mate-academy.github.io/phone-catalogue-static/api/phones/:phoneId.json

The main goal of this task is an advanced using of Promises.

Create next functions:
- `getFirstReceivedDetails` which takes array of phone's ID and `resolves` with the first received detail (the fastest response NOT the first in the list). Ignore the other responses;
- `getAllSuccessfulDetails` which takes array of phones' IDs and `resolves` with an array of all successfully received details (errors should be ignored).

(optional) `getThreeFastestDetails` which takes array of phones IDs and `resolves` with an array of the details for the first 3 responses (the fastest).

Hints:
- You have to use DOM to notify users about resolved or rejected promises;
- Create <div> elements with classes `first-received` and `all-successful` which contain list of phones;
- Each <div> element should have <h3> headings with `First Received` or `All Successful` text;
- All IDs and names of phones should be inside of  <li> elements.
