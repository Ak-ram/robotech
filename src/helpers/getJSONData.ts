import { Octokit } from "@octokit/rest";

interface FileContent {
    content: string;
}

export const fetchJsonData = async (jsonFilePath:string): Promise<any[]> => {
    const owner = 'Akram-44';
    const repo = 'api';
    const path = jsonFilePath;
    const token = process.env.REACT_APP_GITHUB_TOKEN;

    const octokit = new Octokit({ auth: token });

    try {
        const response = await octokit.repos.getContent({
            owner,
            repo,
            path,
        });

        if (Array.isArray(response.data)) {
            throw new Error('Expected file content, but received an array of items.');
        }

        if ('content' in response.data) {
            const fileContent: FileContent = response.data as FileContent;
            const decodedContent = Buffer.from(fileContent.content, 'base64').toString('utf-8');
            return JSON.parse(decodedContent);
        } else {
            throw new Error('File content is missing in the response.');
        }
    } catch (error) {
        console.error('Error fetching JSON file:', (error as Error).message);
        throw new Error('Error fetching JSON file. Check console for details.');
    }
};
