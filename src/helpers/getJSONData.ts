// apiService.ts
import { Octokit } from "@octokit/rest";

export const fetchJsonData = async () => {
    const owner = 'Akram-44';
    const repo = 'api';
    const path = 'robotech/pages/faq.json';
    const token = process.env.REACT_APP_GITHUB_TOKEN;

    const octokit = new Octokit({ auth: token });


    try {
        const response = await octokit.repos.getContent({
            owner,
            repo,
            path,
        });

        const content = response.data.content;
        const decodedContent = Buffer.from(content, 'base64').toString('utf-8');
        return JSON.parse(decodedContent);
    } catch (error) {
        console.error('Error fetching JSON file:', (error as Error).message);
        throw new Error('Error fetching JSON file. Check console for details.');
    }
};

export const updateJsonFile = async (data: any[]) => {
    const owner = 'Akram-44';
    const repo = 'api';
    const path = 'robotech/pages/faq.json';
    const token = process.env.REACT_APP_GITHUB_TOKEN;

    const octokit = new Octokit({ auth: token });
    try {
        const response = await octokit.repos.getContent({
            owner,
            repo,
            path,
        });

        if (!response || !response.data || !response.data.sha) {
            throw new Error('Invalid response or missing SHA.');
        }

        const sha = response.data.sha;

        await octokit.repos.createOrUpdateFileContents({
            owner,
            repo,
            path,
            message: 'Update JSON file',
            content: Buffer.from(JSON.stringify(data, null, 2)).toString('base64'),
            sha,
        });

        console.log('JSON file updated successfully!');
    } catch (error) {
        console.error('Error updating JSON file:', (error as Error).message);

        if ((error as { status?: number }).status === 401) {
            throw new Error('Bad credentials or insufficient permissions.');
        } else {
            throw new Error('Error updating JSON file. Check console for details.');
        }
    }
};