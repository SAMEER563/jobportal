import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/authSlice';
import axios from 'axios';
import { USER_API_ENDPOINT } from '@/utils/constant';
import { toast } from 'sonner';

export const UpdateProfile = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false);
    const {user} = useSelector(store => store.authSlice);

   const [input, setInput] = useState({
      fullname:user?.fullname,
      email:user?.email,
      phoneNumber:user?.phoneNumber,
      bio:user?.profile?.bio,
      skills:user?.profile?.skills?.map(skill=>skill),
      file:user?.profile?.resume,
   });

   const dispatch = useDispatch();

   const changeEventHandler = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value
    });
    };

    const changeFileHandler = (e) => {
     const file = e.target.files?.[0];
      setInput({
        ...input, file
      });
    };
    

    const submitHandler = async(e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("fullname", input.fullname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.file) {
          formData.append("file", input.file);
        }
        try {
          const res = await axios.post(`${USER_API_ENDPOINT}/profile/update`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          });
          if (res.data.status === 200) {
            dispatch(setUser(res.data.user));
            toast.success("Profile Updated Successfully");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.response.data.message);
        }
        setOpen(false);
        console.log(input);
    }



  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">Name</Label>
                <Input name="name" 
                value={input.fullname}
                onChange={changeEventHandler}
                id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input name="email"
                value={input.email}
                onChange={changeEventHandler}
                id="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number">Number</Label>
                <Input name="number" 
                value={input.phoneNumber}
                onChange={changeEventHandler}
                id="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio">Bio</Label>
                <Input name="bio" 
                value={input.bio}
                onChange={changeEventHandler}
                id="bio" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills">Skills</Label>
                <Input name="skills" 
                value={input.skills}
                onChange={changeEventHandler}
                id="skills" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file">Resume</Label>
                <Input name="file" 
                input={input.file}
                onChange={changeFileHandler}
                id="file" type="file" accept="application/pdf" className="col-span-3" />
              </div>
            </div>
            <DialogFooter>
            {
             loading ? <Button             className="w-full bg-purple-500 hover:bg-purple-700 text-white p-2 rounded-full"
> <Loader2 className="mr-2 h-4 animate-spin" /> Please Wait </Button> :  
            <Button
            type="submit"
            className="w-full bg-purple-500 hover:bg-purple-700 text-white p-2 rounded-full"
             >
            Update
          </Button>

          }
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};
