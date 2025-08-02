// import React from "react";
// import styled from "styled-components";
// import { FaApple, FaAndroid } from "react-icons/fa";
// import gPlay from "./assets/gplayIcon.png";

// const CardWrapper = styled.div`
//   background-color: #0f172a;
//   border-radius: 40px;
//   height: auto; /* dynamic height for mobile */
//   color: white;
//   padding: 40px;
//   display: flex;
//   flex-direction: column;
//   gap: 36px;

//   margin-top: 20px;
//   @media (max-width: 767px) {
//     padding: 20px; /* reduced padding for mobile */
//   }

//   @media (min-width: 488px) {
//     height: 340px; /* fixed height for desktop */
//     flex-direction: row;
//     justify-content: space-between;
//     align-items: center;
//   }
// `;

// const LeftSection = styled.div`
//   flex: 1;

//   @media (max-width: 767px) {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `;

// const Tags = styled.div`
//   display: flex;
//   gap: 16px;
//   margin-bottom: 1rem;

//   @media (max-width: 767px) {
//     display: flex;
//     flex-direction: column;
//     align-items: flex-start;
//   }
// `;

// const Tag = styled.span`
//   background-color: #1e293b;
//   color: white;
//   font-size: 16px;
//   font-weight: 500;
//   padding: 8px 20px;
//   border-radius: 9999px;

//   @media (max-width: 767px) {
//     font-size: 14px;
//     font-weight: 300;
//   }
// `;

// const Heading = styled.h2`
//   font-size: 32px;
//   font-weight: 700;
//   margin: 0;
//   line-height: 1.3;

//   @media (max-width: 767px) {
//     font-size: 20px;
//     font-weight: 700;
//   }
// `;

// const Description = styled.p`
//   font-size: 20px;
//   font-weight: 400;
//   margin-top: 12px;
//   color: Gray/100;
//   line-height: 1.6;
// `;

// const RightSection = styled.div`
//   flex: 1;
//   display: flex;
//   flex-direction: column;
//   gap: 1.5rem;
//   width: 100%;

//   @media (min-width: 768px) {
//     align-items: flex-start;
//   }
// `;

// const RightContentWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 1rem;

//   @media (min-width: 768px) {
//     flex-direction: row;
//   }
// `;

// const DownloadHeading = styled.span`
//   font-size: 20px;
//   font-weight: 500;
//   margin-bottom: 8px;
//   color: #ffffff;
// `;

// const DownloadCard = styled.div`
//   background-color: #1e293b;
//   border-radius: 1rem;
//   padding: 1rem;
//   min-width: 270px;
//   min-height: 218px;
//   display: flex;
//   flex-direction: column;
//   justify-content: space-between;
//   position: relative;

//   @media (max-width: 767px) {
//     min-height: 102px;
//     display: flex;
//     gap: 8px;
//   }
// `;

// const DownloadCardTitle = styled.span`
//   font-size: 20px;
//   font-weight: 500;
//   color: white;
// `;

// const Button = styled.button`
//   background-color: #334155;
//   color: white;
//   border: none;
//   width: 188px;
//   padding: 0.6rem 1.2rem;
//   border-radius: 9999px;
//   font-size: 16px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 12px;
//   margin-bottom: 0.8rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #475569;
//   }
// `;

// const QR = styled.img`
//   width: 80px;
//   height: 80px;
//   margin-bottom: 0.5rem;
//   border-radius: 4px;

//   @media (max-width: 767px) {
//     display: none;
//   }
// `;

// const PlatformIcon = styled.div`
//   position: absolute;
//   height: 44px;
//   width: 44px;
//   align-items: center;
//   display: flex;
//   justify-content: center;
//   bottom: 16px;
//   right: 16px;
//   font-size: 1.5rem;
//   color: black;
//   border-radius: 90px;
//   background-color: #fff;

//   @media (max-width: 767px) {
//     display: none;
//   }
// `;
// const Footer2 = () => {
//   return (
//     <CardWrapper>
//       <LeftSection>
//         <Tags>
//           <Tag>Exclusive App-Only Deals</Tag>
//           <Tag>Fastest Delivery In Your Area</Tag>
//         </Tags>
//         <Heading>
//           Shop Essentials For You & <br /> Your Little One - On The Go!
//         </Heading>
//         <Description>
//           Get Lightning-Fast Deliveries Of Baby Care, Kids Essentials, And Mom
//           Needs – Anytime, Anywhere.
//         </Description>
//       </LeftSection>
//       <RightSection>
//         <DownloadHeading>Download the OZI App Now!</DownloadHeading>
//         <RightContentWrapper>
//           <DownloadCard>
//             <DownloadCardTitle variant="ios">For iOS</DownloadCardTitle>
//             <Button>
//               <FaApple style={{ fontSize: "24px" }} /> Download App
//             </Button>
//             <QR src="/qr-ios.png" alt="QR iOS" />
//             <PlatformIcon>
//               <FaApple />
//             </PlatformIcon>
//           </DownloadCard>

//           <DownloadCard>
//             <DownloadCardTitle variant="android">For Android</DownloadCardTitle>
//             <Button>
//               <img src={gPlay.src}></img> Download App
//             </Button>
//             <QR src="/qr-ios.png" alt="QR Android" />
//             <PlatformIcon>
//               <FaAndroid />
//             </PlatformIcon>
//           </DownloadCard>
//         </RightContentWrapper>
//       </RightSection>
//     </CardWrapper>
//   );
// };

// export default Footer2;

import React from "react";
import styled from "styled-components";
import { FaApple, FaAndroid } from "react-icons/fa";
import gPlay from "./assets/gplayIcon.png";

const CardWrapper = styled.div`
  background-color: #0f172a;
  border-radius: 40px;
  height: auto;
  color: white;
  padding: 40px;
  display: flex;
  flex-direction: column;
  margin-top: 20px;

  @media (max-width: 767px) {
    padding: 20px;
    gap: 36px; /* Explicitly restate for clarity (optional) */
  }

  @media (min-width: 768px) {
    height: 340px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    
  }
`;

const LeftSection = styled.div`
  flex: 1;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Tags = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 1rem;

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Tag = styled.span`
  background-color: #1e293b;
  color: white;
  font-size: 16px;
  font-weight: 500;
  padding: 8px 20px;
  border-radius: 9999px;

  @media (max-width: 767px) {
    font-size: 14px;
    font-weight: 300;
  }
`;

const Heading = styled.h2`
  font-size: 32px;
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
  width: 100%; /* Default for desktop */

  @media (max-width: 767px) {
    font-size: 26px;
    font-weight: 700;
    width: 100%; /* Full width on mobile */
  }
`;

const Description = styled.p`
  font-size: 20px;
  font-weight: 400;
  margin-top: 12px;
  color: Gray/100;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  width: 100%;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
`;

const RightContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const DownloadHeading = styled.span`
  font-size: 26px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #ffffff;

  @media (min-width: 768px) {
    font-size: 20px;
  }
`;

const DownloadCard = styled.div`
  background-color: #1e293b;
  border-radius: 1rem;
  padding: 1rem;
  min-width: 270px;
  min-height: 218px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;

  @media (max-width: 767px) {
    min-height: 102px;
    display: flex;
    gap: 8px;
  }
`;

const DownloadCardTitle = styled.span`
  font-size: 20px;
  font-weight: 500;
  color: white;
`;

const Button = styled.button`
  background-color: #334155;
  color: white;
  border: none;
  width: 188px;
  padding: 0.6rem 1.2rem;
  border-radius: 9999px;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 0.8rem;
  cursor: pointer;

  &:hover {
    background-color: #475569;
  }
`;

const QR = styled.img`
  width: 80px;
  height: 80px;
  margin-bottom: 0.5rem;
  border-radius: 4px;

  @media (max-width: 767px) {
    display: none;
  }
`;

const PlatformIcon = styled.div`
  position: absolute;
  height: 44px;
  width: 44px;
  align-items: center;
  display: flex;
  justify-content: center;
  bottom: 16px;
  right: 16px;
  font-size: 1.5rem;
  color: black;
  border-radius: 90px;
  background-color: #fff;

  @media (max-width: 767px) {
    display: none;
  }
`;
const Footer2 = () => {
  return (
    <CardWrapper>
      <LeftSection>
        <Tags>
          <Tag>Exclusive App-Only Deals</Tag>
          <Tag>Fastest Delivery In Your Area</Tag>
        </Tags>
        <Heading>Shop now for You & Your Little One - On the Go!</Heading>
        <Description>
          Get Fast Deliveries of Baby Care, Kids Clothes, Essentials, Gifts And
          Mom Needs – Anytime, Anywhere.
        </Description>
      </LeftSection>
      <RightSection>
        <DownloadHeading>Download the OZI App Now!</DownloadHeading>
        <RightContentWrapper>
          <DownloadCard>
            <DownloadCardTitle variant="ios">For iOS</DownloadCardTitle>
            <Button>
              <FaApple style={{ fontSize: "24px" }} /> Download App
            </Button>
            <QR src="/qr-ios.png" alt="QR iOS" />
            <PlatformIcon>
              <FaApple />
            </PlatformIcon>
          </DownloadCard>

          <DownloadCard>
            <DownloadCardTitle variant="android">For Android</DownloadCardTitle>
            <Button>
              <img src={gPlay.src}></img> Download App
            </Button>
            <QR src="/qr-ios.png" alt="QR Android" />
            <PlatformIcon>
              <FaAndroid />
            </PlatformIcon>
          </DownloadCard>
        </RightContentWrapper>
      </RightSection>
    </CardWrapper>
  );
};

export default Footer2