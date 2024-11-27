import React from "react";

import OurPolicyItem from "./OurPolicyItem.tsx";

import Exchange from "../../assets/images/exchange_icon.png";
import Quality from "../../assets/images/quality_icon.png";
import Support from "../../assets/images/support_img.png";

const policies = [
  {
    title: "Easy Exchange Policy",
    description: "We offer a hassle free exchange policy",
    image: Exchange,
  },
  {
    title: "7 Days Return Policy",
    description: "We provide 7 days free return policy",
    image: Quality,
  },
  {
    title: "Best Customer Support",
    description: "We provide a 24/7 customer support",
    image: Support,
  },
];

const OurPolicy = () => {
  return (
    <div className="h-fit w-full">
      <div className="flex flex-wrap w-full h-[40vh] max-sm:h-[25vh]">
        {policies.map((policy) => {
          return (
            <OurPolicyItem
              title={policy.title}
              description={policy.description}
              image={policy.image}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OurPolicy;
