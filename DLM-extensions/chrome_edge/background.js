chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
        id: "dlm-download",
        title: "Download with DLM",
        contexts: ["link"]
    });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId !== "dlm-download") return;
    if (!info.linkUrl) return;

    await fetch("http://localhost:8080/api/integration/add", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            url: info.linkUrl,
            browserId: "chrome-edge"
        })
    });

    console.log("URL sent to Download Manager:", info.linkUrl);
});
