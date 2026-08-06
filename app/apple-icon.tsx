import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

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
          background: "#071020",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          overflow: "hidden",
          width: "100%",
        }}
      >
        <img
          alt=""
          src={`data:image/jpeg;base64,${logo}`}
          style={{ height: "100%", objectFit: "cover", width: "100%" }}
        />
      </div>
    ),
    size,
  );
}
