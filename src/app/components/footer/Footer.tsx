"use client";

import { MainHeading, SubHeading } from '@/app/fontSize';

const NAV_MENU = [
    {
        name: "Home",
        href: "/",
    },
    {
        name: "Our Story",
        href: "/aboutUs",
    },
    {
        name: "Portfolio",
        href: "/portfolio",
    },
    {
        name: "Inputs",
        href: "/inputs",
    },
    {
        name: "Contact",
        href: "/contact",
    },
];
const CURRENT_YEAR = new Date().getFullYear();
const images = [
    "https://res.cloudinary.com/dbuypmffx/image/upload/v1738393876/NDM_6493_copy_yztluj.jpg",
    "https://res.cloudinary.com/dbuypmffx/image/upload/v1738391555/RRH_5391_jb6yoy.jpg",
    "https://res.cloudinary.com/dbuypmffx/image/upload/v1738393490/RRH_4596_qrmfyp.jpg",
    "https://res.cloudinary.com/dbuypmffx/image/upload/v1738415691/SSM_9204_m8zcbo.jpg",
    "https://res.cloudinary.com/dbuypmffx/image/upload/v1738393642/DSC06106_qnvfoe.jpg",
    "https://res.cloudinary.com/dbuypmffx/image/upload/v1738393777/_DSC9308-Enhanced-NR_rf5w4r.jpg",
    "https://res.cloudinary.com/dbuypmffx/image/upload/v1738389372/DSC_6133_a6iuqu.jpg",
    "https://res.cloudinary.com/dbuypmffx/image/upload/v1738391613/RRH_5614-Enhanced-NR-2_oacfd0.jpg",
    "https://res.cloudinary.com/dbuypmffx/image/upload/v1738393817/NDM_5771_chue7m.jpg",
];
export function Footer() {
    return (
        <footer className="mt-0 bg-colors-custom-dark px-6 sm:px-10 lg:px-14 pt-12 text-gray-300">
            <div className="container mx-auto">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
                    {/* Logo & Subtitle */}
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className={`${MainHeading.className} text-xl font-bold text-gray-400`}>
                            AVAIRA
                        </div>
                        <div className={`${SubHeading.className} text-center md:text-left text-gray-400 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl leading-relaxed`}>
                            Where every love story finds its perfect beginning,<br className="hidden sm:block" />
                            and every moment is crafted to last forever.<br className="hidden sm:block" />
                            Welcome to Avaira!
                        </div>

                    </div>

                    {/* Navigation Links */}
                    
                    <ul className={`${SubHeading.className} flex flex-col items-center md:items-start gap-2 `}>
                    <div className={`${MainHeading.className} text-xl font-bold text-gray-400 `}>
                    Site Links

                        </div>
                        {NAV_MENU.map((link) => (
                            <li key={link.name}>
                                <a href={link.href} className="font-medium text-gray-400 hover:text-white ">
                                    {link.name}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* Contact Info */}
                    <div className={`${SubHeading.className} flex flex-col items-center md:items-start gap-2 text-gray-400`}>
                    <div className={`${MainHeading.className} text-xl font-bold text-gray-400`}>
                            Contact
                        </div>
                        <div>contact@avaira.com</div>
                        <div>info@avaira.com</div>
                        <div>+96 xxx xxxx xx</div>
                    </div>

                    {/* Image Grid (3x3) */}
                    <div className='flex flex-col items-center md:items-start'>
                    <div className={`${MainHeading.className} text-xl font-bold text-gray-400 pb-4`}>
                            Follow Us On Instagram
                        </div>
                    <div className="grid grid-cols-3 gap-2 w-40 sm:w-52">
                        
                        {images.map((src, index) => (
                            <img key={index} src={src} alt={`Image ${index + 1}`} className="w-full h-14 object-cover shadow-sm hover:cursor-pointer" />
                        ))}
                    </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="mt-10 flex flex-col items-center gap-6 border-t border-gray-700 pt-4 text-center md:flex-row md:justify-between pb-4">
                    {/* Copyright */}
                    <div className={`${MainHeading.className} text-gray-400 text-sm sm:text-base`}>
                    Copyright {CURRENT_YEAR}{"  "} &copy;
                        <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                            Outbaz
                        </a>{" "}
                        | All Rights Reserved.
                    </div>

                    {/* Social Icons */}
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-white" aria-label="Facebook">
                            <i className="fa-brands fa-facebook text-2xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white" aria-label="Twitter">
                            <i className="fa-brands fa-twitter text-2xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white" aria-label="Instagram">
                            <i className="fa-brands fa-instagram text-2xl"></i>
                        </a>
                        <a href="#" className="text-gray-400 hover:text-white" aria-label="LinkedIn">
                            <i className="fa-brands fa-linkedin text-2xl"></i>
                        </a>
                    </div>
                </div>
            </div>
        </footer>

    );
}

export default Footer;
