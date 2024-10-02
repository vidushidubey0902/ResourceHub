import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import HomeHeader from "./HomeHeader";
import MainInfoBox from "./MainInfoBox";
import { RootState } from "../../store";
import NotesSection from "./NotesSection";
import AddNoteModal from "./AddNoteModal";
import ShowAllNotes from "./ShowAllNotes";
import RecentVisits from "./RecentVisits";
import FeaturedBlogs from "./FeaturedBlogs";
import DisplaySponsors from "./DisplaySponsors";
import ApiCodeGenerator from "./ApiCodeGenerator";
import { useGetNotesQuery } from "../../slices/notesApiSlice";
import DisplayTotalContributions from "./DisplayTotalContributions";
import FloatingChatbotButton from "../FloatingChatbotButton";

const HomePage = () => {
  const userInfo = useSelector((state: RootState) => state.auth.userInfo);
  const [isCreateNoteModalOpen, setIsCreateNoteModalOpen] =
    useState<boolean>(false);
  const [isAllNotesModalOpen, setIsAllNotesModalOpen] =
    useState<boolean>(false);

  const { data, isError, isLoading, refetch } = useGetNotesQuery();

  const handleCreateNote = () => setIsCreateNoteModalOpen(true);
  const handleViewAllNotes = () => setIsAllNotesModalOpen(true);

  useEffect(() => {
    if (userInfo) {
      refetch();
    }
  }, [userInfo]);

  return (
    <div className="bg-home-bg">
      <HomeHeader name={userInfo?.name!} />
      <div className="grid grid-cols-1 md:grid-cols-[57%_43%] lg:grid-cols-[60%_40%]">
        <div className="grid grid-cols-2 grid-rows-2 px-0.5 pt-2 md:px-2 md:py-3">
          <div className="col-span-2">
            <MainInfoBox />
          </div>

          <div className="col-span-2 px-0.5 pt-2 md:pt-3">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 h-full">
              <div className="order-2 md:order-1 bg-gradient-to-br from-home-tertiary to-home-accent shadow-md shadow-black/10 theme-transition rounded-xl p-1">
                <DisplayTotalContributions />
              </div>
              <div className="order-1 md:order-2 bg-gradient-to-br from-home-tertiary to-home-accent shadow-md shadow-black/10 theme-transition rounded-xl p-1">
                <DisplaySponsors />
              </div>
            </div>
          </div>
        </div>

        <div className="px-0.5 py-2 md:px-2 md:py-3">
          <div className="grid grid-cols-2 md:grid-cols-1 md:grid-rows-2 gap-1.5">
            <div className="h-full">
              <NotesSection
                isError={isError}
                isLoading={isLoading}
                handleViewAllNotes={handleViewAllNotes}
                handleCreateNote={handleCreateNote}
                data={data?.slice(0, 2)}
              />
            </div>

            <div className="pt-2 md:pt-3 p-2 bg-gradient-to-b from-home-secondary via-home-bg to-home-accent theme-transition shadow-md shadow-black/10 rounded-xl">
              <ApiCodeGenerator />
            </div>
          </div>
        </div>

        <div className="px-0.5 py-2 md:px-2 md:py-3">
          <FeaturedBlogs />
        </div>
        <div className="px-0.5 py-2 md:px-2 md:py-3">
          <RecentVisits />
        </div>
      </div>

      <FloatingChatbotButton />

      <AddNoteModal
        isOpen={isCreateNoteModalOpen}
        onRequestClose={() => setIsCreateNoteModalOpen(false)}
        requestRefetch={refetch}
      />
      <ShowAllNotes
        isOpen={isAllNotesModalOpen}
        notes={data}
        onRequestClose={() => setIsAllNotesModalOpen(false)}
        requestRefetch={refetch}
      />
    </div>
  );
};

export default HomePage;
