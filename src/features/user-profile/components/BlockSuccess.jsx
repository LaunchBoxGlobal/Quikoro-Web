import React from "react";
import Modal from "../../../components/ui/Modal";

const BlockSuccess = ({ setBlockedSuccess, blockedSuccess }) => {
  return (
    <>
      <Modal
        isOpen={blockedSuccess}
        onClose={() => setBlockedSuccess(false)}
        icon={`/user-icon.png`}
        width={122}
        height={122}
        alt={"user icon"}
        title={"User Blocked Successfully"}
        description={
          "The user blocked has been successfully. The customer has been notified."
        }
      />
    </>
  );
};

export default BlockSuccess;
