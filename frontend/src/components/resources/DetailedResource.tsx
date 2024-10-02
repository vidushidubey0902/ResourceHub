import { toast } from "react-toastify";
import { BsEye } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaRegBookmark } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GoBookmarkFill, GoBookmarkSlashFill, GoReport } from "react-icons/go";

import ReviewForm from "./ReviewForm";
import { RootState } from "../../store";
import DetailedHeader from "./DetailedHeader";
import DetailedLinksAndNotes from "./DetailedLinksAndNotes";
import {
  useGetResourceByIdMutation,
  useGetLatestCommentsQuery,
  useCheckIfResourceFavoritedQuery,
  useAddFavoriteResourceMutation,
  useRemoveFavoriteResourceMutation,
} from "../../slices/resourcesApiSlice";
import { LatestCommentsProps } from "../../utils/types";
import ReportModal from "./ReportModal";
import { addVisitedItem } from "../../slices/recentlyVisitedSlice";
import UpdateResourceForm from "./UpdateResourceForm";

const DetailedResource: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const [getResourceById, { data, error, isLoading }] =
    useGetResourceByIdMutation();
  const {
    data: comments,
    error: commentsError,
    isLoading: commentsLoading,
  } = useGetLatestCommentsQuery(id);

  const { data: isFavoritedData, refetch: refetchFavoriteStatus } =
    useCheckIfResourceFavoritedQuery({ id });
  const [addFavoriteResource] = useAddFavoriteResourceMutation();
  const [removeFavoriteResource] = useRemoveFavoriteResourceMutation();

  const currentUserId = useSelector(
    (state: RootState) => state.auth.userInfo?._id
  );

  const filledComments = (comments || []).concat(
    Array.from({ length: Math.max(0, 3 - (comments?.length || 0)) }).map(
      () => ({
        comment: "Encourage people to review this collection",
        placeholder: true,
      })
    )
  );

  const handleFavoriteClick = async () => {
    try {
      if (isFavoritedData?.isFavorited) {
        await removeFavoriteResource({ id });
        toast.success("Removed from favorites");
      } else {
        await addFavoriteResource({ id });
        toast.success("Added to favorites");
      }
      refetchFavoriteStatus();
    } catch (error) {
      console.error("Error updating favorite status:", error);
      toast.error("An error occurred while updating favorite status");
    }
  };

  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const handleReportClick = () => {
    setIsReportModalOpen(true);
  };

  const [isUpdateFormVisible, setIsUpdateFormVisible] = useState(false);
  const handleUpdateFormClick = () => {
    setIsUpdateFormVisible(!isUpdateFormVisible);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      getResourceById(id);
    }
  }, [id, getResourceById]);

  useEffect(() => {
    if (id && data?.title) {
      dispatch(addVisitedItem({ id, title: data.title, type: "resource" }));
    }
  }, [id, data?.title]);

  if (isLoading) return <div>Loading data..</div>;
  if (error) return <div>{error.toString()}</div>;

  return (
    <div className="h-full bg-home-bg">
      <div className="h-full flex flex-col justify-between">
        <section>
          <DetailedHeader
            title={data?.title}
            author={data?.authorName}
            description={data?.description}
            tags={data?.languages}
          />

          <DetailedLinksAndNotes links={data?.links} notes={data?.notes} />

          <div className="max-w-full grid grid-cols-2 pt-1 md:pt-2 md:gap-2 lg:gap-4 xl:gap-6">
            {/* comments */}
            <div>
              <h2 className="text-center text-[0.8rem] md:text-sm lg:text-base xl:text-xl font-medium md:tracking-wide text-home-text theme-transition">
                Latest Comments
              </h2>

              <div className="p-0.5 md:pt-1 xl:pt-2 px-1 md:px-2">
                <div className="pt-1 md:pt-2 grid grid-cols-2 grid-rows-2 gap-1 gap-y-5">
                  {commentsLoading ? (
                    <div className="text-home-text">Loading comments..</div>
                  ) : commentsError ? (
                    <div className="text-home-text">
                      Some error occured while trying to load the comments
                    </div>
                  ) : (
                    filledComments?.map(
                      (comment: LatestCommentsProps, idx: number) => (
                        <div
                          key={idx}
                          className={`${
                            idx === 0
                              ? "bg-home-primary col-span-2"
                              : "bg-home-primary w-full"
                          } rounded-xl p-1.5 md:p-2 xl:p-2.5 theme-transition text-home-text`}
                        >
                          <p
                            className={`text-[0.6rem] md:text-[0.68rem] xl:text-xs theme-transition ${
                              comment.placeholder
                                ? "text-home-text-secondary italic"
                                : "text-home-text"
                            } font-medium overflow-hidden whitespace-nowrap text-ellipsis`}
                          >
                            {comment.comment}
                          </p>
                        </div>
                      )
                    )
                  )}
                </div>
              </div>
            </div>

            {/* review */}
            {currentUserId === data?.user ? (
              <div className="grid grid-rows-2 px-1 md:px-4">
                <h2 className="text-center text-[0.8rem] md:text-sm lg:text-base xl:text-xl font-medium md:tracking-wide text-home-text theme-transition">
                  Update your Resource
                </h2>
                <button
                  className="bg-home-quaternary w-full text-home-text p-1 md:p-2 text-xs md:text-sm font-bold rounded-full shadow-md hover:bg-home-primary focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300 h-fit"
                  onClick={handleUpdateFormClick}
                >
                  Update Resource
                </button>
                {isUpdateFormVisible && (
                  <UpdateResourceForm
                    resourceId={id!}
                    onClose={() => setIsUpdateFormVisible(false)}
                    refetchResources={() => getResourceById(id)}
                  />
                )}
              </div>
            ) : (
              <ReviewForm id={id!} />
            )}
          </div>
        </section>

        <div className="px-4 md:px-6 xl:px-8 py-4 md:py-5 xl:py-6 flex justify-end items-center">
          {currentUserId === data?.user ? (
            <div className="flex gap-4 md:gap-5 xl:gap-8 items-center">
              <div className="flex gap-2 items-center text-home-text theme-transition">
                <BsEye className="text-xl md:text-2xl xl:text-3xl" />
                <span className="text-xs md:text-sm">
                  {data?.totalViews || 0}
                </span>
              </div>

              <div className="flex gap-2 items-center text-home-text theme-transition">
                <FaRegBookmark className="text-xl md:text-2xl xl:text-3xl" />
                <span className="text-xs md:text-sm">
                  {data?.favoritesCount}
                </span>
              </div>
            </div>
          ) : (
            <div className="flex gap-4 md:gap-5 xl:gap-8 items-center text-home-text">
              <button onClick={handleReportClick}>
                <GoReport className="text-xl md:text-2xl xl:text-3xl" />
              </button>

              <button onClick={handleFavoriteClick}>
                {isFavoritedData?.isFavorited ? (
                  <GoBookmarkSlashFill className="text-xl md:text-2xl xl:text-3xl" />
                ) : (
                  <GoBookmarkFill className="text-xl md:text-2xl xl:text-3xl" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      <ReportModal
        isOpen={isReportModalOpen}
        onRequestClose={() => setIsReportModalOpen(false)}
        resourceId={id!}
      />
    </div>
  );
};

export default DetailedResource;
