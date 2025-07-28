import { useEffect, useState } from "react";

const DEFAULT_LAT = 28.402008043336746;
const DEFAULT_LNG = 77.08577287018689;
const DEFAULT_ZONEID = "[2]";
const DEFAULT_ADDRESS =
  "Imperia Mindspace, Golf Course Ext Rd, Sector 62, Gurugram, Haryana 122001";

function isCurrentLatLngCorrect(currentLatLng) {
  try {
    const parsed = JSON.parse(currentLatLng);
    return (
      parsed &&
      Number(parsed.lat) === DEFAULT_LAT &&
      Number(parsed.lng) === DEFAULT_LNG
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

    if (zoneid !== DEFAULT_ZONEID) {
      localStorage.setItem("zoneid", DEFAULT_ZONEID);
      changed = true;
    }

    if (location !== DEFAULT_ADDRESS) {
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

    // if (storedModule !== MODULE) {
    //   localStorage.setItem("module", MODULE);
    //   changed = true;
    // }

    setReady(true);
  }, []);

  if (!ready) return null;
  return children;
}
