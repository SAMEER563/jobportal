import { useState } from 'react';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

export const UpdateProfile = ({ open, setOpen }) => {

    const [loading, setLoading] = useState(false)
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name">Name</Label>
                <Input name="name" id="name" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email">Email</Label>
                <Input name="email" id="email" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number">Number</Label>
                <Input name="number" id="number" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio">Bio</Label>
                <Input name="bio" id="bio" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills">Skills</Label>
                <Input name="skills" id="skills" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file">Resume</Label>
                <Input name="file" id="file" type="file" accept="application/pdf" className="col-span-3" />
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
