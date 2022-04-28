import React, { useEffect } from "react";

const Popup = ({
  name,
  children,
  isOpen,
  onClose,
  buttonText = "Сохранить",
  onSubmit,
}) => {
  const handleEscClose = (e) => {
    if (
      e.key === "Escape" ||
      e.target.classList.contains("popup__close") ||
      e.target.classList.contains("popup_opened")
    ) {
      onClose(e);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      document.addEventListener("mousedown", handleEscClose);
      return () => {
        document.removeEventListener("keydown", handleEscClose);
        document.removeEventListener("mousedown", handleEscClose);
      };
    }
  });

  const handleClickButton = () => {
    onSubmit();
    onClose();
  }

  return (
    <div>
      <div
        id={name}
        className={
          isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`
        }
      >
        <div className="popup__container">
          {children}
          <button className="popup__save-btn" onClick={handleClickButton}>
            {buttonText}
          </button>
        </div>

      </div>
    </div>
  );
}

export default Popup;
