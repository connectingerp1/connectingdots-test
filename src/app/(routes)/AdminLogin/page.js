"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "@/styles/adminlogin/AdminLogin.module.css";

const AdminLogin = () => {
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const router = useRouter();

  const ADMIN_EMAILS = (process.env.NEXT_PUBLIC_ADMIN_EMAILS || "")
    .split(",")
    .map((email) => email.replace(/"/g, "").trim());
  const ADMIN_PASSWORDS = (process.env.NEXT_PUBLIC_ADMIN_PASSWORDS || "")
    .split(",")
    .map((password) => password.replace(/"/g, "").trim());

  const handle_submit = (e, target_page) => {
    e.preventDefault();
    const email_trimmed = email.trim().toLowerCase();
    const user_index = ADMIN_EMAILS.findIndex(
      (admin_email) => admin_email.toLowerCase() === email_trimmed
    );

    if (user_index !== -1) {
      if (ADMIN_PASSWORDS[user_index] === password) {
        // Set authentication in localStorage
        localStorage.setItem("isAdminLoggedIn", "true");
        
        // Redirect to the specified page or external URL
        if (target_page.startsWith("http")) {
          window.location.href = target_page;
        } else {
          router.push(target_page);
        }
      } else {
        alert("Incorrect password!");
      }
    } else {
      alert("Incorrect email or password!");
    }
  };

  return (
    <section className={styles.admin_login_section}>
      <div className={styles.form_box}>
        <form onSubmit={(e) => handle_submit(e, "/dashboard")}>
          <h2>Admin Log-In</h2>
          <div className={styles.input_box}>
            <ion-icon name="person-outline"></ion-icon>
            <input
              type="email"
              name="email"
              id="email_id"
              value={email}
              onChange={(e) => set_email(e.target.value)}
              required
            />
            <label htmlFor="email_id">Email Address</label>
          </div>

          <div className={styles.input_box}>
            <ion-icon name="lock-closed-outline"></ion-icon>
            <input
              type="password"
              name="password"
              id="login_password"
              value={password}
              onChange={(e) => set_password(e.target.value)}
              required
            />
            <label htmlFor="login_password">Password</label>
          </div>
          <div className={styles.submit_box}>
            <button
              type="button"
              className={styles.admin_btn}
              onClick={(e) => handle_submit(e, "/dashboard")}
            >
              Login In to Dashboard
            </button>
            <button
              type="button"
              className={styles.admin_btn}
              onClick={(e) => handle_submit(e, "https://blog-frontend-psi-bay.vercel.app/")}
            >
              Login In to Blogs
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AdminLogin;