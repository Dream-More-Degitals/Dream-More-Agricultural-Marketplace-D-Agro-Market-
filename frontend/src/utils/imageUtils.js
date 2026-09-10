export const compressImage = (
  file,
  maxWidth = 900,
  maxHeight = 900,
  quality = 0.75
) => {
  return new Promise((resolve, reject) => {
    if (!file) {
      reject(new Error("No image selected."));
      return;
    }

    if (!file.type.startsWith("image/")) {
      reject(new Error("Please select an image file."));
      return;
    }

    // Maximum original image size: 5 MB
    if (file.size > 5 * 1024 * 1024) {
      reject(new Error("Image must be smaller than 5 MB."));
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Resize while maintaining aspect ratio
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(
            maxWidth / width,
            maxHeight / height
          );

          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        context.drawImage(
          img,
          0,
          0,
          width,
          height
        );

        // Compress image
        const compressedImage = canvas.toDataURL(
          "image/jpeg",
          quality
        );

        resolve(compressedImage);
      };

      img.onerror = () => {
        reject(new Error("Could not load the image."));
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error("Could not read the image."));
    };

    reader.readAsDataURL(file);
  });
};