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
import React, { useRef, useEffect, useState, useCallback } from "react";
import useGetBanners from "../../../../api-manage/hooks/react-query/useGetBanners";
import { useDispatch, useSelector } from "react-redux";
import { setBanners } from "../../../../redux/slices/storedData";
import { useRouter } from "next/router";

const CampaignBanners = () => {
  const dispatch = useDispatch();
  const { banners } = useSelector((state) => state.storedData);
  const { data, refetch: refetchBannerData, isFetched } = useGetBanners();
  const router = useRouter();
  // Scroll container refs and state
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const autoScrollRef = useRef(null);



  // Banner data effects
  useEffect(() => {
    if (data?.campaigns) {
      dispatch(setBanners(data));
    }
  }, [data]);

  useEffect(() => {
    console.log("campaignBannerAPiData", banners.length);
    if (banners.campaigns?.length === 0) {
      refetchBannerData();
    }
  }, [banners]);

  // Auto scroll functionality with infinite loop
  const startAutoScroll = useCallback(() => {
    if (isDragging) return;

    const container = scrollContainerRef.current;
    if (!container) return;

    autoScrollRef.current = setInterval(() => {
      if (isDragging) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      const currentScrollLeft = container.scrollLeft;

      if (currentScrollLeft >= maxScrollLeft - 1) {
        // Reset to start for infinite scroll
        container.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        // Smooth continuous scroll
        container.scrollBy({ left: 1, behavior: 'auto' });
      }
    }, 20); // Smooth pixel-by-pixel scroll
  }, [isDragging]);

  const stopAutoScroll = useCallback(() => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
      autoScrollRef.current = null;
    }
  }, []);

  // Auto scroll effects
  useEffect(() => {
    startAutoScroll();
    return stopAutoScroll;
  }, [startAutoScroll, stopAutoScroll]);

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    stopAutoScroll();
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    scrollContainerRef.current.style.cursor = 'grabbing';
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    scrollContainerRef.current.style.cursor = 'grab';
    // Resume auto scroll after 2 seconds
    setTimeout(() => {
      if (!isDragging) {
        startAutoScroll();
      }
    }, 2000);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      scrollContainerRef.current.style.cursor = 'grab';
      setTimeout(() => {
        startAutoScroll();
      }, 2000);
    }
  };
  const handleBannerClick1 = (item) => {
    console.log("title of the data ", item);
    router.push(
      { pathname: "/home", query: { search: item, data_type: "searched" } }
    );
  };

  const handleBannerClick = (item) => {
    window.location.href = item.link;
  };

  // Use only API data with duplication for infinite scroll
  const displayBanners = banners.banners || [];
  // Duplicate banners multiple times for seamless infinite scroll
  const infiniteBanners = displayBanners.length > 0 ? [...displayBanners, ...displayBanners, ...displayBanners] : [];

  return (
    <>
      <style>{`
        .scroll-container {
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        .scroll-wrapper {
          display: flex;
          overflow-x: auto;
          overflow-y: hidden;
          cursor: grab;
          padding: 20px 0;
          gap: 20px;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE 10+ */
        }

        .scroll-wrapper::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }

        .banner-item {
          flex-shrink: 0;
          width: 500px;
          height: auto;
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.3s ease;
        }

        .banner-item:hover {
          transform: scale(1.02);
        }

        .banner-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 20px;
        }

        @media (max-width: 768px) {
          .banner-item {
            width: 500px;
            height: 150px;
          }
        }

        @media (max-width: 480px) {
          .banner-item {
            width: 400px;
            height: auto;
          }
        }
      `}</style>

      <div className="scroll-container">
        {/* Scroll container */}
        <div
          ref={scrollContainerRef}
          className="scroll-wrapper"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          {infiniteBanners.map((item, index) => (
            <div
              key={`${item.id || index}-${Math.floor(index / displayBanners.length)}`}
              className="banner-item"
              onClick={() => handleBannerClick1(item.title)}
            >
              <img
                src={item.image_full_url || item.image}
                alt={item.title}
                draggable="false"

              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CampaignBanners;
