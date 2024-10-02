import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  Path,
  UseFormSetError,
} from "react-hook-form";
import { FaHandSparkles } from "react-icons/fa6";
import { ZodSchema } from "zod";

import "../assets/image-hover.css";
import SpotlightButton from "./SpotlightButton";
import { Link } from "react-router-dom";

interface FormContainerProps<T extends FieldValues> {
  schema: ZodSchema<T>;
  onSubmit: (data: T, setError: UseFormSetError<T>) => void;
  fields: { id: Path<T>; label: string; type: string }[];
  submitButtonText: string;
  errorMessage: string;
  welcomeText: string;
  additionalText: string;
  sideImage: string;
  bottomText: string;
  redirectTo: string;
  isLoading: boolean;
}

const FormContainer = <T extends FieldValues>({
  schema,
  onSubmit,
  fields,
  submitButtonText,
  errorMessage,
  welcomeText,
  additionalText,
  sideImage,
  bottomText,
  redirectTo,
  isLoading,
}: FormContainerProps<T>) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<T>({
    resolver: zodResolver(schema),
  });

  const handleFormSubmit: SubmitHandler<T> = (data) => onSubmit(data, setError);

  const isLogin = submitButtonText === "Login";

  const bottomTextArray = bottomText.split(" ");
  const remainingBottomText = bottomText.slice(0, bottomText.lastIndexOf(" "));

  return (
    <section className="mx-auto w-full h-full md:rounded-2xl md:w-[95%] md:h-[95%] glass-container flex flex-col">
      <h1
        className={`text-3xl lg:text-4xl flex justify-center items-center pt-4 3xl:pt-8 text-primary-public-heading font-bold transition-colors duration-300 ${
          isLogin && "pb-8"
        }`}
      >
        {welcomeText}
      </h1>

      <div className="w-full flex-grow md:rounded-b-2xl flex">
        <div className="w-full lg:w-[60%] 2xl:w-1/2 lg:rounded-bl-2xl px-1 sm:px-2 flex flex-col">
          <p
            className={`w-full sm:w-4/5 md:w-3/4 italic text-secondary-public-text transition-colors duration-300 text-lg lg:text-xl 3xl:text-3xl pt-1 ${
              isLogin && "pt-2"
            }`}
          >
            {additionalText}
          </p>

          <p
            className={`pt-8 ${
              isLogin && "pt-16"
            } text-xs md:text-sm text-secondary-public-text font-medium flex gap-2`}
          >
            <span>
              <FaHandSparkles color="#d987fa" />
            </span>
            {submitButtonText === "Login"
              ? "Please login to continue"
              : "Create an account to continue"}
          </p>

          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className={`flex flex-col gap-2 ${isLogin && "gap-8"}`}
          >
            {fields.map(({ id, label, type }, idx) => (
              <div
                className={`relative ${idx === 0 || (isLogin && "mt-6")} mt-1`}
                key={String(id)}
              >
                <input
                  {...register(id)}
                  type={type}
                  id={String(id)}
                  className="floating-input peer bg-public-input-bg text-xs md:text-sm text-public-input-text"
                  placeholder=""
                />
                <label
                  htmlFor={String(id)}
                  className="floating-label text-public-placeholder tracking-wider text-xs md:text-sm"
                >
                  {label}
                </label>

                {errors[id] && (
                  <div className="text-red-400 text-xs">
                    {(errors[id]?.message as string) || ""}
                  </div>
                )}
              </div>
            ))}

            <p className="text-center text-sm text-gray-300 italic tracking-wide text-tertiary-public-text font-medium">
              {remainingBottomText}{" "}
              <span className="text-blue-400">
                <Link to={redirectTo}>
                  {bottomTextArray[bottomTextArray.length - 1]}
                </Link>
              </span>
            </p>

            <div className="flex justify-center mt-12 md:mt-8">
              <SpotlightButton
                isDisabled={isSubmitting}
                text={isLoading ? "Loading..." : submitButtonText}
              />
            </div>

            {errors.root && (
              <div className="text-red-300">
                {(errors.root?.message as string) || errorMessage}
              </div>
            )}
          </form>
        </div>

        <div className="w-0 h-[95%] 3xl:w-full lg:w-[40%] 2xl:w-1/2 lg:rounded-2xl flex items-start pt-2">
          <div
            className="w-[98%] h-[90%] bg-blue-200 mx-auto rounded-2xl bg-no-repeat bg-cover login-img glow"
            style={{
              backgroundImage: `url(${sideImage})`,
            }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default FormContainer;
