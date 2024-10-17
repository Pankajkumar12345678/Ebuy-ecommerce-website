
// this method-1 only limited size of profile image save

// const imageTobase64 = async(image)=>{
//     const reader = new FileReader()
//     reader.readAsDataURL(image)

//     const data = await new Promise((resolve,reject)=>{
//         reader.onload=()=>resolve(reader.result)

//         reader.onerror=error=>reject(error)
//     })

//     return data
// }

// export default imageTobase64





const imageTobase64 = async (image) => {  // method 2 uuload 1 mb image in our profilePic

    const maxFileSize = 1024 * 1024; // 1MB

    // Check file size
    if (image.size > maxFileSize) {
        throw new Error("File size exceeds 1MB limit");
    }

    // Create an image element
    const img = new Image();
    img.src = URL.createObjectURL(image);

    // Wait for the image to load
    await new Promise((resolve) => {
        img.onload = resolve;
    });

    // Create a canvas element to resize the image
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set the desired width and height (you can adjust the size)
    const maxWidth = 500;
    const maxHeight = 500;

    let width = img.width;
    let height = img.height;

    // Maintain the aspect ratio
    if (width > height) {
        if (width > maxWidth) {
            height *= maxWidth / width;
            width = maxWidth;
        }
    } else {
        if (height > maxHeight) {
            width *= maxHeight / height;
            height = maxHeight;
        }
    }

    // Set canvas dimensions
    canvas.width = width;
    canvas.height = height;

    // Draw the resized image onto the canvas
    ctx.drawImage(img, 0, 0, width, height);

    // Convert canvas to base64 string
    const data = canvas.toDataURL("image/jpeg");

    return data;
};

export default imageTobase64;
