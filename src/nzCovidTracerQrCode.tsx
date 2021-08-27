import { useEffect, useState } from "react";
import { ExposureLocation, loiToQrValue } from "./App";
import QRCode from "qrcode.react";

interface Props {
  exposureLocation: ExposureLocation | null;
}

export default function NzCovidTracerQrCode({ exposureLocation }: Props) {
  const [vp, setVp] = useState(getVp());
  useEffect(() => {
    function reportWindowSize() {
      setVp(getVp());
    }
    window.addEventListener("resize", reportWindowSize);
    return () => {
      window.removeEventListener("resize", reportWindowSize);
    };
  }, []);
  function getVp() {
    return Math.min(window.innerWidth, window.innerHeight);
  }
  const el = exposureLocation;
  if (!el) {
    return null;
  }
  const x = vp / 1096;
  const size = 405 * x;
  return (
    <div style={{ overflow: "hidden" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          borderColor: "transparent",
          backgroundClip: "content-box",
          borderStyle: "solid",
          borderTopWidth: 60 * x,
          borderBottomWidth: 60 * x,
          borderLeftWidth: 70 * x,
          borderRightWidth: 70 * x,
          width: 545 * x,
          height: 600 * x,
        }}
      >
        <div
          style={{
            marginBottom: 10 * x,
            marginTop: 10 * x,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 24 * x,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            Scan here to sign-in-with
          </div>
          <div
            style={{
              fontSize: 24 * x,
              fontWeight: 700,
              textTransform: "uppercase",
            }}
          >
            The NZ COVID Tracer app
          </div>
        </div>
        {el.gln ? (
          <QRCode value={loiToQrValue(el)} size={size} />
        ) : (
          <div
            style={{
              width: size,
              minWidth: size,
              height: size,
              border: "1px solid black",
              display: "flex",
              textAlign: "center",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            QR code not available
          </div>
        )}
        <div
          style={{
            marginBottom: 10 * x,
            marginTop: 15 * x,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 22 * x, fontWeight: 500 }}>{el.event}</div>
          <div
            style={{
              fontSize: 18 * x,
              fontWeight: 500,
              color: "rgb(68, 68, 68)",
              marginTop: 10 * x,
            }}
          >
            {el.location}
          </div>
        </div>
      </div>
      <div
        style={{
          transform: "rotate(-45deg)",
          position: "relative",
          top: -565 * x,
          left: -605 * x,
          zIndex: -1,
          height: 0,
          width: 0,
        }}
      >
        {[...new Array(10)].map((_e, i) => {
          return (
            <div key={i}>
              <div
                style={{
                  width: 1400 * x,
                  height: 70 * x,
                  background: "rgb(248, 201, 0)",
                }}
              ></div>
              <div
                style={{
                  width: 1400 * x,
                  height: 70 * x,
                  background: "rgb(255, 255, 255)",
                }}
              ></div>
            </div>
          );
        })}
      </div>
      <div style={{ background: "white" }}>
        <div style={{ fontSize: 62 * x, fontWeight: 500, paddingTop: 10 * x }}>
          Sign-in. Stop the virus.
        </div>
        <div style={{ fontSize: 20 * x, fontWeight: 500, marginTop: 10 * x }}>
          Help protect yourself, your whanau, and your{" "}
        </div>
        <div style={{ fontSize: 20 * x, fontWeight: 500 }}>
          community with our contact tracing app.
        </div>
        <div
          style={{
            marginTop: 20 * x,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div>
            <div style={{ fontSize: 16 * x }}>
              Search <b>NZ COVID Tracer</b> app now:
            </div>
            <div
              style={{
                marginTop: 10 * x,
                width: 200 * x,
                justifyContent: "space-between",
                display: "flex",
              }}
            >
              <img
                src="./icons/app_store.svg"
                alt="app_store"
                style={{ height: 30 * x }}
              />
              <img
                src="./icons/play_store.svg"
                alt="play_store"
                style={{ height: 30 * x }}
              />
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "flex-start",
              width: 250 * x,
              justifyContent: "space-between",
              marginRight: 10 * x,
            }}
          >
            <img
              src="./icons/COVID-19-logo.svg"
              alt="COVID_19_logo"
              style={{ width: 65 * x }}
            />
            <img
              src="./icons/mohlogo.svg"
              alt="mohlogo"
              style={{ width: 155 * x }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
