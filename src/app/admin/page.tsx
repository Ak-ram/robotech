"use client"
import { useState, ChangeEvent } from 'react';
import { Octokit } from '@octokit/rest';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile);
  };

  const updateFile = async () => {
    if (!file) {
      console.error('Please select a file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event) => {
      const updatedContent = event.target?.result as string;

      // GitHub repository information
      const owner = 'Akram-44';
      const repo = 'api';
      const path = 'robotech/pages/faq.json';
      const token = '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';

      // Create an Octokit instance with your token
      const octokit = new Octokit({ auth: token });

      // Get the current file information
      try {
        const response = await octokit.repos.getContent({
          owner,
          repo,
          path,
        });

        const sha = response.data.sha;

        // Update the file on GitHub
        await octokit.repos.createOrUpdateFileContents({
          owner,
          repo,
          path,
          message: 'Update JSON file',
          content: Buffer.from(updatedContent).toString('base64'),
          sha,
        });

        console.log('JSON file updated successfully!');
      } catch (error) {
        console.error('Error updating JSON file:', error.message);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={updateFile}>Update JSON File</button>
    </div>
  );
}
