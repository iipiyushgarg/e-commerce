import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import { DialogContent } from "@mui/material";

interface DialogModalProps {
  isOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

const DialogModal: React.FC<DialogModalProps> = ({
  isOpen,
  closeModal,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const handleClose = (): void => {
    setOpen(false);
    closeModal(false);
  };

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Box>{children}</Box>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogModal;
