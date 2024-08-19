import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Login = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    role: "",
  });

  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(input);
  };

  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          onSubmit={submitHandler}
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
          <div className="my-2">
            <Label htmlFor="name">FullName</Label>
            <Input
              value={input.fullname}
              onChange={changeEventHandler}
              name="fullname"
              type="text"
              placeholder="John Doe"
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
          </div>
          <Button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 text-white p-2 rounded-full"
          >
            Login
          </Button>
          <span>
            Create an account?{" "}
            <Link to="/signup" className="text-blue-500">
              SignUp
            </Link>{" "}
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
