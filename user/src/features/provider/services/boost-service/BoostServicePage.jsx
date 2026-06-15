import { useState } from "react";
import BoostLayout from "./components/BoostLayout";
import Modal from "../../../../components/ui/Modal";
import { LogoPlaceholder } from "../../../../assets/export";
import Button from "../../../../components/ui/Button";
import { plans } from "./plans";
import { useNavigate } from "react-router-dom";
import useUpdateTitle from "../../../../hooks/useUpdateTitle";

export default function BoostServicePage() {
  const [selectedPlan, setSelectedPlan] = useState("starter");
  const [isServiceBoosted, setIsServiceBoosted] = useState(false);
  const navigate = useNavigate();
  useUpdateTitle("Boost Service");

  return (
    <>
      <div className="min-h-screen bg-white font-sans text-gray-900">
        <div className="py-10">
          <BoostLayout
            plans={plans}
            selectedPlan={selectedPlan}
            setSelectedPlan={setSelectedPlan}
            setIsServiceBoosted={setIsServiceBoosted}
          />
        </div>
      </div>

      <Modal
        title={`Service Boost Activated`}
        description={`Your service is now boosted at the top of search results, increasing visibility and helping you get more bookings. You can manage or track it anytime from your dashboard.`}
        icon={LogoPlaceholder}
        width={109}
        height={109}
        isOpen={isServiceBoosted}
        footer={
          <div className="w-full">
            <Button
              type="button"
              text={`Done`}
              isLoading={false}
              onclick={() => {
                setIsServiceBoosted(false);
                navigate(`/provider/my-services/9393839`);
              }}
            />
          </div>
        }
      />
    </>
  );
}
