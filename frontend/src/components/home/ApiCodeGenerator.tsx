import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  generateAxiosCode,
  generateFetchCode,
  generateRtkQueryCode,
} from "../../utils/helpers";
import InputBox from "../InputBox";
import CodeModal from "./CodeModal";
import SelectBox from "../SelectBox";
import { apiCodeGeneratorSchema } from "../../utils/schema";
import { ApiCode, ApiCodeGeneratorFields } from "../../utils/types";

const ApiCodeGenerator = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ApiCodeGeneratorFields>({
    resolver: zodResolver(apiCodeGeneratorSchema),
  });

  const [generatedCode, setGeneratedCode] = useState<ApiCode | null>(null);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState<boolean>(false);

  const onSubmit = (data: ApiCodeGeneratorFields) => {
    let code: ApiCode | null = null;
    if (data.approach === "Fetch") {
      code = generateFetchCode(data.route, data.method, data.body);
    } else if (data.approach === "Axios") {
      code = generateAxiosCode(data.route, data.method, data.body);
    } else if (data.approach === "RTK Query") {
      code = generateRtkQueryCode(data.route, data.method, data.body);
    }

    setGeneratedCode(code);
    setIsCodeModalOpen(true);
  };

  const method = watch("method");

  return (
    <div className="h-full flex flex-col">
      <h3 className="text-center text-xs pb-1 lg:text-sm font-light italic text-home-text theme-transition">
        API Code Generator
      </h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex-grow px-0.5 md:px-1 flex flex-col justify-around"
      >
        <div className="md:grid md:grid-cols-2 md:gap-1">
          <div className="flex flex-col group relative pb-5">
            <InputBox
              label="API Route"
              id="route"
              register={register}
              type="text"
              placeholder="Your API endpoint"
              error={errors.route}
              showHelperText={false}
            />
          </div>

          <div className="flex flex-col group relative pb-5">
            <SelectBox
              label="HTTP Method"
              id="method"
              options={["GET", "POST", "PUT", "DELETE", "PATCH"]}
              register={register}
              error={errors.method}
            />
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 md:gap-1">
          {(method === "POST" || method === "PUT" || method === "PATCH") && (
            <div className="flex flex-col group relative pb-5">
              <InputBox
                label="Request Body"
                id="body"
                register={register}
                type="text"
                placeholder="Request body / variable name"
                error={errors.body}
                showHelperText={false}
              />
            </div>
          )}

          <div
            className={`flex flex-col group relative pb-5 ${
              method !== "POST" && method !== "PUT" && method !== "PATCH"
                ? "md:col-span-2"
                : ""
            }`}
          >
            <SelectBox
              label="Approach"
              id="approach"
              options={["RTK Query", "Fetch", "Axios"]}
              register={register}
              error={errors.approach}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-home-quaternary text-home-text theme-transition font-bold text-xs md:text-sm py-2 rounded-lg shadow-sm px-0.5 md:px-1"
        >
          Generate Code
        </button>
      </form>

      <CodeModal
        isOpen={isCodeModalOpen}
        onRequestClose={() => setIsCodeModalOpen(false)}
        code={generatedCode}
      />
    </div>
  );
};

export default ApiCodeGenerator;
