document.addEventListener('DOMContentLoaded', () => {
    
    const loginBtn = document.getElementById('login-btn');
    const backBtn = document.getElementById('back-btn');
    const progressBar = document.getElementById('progress-bar-placeholder');
    const contentPlaceholder = document.getElementById('main-content-placeholder');

    const inspectionFormUrl = 'Components/inspection-form.html';
    const loginFormUrl = 'Components/login-form.html';

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
                    
                    // --- ANIMATION LOGIC ---
                    // 1. Add the animation class
                    element.classList.add('animate-fade-in');

                    // 2. Remove the class after the animation ends
                    //    so it can be re-applied on the next load.
                    element.addEventListener('animationend', () => {
                        element.classList.remove('animate-fade-in');
                    }, { once: true }); // 'once: true' automatically removes the listener

                } else {
                    console.error(`Error: Element with selector '${selector}' not found.`);
                }
            })
            .catch(error => console.error(error));
    }

    // Function to show the main inspection page
    function showInspectionPage() {
        progressBar.classList.remove('hidden');
        loadComponent('#main-content-placeholder', inspectionFormUrl);
        loginBtn.classList.remove('hidden');
        backBtn.classList.add('hidden');
    }

    // Function to show the login page
    function showLoginPage() {
        progressBar.classList.add('hidden');
        loadComponent('#main-content-placeholder', loginFormUrl);
        loginBtn.classList.add('hidden');
        backBtn.classList.remove('hidden');
    }

    // --- Event Listeners ---
    
    loginBtn.addEventListener('click', showLoginPage);
    backBtn.addEventListener('click', showInspectionPage);

    // --- Initial Page Load ---
    
    loadComponent('#progress-bar-placeholder', 'Components/progress-bar.html');
    showInspectionPage(); // This will now fade in the inspection form on load
});