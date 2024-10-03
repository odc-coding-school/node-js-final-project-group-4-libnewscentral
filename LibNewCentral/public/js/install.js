document.addEventListener('DOMContentLoaded', () => {
    const installButton = document.getElementById('installButton');
    const dismissButton = document.getElementById('dismissButton');
    const installBanner = document.getElementById('installBanner');

    let deferredPrompt;

    window.addEventListener('beforeinstallprompt', (e) => {
        console.log('beforeinstallprompt event fired');
        e.preventDefault();
        deferredPrompt = e;
        installBanner.style.display = 'block'; // Show install banner

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/service-worker.js')
                .then(function (registration) {
                    console.log('Service Worker registered with scope:', registration.scope);
                }).catch(function (error) {
                    console.log('Service Worker registration failed:', error);
                });
        }

    });

    installButton.addEventListener('click', async () => {
        console.log('Install button clicked');
        installBanner.style.display = 'none'; // Hide install banner
        if (deferredPrompt) {
            deferredPrompt.prompt(); // Show install prompt
            const { outcome } = await deferredPrompt.userChoice;
            console.log('User choice:', outcome);
            if (outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
        } else {
            console.log('No deferred prompt available');
        }
    });

    dismissButton.addEventListener('click', () => {
        installBanner.style.display = 'none'; // Hide banner when dismissed
    });
});
