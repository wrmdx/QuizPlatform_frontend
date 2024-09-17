import {
 InputOTP,
 InputOTPGroup,
 InputOTPSeparator,
 InputOTPSlot,
} from "@/components/ui/input-otp"
import {Button} from "@/components/ui/button.jsx";
import {useState} from "react";

const TakeQuizPage  = () => {

 const [value, setValue] = useState("")
 const handleSubmit = (e) => {
  e.preventDefault();
  console.log("OTP Value: ", value);
 };

 return (
     <main className="w-screen h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
       <InputOTP
           maxLength={6}
           value={value}
           onChange={(value) => setValue(value)}
       >
           <InputOTPGroup>
            <InputOTPSlot index={0}/>
            <InputOTPSlot index={1}/>
            <InputOTPSlot index={2}/>
           </InputOTPGroup>
              <InputOTPSeparator/>
           <InputOTPGroup>
            <InputOTPSlot index={3}/>
            <InputOTPSlot index={4}/>
            <InputOTPSlot index={5}/>
           </InputOTPGroup>
       </InputOTP>
       <Button type="submit">Submit</Button>
      </form>
     </main>
 )
}

export default TakeQuizPage