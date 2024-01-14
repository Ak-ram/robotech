import { Octokit } from "@octokit/rest";

export const updateJsonFile = async (jsonFilePath: string, newData: any[]): Promise<void> => {
  const owner = 'Akram-44';
  const repo = 'api';
  const path = jsonFilePath;
  const token = process.env.NEXT_PUBLIC_AUTH_TOKEN;

  const octokit = new Octokit({ auth: token });

  try {
    const { data } = await octokit.repos.getContent({
      owner,
      repo,
      path,
    });

    if (!Array.isArray(data) || data.length === 0 || !data[0].sha) {
      throw new Error('Invalid response or missing SHA.');
    }

    const sha = data[0].sha;

    await octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message: 'Update JSON file',
      content: Buffer.from(JSON.stringify(newData, null, 2)).toString('base64'),
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