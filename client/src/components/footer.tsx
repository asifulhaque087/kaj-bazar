import FooterLogo from "@/components/footer-logo";
import { footerData } from "@/constants";
import { Facebook, Github, Instagram, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  const socialIcons = [
    {
      name: "Twitter",
      icon: Twitter,
      link: "https://twitter.com/yourprofile",
    },
    {
      name: "Facebook",
      icon: Facebook,
      link: "https://facebook.com/yourprofile",
    },
    {
      name: "Instagram",
      icon: Instagram,
      link: "https://instagram.com/yourprofile",
    },
    {
      name: "Github",
      icon: Github,
      link: "https://github.com/yourprofile",
    },
  ];
  return (
    <footer className="rounded-[10px] bg-white grid gap-y-[24px] gap-x-[16px] grid-cols-4 md:grid-cols-8 xl:grid-cols-12 mb-[100px] p-[24px]">
      {/* 1st box */}
      <div className="col-span-4 md:col-span-4 xl:col-span-4 flex flex-col gap-y-[22px]">
        <FooterLogo />
        <p className="max-w-[228px] font-[Roboto] text-[14px] font-normal text-[#393939]">
          We have clothes that suits your style and which you’re proud to wear.
          From women to men.
        </p>

        <div className="flex items-center gap-x-[12px]">
          {socialIcons.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[40px] h-[40px] rounded-full border border-gray-300 grid place-items-center"
            >
              <social.icon
                className="h-[20px] w-[20px]"
                style={{
                  fill: "#6392D8",
                  stroke: "#6392D8",
                }}
              />
            </a>
          ))}
        </div>
      </div>

      <div className="col-span-4 md:col-span-2 md:col-start-5 md:col-end-7 xl:col-span-2">
        <FooterList section={footerData[0]} />
      </div>

      <div className="col-span-4 md:col-span-2 md:col-start-7 md:col-end-8 xl:col-span-2">
        <FooterList section={footerData[1]} />
      </div>

      <div className="col-span-4 md:hidden xl:block md:col-end-8 xl:col-span-2">
        <FooterList section={footerData[2]} />
      </div>

      <div className="col-span-4 md:hidden xl:block md:col-end-8 xl:col-span-2">
        <FooterList section={footerData[3]} />
      </div>
    </footer>
  );
};

interface FooterListProps {
  section: {
    heading: string;
    links: string[];
  };
}

const FooterList = (props: FooterListProps) => {
  const { section } = props;
  return (
    <div>
      <h4 className="font-[Roboto] text-[14px] font-bold text-[#393939] uppercase tracking-[3.36] whitespace-nowrap">
        {section.heading}
      </h4>
      <div className="flex flex-col mt-[20px] gap-y-[14px]">
        {section.links.map((link) => (
          <p
            key={link}
            className="font-[Roboto] text-[14px] font-normal text-[#393939] whitespace-nowrap"
          >
            {link}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Footer;
