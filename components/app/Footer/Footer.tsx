import React from "react";
import Wrapper from "../Wrapper/Wrapper";
import Link from "next/link";
import { Twitter, Facebook, Instagram, Github, Mail } from "lucide-react";

const Footer = () => {
  const footerLinks = [
    {
      title: "COMPANY",
      links: [
        { name: "About", href: "#" },
        { name: "Features", href: "#" },
        { name: "Works", href: "#" },
        { name: "Careers", href: "#" },
      ],
    },
    {
      title: "HELP",
      links: [
        { name: "Customer Support", href: "#" },
        { name: "Delivery Details", href: "#" },
        { name: "Terms & Conditions", href: "#" },
        { name: "Privacy Policy", href: "#" },
      ],
    },
    {
      title: "FAQ",
      links: [
        { name: "Account", href: "#" },
        { name: "Manage Deliveries", href: "#" },
        { name: "Orders", href: "#" },
        { name: "Payments", href: "#" },
      ],
    },
    {
      title: "RESOURCES",
      links: [
        { name: "Free eBooks", href: "#" },
        { name: "Development Tutorial", href: "#" },
        { name: "How to - Blog", href: "#" },
        { name: "Youtube Playlist", href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-[#F0F0F0] pt-16 pb-8 mt-3">
      <Wrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between">
          {/* Brand and Description */}
          <div className="lg:max-w-sm flex flex-col gap-6">
            <h2 className="text-3xl font-black italic tracking-tighter">SHOP.CO</h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              We have clothes that suit your style and which you&apos;re proud to wear. 
              From women to men, we offer a wide range of meticulously crafted garments.
            </p>
            <div className="flex gap-4">
              <Link href="#" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all shadow-sm">
                <Twitter size={18} />
              </Link>
              <Link href="#" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all shadow-sm">
                <Facebook size={18} />
              </Link>
              <Link href="#" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all shadow-sm">
                <Instagram size={18} />
              </Link>
              <Link href="#" className="p-2 bg-white rounded-full border border-gray-200 hover:bg-black hover:text-white transition-all shadow-sm">
                <Github size={18} />
              </Link>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-16">
            {footerLinks.map((section) => (
              <div key={section.title} className="flex flex-col gap-4">
                <h3 className="font-bold text-sm tracking-[0.2em] uppercase text-black">
                  {section.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {section.links.map((link) => (
                    <li key={link.name}>
                      <Link 
                        href={link.href} 
                        className="text-gray-500 hover:text-black text-sm transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <hr className="my-10 border-gray-200" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm">
            SHOP.CO © 2000-2023, All Rights Reserved
          </p>
          <div className="flex items-center gap-4">
            {/* Mock Payment Icons */}
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm text-[8px] font-bold">VISA</div>
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm text-[8px] font-bold">MasterCard</div>
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm text-[8px] font-bold">PayPal</div>
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm text-[8px] font-bold">ApplePay</div>
            <div className="h-8 w-12 bg-white rounded flex items-center justify-center border border-gray-100 shadow-sm text-[8px] font-bold">GooglePay</div>
          </div>
        </div>
      </Wrapper>
    </footer>
  );
};

export default Footer;

