import React, { useEffect } from "react";
import { Mail, Send } from "lucide-react";
import styles from "./SubscriptionForm.module.css";

const NewsletterSubscription = () => {
  useEffect(() => {
    const scripts = [
      "https://core.unelmamail.com/core/js/jquery-3.6.4.min.js",
      "https://core.unelmamail.com/core/js/jquery-migrate-3.4.1.min.js",
      "https://core.unelmamail.com/core/validate/jquery.validate.min.js",
      "https://core.unelmamail.com/jquery_validate_locale",
      "https://core.unelmamail.com/core/js/functions.js",
    ];

    scripts.forEach((src) => {
      const s = document.createElement("script");
      s.src = src;
      s.async = true;
      document.body.appendChild(s);
    });

    const init = () => {
      if (window.jQuery && window.initJs) {
        window.jQuery(document).ready(function ($) {
          $(".subscribe-embedded-form form").validate({
            rules: {
              EMAIL: {
                required: true,
                email: true,
                remote:
                  "https://core.unelmamail.com/lists/692b7e8c8338e/check-email",
              },
            },
          });
          window.initJs($(".subscribe-embedded-form"));
        });
      }
    };

    const t = setTimeout(init, 1500);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`subscribe-embedded-form ${styles.box}`}>
      <h3 className={styles.title}>Subscribe to Our Newsletter</h3>

      <p className={styles.description}>
        Get tips, updates, and news directly in your inbox.
      </p>

      <form
        action="https://core.unelmamail.com/lists/692b7e8c8338e/6928c3dfe5399/embedded-form-subscribe-captcha"
        method="POST"
        className={styles.form}
      >
        <Mail className={styles.icon} />
        <input
          type="email"
          name="EMAIL"
          placeholder="Your email"
          className={styles.input}
          required
        />

        <button type="submit" className={styles.button}>
          <Send className={styles.sendIcon} />
        </button>
      </form>

      <div className={styles.terms}>
        <input type="checkbox" name="acm_term" required />
        <span>
          I agree to the{" "}
          <a href="#" className={styles.link}>
            Terms & Conditions
          </a>
        </span>
      </div>
    </div>
  );
};

export default NewsletterSubscription;
