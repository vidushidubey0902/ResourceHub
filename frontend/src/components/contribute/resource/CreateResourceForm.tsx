import LinksForm from "./LinksForm";
import AboutCollectionForm from "./AboutCollectionForm";
import { useMultiStepForm } from "../../../hooks/useMultiStepForm";
import { AboutResourceCollectionFields } from "../../../utils/types";

const CreateResourceForm = () => {
  const { step, formData, nextStep } =
    useMultiStepForm<AboutResourceCollectionFields>();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <div className="h-full w-full">
        {step === 1 && <AboutCollectionForm onSubmit={nextStep} />}
        {step === 2 && formData && <LinksForm formData={formData} />}
      </div>
    </div>
  );
};

export default CreateResourceForm;
