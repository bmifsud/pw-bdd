import { logger } from './logger';

export async function logBugToJira(scenarioName: string, errorMessage: string, base64Screenshot: string) {
    const jiraUrl = process.env.MOCK_API === 'true'
        ? 'http://127.0.0.1:9090/rest/api/2/issue'
        : 'https://your-domain.atlassian.net/rest/api/2/issue';

    const payload = {
        fields: {
            project: { key: "QA" },
            summary: `Automated Test Failure: ${scenarioName}`,
            description: `Test failed with error:\n\n{code}${errorMessage}{code}`,
            issuetype: { name: "Bug" }
        }
    };

    try {
        logger.info(`Sending bug report to Jira for scenario: ${scenarioName}`);
        const response = await fetch(jiraUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from('email:token').toString('base64')}`
            },
            body: JSON.stringify(payload)
        });

        if (response.ok) {
            const data = await response.json() as any;
            logger.info(`Bug logged successfully in Jira. Ticket ID: ${data.key}`);
        } else {
            logger.error(`Failed to log bug to Jira. Status: ${response.status}`);
        }
    } catch (error) {
        logger.error(`Error logging bug to Jira: ${error}`);
    }
}
