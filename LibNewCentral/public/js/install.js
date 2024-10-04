let deferredPrompt;
const installBanner = document.getElementById('installBanner');
const installButton = document.getElementById('installButton');

// Listen for the beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default mini-infobar from appearing
  event.preventDefault();
  // Store the event for later
  deferredPrompt = event;
  // Display the install icon
  installBanner.style.display = 'block';
});

// Handle the install button click
installButton.addEventListener('click', async () => {
  if (deferredPrompt) {
    deferredPrompt.prompt(); // Show the install prompt
    const choiceResult = await deferredPrompt.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    deferredPrompt = null; // Reset the prompt
    installBanner.style.display = 'none'; // Hide the install banner
  }
});
