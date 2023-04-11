import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

export default function ImageUploader() {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (bookData?.image) {
      const file = new File([], bookData.image, { type: "image/*" });
      setSelectedImage(URL.createObjectURL(file));
      fileInputRef.current.value = "";
    }
  }, [bookData]);

  function handleImageUpload(event) {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        required
        ref={fileInputRef}
        onChange={handleImageUpload}
      />
      {selectedImage && <Image src={selectedImage} alt="Selected Image" />}
    </div>
  );
}
