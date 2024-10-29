// import Slider from "react-slick";
// import { Hospital, UserRound, Building2, Ambulance } from "lucide-react";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import Navbar from "../Components/Navbar";
// import { Link } from "react-router-dom";

// const features = [
//   { name: "Hospitals", icon: Hospital, href: "/services/hospitals" },
//   { name: "Doctors", icon: UserRound, href: "/services/doctors" },
//   { name: "Specialties", icon: Building2, href: "/services/specialties" },
//   { name: "Ambulance", icon: Ambulance, href: "/services/ambulance" },
// ];

// const adImages = [
//   "https://img.freepik.com/free-vector/flat-design-medical-facebook-ad_23-2149091913.jpg",
//   "https://img.freepik.com/free-vector/flat-design-medical-facebook-ad_23-2149091912.jpg",
//   "https://th.bing.com/th/id/OIP.yTcG-jZWUKXEzm18Jcr2yAHaEK?w=800&h=450&rs=1&pid=ImgDetMain",
//   "https://dcassetcdn.com/design_img/3242090/43775/43775_17860005_3242090_1b999885_image.jpg",
// ];

// export default function HomePage() {
//   const carouselSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <div className="min-h-screen bg-green-50">
//       <Navbar />
//       <main className="container mx-auto px-4 py-8">
//         <div className="mb-8 bg-white p-3 py-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
//           <Slider {...carouselSettings}>
//             {adImages.map((src, index) => (
//               <div key={index} className="relative w-full h-64 rounded-lg">
//                 <div
//                   style={{
//                     width: "100%",
//                     height: "100%",
//                     backgroundImage: `url(${src})`,
//                     backgroundRepeat: "no-repeat",
//                     backgroundSize: "cover",
//                     backgroundPosition: "center",
//                   }}
//                 />
//               </div>
//             ))}
//           </Slider>
//         </div>

//         <h2 className="text-3xl font-bold text-green-800 mb-6">Our Services</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//           {features.map((feature) => (
//             <Link key={feature.name} to={feature.href}>
//               <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
//                 <feature.icon className="h-12 w-12 text-green-600 mb-4" />
//                 <h3 className="text-lg font-semibold text-green-800">
//                   {feature.name}
//                 </h3>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState } from "react";
import Slider from "react-slick";
import {
  Hospital,
  UserRound,
  Building2,
  Ambulance,
  Droplet,
  Search,
} from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "../Components/Navbar";
import { Link } from "react-router-dom";

const features = [
  { name: "Hospitals", icon: Hospital, href: "/services/hospitals" },
  { name: "Doctors", icon: UserRound, href: "/services/doctors" },
  { name: "Specialties", icon: Building2, href: "/services/specialties" },
  { name: "Ambulance", icon: Ambulance, href: "/services/ambulance" },
  { name: "Donate Blood", icon: Droplet, href: "/services/blood-donation" },
  { name: "Find Blood", icon: Search, href: "/services/blood-request" },
];

const adImages = [
  "https://img.freepik.com/free-vector/flat-design-medical-facebook-ad_23-2149091913.jpg",
  "https://img.freepik.com/free-vector/flat-design-medical-facebook-ad_23-2149091912.jpg",
  "https://th.bing.com/th/id/OIP.yTcG-jZWUKXEzm18Jcr2yAHaEK?w=800&h=450&rs=1&pid=ImgDetMain",
  "https://dcassetcdn.com/design_img/3242090/43775/43775_17860005_3242090_1b999885_image.jpg",
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  console.log(currentSlide);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    beforeChange: (_: any, next: any) => setCurrentSlide(next),
  };

  return (
    <div className="min-h-screen bg-green-50">
      <Navbar />
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 bg-white rounded-lg shadow-md overflow-hidden">
          <Slider {...carouselSettings}>
            {adImages.map((src, index) => (
              <div key={index} className="relative aspect-[16/9]">
                <img
                  src={src}
                  alt={`Advertisement ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 right-2 bg-white bg-opacity-75 px-2 py-1 rounded text-sm">
                  {index + 1} / {adImages.length}
                </div>
              </div>
            ))}
          </Slider>
        </div>

        <h2 className="text-2xl font-bold text-green-800 mb-4">Our Services</h2>

        <div className="grid grid-cols-2 gap-4">
          {features.slice(0, 3).map((feature) => (
            <Link key={feature.name} to={feature.href}>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center h-32">
                <feature.icon className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="text-sm font-semibold text-green-800 text-center">
                  {feature.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {features.slice(3).map((feature) => (
            <Link key={feature.name} to={feature.href}>
              <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center justify-center h-32">
                <feature.icon className="h-8 w-8 text-green-600 mb-2" />
                <h3 className="text-sm font-semibold text-green-800 text-center">
                  {feature.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
