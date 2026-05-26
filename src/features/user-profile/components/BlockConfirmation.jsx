import React, { useEffect, useState } from "react";
import Modal from "../../../components/ui/Modal";
import { useBlockUserMutation } from "../../../services/userService/userApi";
import { useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";

const BlockConfirmation = ({ isOpen, onClose, refetch }) => {
  const [blockUser, { isLoading }] = useBlockUserMutation();

  const { id } = useParams();

  const [isBlocked, setIsBlocked] = useState(false);

  const handleBlock = async () => {
    try {
      await blockUser({ blockedId: id }).unwrap();

      // Change modal content
      setIsBlocked(true);

      // Auto close after 4 sec
      setTimeout(() => {
        refetch();
        handleClose();
      }, 4000);
    } catch (error) {
      enqueueSnackbar(
        error?.data?.error ||
          error?.data?.message ||
          error?.message ||
          "Something went wrong.",
        {
          variant: "error",
        },
      );
    }
  };

  const handleClose = () => {
    setIsBlocked(false);
    onClose();
  };

  // Reset when modal opens again
  useEffect(() => {
    if (isOpen) {
      setIsBlocked(false);
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      icon="/user-icon.png"
      width={122}
      height={122}
      alt="user icon"
      title={isBlocked ? "User Blocked Successfully" : "Block User"}
      description={
        isBlocked
          ? "The user has been blocked successfully."
          : "Are you sure you want to block this user?"
      }
      footer={
        !isBlocked && (
          <ModalActions
            handleBlock={handleBlock}
            onClose={handleClose}
            isLoading={isLoading}
          />
        )
      }
    />
  );
};

export default BlockConfirmation;

export const ModalActions = ({ handleBlock, onClose, isLoading }) => {
  return (
    <div className="w-full grid grid-cols-2 gap-3">
      <button
        type="button"
        disabled={isLoading}
        onClick={onClose}
        className="gray-button"
      >
        No
      </button>

      <button
        type="button"
        disabled={isLoading}
        onClick={handleBlock}
        className="primary-button"
      >
        {isLoading ? "Blocking..." : "Yes"}
      </button>
    </div>
  );
};
