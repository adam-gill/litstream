"use client";

import Image from "next/image";
import "../../../../styles/style.css";
import Accordion from "@/components/Accordion";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { FaArrowLeft } from "react-icons/fa";
import { Router } from "next/router";
import { useRouter } from "next/navigation";


const Upgrade = () => {
  const [yearly, setYearly] = useState<boolean>(true);
  const router = useRouter()

  interface accordion {
    title: string;
    description: string;
  }

  const accordionData: accordion[] = [
    {
      title: "How does the free 7-day trial work?",
      description:
        "Begin your complimentary 7-day trial with a LitStream annual membership. You are under no obligation to continue your subscription, and you will only be billed when the trial period expires. With Premium access, you can learn at your own pace and as frequently as you desire, and you may terminate your subscription prior to the conclusion of the 7-day free trial.",
    },
    {
      title:
        "Can I switch subscriptions from monthly to yearly, or yearly to monthly?",
      description:
        "While an annual plan is active, it is not feasible to switch to a monthly plan. However, once the current month ends, transitioning from a monthly plan to an annual plan is an option.",
    },
    {
      title: "What's included in the Premium plan",
      description:
        "Premium membership provides you with the ultimate LitStream experience, including unrestricted entry to many best-selling books high-quality audio, the ability to download titles for offline reading, and the option to send your reads to your Kindle.",
    },
    {
      title: "Can I cancel during my trial or subscription?",
      description:
        "You will not be charged if you cancel your trial before its conclusion. While you will not have complete access to the entire LitStream library, you can still expand your knowledge with one curated book per day.",
    },
  ];

  return (
    <>
      <div className="flex relative flex-col items-center justify-center bg-[#032b41] w-full pt-[48px] upgrade-shape">
        <FaArrowLeft className="absolute top-4 left-4 cursor-pointer" size={28} color="white" onClick={() => router.back()} />
        <h1 className="font-bold text-white text-[48px] mb-[40px] text-center px-4">
          Get unlimited access to life changing books
        </h1>
        <p className="text-white text-[20px] mb-[32px]">
          Turn ordinary moments into incredible learning opportunities
        </p>
        <Image
          src="/assets/undraw_upgrade.svg"
          width={340}
          height={340}
          className="bg-white upgrade-img w-[340px] h-[340px]"
          alt="upgrade picture"
        />
      </div>

      <div className="fcc flex-row gap-4 pt-8 mb-[56px]">
        <div className="fcc flex-col">
          <Image
            src={"/assets/doc.svg"}
            width={60}
            height={60}
            alt="document icon"
          />
          <p className="max-w-[220px] text-center text-LSblue">
            <strong>Key ideas in minutes</strong> with lots of books to read
          </p>
        </div>

        <div className="fcc flex-col">
          <Image
            src={"/assets/plant.svg"}
            width={60}
            height={60}
            alt="document icon"
          />
          <p className="max-w-[220px] text-center text-LSblue">
            <strong>Hundreds</strong> of users growing with LitStream daily
          </p>
        </div>

        <div className="fcc flex-col">
          <Image
            src={"/assets/handshake.svg"}
            width={60}
            height={60}
            alt="document icon"
          />
          <p className="max-w-[220px] text-center text-LSblue">
            <strong>Precise recommendations</strong> based on your preferences
          </p>
        </div>
      </div>

      <div className="fcc flex-col">
        <h1 className="font-bold text-[32px] mb-[32px] text-LSblue">
          Choose the right plan for you
        </h1>

        <div
          onClick={() => setYearly(true)}
          className="btn-hover flex relative w-full max-w-[680px] rounded-lg border-4 border-green p-6 flex-row items-start bg-gray-100"
        >
          <div className="flex w-6 h-6 border-2 border-LSblue rounded-full fcc mr-8">
            <div
              className={cn(
                "w-[4px] h-[4px] rounded-full bg-LSblue border-LSblue border-[3px]",
                yearly ? "" : "hidden"
              )}
            ></div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-LSblue">{"Premium"}</h1>
            <h1 className="text-xl font-bold text-LSblue">{"$49.99/year"}</h1>
            <p className="">{"7-day free trial included"}</p>
          </div>
          <div className="absolute text-2xl text-red-500 font-bold top-3 right-3">
            {"Save 16%"}
          </div>
        </div>

        <div className="fcc flex-row py-8">
          <div className="h-[1px] w-[125px] bg-gray-600 rounded-full"></div>
          <div className="px-4">or</div>
          <div className="h-[1px] w-[125px] bg-gray-600 rounded-full"></div>
        </div>

        <div
          onClick={() => setYearly(false)}
          className="btn-hover flex w-full max-w-[680px] rounded-lg border-4 border-green p-6 flex-row items-start bg-gray-100"
        >
          <div className="flex w-6 h-6 border-2 border-LSblue rounded-full fcc mr-8">
            <div
              className={cn(
                "w-[4px] h-[4px] rounded-full bg-LSblue border-LSblue border-[3px]",
                !yearly ? "" : "hidden"
              )}
            ></div>
          </div>

          <div className="flex flex-col">
            <h1 className="text-xl font-bold text-LSblue">{"Premium"}</h1>
            <h1 className="text-xl font-bold text-LSblue">{"$4.99/month"}</h1>
            <p>{"No trial included"}</p>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 fcc flex-col bg-white">
        <button className="bg-green text-bold py-4 px-16 rounded-lg mt-4 btn-hover text-LSblue font-semibold">
          {"Start you free 7-day trial"}
        </button>
        <p className="text-sm text-gray-500 mt-4 pb-4">
          {
            "Cancel your trial at any time before it ends and you won't be charged"
          }
        </p>
      </div>

      <div className="mb-10">
        {accordionData.map((accordion, index) => (
          <Accordion
            key={index}
            title={accordion.title}
            description={accordion.description}
          />
        ))}
      </div>

      <section className="flex" id="footer">
        <div className="row">
          <div className="container">
            <div className="footer__top--wrapper">
              <div className="footer__block">
                <div className="footer__link--title">Actions</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">LitStream Magazine</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Cancel Subscription</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Help</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Contact us</a>
                  </div>
                </div>
              </div>
              <div className="footer__block">
                <div className="footer__link--title">Useful Links</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Pricing</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">LitStream Business</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Gift Cards</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Authors & Publishers</a>
                  </div>
                </div>
              </div>
              <div className="footer__block">
                <div className="footer__link--title">Company</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">About</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Careers</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Partners</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Code of Conduct</a>
                  </div>
                </div>
              </div>
              <div className="footer__block">
                <div className="footer__link--title">Other</div>
                <div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Sitemap</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Legal Notice</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Terms of Service</a>
                  </div>
                  <div className="footer__link--wrapper">
                    <a className="footer__link">Privacy Policies</a>
                  </div>
                </div>
              </div>
            </div>
            <div className="footer__copyright--wrapper">
              <div className="footer__copyright">
                Copyright &copy; 2024 LitStream.
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Upgrade;
