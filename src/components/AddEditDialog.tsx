/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";

const AddEditDialog: React.FC<{ type: string; product?: any }> = ({ type, product }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addProduct = async (formJson: any) => {
    await fetch("http://localhost:8000/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formJson.title,
        image: formJson.image,
      }),
    });
  };
  const editProduct = async (formJson: any) => {
    await fetch(`http://localhost:8000/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formJson.title,
        image: formJson.image,
      }),
    });
  };

  return (
    <>
      <Button size="small" onClick={() => handleClickOpen()} variant="contained">
        {type == "add" ? "Add" : "Edit"}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            console.log({ formJson });
            type == "add" ? addProduct(formJson) : editProduct(formJson);
            handleClose();
          },
        }}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          {/* <DialogContentText></DialogContentText> */}
          <TextField autoFocus required margin="dense" id="title" name="title" label="Title" fullWidth variant="standard" defaultValue={type === "edit" ? product.title : ""} />
          <TextField autoFocus required margin="dense" id="image" name="image" label="Image" fullWidth variant="standard" defaultValue={type === "edit" ? product.image : ""} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEditDialog;
