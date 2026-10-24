

"use client";


import { authClient } from "@/lib/auth-client";
import { Avatar, Button, FieldError, Input, Label, Spinner, TextField } from "@heroui/react";
import { Icon } from "@iconify/react";
import { redirect } from "next/navigation";


export default function ProfilePage() {
    const {data: session,isPending} = authClient.useSession();
    const user = session?.user;
     if(!user){
      redirect('/sign-In')
     }
   if(isPending){
        return (<span>Loading...<Spinner color="current" /></span>);
    }

    const handleUpdateProfile = async(e: React.FormEvent<HTMLFormElement>)=>{
        const formData = new FormData(e.currentTarget);
        const user= Object.fromEntries(formData.entries()) as {name:string,image:string};
        await authClient.updateUser({
                ...user
        });
    }
    const  handleSignOut=async()=>{
       await authClient.signOut();
             
    }

  return (
    <main className="min-h-screen bg-[#f7f9f6] px-4 py-12 text-[#14251b] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            My Profile
          </h1>
          <p className="mt-2 text-base text-gray-500 sm:text-lg">
            You can see your account info here.
          </p>
        </div>

        <section className="mb-8 flex flex-col gap-6 rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex min-w-0 items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-100 sm:h-24 sm:w-24">
               <Avatar
               className="h-full w-full">
                <Avatar.Image alt="user-img" src={user?.image as string} />
                </Avatar>
            </div>

            <div className="min-w-0">
              <h2 className="truncate text-xl font-semibold sm:text-2xl">
                {user?.name}
              </h2>
              <p className="mt-1 break-all text-sm text-gray-500 sm:text-lg">
                {user?.email}
              </p>
            </div>
          </div>
            
              <Button onClick={()=>handleSignOut()
              }variant="danger-soft" className='"inline-flex shrink-0 items-center justify-center mt-5 gap-2 self-start rounded-xl border h-14 border-red-300 px-5 py-3  font-medium text-red-600 transition hover:bg-red-50 sm:self-center"' >
                <Icon icon="lucide:log-out" width={20} height={20} />Log out
            </Button>

           
           
        </section>

        
        <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-8 text-xl font-bold sm:text-2xl">
            your info
          </h2>

          <form onSubmit={handleUpdateProfile} className="space-y-6">
            <div>
               <TextField
                    isRequired
                    name="name"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-4 outline-none transition placeholder:text-gray-400 focus:border-green-600 focus:ring-4 focus:ring-green-100"
                    validate={(value) =>
                        value.trim().length < 5
                        ? "Name must be at least 5 characters."
                        : null
                    }
                    >
                    <Label className="mb-2 text-sm font-semibold text-gray-700">
                        Change your name here
                    </Label>
                    <Input
                        placeholder="Enter your full name"
                        autoComplete="name"
                        className="rounded-xl"
                    />
                    <FieldError />
                </TextField>
            </div>

            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#079447] px-5 py-4 font-semibold text-white shadow-md transition hover:bg-[#067b3b] active:scale-[0.99]"
            >
              <Icon icon="mdi:content-save-outline" width={21} />
                Update your name
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}

