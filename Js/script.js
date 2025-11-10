document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch and load an HTML file
    function loadComponent(selector, url) {
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to load component: ${url}`);
                }
                return response.text();
            })
            .then(data => {
                const element = document.querySelector(selector);
                if (element) {
                    element.innerHTML = data;
                } else {
                    console.error(`Error: Element with selector '${selector}' not found.`);
                }
            })
            .catch(error => console.error(error));
    }

    // Load the progress bar component
    loadComponent('#progress-bar-placeholder', 'Components/progress-bar.html');
});