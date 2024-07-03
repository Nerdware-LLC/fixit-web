import { useFormikContext } from "formik";
import Button from "@mui/material/Button";
import MobileStepper from "@mui/material/MobileStepper";
import { svgIconClasses } from "@mui/material/SvgIcon";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useWiggleAnimation } from "@/hooks/useWiggleAnimation.js";
import type { RegisterFormValues } from "./registerFormSchema.js";

export type RegisterFormStepperProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};

export const RegisterFormStepper = ({ activeStep, setActiveStep }: RegisterFormStepperProps) => {
  const { setFieldTouched, touched, errors } = useFormikContext<RegisterFormValues>();
  const { wiggleClassName, setShouldWiggle } = useWiggleAnimation();

  const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

  const handleNext = async () => {
    /**
     * The below verbose checks on `touched` and `errors` are workarounds for an existing
     * Formik bug whereby validation runs on stale values if `touched` is manually updated,
     * as is done below. Links to the relevant issue and PR are below. Once the PR is merged,
     * this logic can be simplified to simply checking `isValid` from Formik context.
     *
     * ISSUE: https://github.com/jaredpalmer/formik/issues/2083
     * PR:    https://github.com/jaredpalmer/formik/pull/3947
     *
     * // TODO Simplify the logic here once Formik PR is merged
     */
    await setFieldTouched("handle", true, true);
    await setFieldTouched("phone", true, true);

    if (touched.handle && !errors.handle && !errors.phone) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      setShouldWiggle(true);
    }
  };

  return (
    <MobileStepper
      variant="dots"
      steps={2}
      position="static"
      activeStep={activeStep}
      sx={{ [`& .${svgIconClasses.root}`]: { transform: "translateY(1px)" } }}
      backButton={
        <Button
          variant="text"
          size="small"
          onClick={handleBack}
          disabled={activeStep === 0}
          style={{ paddingRight: "1rem" }}
        >
          <ChevronLeftIcon />
          Back
        </Button>
      }
      nextButton={
        <Button
          variant={activeStep === 0 && touched.handle && !errors.handle ? "contained" : "text"}
          size="small"
          onClick={handleNext}
          disabled={activeStep === 1}
          style={{ paddingLeft: "1rem" }}
          className={wiggleClassName}
        >
          Next
          <ChevronRightIcon />
        </Button>
      }
    />
  );
};
