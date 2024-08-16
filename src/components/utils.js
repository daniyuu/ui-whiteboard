export function copyToClipboard(value) {
    return new Promise((resolve, reject) => {
        const clipboard = navigator.clipboard;
        if (!clipboard) {
            const textarea = document.createElement("textarea");
            textarea.value = stringValue;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand("copy");
            document.body.removeChild(textarea);
            resolve();
        } else {
            clipboard.writeText(value).then(
                () => {
                    // success
                    resolve();
                },
                err => {
                    // fail
                    reject(err);
                }
            );
        }
    });
}
