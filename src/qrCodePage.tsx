import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./App.css";
import QRCode from "qrcode.react";
import { API_URL, ExposureLocation, loiToQrValue } from "./App";
import { formatDate } from "./dateUtils";
import Modal from 'react-modal';


const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

interface Props {
  exposureLocation: ExposureLocation | null
  closeModal: () => void
}
function QRCodeModal({ exposureLocation, closeModal }: Props) {
  const el = exposureLocation
  const vp = Math.min(window.innerWidth, window.innerHeight)
  const size = vp * 0.37
  return (
    <Modal
      isOpen={!!el}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel={el?.event}
    >
      {el ?
        <div style={{overflow: "hidden"}}>
          <div style={{display: 'flex',flexDirection:'column',alignItems: "center", border: '70px dashed rgb(248, 201, 0)', width: 545, height: 600,
            backgroundColor: 'white',
            borderColor: 'transparent',
            backgroundClip: 'content-box',
            borderTop: '60px solid transparent',
            borderBottom: '60px solid transparent',
        }}>
            <div style={{marginBottom: 10, marginTop: 10, display: 'flex', flexDirection:'column',alignItems: "center"}}>
              <div style={{fontSize: 24, fontWeight: 700, textTransform: 'uppercase'}}>Scan here to sign-in-with</div>
              <div style={{fontSize: 24, fontWeight: 700, textTransform: 'uppercase'}}>The NZ COVID Tracer app</div>
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
                  justifyContent: 'center'
                }}
              >
                QR code not available
              </div>
            )}
            <div style={{marginBottom: 10, marginTop: 15, display: 'flex', flexDirection:'column',alignItems: "center"}}>
              <div style={{fontSize: 22, fontWeight: 500}}>{el.event}</div>
              <div style={{fontSize: 24/4*3, fontWeight: 500, color: 'rgb(68, 68, 68)', marginTop: 10}}>{el.location}</div>
            </div>
          </div>
          <div style={{transform: 'rotate(-45deg)', position: 'relative',
              top: -565,
              left: -605,
              zIndex: -1,
              height: 0,
              width: 0,
            }}>
            {[...new Array(10)].map(e => {
              return (
                <>
                  <div style={{width: 1400, height: 70.7, background: 'rgb(248, 201, 0)'}}></div>
                  <div style={{width: 1400, height: 70.7, background: 'rgb(255, 255, 255)'}}></div>
                </>
              )
            })}
          </div>
          <div style={{background: 'white'}}>
            <div style={{fontSize: 62, fontWeight: 500, paddingTop: 10}}>Sign-in. Stop the virus.</div>
            <div style={{fontSize: 20, fontWeight: 500, marginTop: 10}}>Help protect yourself, your whanau, and your </div>
            <div style={{fontSize: 20, fontWeight: 500}}>community with our contact tracing app.</div>
            <div style={{marginTop: 20, display: 'flex', justifyContent: 'space-between'}}>
              <div>
                <div style={{fontSize: 16}}>
                  Search <b>NZ COVID Tracer</b> app now:
                </div>
                <div style={{marginTop: 10, width: 200, justifyContent: "space-between", display: 'flex'}}>
                  <img src="./icons/app_store.svg" alt="app_store" style={{height: 30}} />
                  <img src="./icons/play_store.svg" alt="play_store" style={{height: 30}} />
                </div>
              </div>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: "flex-start", width: 250, justifyContent: "space-between", marginRight: 10}}>
                <img src="./icons/COVID-19-logo.svg" alt="COVID_19_logo" style={{width: 65}} />
                <img src="./icons/mohlogo.svg" alt="mohlogo" style={{width: 155}} />
              </div>
            </div>
          </div>
        </div>
        : null}
    </Modal>

  )
}

export default function AllQRCodes() {
  const [exposureLocations, setExposureLocations] = useState<
    ExposureLocation[]
  >([]);
  const [lastUpdatedAt, setLastUpdatedAt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedExposureLocation, setExposureLocation] = useState<ExposureLocation | null>(null);

  async function fetchExposureLocations() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}/exposurelocations`);
      const data = await res.json();
      setExposureLocations(data.exposureLocations);
      setLastUpdatedAt(data.glnLastUpdatedAt);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }
  useEffect(() => {
    fetchExposureLocations();
  }, []);

  return (
    <div className="App">
      <QRCodeModal
        exposureLocation={selectedExposureLocation}
        closeModal={() => setExposureLocation(null)}
      />
      <section className="container-small2">
        <h1>Scan in to a Location of Interest</h1>

        <div className="hr" />
        <aside>
          <strong>
            Have you been to a Location of Interest, but forgot to scan in?{" "}
          </strong>
          <div>
            No problem! You can scan it properly, including the Global Location
            Number, on this page! This way, instead of adding a manual diary
            entry, you will actually get an exposure notification.
          </div>
          <br />
        </aside>

        <aside>
          <strong>Why some QR codes are not available?</strong>
          <div>
            Some <i>Locations of Interest</i> have not been published as{" "}
            <i>Exposure Event</i> locations, so we can't match Global Location
            Numbers to them.
          </div>
          <br />
        </aside>

        <aside>
          <strong>When this was last updated?</strong>
          <div>
            {loading ? "Loading..." : formatDate(lastUpdatedAt)}
          </div>
          <br />
        </aside>

        <aside style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ textAlign: "center", flex: 1 }}>
            <h3 style={{ margin: 0 }}>Locations of Interest</h3>
            <div>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <h1>{exposureLocations.length}</h1>
              )}
            </div>
          </div>
          <div style={{ textAlign: "center", flex: 1 }}>
            <h3 style={{ margin: 0 }}>Exposure Event locations</h3>
            <div>
              {loading ? (
                <span>Loading...</span>
              ) : (
                <h1>{exposureLocations.filter((l) => l.gln).length}</h1>
              )}
            </div>
          </div>
          <br />
        </aside>

        {error ? <aside>Error Loading page</aside> : null}
        {!error && loading ? <aside>Loading...</aside> : null}
        {!error && !loading ? (
          <>
            <Link to="/">
              <button style={{ margin: "1rem 0 0 0" }} className="secondary">
                Back to Start
              </button>
            </Link>
            <br />
            <br />
            <br />
            <div className="grid-2">
              <ExposureLocationsQrCodes exposureLocations={exposureLocations} onExposureLocationSelected={(el) => setExposureLocation(el)}/>
            </div>
            <br />
            <br />

            <aside>
              <strong>What data sources are you using?</strong>
              <div>
                <div>
                  Locations of Interest:{" "}
                  <a href="https://github.com/minhealthnz/nz-covid-data/blob/main/locations-of-interest/august-2021/locations-of-interest.geojson">
                    https://github.com/minhealthnz/nz-covid-data/blob/main/locations-of-interest/august-2021/locations-of-interest.geojson
                  </a>
                </div>
                <div>
                  Exposure Events:{" "}
                  <a href="https://exposure-events.tracing.covid19.govt.nz/current-exposure-events.json">
                    https://exposure-events.tracing.covid19.govt.nz/current-exposure-events.json
                  </a>
                </div>
                <div>
                  Reversed GLN hashes:{" "}
                  <a href="https://github.com/CovidEngine/reverseglnhashes/blob/main/glnPairs.json">
                    https://github.com/CovidEngine/reverseglnhashes/blob/main/glnPairs.json
                  </a>
                </div>
              </div>
              <br />
            </aside>

            <aside>
              <strong>How's the number of Locations of Interest calculated?</strong>
              <div>
                Locations of Interest tally is calculated from the <a href="https://github.com/minhealthnz/nz-covid-data/blob/main/locations-of-interest/august-2021/locations-of-interest.geojson">data MoH published on GitHub</a>.
              </div>
              <br />
            </aside>
            <aside>
              <strong>How's the number of Exposure Event locations calculated?</strong>
              <div>
                Exposure Event locations tally is calculated as the number of Locations of Interest which have a corresponding Exposure Event.
              </div>
              <br />
            </aside>

            <Link to="/">
              <button style={{ margin: "1rem 0 0 0" }} className="secondary">
                Back to Start
              </button>
            </Link>
          </>
        ) : null}
      </section>
    </div>
  );
}

function ExposureLocationsQrCodes({
  exposureLocations,
  onExposureLocationSelected
}: {
  exposureLocations: ExposureLocation[];
  onExposureLocationSelected: (el: ExposureLocation) => void
}) {
  return (
    <>
      {exposureLocations.map((el, i) => {
        return (
          <div key={i} style={{ display: "flex", justifyContent: "space-between" }} onClick={() => onExposureLocationSelected(el)}>
            <div style={{ marginRight: "1rem" }}>
              <h2>{el.event}</h2>
              <p style={{color: 'rgb(68, 68, 68)'}}>{el.location}</p>
              <div>
                {formatDate(el.start)} - {formatDate(el.end)}
              </div>
            </div>

            {el.gln ? (
              <QRCode value={loiToQrValue(el)} />
            ) : (
              <div
                style={{
                  width: 128,
                  minWidth: 128,
                  height: 128,
                  border: "1px solid black",
                  display: "flex",
                  textAlign: "center",
                  alignItems: "center",
                }}
              >
                QR code not available
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
