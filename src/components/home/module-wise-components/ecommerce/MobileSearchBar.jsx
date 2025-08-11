import ManageSearch from "components/header/second-navbar/ManageSearch";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function MobileSearchBar() {
  const router = useRouter();
  const [zoneid, setZoneid] = useState(null);
  const [token, setToken] = useState(null);
  const [currentTab, setCurrentTab] = useState(0); // default to category search

  useEffect(() => {
    if (typeof window !== "undefined") {
      setZoneid(localStorage.getItem("zoneid"));
      setToken(localStorage.getItem("token"));
    }
  }, []);

  return (
    <>
      {zoneid && (
        <ManageSearch
          zoneid={zoneid}
          token={token} // optional, depending on API call headers
          fullWidth={true} // makes it responsive on mobile
          searchQuery={
            router.query?.data_type === "searched" ? router.query.search : ""
          }
          name={router.query?.name || ""}
          query={router.query}
          currentTab={currentTab} // 0 = category, else = all
        />
      )}
    </>
  );
}
