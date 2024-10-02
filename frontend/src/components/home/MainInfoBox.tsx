import MainHeaderButtons from "./MainHeaderButtons";
import MainBannerHeadings from "./MainBannerHeadings";
import mainBannerImage from "../../assets/coding-img.webp";

const MainInfoBox = () => {
  return (
    <div className="h-full flex justify-between px-1 py-2 bg-gradient-to-br from-home-primary via-white/10 to-home-secondary shadow-md shadow-black/20 relative rounded-xl">
      <MainBannerHeadings />
      <img
        src={mainBannerImage}
        alt="help"
        className="absolute left-[40%] top-[30%] w-20 sm:w-32 sm:top-[20%] sm:left-[35%] md:left-1/2 md:top-1/3 md:w-24 lg:w-40 lg:left-[35%] lg:top-[23%] xl:w-52 xl:top-[10%]"
      />
      <MainHeaderButtons />
    </div>
  );
};

export default MainInfoBox;
