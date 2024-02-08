export function downloadJSON(url,fileName) {
    // URL of the JSON file
    const jsonUrl = url;

    // Fetch the JSON file
    fetch(jsonUrl)
        .then(response => response.json())
        .then(data => {
            // Convert JSON data to string
            const jsonData = JSON.stringify(data, null, 2);
            
            // Create a Blob object to represent the JSON data
            const blob = new Blob([jsonData], { type: 'application/json' });

            // Create a link element
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            
            // Set the filename for the downloaded file
            link.download = fileName;

            // Append the link to the body and click it programmatically
            document.body.appendChild(link);
            link.click();

            // Cleanup
            document.body.removeChild(link);
        })
        .catch(error => console.error('Error fetching JSON:', error));
}