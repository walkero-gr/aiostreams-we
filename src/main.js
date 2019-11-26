/*
Called when the item has been created, or when creation failed due to an error.
We'll just log success/failure here.
*/
function onCreated() {
    if (browser.runtime.lastError) {
        console.log(`Error: ${browser.runtime.lastError}`);
    } else {
        console.log("Item created successfully");
    }
}

/*
Called when the item has been removed.
We'll just log success here.
*/
function onRemoved() {
    console.log("Item removed successfully");
}

/*
Called when there was an error.
We'll just log the error here.
*/
function onError(error) {
    console.log(`Error: ${error}`);
}

function onExecuteResponse(response) {
    console.log(`Received ${response}`);
}

/*
Create all the context menu items.
*/
browser.menus.create({
    id: "twitch",
    title: "Play with Twitch",
    contexts: ["link"],
    icons: {
      "16": "icons/twitch.svg",
      "32": "icons/twitch.svg",
      "48": "icons/twitch.svg"
    }
}, onCreated);

browser.menus.create({
    id: "mixer",
    title: "Play with Mixer",
    contexts: ["link"],
    icons: {
      "16": "icons/windows.svg",
      "32": "icons/windows.svg",
      "48": "icons/windows.svg"
    }
}, onCreated);

var pythonExecutable = 'python2.7';
var scriptsPath = '/aiostreams/';

function runScript(script, url) {
    var application = pythonExecutable + ' ' + scriptsPath + script + ' -u ' + url;
    console.log(application);
    // TODO: Find a way to execute the script on the local machine
    // var execute = browser.runtime.sendNativeMessage(
    //     'python2.7',
    //     {}
    // )
    // execute.then(onExecuteResponse, onError);
}

/*
The click event listener, where we perform the appropriate action given the
ID of the menu item that was clicked.
*/
browser.menus.onClicked.addListener((info, tab) => {
    console.log(info);
    switch (info.menuItemId) {
      case "twitch":
        console.log('Twitch selected');
        runScript('twitch.py', info.linkUrl);
        break;
      case "mixer":
        console.log('Mixer selected');
        runScript('mixer.py', info.linkUrl);
        break;
    }
});