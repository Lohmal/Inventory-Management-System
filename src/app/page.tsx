import AppBar from "@/components/AppBar";
import AuthDesign from "@/components/AuthDesign";
import { auth } from "../../auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ClientComp from "@/components/ClientComp";

export default async function Home() {
  const session = await auth();
  if (session) {
    const user = await db.user.findUnique({
      where: { email: session?.user?.email! },
      include: { Inventory: true },
    });
    console.log(user, "user");
    if (user && !user?.isAdmin) {
      return (
        <>
          <AppBar />
          <ClientComp user={user} />
        </>
      );
    } else if (user && user?.isAdmin) {
      redirect("/dashboard");
    }
  } else {
    return (
      <div className="">
        <AppBar />
        <AuthDesign />
      </div>
    );
  }
}
