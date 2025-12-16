browser.runtime.onInstalled.addListener(() => {
    browser.contextMenus.create({
        id: "dlm-download",
        title: "Download with DLM",
        contexts: ["link"]
    });
});

browser.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId !== "dlm-download") return;
    if (!info.linkUrl) return;

    fetch("http://localhost:8080/api/integration/add", {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            url: info.linkUrl,
            browserId: "firefox"
        })
    }).catch(err => {
        console.error("DLM request failed:", err);
    });
});
