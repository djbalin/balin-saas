import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prisma from "@/app/lib/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Button } from "@/components/ui/button";
import SubmitButtons from "@/app/components/SubmitButton";
import SubmitButton from "@/app/components/SubmitButton";
import { revalidatePath } from "next/cache";

async function getUserData(userId: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      name: true,
      email: true,
      colorScheme: true,
    },
  });
}

export default async function SettingsPage() {
  const { getUser } = await getKindeServerSession();
  const user = await getUser();
  const userData = await getUserData(user?.id as string);
  async function postData(formData: FormData) {
    "use server";
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const data = Object.fromEntries(formData.entries());
    await prisma.user.update({
      where: {
        id: user?.id as string,
      },
      data: {
        name: data.name as string,
        colorScheme: data.color as string,
      },
    });
    revalidatePath("/", "layout");
  }

  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your profile settings</p>
        </div>
      </div>
      <Card>
        <form action={postData}>
          <CardHeader>
            <CardTitle>General data</CardTitle>
            <CardDescription>
              Please provide general information about yourself and remember to
              save.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="space-y-1">
                <Label>Your name</Label>
                <Input
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Your name"
                  defaultValue={(userData?.name as string) ?? undefined}
                />
              </div>
              <div className="space-y-1">
                <Label>Your email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your email"
                  defaultValue={(userData?.email as string) ?? undefined}
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label>Color scheme</Label>
                <Select name="color" defaultValue={userData?.colorScheme}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a color" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {/* <SelectLabel>Color</SelectLabel> */}
                      <SelectItem value="theme-green">Green</SelectItem>
                      <SelectItem value="theme-orange">Orange</SelectItem>
                      <SelectItem value="theme-blue">Blue</SelectItem>
                      <SelectItem value="theme-violet">Violet</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
