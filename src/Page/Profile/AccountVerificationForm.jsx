import { useState } from "react";
import {
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogTrigger,
  Dialog,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  InputOTPSeparator,
  InputOTPSlot,
  InputOTPGroup,
  InputOTP,
} from "@/components/ui/input-otp";

export const AccountVerificationForm = () => {
  const [value, setValue] = useState("");

  // Update handleChange to properly update the state
  const handleChange = (newValue) => {
    setValue(newValue);
  };

  const handleSubmit = () => {
    console.log(value);
  };

  return (
    <div className=" flex justify-center">
      <div className=" space-y-5 mt-10 w-full">
        <div className=" flex justify-between items-center">
          <p>Email :</p>
          <p>arjun@gmail.com</p>

          <Dialog>
            <DialogTrigger>
              <Button>Send OTP</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Enter OTP</DialogTitle>
              </DialogHeader>
              <div className=" py-5 flex gap-10 justify-center items-center">
                <InputOTP
                  value={value}
                  onChange={handleChange} // Corrected onChange handler
                  maxLength={6}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                  </InputOTPGroup>
                  <InputOTPSeparator />
                  <InputOTPGroup>
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
                <DialogClose>
                  <Button onClick={handleSubmit} className="w-[10rem]">
                    Submit
                  </Button>
                </DialogClose>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
