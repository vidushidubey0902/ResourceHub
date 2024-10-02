import { Link } from "react-router-dom";
import { TextWithLinksProps } from "../../utils/types";

const TextWithLinks = ({ message, links }: TextWithLinksProps) => {
  return (
    <p className="text-center italic font-extralight text-[0.67rem] sm:text-xs lg:text-sm p-1 text-home-text theme-transition">
      {message[0]}
      {links.map((link, index) => (
        <span key={index}>
          <Link
            to={link.to}
            className="text-home-text-link inline-flex font-semibold hover:underline decoration-[1.5px] relative group cursor-pointer hover:text-home-text hover:font-black transition-all duration-500 ease-in-out"
          >
            {link.text}
            <span className="absolute left-0 top-0 h-full w-0 group-hover:w-full bg-purple-300/40 transition-all duration-500 ease-in-out"></span>
          </Link>
          {message[index + 1]}
        </span>
      ))}
    </p>
  );
};

export default TextWithLinks;
