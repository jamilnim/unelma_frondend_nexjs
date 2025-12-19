"use client";

import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../lib/features/startupIdea/builderSlice";
import styles from "./Builder.module.css";

export default function UserInfoForm() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.builder.userInfo);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(setUserInfo({ key: name, value }));
  };

  return (
    <div className={styles.userInfoForm}>
      <h4>Customer Information</h4>

      <input
        className={styles.input}
        name="name"
        placeholder="Name"
        value={userInfo.name}
        onChange={handleChange}
      />

      <input
        className={styles.input}
        name="email"
        placeholder="Email"
        value={userInfo.email}
        onChange={handleChange}
      />

      <input
        className={styles.input}
        name="contact"
        placeholder="Contact Number"
        value={userInfo.contact}
        onChange={handleChange}
      />
    </div>
  );
}
