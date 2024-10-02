import TextWithLinks from "./TextWithLinks";
import SponsorDetails from "./SponsorDetails";
import { currentSponsors } from "../../utils/constants";

const DisplaySponsors = () => {
  return (
    <div className="h-full grid grid-rows-3 rounded-xl px-1 gap-2">
      {currentSponsors.map((sponsor, idx) => (
        <SponsorDetails
          eventName={sponsor.eventName}
          eventDate={sponsor.eventDate}
          eventLink={sponsor.eventLink}
          key={idx}
        />
      ))}

      <TextWithLinks
        message={[
          "You can ",
          " to sponsor your own events to be displayed here, and help it reach an even wider audience.",
        ]}
        links={[{ to: "/contact", text: "contact us" }]}
      />
    </div>
  );
};

export default DisplaySponsors;
