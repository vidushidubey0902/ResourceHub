import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch, useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";

import { setTheme } from "../slices/themeSlice";
import { setCredentials } from "../slices/authSlice";
import { updateProfileSchema } from "../utils/schema";
import {
  ApiError,
  ThemeType,
  UpdateFieldConfig,
  UpdateProfileFields,
  UserInfo,
} from "../utils/types";
import { useUpdateUserMutation } from "../slices/usersApiSlice";

const UpdateProfileForm = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector(
    (state: { auth: { userInfo: UserInfo | null } }) => state.auth
  );

  const { theme } = useSelector(
    (state: { theme: { theme: ThemeType } }) => state.theme
  );

  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UpdateProfileFields>({
    resolver: zodResolver(updateProfileSchema),
    defaultValues: {
      name: userInfo?.name || "",
      email: userInfo?.email || "",
    },
  });

  const onSubmit: SubmitHandler<UpdateProfileFields> = async (data) => {
    try {
      const filteredData = {
        name: data.name,
        email: data.email,
        ...(data.oldPassword && { oldPassword: data.oldPassword }),
        ...(data.newPassword && { newPassword: data.newPassword }),
        ...(data.description && { description: data.description }),
      };
      const response = await updateProfile(filteredData).unwrap();
      dispatch(setCredentials(response));
      toast.success("Profile successfully updated");
    } catch (error) {
      const err = error as ApiError;
      toast.error(err.data?.message || err.error);
    }
  };

  const updateProfileFields: UpdateFieldConfig[] = [
    {
      name: "name",
      type: "text",
      placeholder: "Your Name",
      error: errors.name,
      errorMessage: errors.name?.message,
    },
    {
      name: "email",
      type: "text",
      placeholder: "E-mail",
      error: errors.email,
      errorMessage: errors.email?.message,
    },
    {
      name: "oldPassword",
      type: "text",
      placeholder: "Old Password",
      error: errors.oldPassword,
      errorMessage: errors.oldPassword?.message,
    },
    {
      name: "newPassword",
      type: "text",
      placeholder: "New Password",
      error: errors.newPassword,
      errorMessage: errors.newPassword?.message,
    },
    {
      name: "description",
      type: "textarea",
      placeholder: "Description",
      error: errors.description,
      errorMessage: errors.description?.message,
    },
  ];

  const handleToggleTheme = () => {
    const newTheme = theme === "LIGHT" ? "DARK" : "LIGHT";
    dispatch(setTheme(newTheme));
  };

  return (
    <div className="w-full h-full flex flex-col text-black">
      <div className="text-center sm:py-1 px-1 xl:py-8 flex flex-col items-center gap-2 xl:gap-4">
        <p className="text-xs italic">
          Made a typo? Or is it that old name or email that everyone starts to
          hate at some point? We&apos;ve got you covered!
        </p>
        <p className="text-sm text-blue-800 font-medium py-1 px-2 bg-gradient-to-r from-slate-800/10 to-slate-700/20 rounded-2xl">
          Edit your profile
        </p>
      </div>

      <div className="w-full flex-grow mt-2 flex justify-center md:items-center px-2 py-4">
        <div className="w-full h-full md:w-2/3 md:h-3/4 bg-purple-300/20 rounded-xl profile-inset-shadow">
          <div className="w-full h-full bg-slate-400/80 rounded-tl-[5rem] rounded-xl profile-form-shadow text-gray-800 flex flex-col">
            {/* theme toggle */}
            <div className="p-2 flex justify-end">
              <div className="inline-flex rounded-xl">
                <button
                  onClick={handleToggleTheme}
                  className={`w-1/2 transition-all duration-700 font-semibold ${
                    theme === "DARK"
                      ? "bg-gray-800 text-slate-100 underline decoration-purple-400 decoration-[1.5px] md:decoration-2 underline-offset-2 md:underline-offset-[3px]"
                      : "bg-gray-500 text-gray-200 opacity-90 no-underline"
                  } rounded-l-xl text-xs p-2 px-2.5 md:p-2.5 md:px-3 xl:px-4 xl:py-2.5`}
                >
                  Dark
                </button>
                <button
                  onClick={handleToggleTheme}
                  className={`w-1/2 transition-all duration-700 font-semibold ${
                    theme === "LIGHT"
                      ? "bg-slate-100 underline decoration-purple-700 decoration-[1.5px] md:decoration-2 underline-offset-2 md:underline-offset-[3px]"
                      : "bg-gray-500 text-gray-200 opacity-90 no-underline"
                  } rounded-r-xl text-xs p-2 px-2.5 md:p-2.5 md:px-3 xl:px-4 xl:py-2.5`}
                >
                  Light
                </button>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="pl-2 md:pl-4 flex-grow xl:grid xl:grid-cols-2"
            >
              {updateProfileFields.map((field) => (
                <div
                  className={`mx-2 md:mx-4 mt-4 ${
                    field.name === "description" ? "xl:col-span-2" : ""
                  }`}
                  key={field.name}
                >
                  <div className="relative w-full group">
                    {field.type === "textarea" ? (
                      <textarea
                        {...register(field.name)}
                        id={field.name}
                        placeholder={field.placeholder}
                        className="w-full text-black text-sm bg-transparent p-2.5 border-0 border-b border-slate-800 hover:bg-purple-200/40 hover:rounded-t-xl focus:outline-none resize-none"
                      />
                    ) : (
                      <input
                        {...register(field.name)}
                        type={field.type}
                        id={field.name}
                        placeholder={field.placeholder}
                        className="w-full text-black text-sm bg-transparent p-2.5 border-0 border-b border-slate-800 hover:bg-purple-200/40 hover:rounded-t-xl focus:outline-none"
                      />
                    )}
                    <span
                      className={`absolute bg-blue-800 h-[2px] ${
                        field.type === "textarea" ? "bottom-1" : "bottom-0"
                      } right-0 transition-all duration-500 w-0 group-focus-within:w-full`}
                    />
                  </div>
                  {field.error && (
                    <p className="text-red-600 text-xs">{field.errorMessage}</p>
                  )}
                </div>
              ))}

              <div className="mx-2 md:mx-4 mt-4 text-center col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="bg-gradient-to-r from-purple-300 via-purple-500 to-purple-300 text-white w-full p-2 rounded-xl text-xl"
                >
                  {isLoading ? "Loading..." : "Update Profile"}
                </button>
              </div>

              {errors.root && <div>{errors.root.message}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileForm;
