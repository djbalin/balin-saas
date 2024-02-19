import {
  Card,
  CardContent,
  CardDescription,
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

async function getData(userId: string) {
  await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
}

export default function SettingsPage(userId: string) {
  return (
    <div className="grid items-start gap-8">
      <div className="flex items-center justify-between px-2">
        <div className="grid gap-1">
          <h1 className="text-3xl md:text-4xl">Settings</h1>
          <p className="text-lg text-muted-foreground">Your profile settings</p>
        </div>
      </div>
      <Card>
        <form>
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
                />
              </div>
              <div className="space-y-1">
                <Label>Your email</Label>
                <Input
                  name="email"
                  type="email"
                  id="email"
                  placeholder="Your email"
                  disabled
                />
              </div>
              <div className="space-y-1">
                <Label>Color scheme</Label>
                <Select name="color">
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
        </form>
      </Card>
    </div>
  );
}
