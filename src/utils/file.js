export function handleOpenFileDialog(allow = null, multiple = false) {
    return new Promise((resolve) => {
        const input = document.createElement("input");
        input.type = "file";
        input.multiple = multiple;
        if (allow) {
            input.accept = allow;
        }
        // if user cancles the dialog, resolve with null
        input.onchange = (event) => {
            resolve(event.target.files);
        };
        input.oncancel = () => {
            resolve(null);
        };
        input.click();
    });
}

export async function handleGetImage2Base64() {
    const files = await handleOpenFileDialog("image/*");
    if (!files || files.length === 0) {
        return null;
    }
    const file = files[0];
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
            resolve(event.target.result);
        };
        reader.readAsDataURL(file);
    });
}