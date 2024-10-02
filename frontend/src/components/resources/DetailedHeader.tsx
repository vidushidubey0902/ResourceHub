import { memo } from "react";

interface DetailedHeaderProps {
  title: string;
  author: string;
  description: string;
  tags: [string];
}

const DetailedHeader = ({
  title,
  author,
  description,
  tags,
}: DetailedHeaderProps) => {
  return (
    <div className="py-2 md:py-3 xl:py-4 flex flex-wrap">
      <div className="w-full md:max-w-[15rem] xl:max-w-lg px-1 md:px-2 xl:px-8">
        <h1 className="capitalize h-fit font-semibold text-base md:text-lg xl:text-xl overflow-hidden text-ellipsis text-home-text theme-transition">
          {title}
        </h1>
        <p className="px-4 md:px-8 xl:px-12 italic tracking-wide text-[0.7rem] md:text-[0.8rem] text-home-text theme-transition font-semibold">
          - {author}
        </p>
      </div>

      <div className="text-xs italic pt-2 font-light px-2 max-w-[10rem] md:max-w-[11rem] lg:max-w-[18rem] xl:max-w-[24rem] max-h-24 w-full overflow-hidden text-ellipsis text-home-text theme-transition">
        <span className="hidden md:inline font-medium">Description:</span> &#40;
        {description}&#41;
      </div>

      <div className="flex-grow">
        <h4 className="hidden md:block text-center px-4 text-[0.7rem] xl:text-[0.8rem] tracking-wider text-home-text theme-transition">
          Tags
        </h4>
        <ul className="flex flex-wrap justify-end gap-2 text-[0.58rem] sm:text-[0.67rem] md:text-[0.7rem] lg:text-xs px-2 md:py-1">
          {tags?.map((tag: string, idx: number) => (
            <li
              key={idx}
              className={`${
                idx === 0 ? "w-1/2" : idx === 1 ? "flex-grow" : "w-full"
              } bg-home-quaternary text-home-text-secondary theme-transition rounded-lg text-center lg:py-0.5`}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default memo(DetailedHeader);
