import React from "react";
import Modal from "../../../components/ui/Modal";

const BlockSuccess = () => {
  return (
    <>
      <Modal
        isOpen={true}
        onClose={null}
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
