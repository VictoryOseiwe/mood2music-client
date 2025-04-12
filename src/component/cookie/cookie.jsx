import { useEffect, useState } from "react";
import Button from "../Button";
import "./cookie.css";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "true");
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="cookie-banner">
      <p>
        We use cookies to enhance your experience. By continuing, you agree to
        our use of cookies.
      </p>
      <button onClick={acceptCookies}>Accept</button>
      {/* <Button className={"cookie-btn"} onClick={acceptCookies}>
        Accept
      </Button> */}
    </div>
  );
}
