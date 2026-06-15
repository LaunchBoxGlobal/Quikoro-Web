import useUpdateTitle from "../../../hooks/useUpdateTitle";
import BuyerCompleteProfileForm from "./components/BuyerCompleteProfileForm";

const BuyerCompleteProfilePage = () => {
  useUpdateTitle("Complete Profile");
  return <BuyerCompleteProfileForm />;
};

export default BuyerCompleteProfilePage;
