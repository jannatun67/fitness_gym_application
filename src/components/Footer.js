'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white  border-t-2 max-w-[1691px] mx-auto border-gray-200 mt-20">
      <div className="max-w-[1691px] mx-auto px-6 pt-12 pb-6">

        {/* Main grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">

          {/* About */}
          <div>
            <h4 className="text-black font-medium text-[22px] mb-3">About</h4>
            
            <p className="text-gray-600 text-[18px] leading-relaxed mb-5">
              At MuscleForge, we believe in the power of dedication and hard
              work. Our mission is to provide you with the tools, resources,
              and community you need to build the body of your dreams
            </p>
            <div className="w-[150px] h-0.5 bg-gray-400 mb-4" />
            <div className="flex items-center gap-2 text-[18px] text-gray-700">
              <span className="font-bold ">Social Media:</span>
              <Link href="#" className="font-bold text-black hover:text-gray-500 transition-colors">Fb</Link>
              <Link href="#" className="font-bold text-black hover:text-gray-500 transition-colors">In</Link>
              <Link href="#" className="font-bold text-black hover:text-gray-500 transition-colors">Tw</Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-black font-medium text-[22px] mb-3">Quick Links</h4>
            
            <ul className="space-y-3">
              {['Home', 'Our gym location', 'Contact Us', 'Privacy policy'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 text-[18px] hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Service */}
          <div>
            <h4 className="text-black font-medium text-[22px] mb-3">Our Service</h4>
            
            <ul className="space-y-3">
              {['Indoor gym', 'Outdoor gym', 'On ground gym', 'Yoga class'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-gray-600 text-[18px] hover:text-black transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-black font-medium text-[22px] mb-3">Contact Info</h4>
           
            <ul className="space-y-3 text-[18px] text-gray-600">
              <li>
                <span className="font-semibold text-black">Mail: </span>
                info@example.com
              </li>
              <li>
                <span className="font-semibold text-black">Call: </span>
                +91 9876543210
              </li>
              <li>
                <span className="font-semibold text-black">Location: </span>
                New York, 235 Lane, 10001
              </li>
              <li>
                <span className="font-semibold text-black">Time: </span>
                Workout Hours: 5AM – 8PM
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t w-[455px] mx-auto border-gray-200 pt-6">
          <p className="text-center text-gray-500 text-[18px] mb-[96px]">
            websitename.com©2024 all right reserve
          </p>
        </div>
      </div>
    </footer>
  );
}