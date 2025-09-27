// import FooterLogo from "@/components/footer-logo";
// import { footerData } from "@/constants";
// import { Facebook, Github, Instagram, Twitter } from "lucide-react";
// import React from "react";

// const Footer = () => {
//   const socialIcons = [
//     {
//       name: "Twitter",
//       icon: Twitter,
//       link: "https://twitter.com/yourprofile",
//     },
//     {
//       name: "Facebook",
//       icon: Facebook,
//       link: "https://facebook.com/yourprofile",
//     },
//     {
//       name: "Instagram",
//       icon: Instagram,
//       link: "https://instagram.com/yourprofile",
//     },
//     {
//       name: "Github",
//       icon: Github,
//       link: "https://github.com/yourprofile",
//     },
//   ];
//   return (
//     <footer className="rounded-[10px] bg-white grid gap-y-[24px] gap-x-[16px] grid-cols-4 md:grid-cols-8 xl:grid-cols-12 mb-[30px] p-[24px]">
//       {/* 1st box */}
//       <div className="col-span-4 md:col-span-4 xl:col-span-4 flex flex-col gap-y-[22px]">
//         <FooterLogo />
//         <p className="max-w-[228px] font-[Roboto] text-[14px] font-normal text-[#393939]">
//           We have clothes that suits your style and which you’re proud to wear.
//           From women to men.
//         </p>

//         <div className="flex items-center gap-x-[12px]">
//           {socialIcons.map((social) => (
//             <a
//               key={social.name}
//               href={social.link}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="w-[40px] h-[40px] rounded-full border border-gray-300 grid place-items-center"
//             >
//               <social.icon
//                 className="h-[20px] w-[20px]"
//                 style={{
//                   fill: "#6392D8",
//                   stroke: "#6392D8",
//                 }}
//               />
//             </a>
//           ))}
//         </div>
//       </div>

//       <div className="col-span-4 sm:col-span-2 md:col-span-2 md:col-start-5 md:col-end-7 xl:col-span-2">
//         <FooterList section={footerData[0]} />
//       </div>

//       <div className="col-span-4 sm:col-span-2 md:col-span-2 md:col-start-7 md:col-end-8 xl:col-span-2">
//         <FooterList section={footerData[1]} />
//       </div>

//       <div className="col-span-4 sm:col-span-2 md:hidden xl:block md:col-end-8 xl:col-span-2">
//         <FooterList section={footerData[2]} />
//       </div>

//       <div className="col-span-4 sm:col-span-2 md:hidden xl:block md:col-end-8 xl:col-span-2">
//         <FooterList section={footerData[3]} />
//       </div>
//       <div className="col-span-4 md:col-span-8 xl:col-span-12 border-t pt-[20px]">
//         <p className="font-[Roboto] text-[12px] text-[#74767E] font-normal tracking-[0.24] text-center">
//           Kajbazar @ 2025, All Rights Reserved
//         </p>
//       </div>
//     </footer>
//   );
// };

// interface FooterListProps {
//   section: {
//     heading: string;
//     links: string[];
//   };
// }

// const FooterList = (props: FooterListProps) => {
//   const { section } = props;
//   return (
//     <div>
//       <h4 className="font-[Roboto] text-[14px] font-bold text-[#393939] uppercase tracking-[3.36] whitespace-nowrap">
//         {section.heading}
//       </h4>
//       <div className="flex flex-col mt-[20px] gap-y-[14px]">
//         {section.links.map((link) => (
//           <p
//             key={link}
//             className="font-[Roboto] text-[14px] font-normal text-[#393939] whitespace-nowrap"
//           >
//             {link}
//           </p>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Footer;

import {
  Facebook,
  Github,
  Instagram,
  InstagramIcon,
  Twitter,
} from "lucide-react";
import { Separator } from "@radix-ui/react-select";
import React from "react";

const Footer = () => {
  return (
    <div className="card-gradient-brown flex flex-col items-startl gap-[15px] pt-[47px] pb-[15px]">
      <div className=" flex items-start justify-between gap-[50px] w-full">
        <div className="grid gap-[35px] ">
          <div>
            <h1 className="text-[18px]  ">
              <span className="text-[#287992]">Kaj</span>
              <span className="text-[#E8C092]">Bazar</span>
            </h1>
          </div>
          <p className="text-[14px] text-[#393939] w-[228px]">
            We have clothes that suits your style and which you’re proud to
            wear. From women to men.
          </p>
          <div className="flex items-center gap-[12px]">
            <div className="w-[24px] h-[24px] grid border border-[#6392D8]  place-items-center rounded-full bg-[#FFFFFF]">
              <Twitter size={14} color="#6392D8" />
            </div>
            <div className="w-[24px] h-[24px] grid place-items-center rounded-full bg-[#6392D8]">
              <Facebook size={14} color="#FFFFFF" />
            </div>
            <div className="w-[24px] h-[24px] grid border border-[#6392D8]  place-items-center rounded-full bg-[#FFFFFF]">
              <Instagram size={14} color="#6392D8" />
            </div>
            <div className="w-[24px] h-[24px] grid border border-[#6392D8] place-items-center rounded-full bg-[#FFFFFF]">
              <Github size={14} color="#6392D8" />
            </div>
          </div>
        </div>

        <div className=" text-[14px] text-[#35373F] hidden sm:grid gap-[13px]">
          <h2 className="text-[#03050F] font-bold">COMPANY</h2>
          <span>Features</span>
          <span>Works</span>
          <span>Carear</span>
          <span>About</span>
        </div>
        <div className=" text-[14px] text-[#35373F] hidden sm:grid gap-[13px]">
          <h2 className="text-[#03050F] font-bold">HELP</h2>
          <span>Customer Support</span>
          <span>Delivery Details</span>
          <span>Terms & Conditions</span>
          <span>Privary Policy</span>
        </div>
        <div className=" text-[14px] text-[#35373F] hidden md:grid gap-[13px]">
          <h2 className="text-[#03050F] font-bold">FAQ</h2>
          <span>Account</span>
          <span>Manage Deliveries</span>
          <span>Orders</span>
          <span>Payments</span>
        </div>
        <div className=" text-[14px] text-[#35373F] hidden lg:grid gap-[13px]">
          <h2 className="text-[#03050F] font-bold">COMPANY</h2>
          <span>Features</span>
          <span>Works</span>
          <span>Carear</span>
          <span>About</span>
        </div>
      </div>
      <Separator className="border-b" />
      <div className="flex items-center justify-between ">
        <p className="text-[12px] text-[#393939]">
          Kajbazar @ 2025, All Rights Reserved
        </p>
        <div className="hidden sm:flex items-center gap-[8px]">
          {[1, 2, 3, 4, 5].map((item) => (
            <div
              key={item}
              className="w-[24px] h-[24px] grid border border-[#6392D8]  place-items-center rounded-full bg-[#FFFFFF]"
            >
              <Twitter size={14} color="#6392D8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
