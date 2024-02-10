const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {  
    console.log('beforeinstallprompt');

event.preventDefault();

window.deferredPrompt = event;});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {

    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
      return;
    }
    promptEvent.prompt();
    // Wait for the user to respond to the prompt
    const choiceResult = await promptEvent.userChoice;
    console.log('User choice:', choiceResult);
    // Clear the deferredPrompt variable
    window.deferredPrompt = null;


});


// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log('App installed:', event);
});
