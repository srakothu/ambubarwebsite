import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default async function AppleIcon() {
  const logo = await readFile(
    join(process.cwd(), "public", "images", "Ambubar55logo.jpeg"),
    "base64",
  );

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#122f5b",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
        }}
      >
        <img
          alt=""
          height="180"
          src={`data:image/jpeg;base64,${logo}`}
          style={{ height: "100%", objectFit: "contain", width: "100%" }}
          width="180"
        />
      </div>
    ),
    size,
  );
}
