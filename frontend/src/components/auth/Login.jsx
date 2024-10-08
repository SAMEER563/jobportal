import  { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_ENDPOINT } from "@/utils/constant";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../shared/Footer";

const Login = () => {
  const [input, setInput] = useState({
    
    email: "",
    password: "", 
    role: "",
  });

  const {loading} = useSelector((store) => store.authSlice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };

  
  const submitHandler = async(e) => {
    e.preventDefault();
   try {
      dispatch(setLoading(true));
    const res = await axios.post(`${USER_API_ENDPOINT}/login`, input, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,

    });
   if(res.data.success){
    dispatch(setUser(res.data.user))
    navigate("/");
     toast.success(res.data.message);

    }
   } catch (error) {
    console.log(error);

    toast.error(error.response.data.message);
   } finally {
     dispatch(setLoading(false));
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
          <h1 className="font-bold text-xl mb-5">Login</h1>
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
            <Label htmlFor="name">Password</Label>
            <Input
              value={input.password}
              onChange={changeEventHandler}
              name="password"
              type="password"
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
          </div>
          {
            loading ? <Button             className="w-full bg-purple-500 hover:bg-purple-700 text-white p-2 rounded-full"
> <Loader2 className="mr-2 h-4 animate-spin" /> Please Wait </Button> :  
            <Button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 text-white p-2 rounded-full"
             >
            Login
          </Button>

          }
        
          <span>
            Create an account?{" "}
            <Link to="/signup" className="text-blue-500">
              SignUp
            </Link>{" "}
          </span>
        </form>
      </div>
      <div className="mb-2 max-h-full">
      <Footer />
      </div>
    </div>
  );
};

export default Login;
