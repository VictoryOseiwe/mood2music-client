import { useEffect, useState } from "react";
import Button from "../Button"; // Assuming you have a Button component
import "./cookie.css"; // Keep your existing basic styles
import { Link } from "react-router-dom"; // If you use React Router
import { motion, AnimatePresence } from "framer-motion"; // Import Framer Motion

const bannerVariants = {
  initial: { y: "100%", opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", damping: 20, stiffness: 100, duration: 0.3 },
  },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.2 } },
};

//Will create a separate file for this preferencesVariants
const preferencesVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.2 } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.15 } },
};

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [functionalCookies, setFunctionalCookies] = useState(true); // Default to true
  const [analyticsCookies, setAnalyticsCookies] = useState(false);
  const [marketingCookies, setMarketingCookies] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => setShowBanner(true), 500); // Slight delay for animation
    } else if (consent !== "declined") {
      try {
        const preferences = JSON.parse(consent);
        setFunctionalCookies(preferences.functional || true);
        setAnalyticsCookies(preferences.analytics || false);
        setMarketingCookies(preferences.marketing || false);
        console.log("Stored Cookie Preferences:", preferences);
      } catch (error) {
        setShowBanner(true);
      }
    }
  }, []);

  const acceptAllCookies = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        functional: true,
        analytics: true,
        marketing: true,
      })
    );
    setShowBanner(false);
    console.log("All cookies accepted");
    // Implement logic to enable all cookies
  };
// Will change SVGS to react icons 
  const declineAllCookies = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowBanner(false);
    console.log("All cookies declined");
    // Implement logic to disable all non-essential cookies
  };

  const savePreferences = () => {
    localStorage.setItem(
      "cookieConsent",
      JSON.stringify({
        functional: functionalCookies,
        analytics: analyticsCookies,
        marketing: marketingCookies,
      })
    );
    setShowPreferences(false);
    setShowBanner(false);
    console.log("Cookie preferences saved:", {
      functional: functionalCookies,
      analytics: analyticsCookies,
      marketing: marketingCookies,
    });
    // Implement logic to enable/disable cookies based on current preferences
  };

  const togglePreferences = () => {
    setShowPreferences(!showPreferences);
  };

  if (!showBanner) return null;

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          className={`cookie-banner ${
            showPreferences ? "preferences-open" : ""
          }`}
          variants={bannerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <div className="cookie-banner-content">
            <div className="cookie-banner-text">
              <p>
                We use cookies to enhance your browsing experience, analyze site
                traffic, and personalize content. You can manage your cookie
                preferences below. For more information, please review our{" "}
                <Link
                  to="/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </div>

            <div className="cookie-banner-actions">
              {!showPreferences && (
                <div className="main-actions">
                  <Button onClick={acceptAllCookies} className="accept-all-btn">
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="icon"
                    >
                      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zM9.7 16.6L4.8 11.7l1.4-1.4 3.5 3.5 7.5-7.5 1.4 1.4-8.9 8.9z" />
                    </svg>
                    Accept All
                  </Button>
                  <Button
                    onClick={togglePreferences}
                    className="manage-prefs-btn"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="icon"
                    >
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33-1.82l-3.3-1.42a1.63 1.63 0 0 0-1.94-1.06c-.14.01-.28.01-.42.01q-3.2 0-6.4 0c-.14 0-.28 0-.42-.01a1.63 1.63 0 0 0-1.94 1.06L4.3 13.18a1.65 1.65 0 0 0 .33 1.82V9a1.65 1.65 0 0 0-.33 1.82L4.3 12.4a1.63 1.63 0 0 0 1.94 1.06c.14-.01.28-.01.42-.01q3.2 0 6.4 0c.14 0 .28 0 .42.01a1.63 1.63 0 0 0 1.94-1.06l3.3-1.42a1.65 1.65 0 0 0-.33-1.82v6zM12 15a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                    </svg>
                    Manage
                  </Button>
                  <Button
                    onClick={declineAllCookies}
                    className="decline-all-btn"
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="icon"
                    >
                      <path d="M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm5.3 16.7L12 13.4l-5.3 3.3-1.4-1.4 5.3-3.3-5.3-3.3 1.4-1.4 5.3 3.3 5.3-3.3 1.4 1.4-5.3 3.3 5.3 3.3-1.4 1.4z" />
                    </svg>
                    Decline All
                  </Button>
                </div>
              )}

              <AnimatePresence>
                {showPreferences && (
                  <motion.div
                    className="cookie-preferences"
                    variants={preferencesVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    <h3>Manage Cookie Preferences</h3>
                    <div className="preference-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={functionalCookies}
                          disabled // Functional cookies are usually essential
                          onChange={() =>
                            setFunctionalCookies(!functionalCookies)
                          }
                        />
                        <span className="checkbox-custom"></span>
                        Strictly Necessary (Functional)
                      </label>
                      <p className="preference-description">
                        These cookies are essential for the website to function
                        properly.
                      </p>
                    </div>
                    <div className="preference-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={analyticsCookies}
                          onChange={() =>
                            setAnalyticsCookies(!analyticsCookies)
                          }
                        />
                        <span className="checkbox-custom"></span>
                        Analytics
                      </label>
                      <p className="preference-description">
                        These cookies help us understand how you use our website
                        so we can improve it.
                      </p>
                    </div>
                    <div className="preference-item">
                      <label className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={marketingCookies}
                          onChange={() =>
                            setMarketingCookies(!marketingCookies)
                          }
                        />
                        <span className="checkbox-custom"></span>
                        Marketing
                      </label>
                      <p className="preference-description">
                        These cookies are used to personalize content and ads to
                        make them more relevant to you.
                      </p>
                    </div>
                    <div className="preference-buttons">
                      <Button
                        onClick={savePreferences}
                        className="save-prefs-btn primary"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="icon"
                        >
                          <path d="M17 3H7c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H7v-8h10v8zm-3-10v-2h-4v2H7v-4h10v4h-3z" />
                        </svg>
                        Save Preferences
                      </Button>
                      <Button
                        onClick={togglePreferences}
                        className="cancel-prefs-btn secondary"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="icon"
                        >
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                        </svg>
                        Cancel
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
