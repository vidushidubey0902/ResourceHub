import { useEffect } from "react";

import BoxHeading from "./BoxHeading";
import StatsNumber from "./StatsDetails";
import TextWithLinks from "./TextWithLinks";
import { useUserStatsMutation } from "../../slices/usersApiSlice";

const DisplayTotalContributions = () => {
  const [userStats, { data, isError, isLoading }] = useUserStatsMutation();

  useEffect(() => {
    userStats();
  }, []);

  if (isError) {
    return (
      <p className="text-home-text text-sm flex items-center justify-center h-full italic">
        Error fetching stats
      </p>
    );
  }

  if (isLoading) {
    return (
      <p className="text-home-text text-sm flex items-center justify-center h-full italic">
        Loading stats
      </p>
    );
  }

  return (
    <div className="grid grid-rows-[1fr_1fr_1fr] py-2 gap-y-4 h-full">
      <div className="grid grid-cols-2">
        <BoxHeading text="Ratings" />
        <BoxHeading text="Contributions" />
      </div>

      <div className="grid grid-cols-2">
        <StatsNumber number={data?.averageRating} decimal={true} />
        <StatsNumber number={data?.totalContributions} />
      </div>

      <TextWithLinks
        message={[
          "Give back to the community by contributing your own ",
          " or ",
          " for other developers to access.",
        ]}
        links={[
          { to: "/resources", text: "resources" },
          { to: "/roadmaps", text: "roadmaps" },
        ]}
      />
    </div>
  );
};

export default DisplayTotalContributions;
