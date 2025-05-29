import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {

  return (
    <div className="relative min-h-[60vh] flex flex-col justify-center items-center px-6 md:px-12">
  {/* Background Image with Opacity */}
  <div
    className="absolute inset-0 bg-cover bg-center opacity-50"
    style={{ backgroundImage: "url('/contact.jpg')" }}
  ></div>

  {/* Content Section */}
  <div className="relative z-10 w-full max-w-4xl text-center">
    <div className="text-2xl pt-10 text-gray-500">
      <p>
        CONTACT <span className="text-black font-semibold">US</span>
      </p>
    </div>

    <div className="my-10 flex flex-col md:flex-row gap-10 text-sm items-center">
      <img className="w-full md:max-w-[360px]" src={assets.contact_image} alt="Contact" />

      <div className="flex flex-col justify-center items-start gap-6 text-black">
        <p className="font-semibold text-lg">OUR OFFICE</p>
        <p>2nd Ward <br /> K R Nagara, Mysore, INDIA</p>
        <p>Tel: 91-967845123 <br /> Email: shadowdev@gmail.com</p>

        <p className="font-semibold text-lg">CAREERS AT DOC+</p>
        <p>Learn more about our teams and job openings.</p>
        
        <button className="border border-black px-8 py-3 text-sm hover:bg-black hover:text-white transition-all duration-500">
          Explore Jobs
        </button>
      </div>
    </div>
  </div>
</div>
  )
}

export default Contact
