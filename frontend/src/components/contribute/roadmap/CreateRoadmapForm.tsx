import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import AboutFields from "./AboutFields";
import StepsFields from "./StepsFields";
import { createRoadmapSchema } from "../../../utils/schema";
import { ApiError, CreateRoadmapFields } from "../../../utils/types";
import { useCreateRoadmapMutation } from "../../../slices/roadmapApiSlice";

const CreateRoadmapForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CreateRoadmapFields>({
    resolver: zodResolver(createRoadmapSchema),
    defaultValues: {
      steps: [{ title: "", description: "", resources: [] }],
    },
  });

  const [newRoadmap, { isLoading }] = useCreateRoadmapMutation();

  const onSubmit: SubmitHandler<CreateRoadmapFields> = async (data) => {
    try {
      await newRoadmap(data).unwrap();
      toast.success("Roadmap has been created successfully");
      navigate("/home");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err?.data?.message || err?.error);
    }
  };

  return (
    <section className="h-full flex flex-col bg-home-bg">
      <h1 className="text-center text-2xl lg:text-3xl 2xl:text-4xl py-4 font-semibold text-home-text">
        Create a Roadmap
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow flex flex-col px-2 md:px-8 py-4 lg:py-8 gap-2"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
          <AboutFields
            register={register}
            errors={errors}
            watch={watch}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
          />

          <StepsFields
            register={register}
            errors={errors}
            watch={watch}
            control={control}
            setError={setError}
            clearErrors={clearErrors}
            setValue={setValue}
          />
        </div>

        <div className="md:py-8">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-home-quaternary w-full hover:bg-home-primary text-home-text transition-all duration-300 md:col-span-2 rounded-lg font-semibold py-1 md:py-1.5 xl:py-2 hover:shadow-xl hover:shadow-blue-300/10"
          >
            {isLoading ? "Creating.." : "Create Roadmap"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default CreateRoadmapForm;
