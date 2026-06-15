import React from "react";
import { BurgerIcon } from "../../assets/export";

const TransactionCard = ({
  icon,
  alt,
  iconWidth = 26,
  iconHeight = 26,
  children,
}) => {
  return (
    <div className="w-full bg-transparent custom-shadow border-2 border-white p-4 rounded-[16px] flex items-center justify-between gap-2 flex-wrap">
      <div className="flex items-center gap-2">
        {BurgerIcon && (
          <div className="w-[48px] h-[48px] custom-shadow rounded-[12px] flex items-center justify-center">
            <img
              src={BurgerIcon}
              alt={alt}
              width={iconWidth}
              height={iconHeight}
            />
          </div>
        )}

        <div className="">
          <h3 className="text-base lg:text-lg font-semibold">Food & Dining</h3>
          <p className="text-[var(--secondary)] text-sm">02 Feb,2026</p>
        </div>
      </div>

      <div className="flex flex-col items-end text-end">{children}</div>
    </div>
  );
};

export default TransactionCard;
