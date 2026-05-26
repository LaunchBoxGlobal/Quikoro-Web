import React from "react";
import { BurgerIcon } from "../../assets/export";

const BudgetListItem = ({ icon, alt, iconWidth = 26, iconHeight = 26 }) => {
  return (
    <div className="w-full bg-transparent custom-shadow border-2 border-white p-4 rounded-[16px]">
      <div className="w-full flex items-center justify-between gap-4">
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
            <h3 className="text-base lg:text-lg font-semibold">
              Food & Dining
            </h3>
            <p className="text-[var(--secondary)] text-sm">On Track</p>
          </div>
        </div>

        <div className="text-end space-y-1">
          <p className="font-semibold text-[var(--green)] text-sm">USD 60.00</p>
          <p className="font-semibold text-[var(--secondary)] text-sm">
            of USD 200.00
          </p>
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="w-full bg-[#D4EDD7] rounded-full h-2">
          <div className="bg-[var(--green)] h-2 rounded-full w-[50%]"></div>
        </div>
        <div className="w-full mt-1.5 text-end">
          <p className="text-xs text-[var(--secondary)]">
            USD 140.00 remaining
          </p>
        </div>
      </div>
    </div>
  );
};

export default BudgetListItem;
