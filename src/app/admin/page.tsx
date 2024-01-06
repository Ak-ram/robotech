"use client"
// import { useState, ChangeEvent } from 'react';
// import { Octokit } from '@octokit/rest';

// export default function Home() {
//   const [file, setFile] = useState<File | null>(null);

//   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const selectedFile = event.target.files?.[0];
//     setFile(selectedFile);
//   };

//   const updateFile = async () => {
//     if (!file) {
//       console.error('Please select a file.');
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = async (event) => {
//       const updatedContent = event.target?.result as string;

//       // GitHub repository information
//       const owner = 'Akram-44';
//       const repo = 'api';
//       const path = 'robotech/pages/faq.json';
//       const token = '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';

//       // Create an Octokit instance with your token
//       const octokit = new Octokit({ auth: token });

//       // Get the current file information
//       try {
//         const response = await octokit.repos.getContent({
//           owner,
//           repo,
//           path,
//         });

//         const sha = response.data.sha;

//         // Update the file on GitHub
//         await octokit.repos.createOrUpdateFileContents({
//           owner,
//           repo,
//           path,
//           message: 'Update JSON file',
//           content: Buffer.from(updatedContent).toString('base64'),
//           sha,
//         });

//         console.log('JSON file updated successfully!');
//       } catch (error) {
//         console.error('Error updating JSON file:', error.message);
//       }
//     };

//     reader.readAsText(file);
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={updateFile}>Update JSON File</button>
//     </div>
//   );
// }







// pages/index.tsx
import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Octokit } from '@octokit/rest';

export default function Home() {
  const [jsonData, setJsonData] = useState<any[]>([]);
  const [newName, setNewName] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the existing JSON file from GitHub
    const fetchData = async () => {
      const owner = 'Akram-44';
      const repo = 'api';
      const path = 'robotech/pages/faq.json';
      const token = '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';

      const octokit = new Octokit({ auth: token });

      try {
        const response = await octokit.repos.getContent({
          owner,
          repo,
          path,
        });

        const content = response.data.content;
        const decodedContent = Buffer.from(content, 'base64').toString('utf-8');
        const parsedData = JSON.parse(decodedContent);
        setJsonData(parsedData);
      } catch (error) {
        console.error('Error fetching JSON file:', error.message);
        setError('Error fetching JSON file. Check console for details.');
      }
    };

    fetchData();
  }, []);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewName(event.target.value);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Add a new object to the JSON array
    const updatedData = [...jsonData, { name: newName }];

    // GitHub repository information
    const owner = 'Akram-44';
    const repo = 'api';
    const path = 'robotech/pages/faq.json';
    const token = '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';

    const octokit = new Octokit({ auth: token });

    try {
      const response = await octokit.repos.getContent({
        owner,
        repo,
        path,
      });

      if (!response || !response.data || !response.data.sha) {
        setError('Invalid response or missing SHA.');
        return;
      }

      const sha = response.data.sha;

      // Update the file on GitHub with the modified content
      await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path,
        message: 'Update JSON file',
        content: Buffer.from(JSON.stringify(updatedData, null, 2)).toString('base64'),
        sha,
      });

      console.log('JSON file updated successfully!');
      setError(null);
    } catch (error) {
      console.error('Error updating JSON file:', error.message);

      if (error.status === 401) {
        setError('Bad credentials or insufficient permissions.');
      } else {
        setError(`Error updating JSON file. Check console for details.`);
      }
    }
  };

  return (
    <div>
      <h2>Current JSON Data:</h2>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleFormSubmit}>
        <label>
          New Name:
          <input type="text" value={newName} onChange={handleNameChange} />
        </label>
        <button type="submit">Add Name</button>
      </form>
    </div>
  );
}
