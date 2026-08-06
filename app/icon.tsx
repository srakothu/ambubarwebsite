import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default async function Icon() {
  const logo = await readFile(
    join(process.cwd(), "public", "images", "5533a687-7fe0-462c-97b5-c7ba4cae07bb.jpeg"),
    "base64",
  );

  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
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
          style={{ height: "100%", objectFit: "cover", objectPosition: "50% 50%", width: "100%" }}
        />
      </div>
    ),
    size,
  );
}
