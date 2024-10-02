import { twMerge } from "tailwind-merge";
import { ContainerProps } from "../../utils/types";

const Container = ({ children, className }: ContainerProps) => {
  return (
    <div className={twMerge("mx-auto max-w-[1200px] px-6", className)}>
      {children}
    </div>
  );
};

export default Container;
