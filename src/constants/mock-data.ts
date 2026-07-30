export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  rating: number;
  experience: string;
  phone: string;
  email: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  city: string;
  beds: number;
  baths: number;
  area: number;
  type: "Villa" | "Apartment" | "Office" | "Commercial" | "Land";
  status: "For Sale" | "For Rent";
  images: string[];
  agent: Agent;
  featured: boolean;
  popular: boolean;
  amenities: string[];
  coordinates: { lat: number; lng: number };
  yearBuilt: number;
  nearby: { place: string; distance: string }[];
  community: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  propertiesCount: number;
  avgPrice: string;
  tagline: string;
}

export interface Blog {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
  author: {
    name: string;
    avatar: string;
  };
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  avatar: string;
  comment: string;
  rating: number;
  location: string;
}

export const AGENTS: Agent[] = [
  {
    id: "a1",
    name: "Alistair Vance",
    role: "Managing Partner & Luxury Advisory",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.95,
    experience: "14 Years",
    phone: "+1 (555) 019-2831",
    email: "alistair@edno.luxury",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "a2",
    name: "Elena Rostova",
    role: "Director of International Sales",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.98,
    experience: "11 Years",
    phone: "+1 (555) 019-4829",
    email: "elena@edno.luxury",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "a3",
    name: "Marcus Thorne",
    role: "Senior Waterfront Specialist",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.92,
    experience: "9 Years",
    phone: "+1 (555) 019-8811",
    email: "marcus@edno.luxury",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
    },
  },
  {
    id: "a4",
    name: "Sophia Chen",
    role: "Penthouse & Off-Market Portfolio Manager",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.99,
    experience: "12 Years",
    phone: "+1 (555) 019-3012",
    email: "sophia@edno.luxury",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "a5",
    name: "Arjun Mehta",
    role: "India & South Asia Portfolio Director",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.97,
    experience: "13 Years",
    phone: "+91 98200 55123",
    email: "arjun@edno.luxury",
    socials: {
      twitter: "https://twitter.com",
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
  {
    id: "a6",
    name: "Priya Nair",
    role: "Heritage & Legacy Property Specialist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=500",
    rating: 4.96,
    experience: "10 Years",
    phone: "+91 98100 44876",
    email: "priya@edno.luxury",
    socials: {
      linkedin: "https://linkedin.com",
      instagram: "https://instagram.com",
    },
  },
];

export const COMMUNITIES: Community[] = [
  {
    id: "c1",
    name: "The Palm Heights",
    description: "An exclusive beachfront enclave presenting unparalleled views of the azure skyline and private yacht access.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800",
    propertiesCount: 14,
    avgPrice: "₹105 Cr",
    tagline: "Frontrow Waterfront Living",
  },
  {
    id: "c2",
    name: "Golden Estates",
    description: "Nestled in pristine hillsides, featuring custom mansion architecture and private multi-acre wooded estates.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
    propertiesCount: 8,
    avgPrice: "₹153 Cr",
    tagline: "Epitome of Seclusion & Grandeur",
  },
  {
    id: "c3",
    name: "Aero District",
    description: "A futuristic skyline community combining state-of-the-art penthouses with private helipads and automated smart tech.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800",
    propertiesCount: 22,
    avgPrice: "₹75 Cr",
    tagline: "Tomorrow's Metropolitan Luxury",
  },
  {
    id: "c4",
    name: "The Sanctuary Woods",
    description: "Eco-luxury sanctuary prioritising carbon-neutral architecture, geothermal heat pools, and organic living retreats.",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800",
    propertiesCount: 11,
    avgPrice: "₹118 Cr",
    tagline: "Zero Carbon, Infinite Elegance",
  },
  {
    id: "c5",
    name: "Mumbai Seafront Reserve",
    description: "The pinnacle of Mumbai's ultra-luxury waterfront living. Exclusive sea-facing towers, penthouses, and private marina access along the famed Worli seaface promenade.",
    image: "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=800",
    propertiesCount: 18,
    avgPrice: "₹42 Cr",
    tagline: "Where the Arabian Sea Meets Opulence",
  },
  {
    id: "c6",
    name: "Rajputana Heritage Enclave",
    description: "An extraordinary collection of restored havelis and palace-inspired estates in Udaipur and Jaipur — each a UNESCO-grade architectural treasure reimagined for private luxury ownership.",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed31769?auto=format&fit=crop&q=80&w=800",
    propertiesCount: 9,
    avgPrice: "₹28 Cr",
    tagline: "Royal Legacy, Modern Sanctuary",
  },
];

export const PROPERTIES: Property[] = [
  {
    id: "p1",
    title: "The Aurelia Pavilion",
    description: "A marvel of modern organic architecture blending glass, limestone, and water elements. Includes an infinity pool wrapping the perimeter, state-of-the-art wellness pavilion, and automated sliding glass walls framing panoramic ocean views.",
    price: 1554000000,
    location: "102 Ocean Ridge, Malibu",
    city: "Malibu",
    beds: 6,
    baths: 8,
    area: 9200,
    type: "Villa",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[3], // Sophia Chen
    featured: true,
    popular: true,
    amenities: ["Infinity Pool", "Wellness Spa", "Home Cinema", "Private Beach Access", "Wine Cellar", "Smart Automation", "Glass Elevator", "4-Car Garage"],
    coordinates: { lat: 34.0259, lng: -118.7798 },
    yearBuilt: 2025,
    nearby: [
      { place: "Malibu Pier", distance: "8 mins" },
      { place: "Zuma Beach", distance: "4 mins" },
      { place: "Nobu Restaurant", distance: "10 mins" },
      { place: "Private Helipad", distance: "12 mins" }
    ],
    community: "The Palm Heights",
  },
  {
    id: "p2",
    title: "Vortice Sky Penthouse",
    description: "Occupying the entire top two floors of the iconic Vortice Tower, this duplex penthouse features 360-degree skyline views, a private heated rooftop pool, and custom interior design curated by minimalist masterminds.",
    price: 1193000000,
    location: "Suite 88A, Aero District, New York",
    city: "New York",
    beds: 4,
    baths: 5,
    area: 6400,
    type: "Apartment",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[1], // Elena Rostova
    featured: true,
    popular: true,
    amenities: ["Rooftop Heated Pool", "Private Elevator", "Concierge Service", "Sky Terrace", "24/7 Security", "Chef's Kitchen", "Private Gym"],
    coordinates: { lat: 40.7588, lng: -73.9851 },
    yearBuilt: 2024,
    nearby: [
      { place: "Central Park", distance: "5 mins" },
      { place: "Fifth Avenue Shopping", distance: "2 mins" },
      { place: "The Museum of Modern Art", distance: "4 mins" }
    ],
    community: "Aero District",
  },
  {
    id: "p3",
    title: "The Obsidian Sanctum",
    description: "A dark-themed architectural statement nestled in the hills of Aspen. Constructed from volcanic black slate, charred cedar, and massive floor-to-ceiling glass. Features a natural thermal hot-spring pool and direct ski-in/ski-out access.",
    price: 1848000000,
    location: "777 Aspen Ridge Road, Aspen",
    city: "Aspen",
    beds: 5,
    baths: 7,
    area: 8800,
    type: "Villa",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[0], // Alistair Vance
    featured: true,
    popular: false,
    amenities: ["Ski-in/Ski-out Access", "Thermal Hot Spring", "Glass Wine Room", "Outdoor Firepit", "Indoor Sauna", "Heated Driveway", "Billiards Lounge"],
    coordinates: { lat: 39.1911, lng: -106.8175 },
    yearBuilt: 2026,
    nearby: [
      { place: "Aspen Mountain Gondola", distance: "2 mins" },
      { place: "Downtown Aspen Shops", distance: "6 mins" },
      { place: "Private Airport", distance: "15 mins" }
    ],
    community: "Golden Estates",
  },
  {
    id: "p4",
    title: "Luminary Corporate Atrium",
    description: "An architectural masterpiece designed for global headquarters or flagship retail. Features an eco-atrium with floating botanical platforms, hyper-efficient solar facades, and state-of-the-art boardroom suites overlooking the harbor.",
    price: 2940000000,
    location: "400 Marina Blvd, San Francisco",
    city: "San Francisco",
    beds: 0,
    baths: 12,
    area: 24500,
    type: "Office",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[2], // Marcus Thorne
    featured: false,
    popular: true,
    amenities: ["Atrium Gardens", "LEED Platinum Cert", "Automated Parking", "Fiber Network", "Rooftop Helipad", "Executive Dining Hall"],
    coordinates: { lat: 37.8044, lng: -122.4481 },
    yearBuilt: 2023,
    nearby: [
      { place: "Golden Gate Park", distance: "10 mins" },
      { place: "Financial District", distance: "8 mins" },
      { place: "SFO International Airport", distance: "22 mins" }
    ],
    community: "Aero District",
  },
  {
    id: "p5",
    title: "Elysian Estate Reserve",
    description: "Secluded parcel of ultra-luxury land overlooking the Napa Valley basin. Includes approved blueprints for a 12,000 sq ft modern architectural estate designed by EDNO Studio, a private vineyard setup, and established water rights.",
    price: 823000000,
    location: "Lot 15, Napa Crest Trail, Napa Valley",
    city: "Napa Valley",
    beds: 0,
    baths: 0,
    area: 174240, // 4 Acres
    type: "Land",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[0], // Alistair Vance
    featured: false,
    popular: false,
    amenities: ["Vineyard Rights", "Panoramic Valley Views", "Approved Blueprints", "Private Road Access", "Well & Geothermal Ready"],
    coordinates: { lat: 38.2975, lng: -122.2869 },
    yearBuilt: 2026,
    nearby: [
      { place: "Napa Valley Yacht Club", distance: "14 mins" },
      { place: "Michelin 3-Star Dining", distance: "9 mins" },
      { place: "Helicopter Transfer Pad", distance: "5 mins" }
    ],
    community: "Golden Estates",
  },
  {
    id: "p6",
    title: "Monolith Waterfront Center",
    description: "Ultra-premium commercial space overlooking the ocean. Designed with clean minimalist steel frames and reflective triple-glazed glass. Ideal for high-end boutique showrooms, galleries, or upscale wellness compounds.",
    price: 2352000000,
    location: "20 Marine Promenade, Miami",
    city: "Miami",
    beds: 0,
    baths: 10,
    area: 18000,
    type: "Commercial",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[2], // Marcus Thorne
    featured: true,
    popular: false,
    amenities: ["Private Pier Access", "Double-Height Atrium", "Solar Power Grid", "Sub-Level Loading Docks", "Premium Executive Lounges"],
    coordinates: { lat: 25.7617, lng: -80.1918 },
    yearBuilt: 2025,
    nearby: [
      { place: "Miami Beach", distance: "5 mins" },
      { place: "Design District", distance: "12 mins" },
      { place: "Miami Int'l Airport", distance: "18 mins" }
    ],
    community: "The Palm Heights",
  },
  {
    id: "p7",
    title: "Sanctuary Woods Villa",
    description: "A carbon-neutral architectural retreat. Embedded in organic forest layouts, this property is crafted from zero-VOC local clay, recycled glass, and smart bamboo laminates. Features self-sustaining water systems and air purifiers.",
    price: 966000000,
    location: "88 Pine Canopy Lane, Portland",
    city: "Portland",
    beds: 5,
    baths: 6,
    area: 7800,
    type: "Villa",
    status: "For Rent",
    images: [
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[3], // Sophia Chen
    featured: false,
    popular: true,
    amenities: ["Geothermal Heating", "Solar Roof Tiles", "Organic Garden Bed", "Rainwater Filtering System", "Yoga Pavilion", "EV Supercharger"],
    coordinates: { lat: 45.5152, lng: -122.6784 },
    yearBuilt: 2025,
    nearby: [
      { place: "Forest Park Trails", distance: "1 min" },
      { place: "Downtown Portland", distance: "12 mins" },
      { place: "Willamette River Yacht Club", distance: "15 mins" }
    ],
    community: "The Sanctuary Woods",
  },
  {
    id: "p8",
    title: "The Sea Crest Residence",
    description: "A contemporary masterpiece perched on the Worli seaface in Mumbai, offering unobstructed panoramic views of the Arabian Sea. Designed with hand-selected Italian marble, double-height living spaces, a cantilevered infinity pool, and a private elevator from basement to penthouse level.",
    price: 520000000,
    location: "14 Sea View Drive, Worli, Mumbai",
    city: "Mumbai",
    beds: 5,
    baths: 6,
    area: 7500,
    type: "Villa",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[4], // Arjun Mehta
    featured: true,
    popular: true,
    amenities: ["Infinity Pool", "Private Elevator", "Italian Marble Interiors", "Smart Home Automation", "Concierge Service", "Private Gym", "Wine Room", "Sea-view Terrace"],
    coordinates: { lat: 19.0176, lng: 72.8214 },
    yearBuilt: 2025,
    nearby: [
      { place: "Bandra-Worli Sea Link", distance: "5 mins" },
      { place: "Palladium Mall", distance: "8 mins" },
      { place: "Chhatrapati Shivaji Airport", distance: "20 mins" },
      { place: "Breach Candy Hospital", distance: "10 mins" }
    ],
    community: "Mumbai Seafront Reserve",
  },
  {
    id: "p9",
    title: "The Lutyens Apex Penthouse",
    description: "Crowning the most prestigious address in New Delhi's Lutyens' Bungalow Zone, this sky residence commands sweeping views of Rashtrapati Bhavan and the historic Rajpath avenue. Conceived by award-winning architects with custom Kashmiri walnut woodwork, heated Italian stone floors, and a private diplomatic-grade security suite.",
    price: 380000000,
    location: "Apt 2201, Lutyens Circle, New Delhi",
    city: "New Delhi",
    beds: 4,
    baths: 5,
    area: 6200,
    type: "Apartment",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[4], // Arjun Mehta
    featured: true,
    popular: false,
    amenities: ["Diplomatic Security Suite", "Kashmiri Walnut Woodwork", "Heated Stone Floors", "Rooftop Terrace", "Chauffeured Service", "Private Library", "Smart Automation"],
    coordinates: { lat: 28.6139, lng: 77.2090 },
    yearBuilt: 2024,
    nearby: [
      { place: "Rashtrapati Bhavan", distance: "7 mins" },
      { place: "India Gate", distance: "10 mins" },
      { place: "Indira Gandhi International Airport", distance: "25 mins" },
      { place: "Khan Market", distance: "6 mins" }
    ],
    community: "Aero District",
  },
  {
    id: "p10",
    title: "Anjuna Cliffside Estate",
    description: "A stunning Goa clifftop villa with sweeping views of the Arabian Sea. Built using laterite stone sourced from local quarries, the estate blends Goan-Portuguese heritage with high-end contemporary finishes. Includes a terraced infinity pool, open-air meditation pavilion, and private beach staircase carved into natural rock.",
    price: 195000000,
    location: "Lot 7, Clifftop Ridge, Anjuna, Goa",
    city: "Goa",
    beds: 6,
    baths: 7,
    area: 8200,
    type: "Villa",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1586375300773-8384e3e4916f?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[5], // Priya Nair
    featured: true,
    popular: true,
    amenities: ["Cliffside Infinity Pool", "Private Beach Access", "Meditation Pavilion", "Laterite Stone Architecture", "Outdoor Shower Garden", "Solar Power", "Chef's Outdoor Kitchen"],
    coordinates: { lat: 15.5849, lng: 73.7396 },
    yearBuilt: 2025,
    nearby: [
      { place: "Anjuna Beach", distance: "3 mins" },
      { place: "Vagator Fort", distance: "8 mins" },
      { place: "Goa International Airport", distance: "35 mins" },
      { place: "Curlies Beach Shack", distance: "5 mins" }
    ],
    community: "Mumbai Seafront Reserve",
  },
  {
    id: "p11",
    title: "Udaipur Lakeside Palace Reserve",
    description: "An unrivaled heritage land parcel on the banks of Lake Pichola in Udaipur, approved for an ultra-luxury private residence inspired by Rajput palace architecture. Pre-approved master plan includes a floating water courtyard, jali-carved marble facades, and private boat dock with direct sunset views of the City Palace.",
    price: 240000000,
    location: "Lot 3, Lake Pichola Shore, Udaipur, Rajasthan",
    city: "Udaipur",
    beds: 0,
    baths: 0,
    area: 87120, // 2 Acres
    type: "Land",
    status: "For Sale",
    images: [
      "https://images.unsplash.com/photo-1477587458883-47145ed31769?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&q=80&w=800"
    ],
    agent: AGENTS[5], // Priya Nair
    featured: false,
    popular: true,
    amenities: ["Lake Pichola Frontage", "Approved Palace Blueprints", "Private Boat Dock", "Jali-carved Marble Design", "Royal Heritage Status", "Water Courtyard"],
    coordinates: { lat: 24.5854, lng: 73.6835 },
    yearBuilt: 2026,
    nearby: [
      { place: "City Palace Udaipur", distance: "4 mins" },
      { place: "Jag Mandir Island", distance: "6 mins" },
      { place: "Maharana Pratap Airport", distance: "22 mins" },
      { place: "Shilpgram Craft Village", distance: "10 mins" }
    ],
    community: "Rajputana Heritage Enclave",
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Arthur Pendelton",
    role: "Chairman, Pendelton Capital",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    comment: "Acquiring the Aurelia Pavilion through EDNO was an exercise in precision. Their private portfolio advisory was discrete, swift, and highly architectural. Truly sets a new benchmark for global real estate acquisitions.",
    rating: 5,
    location: "Malibu Owner",
  },
  {
    id: "t2",
    name: "Dr. Genevieve Sterling",
    role: "Founder, Sterling BioTech",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200",
    comment: "The team at EDNO respects the value of privacy and design. They understood our need for a zero-carbon, architecture-first forest sanctuary. The obsidian aesthetic is a marvel.",
    rating: 5,
    location: "Sanctuary Woods Owner",
  },
  {
    id: "t3",
    name: "Vikram Malhotra",
    role: "CEO, Nexa Industries",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    comment: "EDNO isn't a brokerage; they are architectural curators. The transaction of Vortice Sky Duplex was streamlined digitally with zero friction. The caliber of service is second to none.",
    rating: 5,
    location: "Aero District Owner",
  },
  {
    id: "t4",
    name: "Alessia Moretti",
    role: "Fine Art Curator",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200",
    comment: "For my waterfront gallery showroom, finding a location with double-height volume and private pier frontage was essential. EDNO negotiated an off-market beachfront space that was absolute perfection.",
    rating: 5,
    location: "Miami Business Owner",
  },
  {
    id: "t5",
    name: "Rohit Singhania",
    role: "Chairman, Singhania Group",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200",
    comment: "The Sea Crest Residence exceeded every expectation. EDNO's understanding of India's ultra-luxury segment is unparalleled — they found us a Mumbai property that doesn't just overlook the sea, it commands it. Incomparable discretion and taste.",
    rating: 5,
    location: "Mumbai Seafront Owner",
  },
  {
    id: "t6",
    name: "Kavita Reddy",
    role: "Founder, Reddy Capital Ventures",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    comment: "Priya Nair and the EDNO team guided us through acquiring the Anjuna Cliffside Estate with a level of sophistication that reminded us why this firm is truly global class. The property is a masterpiece — Goa has never looked more elegant.",
    rating: 5,
    location: "Goa Villa Owner",
  },
];

export const BLOGS: Blog[] = [
  {
    id: "b1",
    title: "The Minimalist Shift in Ultra-High-Net-Worth Residential Design",
    excerpt: "Exploring the aesthetic shift from gilded luxury to raw limestone, zero-edge reflection pools, and high-performance carbon-neutral materials.",
    content: "Ultra-luxury real estate is undergoing a structural paradigm shift. UHNW buyers are moving away from traditional gilded mansions in favor of minimalist architectural statements. This article breaks down the three pillars of this shift: organic integration with local microclimates, structural stone geometry (limestone and volcanic basalt), and high-performance passive engineering...",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    date: "July 24, 2026",
    readTime: "6 min read",
    author: {
      name: "Alistair Vance",
      avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100",
    },
    category: "Architecture",
  },
  {
    id: "b2",
    title: "Off-Market Real Estate: The New Era of Discretion",
    excerpt: "How digital ledger private listings and exclusive advisory networks are quietly replacing public multiple listing services for assets above $15M.",
    content: "Public real estate sites are no longer the venue of choice for the world's most valuable residential assets. Privacy, cyber security, and tailored negotiations are driving sellers to off-market portfolios. In this deep dive, we detail the operational mechanics of EDNO's Private Ledger and how global syndicates acquire top-tier architectural landmarks...",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=800",
    date: "June 18, 2026",
    readTime: "4 min read",
    author: {
      name: "Sophia Chen",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=100",
    },
    category: "Finance",
  },
  {
    id: "b3",
    title: "Carbon-Neutral Estates: Designing for the Next Century",
    excerpt: "Geothermal loop cooling, self-filtering rainwater, and active solar glass: how sustainability is meeting the highest standards of luxury.",
    content: "Sustainable engineering is no longer a compromise. Today's premium estate owners require absolute independence from traditional grids. Combining geothermal loop fields, integrated solar glass, and zero-VOC materials, these homes act as self-sustaining, carbon-negative sanctuaries that preserve local ecosystems without sacrificing an ounce of physical comfort...",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=800",
    date: "May 30, 2026",
    readTime: "8 min read",
    author: {
      name: "Marcus Thorne",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100",
    },
    category: "Sustainability",
  },
  {
    id: "b4",
    title: "India's Ultra-Luxury Real Estate Surge: The New Global Frontier",
    excerpt: "From Mumbai's Worli seaface to Udaipur's lakeside palaces — how India's UHNW segment is redefining the global luxury property map with heritage, scale, and artisanal craftsmanship.",
    content: "India's ultra-high-net-worth population has doubled in under a decade, driving unprecedented demand for curated luxury residences. Mumbai's Worli seaface has become Asia's most coveted waterfront address, while Udaipur's Lake Pichola shore rivals the finest European lakeside estates. What distinguishes Indian luxury properties is a unique fusion of Mughal and Rajput architectural heritage with contemporary smart systems, materials sourced from local stone quarries, and artisanal craftsmanship — jali screens, pietra dura inlays, and hand-carved jarokha balconies that cannot be replicated anywhere else in the world...",
    image: "https://images.unsplash.com/photo-1477587458883-47145ed31769?auto=format&fit=crop&q=80&w=800",
    date: "July 28, 2026",
    readTime: "7 min read",
    author: {
      name: "Arjun Mehta",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100",
    },
    category: "Market Intelligence",
  },
];
