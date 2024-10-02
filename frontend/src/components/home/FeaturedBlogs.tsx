import BoxHeading from "./BoxHeading";

const FeaturedBlogs = () => {
  return (
    <div className="bg-gradient-to-br from-home-tertiary via-home-accent to-home-accent h-full rounded-xl shadow-md shadow-black/15 grid grid-rows-[auto_1fr] theme-transition">
      <BoxHeading text="Featured Blogs" />

      <div className="px-3 py-1 md:py-2">
        <div className="grid grid-cols-2 lg:grid-cols-[20%_60%_20%] h-full">
          <div className="p-2">
            <div className="bg-gradient-to-b from-home-primary to-home-secondary h-full p-1 shadow rounded-lg">
              <h2 className="text-center whitespace-nowrap overflow-clip text-ellipsis font-semibold text-xs lg:text-sm text-home-text">
                How to Write Efficient Code
              </h2>
              <a
                href="https://medium.com/@akash.chhabra/how-to-write-clean-and-efficient-code-in-software-development-4f7a887576ec"
                className="block h-full"
                target="_blank"
              >
                <img
                  src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*E7QNroU0om-vxuD4v8tyQw.png"
                  alt="Jack-o-Lantern Concept Illustration"
                  className="w-full h-36 object-cover rounded-lg"
                />
              </a>
            </div>
          </div>

          <div className="p-2 order-1 lg:order-none col-span-2 lg:col-span-1">
            <div className="bg-gradient-to-b from-home-primary to-home-secondary h-full p-1 shadow rounded-lg">
              <h2 className="text-center whitespace-nowrap overflow-clip text-ellipsis font-semibold text-xs lg:text-sm text-home-text">
                The DDD Way toward Screaming Design
              </h2>
              <a
                href="https://medium.com/code-like-a-girl/the-ddd-way-toward-screaming-design-our-way-continues-2b33353e8bc0"
                className="block h-full"
                target="_blank"
              >
                <img
                  src="https://miro.medium.com/v2/resize:fit:1100/format:webp/1*UQuipXTIha9OHgYydLPEgA.png"
                  alt="Jack-o-Lantern Concept Illustration"
                  className="w-full h-36 object-cover rounded-lg"
                />
              </a>
            </div>
          </div>

          <div className="p-2">
            <div className="bg-gradient-to-b from-home-primary to-home-secondary h-full p-1 shadow rounded-lg">
              <h2 className="text-center whitespace-nowrap overflow-clip text-ellipsis font-semibold text-xs lg:text-sm text-home-text">
                ASP .NET Core
              </h2>
              <a
                href="https://medium.com/@zealousweb/signalr-to-send-real-time-notifications-with-asp-net-core-c6c91ccbc640"
                className="block h-full"
                target="_blank"
              >
                <img
                  src="https://miro.medium.com/v2/resize:fit:828/format:webp/0*TO81DrlKNGZVB-Q_.png"
                  alt="Jack-o-Lantern Concept Illustration"
                  className="w-full h-36 object-cover rounded-lg"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBlogs;
