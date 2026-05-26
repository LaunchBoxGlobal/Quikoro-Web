import React from "react";
import { GreenBackgroundBlur } from "../../assets/export";
import { CgClose } from "react-icons/cg";

const Modal = ({
  isOpen,
  onClose,
  icon,
  alt,
  title,
  description,
  children,
  footer,
  width = 106,
  height = 106,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* modal */}
      <div className="relative bg-[#EDF1F2] rounded-2xl w-full max-w-md py-6 lg:py-10 px-5 lg:px-10 z-10 animate-scaleIn">
        <button
          type="button"
          onClick={onClose}
          className="w-[26px] h-[26px] lg:w-[36px] lg:h-[36px] custom-shadow rounded-lg flex items-center justify-center absolute top-4 right-4 z-30"
        >
          <CgClose />
        </button>
        {/* icon */}
        {icon && (
          <img
            src={icon}
            alt={alt}
            width={width}
            height={height}
            className="mx-auto"
          />
        )}

        {/* title */}
        {title && (
          <h2 className="text-[24px] font-bold text-center mt-4">{title}</h2>
        )}

        {/* description */}
        {description && (
          <p className="text-base text-[var(--secondary)] text-center mt-1">
            {description}
          </p>
        )}

        {/* custom content */}
        {children && <div className="">{children}</div>}

        {/* footer */}
        {footer && (
          <div className="mt-6 flex justify-center gap-3">{footer}</div>
        )}
      </div>
    </div>
  );
};

export default Modal;
