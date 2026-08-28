# Playwright BDD Automation Prototype (pw-bdd)

A robust, incremental QA automation prototype built utilizing Behavior-Driven Development (BDD) methodologies with Playwright, Cucumber, and TypeScript. Designed to demonstrate cross-functional collaboration capabilities, test orchestration, and comprehensive error handling and reporting.

## 🚀 Key Features

*   **BDD with Cucumber:** Declarative Gherkin syntax separating business requirements from technical implementation.
*   **Playwright Integration:** Fast, reliable browser automation handling modern web application architectures (dynamic elements, hidden layers).
*   **API Interception & Mocking:** Integrated Mock Service Worker (MSW) to seamlessly intercept API calls, simulate 4xx/5xx errors, and test error handling gracefully.
*   **Jira Bug Logging (Mocked):** Automated bug creation payload generation upon test failures.
*   **Segmented Execution:** Strictly separated test suites (`@pass` and `@fail_demo`) for precise pipeline orchestration.
*   **Rich Reporting:** Multiple Cucumber HTML Reporter integration enriched with metadata, error traces, and visual screenshots.

## 🛠️ Setup & Installation

1.  **Clone the Repository:**
    ```bash
    git clone <repository_url>
    cd pw-bdd
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Install Playwright Browsers:**
    ```bash
    npx playwright install
    ```

## 🏃 Execution Commands

The test suites are segmented using Cucumber tags. MSW mocking is enabled by default via the `MOCK_API=true` environment variable within the configuration.

### 1. Run the Happy Path Suite
Executes successful E2E UI checkouts, UI edge cases, and API validations.
```bash
npm run test:pass_suite
```

### 2. Run the Negative Path Suite (Demo Failures)
Executes scenarios intentionally designed to fail to demonstrate error capture and mock Jira bug logging.
```bash
npm run test:demo_failure
```

### 3. Generate Reports
To view the generated HTML report after a test run:
```bash
npm run posttest
```
Reports are available in `test-results/reports/`.

## 🔄 Transitioning Jira Mock to a Live API

Currently, the framework uses MSW to mock the Jira REST API (`POST /rest/api/2/issue`). To connect this to a live Jira instance, the integration follows industry-standard secure token handling:

1.  **Disable the Mock:**
    In your CI environment or `.env` file, set `MOCK_API=false`.
2.  **Set Environment Variables:**
    Set the following variables securely in your CI/CD pipeline (e.g., GitHub Secrets) or local `.env` file. Do not commit credentials directly into the codebase.
    *   `JIRA_API_URL` (e.g., `https://your-domain.atlassian.net/rest/api/2/issue`)
    *   `JIRA_EMAIL`
    *   `JIRA_API_TOKEN`
3.  **Payload Adjustment:**
    Ensure the JSON payload in `src/utils/jiraService.ts` strictly conforms to your Jira project's required fields (e.g., Custom Fields, Issue Types).

## 📄 Documentation

For a detailed explanation of the architecture, context management, and BDD methodologies, refer to the [Specification Document](./Specification_Document.md).
