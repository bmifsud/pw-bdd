# QA Automation Specification Document

## 1. Overview
This prototype implements a modern QA automation framework leveraging **Playwright**, **Cucumber (BDD)**, and **TypeScript**. The goal is to provide a scalable, maintainable architecture that bridges the gap between technical execution and business requirements.

## 2. Methodology: Behavior-Driven Development (BDD)
BDD shifts the focus from writing technical test scripts to defining expected system behavior through collaborative, human-readable scenarios.
*   **Gherkin Syntax (Given/When/Then):** Feature files act as living documentation. They represent the single source of truth for requirements, enabling Product Owners, Developers, and QA to align before code is written.
*   **Separation of Concerns:** Business logic resides in `.feature` files, while DOM interactions and technical assertions are encapsulated within `.steps.ts` definitions.

## 3. Architecture & Context Management
Managing state and context across asynchronous test steps is critical for stable execution.

### Custom Cucumber Fixtures
We utilize a singleton-like pattern (or context object) passed through Cucumber hooks to manage the Playwright `Page` and `BrowserContext` instances.
*   **`pageFixture.ts`:** Holds the current Playwright `Page` object. This allows step definitions across different files to interact with the same browser tab without requiring global variables or complex dependency injection.
*   **Hooks (`hooks.ts`):**
    *   `BeforeAll`: Initializes the Browser and the Mock Service Worker (MSW).
    *   `Before`: Creates a fresh `BrowserContext` and `Page` for **every scenario**, ensuring total isolation and preventing cross-test pollution.
    *   `After`: Evaluates test status. On failure, it captures screenshots, extracts errors, and triggers external logging (e.g., Jira). Cleans up contexts.
    *   `AfterAll`: Tears down the Browser and MSW server.

## 4. Step-Definition Architecture (DRY Principles)
Step definitions are designed to be reusable (DRY - Don't Repeat Yourself).
*   **Action Layers:** Complex UI interactions (like filling out a checkout form) are abstracted into logical blocks within the step definitions. In a larger project, these would be further abstracted into the **Page Object Model (POM)** pattern.
*   **Parameterization:** Gherkin supports passing data directly from the feature file to the step definition, allowing a single step implementation to handle multiple scenarios.

## 5. API Mocking & Interception (MSW)
The framework integrates **Mock Service Worker (MSW)**.
*   **Deterministic Testing:** By mocking APIs (e.g., Jira, RESTful Booker), tests run faster and are isolated from external network flakiness.
*   **Error Simulation:** We intentionally route traffic to mock endpoints that return `500 Internal Server Error` to validate the framework's ability to gracefully handle negative paths and log comprehensive error reports.

## 6. Continuous Integration & Reporting
*   **Segmented Workflows:** GitHub Actions are configured to run specific test tags (`@pass` vs `@fail_demo`). This allows for granular pipeline controls (e.g., running smoke tests on PRs, full suites on merge).
*   **Rich HTML Reporting:** Integrates Multiple Cucumber HTML Reporter. The `After` hook embeds screenshots directly into the Cucumber JSON output, which is then parsed into a rich, visual HTML report containing execution metadata.
