"use client";

import { useState } from "react";
import "./ProfileCard.css";

export default function ProfileCard() {
  const [isFollowing, setIsFollowing] = useState(false);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="hover-card dark">
      <img
        src="/assets/daniel-profile.jpg"
        alt="Daniel Abner"
      />
      <div className="hover-card-body">
        <h2>Daniel Abner</h2>
        <p>Pradita University Informatics Student</p>
        <div>
          <div className="hover-card-tag" aria-label="1 thousand followers">
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              style={{ marginRight: "4px", verticalAlign: "middle" }}
            >
              <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
            </svg>
            1K
          </div>
          <button
            className={isFollowing ? "following" : ""}
            onClick={handleFollow}
          >
            {isFollowing ? "Unfollow" : "Follow"}
          </button>
        </div>
      </div>
    </div>
  );
}
