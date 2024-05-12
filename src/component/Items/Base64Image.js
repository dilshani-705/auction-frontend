import React from 'react';

const Base64Image = ({ base64String }) => {
    if (!base64String) {
        return <div>No image data provided</div>;
    }

    // Decode the Base64 string to binary data
    const binaryString = atob(base64String);

    // Create a Uint8Array from the binary string
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
        byteArray[i] = binaryString.charCodeAt(i);
    }

    // Create a Blob from the Uint8Array
    const blob = new Blob([byteArray], { type: 'image/png' });

    // Create a URL for the Blob
    const imageUrl = URL.createObjectURL(blob);

    // Extract the file name from the Base64 string or use a default name
    const fileName = 'item_image.png';

    return (
        <div>
            {/* Display the image using the created URL with appropriate alternative text */}
            <img src={imageUrl} alt={`Item: ${fileName}`} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
    );
};

export default Base64Image;
