import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { toast } from "sonner";

const SignUp =  () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    role: "",
    password: "",
    phoneNumber: "",
    file: "",
  });

const navigate = useNavigate();

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const changeFileHandler = (e) => {
    setInput({
      ...input,
      file: e.target.files[0],
    });
  };

  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
   try {
    const res = await axios.post(`${USER_API_ENDPOINT}/register`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,

    });
   if(res.data.success){
    navigate("/login");
     toast.success(res.data.message);

    }
   } catch (error) {
   
    toast.error(error.response.data.message);
   }
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="my-2">
            <Label htmlFor="name">FullName</Label>
            <Input
              value={input.fullname}
              onChange={changeEventHandler}
              name="fullname"
              type="text"
              placeholder=" John Doe"
            />
          </div>
          <div className="my-2">
            <Label htmlFor="name">Email</Label>
            <Input
              type="email"
              value={input.email}
              onChange={changeEventHandler}
              name="email"
              placeholder="john@gmail.com "
            />
          </div>
          <div className="my-2">
            <Label htmlFor="name">Phone Number</Label>
            <Input
              type="tel"
              value={input.phoneNumber}
              onChange={changeEventHandler}
              name="phoneNumber"
              placeholder="+91-1234456789"
            />
          </div>
          <div className="my-2">
            <Label htmlFor="name">Password</Label>
            <Input
              type="password"
              value={input.password}
              onChange={changeEventHandler}
              name="password"
              placeholder="Enter your password"
            />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === "student"}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  onChange={changeEventHandler}
                  checked={input.role === "recruiter"}
                  className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={changeFileHandler}
                className="cursor-pointer"
              />
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 text-white p-2 rounded-full"
          >
            SignUp
          </Button>
          <span>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">
              Login
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
