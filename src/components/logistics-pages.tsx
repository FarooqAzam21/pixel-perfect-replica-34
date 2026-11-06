import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Globe2,
  Headphones,
  MapPin,
  Menu,
  MoveUpRight,
  Package,
  Pause,
  Plane,
  Play,
  Search,
  ShieldCheck,
  Ship,
  Truck,
  Warehouse,
  X,
} from "lucide-react";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import portImage from "@/assets/global-port-hero.jpg";
import airImage from "@/assets/air-freight.jpg";
import shipVideo from "@/assets/Cargo_ship_sailing_ocean_62d7a438.mp4";
import warehouseImage from "@/assets/warehouse.jpg";
import { Button } from "@/components/ui/button";
import {
  demoTrackingCode,
  emptyQuote,
  lookupTracking,
  quoteSteps,
  validateContact,
  validateShipment,
  type QuoteDetails,
} from "@/lib/logistics";

const services = [
  {
    id: "ocean",
    number: "01",
    title: "Ocean freight",
    detail: "FCL · LCL · Port-to-port",
    text: "A considered approach to sea freight, from full-container movements to consolidated cargo.",
    icon: Ship,
    image: portImage,
  },
  {
    id: "air",
    number: "02",
    title: "Air freight",
    detail: "International · Time-sensitive",
    text: "Air cargo options designed around your delivery windows, cargo requirements and priorities.",
    icon: Plane,
    image: airImage,
  },
  {
    id: "land",
    number: "03",
    title: "Land transport",
    detail: "Domestic · Cross-border",
    text: "Road transport planning for cargo that needs a dependable connection between destinations.",
    icon: Truck,
    image: warehouseImage,
  },
  {
    id: "customs",
    number: "04",
    title: "Customs coordination",
    detail: "Import · Export documentation",
    text: "Documentation and clearance coordination to help cargo move through border procedures.",
    icon: ShieldCheck,
    image: warehouseImage,
  },
  {
    id: "storage",
    number: "05",
    title: "Warehousing",
    detail: "Storage · Cargo handling",
    text: "Flexible storage and cargo handling options to support your supply chain planning.",
    icon: Warehouse,
    image: warehouseImage,
  },
  {
    id: "project",
    number: "06",
    title: "Project cargo",
    detail: "Oversized · Special handling",
    text: "Specialized movement planning for freight with unusual size, weight or handling needs.",
    icon: Package,
    image: portImage,
  },
];
const process = [
  "Booking",
  "Cargo collection",
  "Processing & documentation",
  "Transportation",
  "Delivery",
];

function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <p className={light ? "eyebrow eyebrow-light" : "eyebrow"}>
      <span />
      {children}
    </p>
  );
}

function PageIntro({ label, title, copy }: { label: string; title: string; copy: string }) {
  return (
    <section className="page-intro">
      <div className="page-shell">
        <Eyebrow>{label}</Eyebrow>
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </section>
  );
}

function TrackingForm({ compact = false }: { compact?: boolean }) {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<ReturnType<typeof lookupTracking>>(null);
  const [searched, setSearched] = useState(false);
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSearched(true);
    setResult(lookupTracking(code));
  }
  return (
    <div className={compact ? "tracking-form compact-tracking" : "tracking-form"}>
      <form onSubmit={submit} className="tracking-search">
        <label htmlFor={compact ? "track-home" : "track-page"}>
          <Search size={18} /> <span className="sr-only">Tracking number</span>
        </label>
        <input
          id={compact ? "track-home" : "track-page"}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter your tracking number"
          required
          aria-describedby="tracking-note"
        />
        <Button type="submit">
          Track shipment <ArrowRight size={16} />
        </Button>
      </form>
      <p id="tracking-note" className="tracking-note">
        <CircleHelp size={14} /> Demonstration mode · no live carrier connection
      </p>
      {searched &&
        (result ? (
          <div className="tracking-result" aria-live="polite">
            <div className="tracking-result-top">
              <div>
                <Eyebrow>Sample shipment · demonstration only</Eyebrow>
                <h3>{result.code}</h3>
              </div>
              <span className="status-pill">
                <span />
                {result.status}
              </span>
            </div>
            <div className="tracking-route">
              <div>
                <span className="route-label">ORIGIN</span>
                <strong>{result.origin}</strong>
              </div>
              <ArrowRight size={18} />
              <div>
                <span className="route-label">DESTINATION</span>
                <strong>{result.destination}</strong>
              </div>
              <div className="route-type">{result.mode}</div>
            </div>
            <p className="sample-warning">
              {result.updated}. These milestones are illustrative and do not describe a real
              shipment.
            </p>
            <ol className="tracking-timeline">
              {result.events.map((event, index) => (
                <li key={event.title} className={event.complete ? "is-complete" : ""}>
                  <span className="timeline-marker">
                    {event.complete ? <Check size={12} /> : String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <strong>{event.title}</strong>
                    <small>{event.detail}</small>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <p className="tracking-error" role="status">
            No demonstration record matches that number. This site is not connected to a carrier
            tracking system.
          </p>
        ))}
      {!searched && (
        <p className="demo-code">
          Try the sample reference{" "}
          <button type="button" onClick={() => setCode(demoTrackingCode)}>
            {demoTrackingCode}
          </button>
        </p>
      )}
    </div>
  );
}

export function HomePage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const userPausedVideo = useRef(false);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;

    function playVideo() {
      if (!video || document.visibilityState === "hidden") {
        video?.pause();
        return;
      }

      if (userPausedVideo.current) {
        return;
      }

      void video
        .play()
        .then(() => setVideoPlaying(!video.paused))
        .catch((error: unknown) => {
          setVideoPlaying(!video.paused);
          if (!(
            error instanceof DOMException && ["AbortError", "NotAllowedError"].includes(error.name)
          )) {
            console.error("Banner video playback failed", error);
          }
        });
    }

    function updateVisibility() {
      if (document.visibilityState === "visible") {
        playVideo();
      } else {
        video?.pause();
      }
    }

    playVideo();
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  function toggleVideoPlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (!video.paused) {
      userPausedVideo.current = true;
      video.pause();
      return;
    }

    userPausedVideo.current = false;
    void video
      .play()
      .then(() => setVideoPlaying(!video.paused))
      .catch((error: unknown) => {
        setVideoPlaying(!video.paused);
        if (!(
          error instanceof DOMException && ["AbortError", "NotAllowedError"].includes(error.name)
        )) {
          console.error("Banner video playback failed", error);
        }
      });
  }

  return (
    <main>
      <section className="home-hero">
        <video
          ref={videoRef}
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          tabIndex={-1}
          onPlay={() => setVideoPlaying(true)}
          onPause={() => setVideoPlaying(false)}
        >
          <source src={shipVideo} type="video/mp4" />
        </video>
        <div className="hero-overlay" aria-hidden="true" />
        <div className="page-shell hero-content">
          <Eyebrow light>Global logistics · freight forwarding · supply chain</Eyebrow>
          <h1>
            Connecting
            <br />
            the world.
            <br />
            <span>Moving business.</span>
          </h1>
          <p>Global freight solutions, thoughtfully coordinated from origin to destination.</p>
          <div className="hero-actions">
            <Button asChild size="lg" className="button-electric">
              <Link to="/quote">
                Request a quote <MoveUpRight size={16} />
              </Link>
            </Button>
            <Button asChild size="lg" variant="hero-outline">
              <Link to="/track">
                Track a shipment <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
          <div className="hero-caption">
            <span className="caption-line" />
            Ocean freight · Illustrative footage
          </div>
        </div>
        <button
          className="hero-video-toggle"
          type="button"
          onClick={toggleVideoPlayback}
          aria-label={videoPlaying ? "Pause banner video" : "Play banner video"}
          aria-pressed={videoPlaying}
        >
          {videoPlaying ? (
            <Pause size={14} aria-hidden="true" />
          ) : (
            <Play size={14} aria-hidden="true" />
          )}
          {videoPlaying ? "Pause video" : "Play video"}
        </button>
        <a className="scroll-cue" href="#tracking">
          <span>Scroll to explore</span>
          <ArrowDown size={15} />
        </a>
        <div className="hero-index">
          <span>01</span> / GLOBAL MOVEMENT
        </div>
      </section>
      <section id="tracking" className="tracking-band">
        <div className="page-shell tracking-layout">
          <div className="tracking-heading">
            <Eyebrow>Shipment visibility</Eyebrow>
            <h2>
              Your shipment.
              <br />
              <span>Every step of the way.</span>
            </h2>
            <p>
              Look up an example reference in demonstration mode. Live carrier tracking is not
              connected.
            </p>
          </div>
          <TrackingForm compact />
        </div>
      </section>
      <section className="services-section page-shell">
        <div className="section-heading-row">
          <div>
            <Eyebrow>What we move</Eyebrow>
            <h2>
              End-to-end logistics.
              <br />
              Without compromise.
            </h2>
          </div>
          <Button asChild variant="outline">
            <Link to="/services">
              Explore all services <ArrowUpRight size={15} />
            </Link>
          </Button>
        </div>
        <div className="service-editorial-grid">
          {services.slice(0, 3).map((service, index) => (
            <Link
              to="/services"
              hash={service.id}
              key={service.id}
              className={`service-feature feature-${index + 1}`}
            >
              <div className="service-photo" style={{ backgroundImage: `url(${service.image})` }} />
              <div className="service-feature-content">
                <span className="service-number">
                  {service.number} <service.icon size={17} />
                </span>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
                <span className="service-arrow">
                  <ArrowUpRight size={17} />
                </span>
              </div>
            </Link>
          ))}
        </div>
        <p className="confirmation-note">
          <CircleHelp size={14} /> Service capabilities shown for planning; confirm current
          offerings with the company.
        </p>
      </section>
      <section className="network-band">
        <div className="page-shell network-content">
          <div>
            <Eyebrow light>Connected by design</Eyebrow>
            <h2>
              One network.
              <br />
              <span>Global possibilities.</span>
            </h2>
            <p>
              Explore a conceptual view of the connections behind global freight. Routes and hubs
              shown are illustrative, not a statement of company coverage.
            </p>
            <Button asChild variant="hero-outline">
              <Link to="/network">
                Explore the network <ArrowRight size={15} />
              </Link>
            </Button>
          </div>
          <WorldMap />
        </div>
      </section>
      <JourneySection />
      <section className="approach-section">
        <div className="page-shell approach-layout">
          <div className="approach-image">
            <img
              src={warehouseImage}
              alt="Modern freight warehouse aisle with cargo and handling equipment"
              loading="lazy"
              width={1440}
              height={960}
            />
            <span>PLANNED WITH PRECISION</span>
          </div>
          <div className="approach-copy">
            <Eyebrow>A considered approach</Eyebrow>
            <h2>
              Built around
              <br />
              reliability.
            </h2>
            <p>
              Clear communication. Attentive cargo coordination. Thoughtful planning at every
              handoff.
            </p>
            <ul>
              <li>
                <Check size={15} /> Dedicated shipment coordination
              </li>
              <li>
                <Check size={15} /> Transparent communication
              </li>
              <li>
                <Check size={15} /> Flexible logistics planning
              </li>
              <li>
                <Check size={15} /> Operational care at every stage
              </li>
            </ul>
            <p className="confirmation-note">
              <CircleHelp size={14} /> Capabilities pending company confirmation.
            </p>
            <Button asChild variant="outline">
              <Link to="/about">
                About our approach <ArrowRight size={15} />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      <IndustrySection />
      <section className="insight-band">
        <div className="page-shell insight-layout">
          <div>
            <Eyebrow>From the desk</Eyebrow>
            <h2>
              Moving ideas
              <br />
              forward.
            </h2>
          </div>
          <div className="insight-item">
            <span>INSIGHT · EDITORIAL</span>
            <h3>Making supply chains easier to navigate</h3>
            <p>Updates and insights will appear here once company content is confirmed.</p>
            <span className="insight-date">Editorial section · Content forthcoming</span>
          </div>
          <Link to="/contact" className="round-arrow" aria-label="Contact us">
            <ArrowUpRight size={19} />
          </Link>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}

function WorldMap() {
  const [active, setActive] = useState("Illustrative routes");
  return (
    <div className="map-illustration">
      <div className="map-topline">
        <span>
          <span className="live-dot" /> CONCEPTUAL ROUTE VIEW
        </span>
        <Globe2 size={18} />
      </div>
      <svg
        className="world-map-svg"
        viewBox="0 0 680 370"
        role="img"
        aria-label="Illustrative world map showing sample freight route connections"
      >
        <defs>
          <pattern id="map-grid" width="28" height="28" patternUnits="userSpaceOnUse">
            <path d="M28 0H0V28" fill="none" className="grid-line" />
          </pattern>
        </defs>
        <rect width="680" height="370" fill="url(#map-grid)" />
        <g className="land-shapes">
          <path d="M78 90l36-22 45 7 15 22 41 4 23 22-13 22-27 4-14 26-29 5-17 35-23 7-14-33-17-14-9-34-21-13-8-24zM199 214l25 6 21 24-8 42-22 33-13-27-14-25 8-27zM300 87l27-19 43 1 25 15 29 1 16 19 31 2 19 27-13 15-37-3-13 17-28-6-11 28-25 12-16-19 1-32-22-5-15-27-23-4-17-20zM346 215l28 3 23 25-9 42-23 31-21-12-11-32 5-31zM495 100l29-13 35 12 6 26-17 14-37-5-20-15z" />
        </g>
        <g className="route-lines">
          <path d="M118 140 Q260 38 379 143" />
          <path d="M202 250 Q315 166 487 125" />
          <path d="M379 143 Q457 102 544 130" />
        </g>
        <g className="map-points">
          <circle cx="118" cy="140" r="5" />
          <circle cx="379" cy="143" r="5" />
          <circle cx="202" cy="250" r="5" />
          <circle cx="487" cy="125" r="5" />
          <circle cx="544" cy="130" r="5" />
        </g>
        <text x="89" y="128">
          AMERICAS
        </text>
        <text x="348" y="129">
          EUROPE
        </text>
        <text x="463" y="108">
          ASIA PACIFIC
        </text>
      </svg>
      <div className="map-legend">
        <span>
          <i /> Illustrative route
        </span>
        <span>
          <i /> Sample hub
        </span>
        <select aria-label="Map view" value={active} onChange={(e) => setActive(e.target.value)}>
          <option>Illustrative routes</option>
          <option>Sample hubs</option>
          <option>All regions</option>
        </select>
      </div>
      <p className="map-disclaimer">
        {active} · Conceptual only; no verified office locations or operating routes supplied.
      </p>
    </div>
  );
}

function JourneySection() {
  return (
    <section className="journey-section page-shell">
      <div className="journey-heading">
        <Eyebrow>The logistics journey</Eyebrow>
        <h2>
          From origin
          <br />
          to destination.
        </h2>
        <p>
          A clear, considered sequence. The exact handling depends on the shipment and confirmed
          services.
        </p>
      </div>
      <div className="journey-steps">
        {process.map((item, index) => (
          <div className="journey-step" key={item}>
            <span className="journey-number">0{index + 1}</span>
            <span className="journey-rule" />
            <h3>{item}</h3>
            <p>
              {
                [
                  "Share your shipment details and request a quotation.",
                  "Cargo is collected or received at the agreed point.",
                  "Documentation and required procedures are coordinated.",
                  "Cargo moves through the selected transport network.",
                  "Your shipment reaches its final destination.",
                ][index]
              }
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

function IndustrySection() {
  return (
    <section className="industry-section page-shell">
      <div className="industry-head">
        <Eyebrow>Industries</Eyebrow>
        <h2>
          Moving the work
          <br />
          that moves us.
        </h2>
        <p>
          Illustrative sectors for discussion. Industry capabilities and handling requirements must
          be confirmed.
        </p>
      </div>
      <div className="industry-list">
        {[
          "Manufacturing",
          "Retail & commerce",
          "Automotive",
          "Industrial equipment",
          "Construction",
        ].map((name, index) => (
          <div className="industry-row" key={name}>
            <span>0{index + 1}</span>
            <h3>{name}</h3>
            <span>Freight needs vary by cargo and destination.</span>
            <ChevronRight size={17} />
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="contact-band">
      <div className="page-shell contact-band-content">
        <Eyebrow light>Start a conversation</Eyebrow>
        <h2>
          Ready to ship?
          <br />
          <span>Let’s talk.</span>
        </h2>
        <p>Share a few details about your shipment and we’ll help you plan the next step.</p>
        <Button asChild size="lg" className="button-electric">
          <Link to="/quote">
            Request a quote <ArrowRight size={16} />
          </Link>
        </Button>
      </div>
    </section>
  );
}

export function AboutPage() {
  return (
    <main>
      <PageIntro
        label="About Meridian"
        title="More than logistics. A commitment to movement."
        copy="An operational philosophy shaped around thoughtful planning, clear communication, and cargo handled with care."
      />
      <section className="about-feature">
        <div className="page-shell about-layout">
          <div className="about-copy">
            <Eyebrow>Our approach</Eyebrow>
            <h2>
              Movement, made
              <br />
              more considered.
            </h2>
            <p>
              Good logistics is a sequence of well-managed decisions. It begins with understanding
              the cargo, continues through careful coordination, and depends on clarity at every
              handoff.
            </p>
            <p>
              Meridian Freight is a brand concept awaiting the company’s verified history, mission,
              team and operating details. This page intentionally does not invent them.
            </p>
            <Button asChild variant="outline">
              <Link to="/contact">
                Start a conversation <ArrowRight size={15} />
              </Link>
            </Button>
          </div>
          <img
            src={warehouseImage}
            alt="Orderly modern warehouse showing cargo handling"
            loading="lazy"
            width={1440}
            height={960}
          />
        </div>
      </section>
      <JourneySection />
      <section className="confirmation-strip">
        <div className="page-shell">
          <CircleHelp size={18} />
          <span>
            Company history, leadership, locations and credentials have not been supplied and await
            confirmation.
          </span>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}

export function ServicesPage() {
  return (
    <main>
      <PageIntro
        label="Services"
        title="End-to-end logistics. Without compromise."
        copy="A starting point for your freight plan. All listed service areas are illustrative and must be confirmed against current company capabilities."
      />
      <section className="services-page page-shell">
        {services.map((service, index) => (
          <article
            className={`service-detail ${index % 2 ? "reverse" : ""}`}
            id={service.id}
            key={service.id}
          >
            <div className="service-detail-image">
              <img
                src={service.image}
                alt={`${service.title} concept`}
                loading="lazy"
                width={1440}
                height={960}
              />
            </div>
            <div className="service-detail-copy">
              <span className="service-number">{service.number} / SERVICE AREA</span>
              <service.icon size={22} />
              <h2>{service.title}</h2>
              <p>{service.text}</p>
              <span className="service-detail-tags">{service.detail}</span>
              <p className="confirmation-note">
                <CircleHelp size={14} /> Illustrative capability · confirm availability.
              </p>
              <Button asChild variant="link">
                <Link to="/quote">
                  Discuss this service <ArrowRight size={15} />
                </Link>
              </Button>
            </div>
          </article>
        ))}
      </section>
      <ContactBand />
    </main>
  );
}

export function NetworkPage() {
  return (
    <main>
      <PageIntro
        label="Global network"
        title="One network. Global possibilities."
        copy="A conceptual overview of global freight connections. No company coverage areas, hubs, or trade routes have been verified."
      />
      <section className="network-page-map page-shell">
        <WorldMap />
      </section>
      <section className="network-regions">
        <div className="page-shell">
          <Eyebrow>Regions in view</Eyebrow>
          <h2>
            Connected across
            <br />
            continents.
          </h2>
          <div className="region-list">
            {["Americas", "Europe", "Asia Pacific"].map((region, index) => (
              <div key={region}>
                <span>0{index + 1}</span>
                <h3>{region}</h3>
                <p>Illustrative region only · confirm service coverage with the company.</p>
                <Globe2 size={17} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}

export function TrackPage() {
  return (
    <main>
      <PageIntro
        label="Shipment visibility"
        title="Your shipment. Every step of the way."
        copy="Enter a reference to try the sample tracker. Live tracking is not connected, and the example never represents a real shipment."
      />
      <section className="track-page-section">
        <div className="page-shell track-page-layout">
          <div className="track-page-note">
            <Eyebrow>Demonstration mode</Eyebrow>
            <h2>One place to follow the journey.</h2>
            <p>
              Use the sample reference below to explore an illustrative timeline. No live shipment
              records are available here.
            </p>
            <div className="sample-number">
              <span>Sample reference</span>
              <strong>{demoTrackingCode}</strong>
            </div>
          </div>
          <TrackingForm />
        </div>
      </section>
    </main>
  );
}

const inputFields: {
  name: keyof QuoteDetails;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  options?: string[];
}[] = [
  { name: "mode", label: "Shipment type", options: ["Ocean", "Air", "Land"] },
  { name: "originCountry", label: "Origin country", placeholder: "Country", required: true },
  { name: "originCity", label: "Origin city", placeholder: "City", required: true },
  {
    name: "destinationCountry",
    label: "Destination country",
    placeholder: "Country",
    required: true,
  },
  { name: "destinationCity", label: "Destination city", placeholder: "City", required: true },
  {
    name: "cargo",
    label: "Cargo description",
    placeholder: "What are you shipping?",
    required: true,
  },
  {
    name: "weight",
    label: "Cargo weight (kg)",
    placeholder: "e.g. 240",
    type: "number",
    required: true,
  },
  { name: "dimensions", label: "Dimensions", placeholder: "L × W × H, if known" },
  {
    name: "packages",
    label: "Number of packages",
    placeholder: "e.g. 4",
    type: "number",
    required: true,
  },
  { name: "container", label: "Container type", placeholder: "If applicable" },
];
const contactFields = [
  { name: "fullName", label: "Full name", placeholder: "Your name", required: true },
  { name: "company", label: "Company", placeholder: "Company name", required: true },
  {
    name: "email",
    label: "Business email",
    placeholder: "name@company.com",
    type: "email",
    required: true,
  },
  { name: "phone", label: "Phone number", placeholder: "+1 555 000 0000", required: true },
];

export function QuotePage() {
  const [step, setStep] = useState(0);
  const [details, setDetails] = useState<QuoteDetails>(emptyQuote);
  const [error, setError] = useState("");
  const [prepared, setPrepared] = useState(false);
  const change = (name: keyof QuoteDetails, value: string) =>
    setDetails((current) => ({ ...current, [name]: value }));
  function advance(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const issue = step === 0 ? validateShipment(details) : validateContact(details);
    if (issue) {
      setError(issue);
      return;
    }
    setError("");
    setStep(step + 1);
  }
  if (prepared)
    return (
      <main>
        <PageIntro
          label="Quote request"
          title="Your details are ready."
          copy="This site has no quote submission service connected. Your information has not been sent or saved."
        />
        <section className="quote-page-section">
          <div className="page-shell quote-success">
            <Check size={24} />
            <h2>Request prepared locally</h2>
            <p>
              No request was transmitted. Connect an approved company endpoint to receive quote
              submissions.
            </p>
            <Button
              onClick={() => {
                setPrepared(false);
                setStep(0);
              }}
              variant="outline"
            >
              Start another request
            </Button>
          </div>
        </section>
      </main>
    );
  return (
    <main>
      <PageIntro
        label="Request a quote"
        title="Let’s move your cargo."
        copy="Tell us about your shipment. Review your details before finishing; nothing is sent from this demonstration."
      />
      <section className="quote-page-section">
        <div className="page-shell quote-layout">
          <aside className="quote-stepper">
            <Eyebrow>Quote request</Eyebrow>
            {quoteSteps.map((label, index) => (
              <div
                key={label}
                className={`quote-step ${step === index ? "active" : step > index ? "complete" : ""}`}
                aria-current={step === index ? "step" : undefined}
              >
                <span>{step > index ? <Check size={15} /> : `0${index + 1}`}</span>
                <strong>{label}</strong>
              </div>
            ))}
            <div className="quote-privacy">
              <ShieldCheck size={17} />
              <p>
                Details stay in this browser session. There is no connected submission endpoint.
              </p>
            </div>
          </aside>
          <div className="quote-form-wrap">
            <form
              onSubmit={
                step < 2
                  ? advance
                  : (event) => {
                      event.preventDefault();
                      setPrepared(true);
                    }
              }
            >
              {step === 0 && (
                <>
                  <h2>Shipment details</h2>
                  <p>Tell us where it’s going and what it needs.</p>
                  <div className="form-grid">
                    {inputFields.map((field) => (
                      <label
                        className={field.name === "cargo" ? "field wide" : "field"}
                        key={field.name}
                      >
                        {field.label}
                        {field.options ? (
                          <select
                            value={details[field.name]}
                            onChange={(e) => change(field.name, e.target.value)}
                          >
                            {field.options.map((option) => (
                              <option key={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          <input
                            name={field.name}
                            type={field.type ?? "text"}
                            placeholder={field.placeholder}
                            required={field.required}
                            value={details[field.name]}
                            onChange={(e) => change(field.name, e.target.value)}
                          />
                        )}
                      </label>
                    ))}
                  </div>
                </>
              )}
              {step === 1 && (
                <>
                  <h2>Your contact details</h2>
                  <p>Who should we contact about this shipment?</p>
                  <div className="form-grid">
                    {contactFields.map((field) => (
                      <label className="field" key={field.name}>
                        {field.label}
                        <input
                          type={field.type ?? "text"}
                          placeholder={field.placeholder}
                          required={field.required}
                          value={details[field.name as keyof QuoteDetails]}
                          onChange={(e) => change(field.name as keyof QuoteDetails, e.target.value)}
                        />
                      </label>
                    ))}
                    <label className="field wide">
                      Additional message
                      <textarea
                        rows={4}
                        value={details.message}
                        onChange={(e) => change("message", e.target.value)}
                        placeholder="Anything else we should know?"
                      />
                    </label>
                  </div>
                </>
              )}
              {step === 2 && (
                <>
                  <h2>Review your request</h2>
                  <p>Check the details below. You can return to make changes.</p>
                  <div className="review-block">
                    <span>SHIPMENT</span>
                    <p>
                      <strong>{details.mode} freight</strong> · {details.originCity},{" "}
                      {details.originCountry} → {details.destinationCity},{" "}
                      {details.destinationCountry}
                    </p>
                    <p>
                      {details.cargo} · {details.weight} kg · {details.packages} packages
                    </p>
                    {details.dimensions && (
                      <p>
                        {details.dimensions} · {details.container}
                      </p>
                    )}
                    <Button type="button" variant="link" onClick={() => setStep(0)}>
                      Edit shipment details
                    </Button>
                  </div>
                  <div className="review-block">
                    <span>CONTACT</span>
                    <p>
                      <strong>{details.fullName}</strong> · {details.company}
                    </p>
                    <p>
                      {details.email} · {details.phone}
                    </p>
                    {details.message && <p>{details.message}</p>}
                    <Button type="button" variant="link" onClick={() => setStep(1)}>
                      Edit contact details
                    </Button>
                  </div>
                  <p className="review-disclaimer">
                    <CircleHelp size={15} /> Finishing prepares your details on this device; it does
                    not send them to the company.
                  </p>
                </>
              )}
              {error && (
                <p className="form-error" role="alert">
                  {error}
                </p>
              )}
              <div className="form-controls">
                {step > 0 && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setError("");
                      setStep(step - 1);
                    }}
                  >
                    Back
                  </Button>
                )}
                <Button type="submit">
                  {step === 2 ? "Finish locally" : "Continue"} <ArrowRight size={15} />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}

export function ContactPage() {
  const [complete, setComplete] = useState(false);
  return (
    <main>
      <PageIntro
        label="Contact"
        title="Ready to ship? Let’s talk."
        copy="Share a note with the team. Contact information and operating details are pending company confirmation."
      />
      <section className="contact-page-section">
        <div className="page-shell contact-page-layout">
          <div className="contact-details">
            <Eyebrow>Start a conversation</Eyebrow>
            <h2>
              Let’s find the
              <br />
              right way forward.
            </h2>
            <p>
              Office address, phone, business email and hours will be added when verified company
              details are available.
            </p>
            <div className="contact-pending">
              <MapPin size={17} />
              <span>
                Company address
                <br />
                <strong>Awaiting confirmation</strong>
              </span>
            </div>
            <div className="contact-pending">
              <Headphones size={17} />
              <span>
                Business contact
                <br />
                <strong>Awaiting confirmation</strong>
              </span>
            </div>
            <div className="contact-pending">
              <Clock3 size={17} />
              <span>
                Business hours
                <br />
                <strong>Awaiting confirmation</strong>
              </span>
            </div>
          </div>
          <div className="contact-form-panel">
            {complete ? (
              <div className="quote-success">
                <Check size={24} />
                <h2>Message prepared locally</h2>
                <p>It has not been sent. A company contact endpoint is not connected.</p>
                <Button variant="outline" onClick={() => setComplete(false)}>
                  Write another message
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setComplete(true);
                }}
              >
                <h2>Send a message</h2>
                <p>This form does not send or store your details.</p>
                <label className="field">
                  Your name
                  <input required placeholder="Your name" />
                </label>
                <label className="field">
                  Email address
                  <input required type="email" placeholder="name@company.com" />
                </label>
                <label className="field">
                  How can we help?
                  <textarea required rows={5} placeholder="Tell us a little about what you need" />
                </label>
                <Button type="submit">
                  Prepare message <ArrowRight size={15} />
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>
      <ContactBand />
    </main>
  );
}
