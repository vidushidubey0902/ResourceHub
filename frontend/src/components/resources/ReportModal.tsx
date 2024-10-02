import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import { CiSquareInfo } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";

import { reportResourceSchema } from "../../utils/schema";
import {
  ApiError,
  ReportModalProps,
  ReportResourceFields,
} from "../../utils/types";
import { useReportResourceMutation } from "../../slices/resourcesApiSlice";
import { toast } from "react-toastify";

const ReportModal = ({
  isOpen,
  onRequestClose,
  resourceId,
}: ReportModalProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReportResourceFields>({
    resolver: zodResolver(reportResourceSchema),
  });

  const [reportResource] = useReportResourceMutation();

  const onSubmit = async (data: ReportResourceFields) => {
    console.log(data);
    try {
      await reportResource({ resourceId, ...data }).unwrap();
      toast.success("Report sent successfully");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || err?.error);
    } finally {
      onRequestClose();
      reset();
    }
  };

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 text-black"
      onClick={onRequestClose}
    >
      <div
        className="bg-home-accent p-6 rounded-lg shadow-xl max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4 text-home-text">
          Report Resource
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* reason */}
          <div className="pb-5 relative">
            <label
              htmlFor="reason"
              className="block text-[0.68rem] md:text-xs font-medium pb-1 text-home-text"
            >
              Reason
            </label>
            <input
              id="reason"
              type="text"
              {...register("reason")}
              className="block w-full p-2 text-[0.65rem] md:text-xs rounded bg-home-quaternary text-home-text-secondary outline-none focus:ring-1 focus:ring-purple-300"
            />
            {errors.reason && (
              <p className="absolute left-0 bottom-1 text-red-600 text-[0.6rem] md:text-xs mt-1">
                {errors.reason.message}
              </p>
            )}
          </div>

          {/* comments */}
          <div className="py-5 relative">
            <label
              htmlFor="comments"
              className="block text-[0.68rem] md:text-xs font-medium pb-1 text-home-text"
            >
              Additional Comments
            </label>
            <textarea
              id="comments"
              {...register("comments")}
              className="block w-full p-2 text-[0.65rem] md:text-xs rounded bg-home-quaternary text-home-text-secondary resize-none outline-none focus:ring-1 focus:ring-purple-300"
            />
            {errors.comments && (
              <p className="absolute left-0 bottom-1 text-red-600 text-[0.6rem] md:text-xs mt-1">
                {errors.comments.message}
              </p>
            )}
          </div>

          {/* buttons */}
          <div className="flex justify-end space-x-4 mt-2">
            <button
              type="button"
              onClick={onRequestClose}
              className="bg-transparent text-home-text transition-all duration-500 hover:underline hover:underline-offset-4 hover:decoration-blue-700 text-xs"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-3 py-2 bg-home-quaternary text-home-text text-gray-950 font-semibold rounded text-xs flex items-center gap-1"
            >
              <CiSquareInfo size={18} className="md:mt-0.5" />
              Report
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.getElementById("report-resource")!
  );
};

export default ReportModal;
