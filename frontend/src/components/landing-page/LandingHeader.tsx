import { Link } from "react-router-dom";
import Container from "./Container";
import Button from "./Button";

const LandingHeader = () => {
  return (
    <>
      <header className="bg-landing-bg-contrast text-green-50 relative z-20">
        <Container className="flex items-center min-h-[--header-row-height]">
          <Link
            to="/home"
            className="h-[--header-row-height] flex items-center px-6 -ml-6"
          >
            <img src="/Dev10-Logo2.png" alt="" className="w-7" />
            <span className="sr-only">Go to home page</span>
          </Link>
        </Container>
      </header>

      <div className="sticky top-0 bg-landing-bg-contrast text-green-50 z-20">
        <Container className="flex justify-between items-center min-h-11">
          <p className="text-xl font-semibold">Dev-10</p>
          <Button size="small">Join Now</Button>
        </Container>
      </div>
    </>
  );
};

export default LandingHeader;
