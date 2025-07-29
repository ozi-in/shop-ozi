// // // import React, { useEffect, useRef, useState } from "react";

// // // const CampaignBanners = () => {
// // //   const bannersData = [
// // //     {
// // //       id: 1,
// // //       title: "Fresh Fruits",
// // //       image: "/1c085ad4d8df2b06b5b41696ef9711f2a7f91e7e.png", // public folder path
// // //       link: "/product/1",
// // //     },
// // //     {
// // //       id: 2,
// // //       title: "Dry Fruits Sale",
// // //       image: "/baby-shop-social-media-banner-post-template_603667-74.jpg", // using same image for demo
// // //       link: "/product/2",
// // //     },
// // //     {

// // //       id: 3,
// // //       title: "Dairy Specials",
// // //       image: "/aeee02e75075c546711ea8d64421f26d.jpg",
// // //       link: "/product/3",
// // //     },
// // //     {
// // //       id: 4,
// // //       title: "Bakery Delights",
// // //       image: "/stock-vector-baby-goods-sale-banner-special-offer-sale-could-be-used-for-store-shop-internet-1118890226.jpg",
// // //       link: "/product/4",
// // //     },
// // //   ];

// // //   const [currentIndex, setCurrentIndex] = useState(0);
// // //   const timeoutRef = useRef(null);
// // //   const AUTO_PLAY_DELAY = 3000;

// // //   useEffect(() => {
// // //     if (timeoutRef.current) clearTimeout(timeoutRef.current);
// // //     timeoutRef.current = setTimeout(() => {
// // //       setCurrentIndex((prev) =>
// // //         prev === bannersData.length - 1 ? 0 : prev + 1
// // //       );
// // //     }, AUTO_PLAY_DELAY);

// // //     return () => clearTimeout(timeoutRef.current);
// // //   }, [currentIndex, bannersData.length]);

// // //   const handleBannerClick = (item) => {
// // //     // Replace with router.push if using Next.js
// // //     alert(`Navigate to: ${item.link}`);
// // //   };

// // //   const containerStyle = {
// // //     width: "100%",
// // //     overflow: "hidden",
// // //     position: "relative",
// // //   };

// // //   const sliderStyle = {
// // //     display: "flex",
// // //     transition: "transform 0.6s ease-in-out",
// // //     transform: `translateX(-${currentIndex * 100}%)`,
// // //   };

// // //   const slideStyle = {
// // //     flex: "0 0 100%",
// // //   };

// // //   const imgStyle = {
// // //     width: "100%",
// // //     height: "180px",
// // //     aspectRatio: "16/9",
// // //     objectFit: "cover",
// // //     cursor: "pointer",
// // //     display: "block",
// // //   };

// // //   return (
// // //     <div style={containerStyle}>
// // //       <div style={sliderStyle}>
// // //         {bannersData.map((item) => (
// // //           <div key={item.id} style={slideStyle}>
// // //             <img
// // //               src={item.image}
// // //               alt={item.title}
// // //               onClick={() => handleBannerClick(item)}
// // //               style={imgStyle}
// // //             />
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default CampaignBanners;

// // import React, { useEffect, useRef, useState } from "react";

// // const useIsDesktop = (minWidth = 1024) => {
// //   const [isDesktop, setIsDesktop] = useState(false);
// //   useEffect(() => {
// //     const onResize = () => {
// //       setIsDesktop(window.innerWidth >= minWidth);
// //     };
// //     onResize();
// //     window.addEventListener("resize", onResize);
// //     return () => window.removeEventListener("resize", onResize);
// //   }, [minWidth]);
// //   return isDesktop;
// // };

// // const CampaignBanners = () => {
// //   const bannersData = [
// //     { id: 1, title: "Fresh Fruits", image: "https://i.ibb.co/v6yXmm4n/stock-vector-baby-goods-sale-banner-special-offer-sale-could-be-used-for-store-shop-internet-1118890.jpg", link: "/product/1" },
// //     { id: 2, title: "Dry Fruits Sale", image: "https://i.ibb.co/Nd7k0VYW/aeee02e75075c546711ea8d64421f26d.jpg", link: "/product/2" },
// //     { id: 3, title: "Dairy Specials", image: "https://i.ibb.co/60CkJP7z/baby-shop-social-media-banner-post-template-603667-74.jpg", link: "/product/3" },
// //     { id: 4, title: "Bakery Delights", image: "https://i.ibb.co/qFyqPZCD/1c085ad4d8df2b06b5b41696ef9711f2a7f91e7e.png", link: "/product/4" },
// //   ];

// //   const AUTO_PLAY_DELAY = 3000;
// //   const isDesktop = useIsDesktop();
// //   const [currentIndex, setCurrentIndex] = useState(0);
// //   const timeoutRef = useRef(null);

// //   useEffect(() => {
// //     if (isDesktop) return;
// //     clearTimeout(timeoutRef.current);
// //     timeoutRef.current = setTimeout(() => {
// //       setCurrentIndex((prev) => (prev + 1) % bannersData.length);
// //     }, AUTO_PLAY_DELAY);
// //     return () => clearTimeout(timeoutRef.current);
// //   }, [currentIndex, bannersData.length, isDesktop]);

// //   const handleBannerClick = (item) => {
// //     window.location.href = item.link;
// //   };

// //   const duplicatedItems = [...bannersData, ...bannersData]; // for infinite loop on desktop

// //   const sliderStyle = isDesktop
// //     ? {
// //         "--scroll-duration": `${bannersData.length * 5}s`,
// //       }
// //     : {
// //         transform: `translateX(-${currentIndex * 100}%)`,
// //       };

// //   return (
// //     <>
// //       <style>{`
// //         .campaign-container {
// //           width: 100%;
// //           overflow: hidden;
// //           position: relative;
// //           padding: 10px 0;
// //           display: flex;
// //           justify-content: center;
// //           background: #f9f9f9;
// //         }

// //         .campaign-wrapper {
// //           width: 100%;
// //           max-width: 1100px;
// //         }

// //         .campaign-slider {
// //           display: flex;
// //           will-change: transform;
// //         }

// //         .campaign-slide {
// //           padding: 0 6px;
// //           box-sizing: border-box;
// //         }

// //         .campaign-slide img {
// //           width: 100%;
// //           height: 174px;
// //           object-fit: cover;
// //           border-radius: 10px;
// //           cursor: pointer;
// //           display: block;
// //           box-shadow: 0 2px 6px rgba(0,0,0,0.1);
// //         }

// //         @media (max-width: 1023px) {
// //           .campaign-slider {
// //             transition: transform 0.6s ease-in-out;
// //           }
// //           .campaign-slide {
// //             flex: 0 0 100%;
// //           }
// //         }

// //         @media (min-width: 1024px) {
// //           .campaign-slider {
// //             width: calc(200%); /* two full sets of items */
// //             animation: scroll var(--scroll-duration, 20s) linear infinite;
// //           }
// //           .campaign-slide {
// //             flex: 0 0 25%; /* 4 items = 25% each */
// //           }

// //            .campaign-slide img {
// //           width: auto;
// //           height: 300px;
// //           object-fit: cover;
// //           border-radius: 10px;
// //           cursor: pointer;
// //           display: block;
// //           box-shadow: 0 2px 6px rgba(0,0,0,0.1);
// //         }

// //         }

// //         @keyframes scroll {
// //           0% { transform: translateX(0); }
// //           100% { transform: translateX(-50%); } /* half of container (due to duplication) */
// //         }
// //       `}</style>

// //       <div className="campaign-container">
// //         <div className="campaign-wrapper">
// //           <div className="campaign-slider" style={sliderStyle}>
// //             {(isDesktop ? duplicatedItems : bannersData).map((item, idx) => (
// //               <div key={idx} className="campaign-slide">
// //                 <img
// //                   src={item.image}
// //                   alt={item.title}
// //                   onClick={() => handleBannerClick(item)}
// //                 />
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default CampaignBanners;

// import React from "react";

// const CampaignBanners = () => {
//   const bannersData = [
//     {
//       id: 1,
//       title: "Fresh Fruits",
//       image:
//         "https://i.ibb.co/v6yXmm4n/stock-vector-baby-goods-sale-banner-special-offer-sale-could-be-used-for-store-shop-internet-1118890.jpg",
//       link: "/product/1",
//     },
//     {
//       id: 2,
//       title: "Dry Fruits Sale",
//       image: "https://i.ibb.co/Nd7k0VYW/aeee02e75075c546711ea8d64421f26d.jpg",
//       link: "/product/2",
//     },
//     {
//       id: 3,
//       title: "Dairy Specials",
//       image:
//         "https://i.ibb.co/60CkJP7z/baby-shop-social-media-banner-post-template-603667-74.jpg",
//       link: "/product/3",
//     },
//     {
//       id: 4,
//       title: "Bakery Delights",
//       image:
//         "https://i.ibb.co/qFyqPZCD/1c085ad4d8df2b06b5b41696ef9711f2a7f91e7e.png",
//       link: "/product/4",
//     },
//   ];

//   const handleBannerClick = (item) => {
//     window.location.href = item.link;
//   };

//   // Repeat the data 4 times to make it look continuous
//   const repeatedData = Array(4).fill(bannersData).flat();

//   return (
//     <>
//       <style>{`
//         .marquee-wrapper {
//           width: 100%;
//           overflow: hidden;
//           position: relative;
//         }

//         .marquee-content {
//           display: inline-block;
//           white-space: nowrap;
//           animation: scroll-left 25s linear infinite;
//         }

//         .marquee-content img {
//           height: 300px;
//           width: auto;
//           margin: 0 10px;
//           cursor: pointer;
//           border-radius: 12px;
//           display: inline-block;
//         }

//         @media (max-width: 768px) {
//           .marquee-content img {
//             height: 160px;
//             margin: 0 6px;
//           }
//         }

//         @keyframes scroll-left {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }
//       `}</style>

//       <div className="marquee-wrapper">
//         <div className="marquee-content">
//           {repeatedData.map((item, index) => (
//             <img
//               key={index}
//               src={item.image}
//               alt={item.title}
//               onClick={() => handleBannerClick(item)}
//             />
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default CampaignBanners;
import React, { useRef } from "react";

const CampaignBanners = () => {
  const bannersData = [
    // {
    //   id: 1,
    //   title: "Fresh Fruits",
    //   image:
    //     "https://i.ibb.co/v6yXmm4n/stock-vector-baby-goods-sale-banner-special-offer-sale-could-be-used-for-store-shop-internet-1118890.jpg",
    //   link: "/product/1",
    // },
    // {
    //   id: 2,
    //   title: "Dry Fruits Sale",
    //   image: "https://i.ibb.co/Nd7k0VYW/aeee02e75075c546711ea8d64421f26d.jpg",
    //   link: "/product/2",
    // },
    // {
    //   id: 3,
    //   title: "Dairy Specials",
    //   image:
    //     "https://i.ibb.co/60CkJP7z/baby-shop-social-media-banner-post-template-603667-74.jpg",
    //   link: "/product/3",
    // },
    // {
    //   id: 4,
    //   title: "Bakery Delights",
    //   image:
    //     "https://i.ibb.co/qFyqPZCD/1c085ad4d8df2b06b5b41696ef9711f2a7f91e7e.png",
    //   link: "/product/4",
    // },
    // {
    //   id: 5,
    //   title: "Hospital Bag 1",
    //   image: "https://i.ibb.co/gZp2rHS2/Web-Hospital-Bag-Essentials.png",
    //   link: "/product/5",
    // },
    // {
    //   id: 6,
    //   title: "Hospital Bag 2",
    //   image: "https://i.ibb.co/LDMjnkr4/Hospital-Bag-Essentials-web.png",
    //   link: "/product/6",
    // },



  {
    id: 1,
    title: "Breastfeeding Needs",
    image: "https://i.ibb.co/0VJwmXbN/Web-Breastfeeding-Needs.png",
    link: "/product/1",
  },
  {
    id: 2,
    title: "Formula - Authentic Wide Range",
    image: "https://i.ibb.co/LzNK4b7g/Web-Formula-Authentic-Wide-Range.png",
    link: "/product/2",
  },
  {
    id: 3,
    title: "Formula for Special Needs",
    image: "https://i.ibb.co/ns4HXYbM/Web-Formula-for-Special-Needs.png",
    link: "/product/3",
  },
  {
    id: 4,
    title: "Germ Protection",
    image: "https://i.ibb.co/bx0vPv5/Web-Germ-Protection.png",
    link: "/product/4",
  },
  {
    id: 5,
    title: "Haus Kinder",
    image: "https://i.ibb.co/S4TxDm19/Web-Haus-Kinder.png",
    link: "/product/5",
  },
  {
    id: 6,
    title: "Hospital Bag Essentials",
    image: "https://i.ibb.co/B2bt4qy4/Web-Hospital-Bag-Essentials.png",
    link: "/product/6",
  },
  {
    id: 7,
    title: "Mosquito Protection",
    image: "https://i.ibb.co/bgNXQm1s/Web-Mosquito-Protection.png",
    link: "/product/7",
  },
  {
    id: 8,
    title: "Mustela",
    image: "https://i.ibb.co/4RJWZj2G/Web-Mustela.png",
    link: "/product/8",
  },
  {
    id: 9,
    title: "Sebamed",
    image: "https://i.ibb.co/1JZcLPRF/Web-Sebamed.png",
    link: "/product/9",
  },
  {
    id: 10,
    title: "Sensitive Baby Skin",
    image: "https://i.ibb.co/bjX4dq3R/Web-Sensitive-Baby-Skin.png",
    link: "/product/10",
  },
  {
    id: 11,
    title: "Sophie La Girafe",
    image: "https://i.ibb.co/YTZ42K8p/Web-Sophie-La-Girafe.png",
    link: "/product/11",
  },
  {
    id: 12,
    title: "Windmil Baby",
    image: "https://i.ibb.co/2YknyjhQ/Web-Windmil-baby.png",
    link: "/product/12",
  },



  ];

  const repeatedData = Array(12).fill(bannersData).flat();
  const marqueeRef = useRef(null);

  const handleBannerClick = (item) => {
    window.location.href = item.link;
  };

  return (
    <>
      <style>{`
        .marquee-wrapper {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          white-space: nowrap;
          cursor: grab;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none;  /* IE 10+ */
        }
        .marquee-wrapper::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        .marquee-content {
          display: inline-block;
          white-space: nowrap;
          animation: scroll-left 120s linear infinite;
        }

        .marquee-wrapper:hover .marquee-content {
          animation-play-state: paused;
        }

        .marquee-content img {
          height: 300px;
          margin: 0 10px;
          cursor: pointer;
          border-radius: 28px;
          display: inline-block;
        }

        @media (max-width: 768px) {
          .marquee-content img {
            height: 160px;
            margin: 0 6px;
          }
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

      <div
        className="marquee-wrapper"
        ref={marqueeRef}
        onMouseDown={(e) => {
          const el = marqueeRef.current;
          el.isDown = true;
          el.startX = e.pageX - el.offsetLeft;
          el.scrollLeftStart = el.scrollLeft;
        }}
        onMouseLeave={() => {
          const el = marqueeRef.current;
          el.isDown = false;
        }}
        onMouseUp={() => {
          const el = marqueeRef.current;
          el.isDown = false;
        }}
        onMouseMove={(e) => {
          const el = marqueeRef.current;
          if (!el.isDown) return;
          e.preventDefault();
          const x = e.pageX - el.offsetLeft;
          const walk = (x - el.startX) * 2;
          el.scrollLeft = el.scrollLeftStart - walk;
        }}
      >
        <div className="marquee-content">
          {repeatedData.map((item, index) => (
            <img
              key={index}
              src={item.image}
              alt={item.title}
              // onClick={() => handleBannerClick(item)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default CampaignBanners;