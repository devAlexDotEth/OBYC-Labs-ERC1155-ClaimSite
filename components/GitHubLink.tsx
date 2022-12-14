import React from "react";

export default function ThirdwebGuideFooter() {
  const url = "https://thirdweb.com/okaybearsyc.eth/OBYCLabs/1.0.0%20by%20devAlex.%E1%B4%B1%E1%B5%80%E1%B4%B4";
  const url2 = "https://obyclabs.com/"
  return (
    <>
      <div
        style={{
          position: "fixed",
          bottom: -95,
          right: -80,
          height: 300,
          width: 150,
          border: "1px solid #eaeaea",
          transform: "rotate(45deg)",
          backgroundColor: " #262935",
          cursor: "pointer",
        }}
        role="button"
        onClick={() => window.open(url, "_blank")}
      />

      <div
        style={{
          position: "fixed",
          bottom: 14,
          right: 18,
        }}
      >
        <img
          src={"/obyclabs.png"}
          width={69}
          height={69}
          role="button"
          style={{ cursor: "pointer" }}
          onClick={() => window.open(url, "_blank")}
        />
      </div>
    </>
  );
}
