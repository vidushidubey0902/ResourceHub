import { memo } from "react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const PaginationButton = memo(
  ({
    onClick,
    disabled,
    direction,
  }: {
    onClick: () => void;
    disabled: boolean;
    direction: "prev" | "next";
  }) => {
    return (
      <button
        onClick={onClick}
        disabled={disabled}
        className="pagination-button bg-transparent"
      >
        {direction === "prev" ? (
          <MdKeyboardArrowLeft className="text-home-text" />
        ) : (
          <MdKeyboardArrowRight className="text-home-text" />
        )}
      </button>
    );
  }
);

export default PaginationButton;
