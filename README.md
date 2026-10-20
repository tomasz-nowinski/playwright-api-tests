Playwright API Tests
API automation tests written in Playwright and TypeScript using JSONPlaceholder.

Tech Stack:
- Playwright Test
- TypeScript
- REST API
- JSONPlaceholder

Test Coverage:
Posts API
- GET: retrieve a post and a list of posts
- GET: filter posts by user ID
- POST: create a post
- PUT: update a post
- PATCH: partially update a post
- DELETE: delete a post
- Negative scenarios: non-existing post and empty search results

Users API
- GET: retrieve user details
- Negative scenario: non-existing user

Getting Started:
Install dependencies:
npm install

Run all tests:
npx playwright test

Run tests with the list reporter:
npx playwright test --reporter=list

Generate and open the HTML report:
npx playwright show-report

Notes:
JSONPlaceholder is a mock REST API. Write operations are simulated and do not persist changes to a real database.

This project demonstrates API testing, HTTP status validation, response assertions, TypeScript typing, and negative test scenarios.