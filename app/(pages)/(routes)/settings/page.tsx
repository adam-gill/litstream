"use client";
import PageContainer from "@/components/PageContainer";
import SearchBar from "@/components/SearchBar";
import Skeleton from "@/components/Skeleton";
import { toggleModal } from "@/lib/features/modal/modalSlice";
import useAuth from "@/lib/useAuth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPremiumStatus } from "@/app/(premium)/(routes)/upgrade/getSubscriptionStatus";
import { app } from "@/firebase";

const Settings = () => {
  const { user, loadingAuth } = useAuth();
  const dispatch = useDispatch();
  const [isPremium, setIsPremium] = useState<boolean | undefined>(true);
  const router = useRouter();

  useEffect(() => {
    const getStatus = async () => {
      if (!!user) {
        try {
          const status = await getPremiumStatus(app, user?.uid);
          setIsPremium(status);
          console.log(status);
        } catch (error) {
          console.log(error);
        }
      }
    };

    getStatus();
  }, [user]);

  return (
    <>
      <PageContainer>
        {loadingAuth ? (
          <>
            <div className="flex flex-col">
              <Skeleton className="w-[200px] h-[80px] rounded-lg" />
              <Skeleton className="w-[600px] h-[60px] rounded-lg mt-8" />
              <Skeleton className="w-[600px] h-[60px] rounded-lg mt-8" />
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-4xl font-bold">Settings</h1>
              {user && !isPremium && (
                <button
                  onClick={() => router.push("/upgrade")}
                  className="py-2 px-4 bg-green text-black rounded-full text-2xl btn-hover"
                >
                  Upgrade
                </button>
              )}
            </div>
            <div className="w-full bg-gray-300 h-px rounded-full my-4"></div>

            {user ? (
              <>
                <div className="mt-8">
                  <h1 className="text-xl font-bold">Your Subscription Plan</h1>
                  <p className="mt-2">{isPremium ? "Premium" : "Free"}</p>
                </div>
                <div className="w-full bg-gray-300 h-px rounded-full my-4"></div>
                <div className="mt-8">
                  <h1 className="text-xl font-bold">Email</h1>
                  <p className="mt-2">{user?.email}</p>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center flex-col">
                  <Image
                    src="/assets/undraw_login.svg"
                    className="w-[300px] h-[290px]"
                    width={1000}
                    height={1000}
                    alt="sign in image"
                    priority
                  />
                  <h1 className="text-2xl font-bold mt-4">
                    Sign in to to view account details
                  </h1>
                  <button
                    onClick={() => dispatch(toggleModal())}
                    className="bg-green rounded-lg flex text-xl items-center px-10 py-4 justify-center text-black h-[40px] cursor-pointer my-4 btn-hover"
                  >
                    Sign In
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </PageContainer>
    </>
  );
};

export default Settings;
