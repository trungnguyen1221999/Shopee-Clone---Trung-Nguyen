import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
  size?: number;
  color?: string;
  grayColor?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 20,
  color = "#FFD700",
  grayColor = "#ccc",
}) => {
  const totalStars = 5;

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {[...Array(totalStars)].map((_, i) => {
        const fillPercentage = Math.min(Math.max(rating - i, 0), 1) * 100;

        return (
          <div
            key={i}
            style={{
              position: "relative",
              width: `${size}px`,
              height: `${size}px`,
              marginRight: "3px",
            }}
          >
            {/* Sao nền xám */}
            <FaStar
              size={size}
              color={grayColor}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />

            {/* Sao vàng phủ chính xác bằng mask gradient */}
            <FaStar
              size={size}
              color={color}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                maskImage: `linear-gradient(90deg, black ${fillPercentage}%, transparent ${fillPercentage}%)`,
                WebkitMaskImage: `linear-gradient(90deg, black ${fillPercentage}%, transparent ${fillPercentage}%)`,
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default StarRating;
