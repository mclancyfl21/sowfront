// sowfront/src/lib/fileUtils.js

export const base64ToBlob = (base64, contentType) => {
    const byteCharacters = atob(base64);
    const arrayBuffer = new ArrayBuffer(byteCharacters.length);
    const byteArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArray[i] = byteCharacters.charCodeAt(i);
    }

    return new Blob([arrayBuffer], { type: contentType });
};
