"use client"

import { useState } from "react";
import { DeleteFaqs } from "~/actions/faq";
import { Button } from "~/components/common/common-button";
import LoadingSpinner from "~/components/miscellaneous/loading-spinner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";
import { useToast } from "~/components/ui/use-toast";

interface Props {
  onClose: () => void;
  faqs:{
  id: string;
  question: string;
  answer: string;
  }
}

const DeleteDialog = (props:Props) => {
  const [loading, setLoading] = useState(false)
  const {toast} = useToast()
  // 
const handleDelete = async() => {
  setLoading(true)

  const response = await DeleteFaqs(props?.faqs)
  if(response?.status === 200 || response?.status === 201){
     toast({
        title: "Success",
        description: "Faq created successfully",
        variant: "default",
      });
      setLoading(false)
  }
  else{
    console.log(response)
     toast({
        title: "Error",
        description: response?.error,
        variant: "destructive",
      });
      setLoading(false)
  }
}

  return (
    <Dialog open onOpenChange={props?.onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold leading-7 text-slate-900">
            Are you absolutely sure?
          </DialogTitle>
          <DialogDescription className="text-sm font-normal leading-tight text-slate-500">
            This action cannot be undone. This will permanently delete this
            FAQ from the database.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full">
          <Button
            variant="outline"
            className="ml-auto flex items-center justify-center gap-2.5 rounded-md px-4 py-2 text-sm font-medium leading-normal"
            onClick={props?.onClose}
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            className="ml-2 flex items-center justify-center gap-2.5 rounded-md bg-red-600 px-4 py-2 text-sm font-medium leading-normal text-white"
          >
            {loading ? <span className="flex items-center gap-x-2">
                      <span className="animate-pulse">Deleting</span>{" "}
                      <LoadingSpinner className="size-4 animate-spin sm:size-5" />
                    </span> :"Delete"}
            
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteDialog;
