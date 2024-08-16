import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">SignUp</h1>
          <div className="my-2">
            <Label htmlFor="name">FullName</Label>
            <Input type="text" placeholder=" John Doe" />
          </div>
          <div className="my-2">
            <Label htmlFor="name">Email</Label>
            <Input type="email" placeholder="john@gmail.com " />
          </div>
          <div className="my-2">
            <Label htmlFor="name">Phone Number</Label>
            <Input type="tel" placeholder="+91-1234456789" />
          </div>
          <div className="my-2">
            <Label htmlFor="name">Password</Label>
            <Input type="password" placeholder="Enter your password" />
          </div>
          <div className="flex items-center justify-between">
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
               <Input
                type="radio" 
                name="role"
                value="student"
                className='cursor-pointer'
               />
               <Label htmlFor="r1">Student</Label>
              </div>
              <div className="flex items-center space-x-2">
              <Input
                type="radio" 
                name="role"
                value="recruiter"
                className='cursor-pointer'
               />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
            </RadioGroup>
            <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input type="file" 
                  accept="image/*"
                    className="cursor-pointer"

                />
            </div>
          </div>
            <Button type='submit' className="w-full bg-purple-500 text-white p-2 rounded-md">
                SignUp
            </Button>
            <span>Already have an account? <Link to='/login' className='text-blue-500'>Login</Link> </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
