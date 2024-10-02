import { Suspense, ReactNode } from "react";
import LoaderAnimation from "../components/LoaderAnimation";

const withSuspense = (Component: ReactNode) => {
  return (
    <Suspense fallback={<LoaderAnimation onComplete={() => {}} />}>
      {Component}
    </Suspense>
  );
};

export default withSuspense;
