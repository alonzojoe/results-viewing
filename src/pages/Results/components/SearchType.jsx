import { useState, useRef } from "react";
import jsQR from "jsqr";

const SearchType = ({ onSelect, onQRScan }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

        if (qrCode) {
          onQRScan(qrCode.data);
          onSelect((prev) => ({ ...prev, type: 1 }));
        } else {
          onQRScan("No QR code found.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  const selecType = (type) => {
    if (type === "qr") {
      fileInputRef.current.click();
      return;
    }

    onSelect((prev) => ({ ...prev, type: 2 }));
  };

  return (
    <div className="ptype-container d-flex align-items-center transition-fade-in">
      <div className="ptype-btn-container">
        <div className="ptype-btn new" onClick={() => selecType("qr")}>
          <div className="row">
            <i className="fas fa-qrcode col-4"></i>
            <span className="col-8 d-flex align-items-center">QR Code</span>
          </div>
        </div>
        <input
          ref={fileInputRef}
          className="d-none"
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
        />
        <div className="ptype-btn old" onClick={() => selecType("tn")}>
          <div className="d-flex">
            <i className="fas fa-t col-4"></i>
            <span className="col-8 d-flex align-items-center">
              Transaction No
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchType;
