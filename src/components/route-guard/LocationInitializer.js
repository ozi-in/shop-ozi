import { useEffect, useState } from "react";

const DEFAULT_LAT = 28.402008043336746;
const DEFAULT_LNG = 77.08577287018689;
const DEFAULT_ZONEID = "[2]";
const DEFAULT_ADDRESS =
  "Imperia Mindspace, Golf Course Ext Rd, Sector 62, Gurugram, Haryana 122001";
const DEFAULT_LANGUAGE = "en";

function isCurrentLatLngCorrect(currentLatLng) {
  try {
    const parsed = JSON.parse(currentLatLng);
    return (
      parsed &&
      typeof parsed.lat === 'number' &&
      typeof parsed.lng === 'number'
    );
  } catch {
    return false;
  }
}

export default function LocationInitializer({ children }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let changed = false;
    const zoneid = localStorage.getItem("zoneid");
    const location = localStorage.getItem("location");
    const currentLatLng = localStorage.getItem("currentLatLng");
    const storedModule = localStorage.getItem("module");
    const languageSetting = localStorage.getItem("language-setting");

    // Only set default values if they don't exist
    if (!zoneid) {
      localStorage.setItem("zoneid", DEFAULT_ZONEID);
      changed = true;
    }

    if (!location) {
      localStorage.setItem("location", DEFAULT_ADDRESS);
      changed = true;
    }

    if (!isCurrentLatLngCorrect(currentLatLng)) {
      localStorage.setItem(
        "currentLatLng",
        JSON.stringify({ lat: DEFAULT_LAT, lng: DEFAULT_LNG })
      );
      changed = true;
    }

    if (!languageSetting) {
      localStorage.setItem("language-setting", JSON.stringify(DEFAULT_LANGUAGE));
      changed = true;
    }

    // if (storedModule !== MODULE) {
    //   localStorage.setItem("module", MODULE);
    //   changed = true;
    // }

    setReady(true);
  }, []);

  if (!ready) return null;
  return children;
}
