import { useState } from "react";

export const useMultiStepForm = <T>() => {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormdata] = useState<T | null>(null);

  const nextStep = (data: T) => {
    setFormdata((prev) => ({ ...prev, ...data }));
    setStep((prev) => prev + 1);
  };

  const previousStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const goToStep = (stepNumber: number) => {
    setStep(stepNumber);
  };

  return {
    step,
    formData,
    nextStep,
    previousStep,
    goToStep,
  };
};
