import React from "react";
import Container from "../Container";
import Link from "next/link";
import FooterList from "./footerList";
import {MdFacebook} from "react-icons/md"
import {AiFillTwitterCircle, AiFillYoutube , AiFillInstagram} from "react-icons/ai"


const footer = () => {
  return (
    <footer className="bg-gray-800  w-full z-10 text-xs text-gray-300  bottom-0">
      <div className="py-4 border-b">
        <Container>
          <div className="flex flex-col md:flex-row justify-between gap-4  pt-16  pb-8">
            <FooterList>
              <h3 className="font-bold text-base mb-2 ">Shop Categories</h3>
              <Link href="#">Phone</Link>
              <Link href="#">Laptops</Link>
              <Link href="#">Desktops</Link>
              <Link href="#">Watches</Link>
              <Link href="#">TVs</Link>
              <Link href="#">Accessories</Link>
            </FooterList>

            <FooterList>
              <h3 className="font-bold text-base mb-2">Customer Service</h3>

              <Link href="#">Contact Us</Link>
              <Link href="#">Shipping Policy</Link>
              <Link href="#">Returns & Exchanges</Link>
              <Link href="#">Watches</Link>
              <Link href="#">FAQs</Link>
            </FooterList>

            <FooterList>
              <h3 className="font-bold text-base mb-2">About Us</h3>
              <p className="">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis amet esse quod atque consequuntur corporis commodi corrupti ipsum temporibus recusandae ipsam.</p>
              <p>&copy; {new Date().getFullYear()} E-Shop. All Rights Reserved</p>
            </FooterList>
            
            <FooterList>
              <h3 className="font-bold text-base mb-2">Follow Us</h3>
              <div className="flex flex-row gap-2 text-lg">
                <MdFacebook/>
                <AiFillInstagram/>
                <AiFillTwitterCircle/>
                <AiFillYoutube/>
              </div>
            </FooterList>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default footer;
