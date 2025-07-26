import { useEffect } from "react";
import Router from "next/router";

export default function IndexRedirect() {
  useEffect(() => {
    Router.replace("/home");
  }, []);
  return null;
}