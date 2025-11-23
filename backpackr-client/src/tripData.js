// Alpine images
import AlpineHero from "./assets/trip-details/alpine/alpine-hero.jpg";
import AlpineOverview from "./assets/trip-details/alpine/overview.webp";
import AlpineGallery1 from "./assets/trip-details/alpine/gallery1.jpg";
import AlpineGallery2 from "./assets/trip-details/alpine/gallery2.jpg";
import AlpineGallery3 from "./assets/trip-details/alpine/gallery.jpg";
// Bali images
import BaliHero from "./assets/trip-details/bali/hero.webp";
import BaliOverview from "./assets/trip-details/bali/overview.jpg";
import BaliGallery1 from "./assets/trip-details/bali/gallery1.webp";
import BaliGallery2 from "./assets/trip-details/bali/gallery2.jpg";
import BaliGallery3 from "./assets/trip-details/bali/gallery3.jpg";
import BaliGallery4 from "./assets/trip-details/bali/galley4.jpg";
import BaliGallery5 from "./assets/trip-details/bali/gallery5.webp";
// Leh-Ladakh images
import LehHero from "./assets/trip-details/leh-ladakh/hero.jpeg";
import LehOverview from "./assets/trip-details/leh-ladakh/overview.webp";
import LehGallery1 from "./assets/trip-details/leh-ladakh/gallery1.jpg";
import LehGallery2 from "./assets/trip-details/leh-ladakh/gallery2.jpg";
import LehGallery3 from "./assets/trip-details/leh-ladakh/gallery3.webp";
// Munnar images
import MunnarHero from "./assets/trip-details/munnar/hero.jpg";
import MunnarOverview from "./assets/trip-details/munnar/overview.jpg";
import MunnarGallery1 from "./assets/trip-details/munnar/gallery1.webp";
import MunnarGallery2 from "./assets/trip-details/munnar/gallery2.jpg";
import MunnarGallery3 from "./assets/trip-details/munnar/gallery3.jpg";
// Manali images
import ManaliHero from "./assets/trip-details/manali/hero.jpg";
import ManaliOverview from "./assets/trip-details/manali/overview.webp";
import ManaliGallery1 from "./assets/trip-details/manali/gallery1.webp";
import ManaliGallery2 from "./assets/trip-details/manali/gallery2.webp";
import ManaliGallery3 from "./assets/trip-details/manali/gallery3.jpg";
// Goa images
import GoaHero from "./assets/trip-details/goa/hero.jpg";
import GoaOverview from "./assets/trip-details/goa/overview.jpg";
import GoaGallery1 from "./assets/trip-details/goa/gallery1.jpg";
import GoaGallery2 from "./assets/trip-details/goa/gallery2.jpeg";
import GoaGallery3 from "./assets/trip-details/goa/gallery3.jpg";
import GoaGallery4 from "./assets/trip-details/goa/gallery4.webp";
// Jaipur images
import JaipurHero from "./assets/trip-details/jaipur/hero.jpg";
import JaipurOverview from "./assets/trip-details/jaipur/overview.jpg";
import JaipurGallery1 from "./assets/trip-details/jaipur/gallery1.jpg";
import JaipurGallery2 from "./assets/trip-details/jaipur/gallery2.jpg";
import JaipurGallery3 from "./assets/trip-details/jaipur/gallery3.jpg";
import JaipurGallery4 from "./assets/trip-details/jaipur/gallery4.jpg";
// Dubai images
import DubaiHero from "./assets/trip-details/dubai/hero.jpg";
import DubaiOverview from "./assets/trip-details/dubai/overview.jpg";
import DubaiGallery1 from "./assets/trip-details/dubai/gallery1.jpg";
import DubaiGallery2 from "./assets/trip-details/dubai/gallery2.jpg";
import DubaiGallery3 from "./assets/trip-details/dubai/gallery3.jpg";
import DubaiGallery4 from "./assets/trip-details/dubai/gallery4.webp";
// Coorg images
import CoorgHero from "./assets/trip-details/coorg/hero.jpg";
import CoorgOverview from "./assets/trip-details/coorg/overview.jpg";
import CoorgGallery1 from "./assets/trip-details/coorg/gallery1.jpg";
import CoorgGallery2 from "./assets/trip-details/coorg/gallery2.webp";
import CoorgGallery3 from "./assets/trip-details/coorg/gallery3.jpg";
// Rishikesh images
import RishikeshHero from "./assets/trip-details/rishikesh/hero.jpg";
import RishikeshOverview from "./assets/trip-details/rishikesh/overview.jpg";
import RishikeshGallery1 from "./assets/trip-details/rishikesh/gallery1.jpg";
import RishikeshGallery2 from "./assets/trip-details/rishikesh/gallery2.jpg";
import RishikeshGallery3 from "./assets/trip-details/rishikesh/gallery3.jpg";
// Varanasi images
import VaranasiHero from "./assets/trip-details/varanasi/hero.jpg";
import VaranasiOverview from "./assets/trip-details/varanasi/overview.jpg";
import VaranasiGallery1 from "./assets/trip-details/varanasi/gallery1.jpg";
import VaranasiGallery2 from "./assets/trip-details/varanasi/gallery2.jpg";
import VaranasiGallery3 from "./assets/trip-details/varanasi/gallery3.jpg";
import VaranasiGallery4 from "./assets/trip-details/varanasi/gallery4.jpg";
// Pondicherry images
import PondicherryHero from "./assets/trip-details/pondicherry/hero.jpg";
import PondicherryOverview from "./assets/trip-details/pondicherry/overview.jpg";
import PondicherryGallery1 from "./assets/trip-details/pondicherry/gallery1.webp";
import PondicherryGallery2 from "./assets/trip-details/pondicherry/gallery2.jpg";
import PondicherryGallery3 from "./assets/trip-details/pondicherry/gallery3.jpg";
import PondicherryGallery4 from "./assets/trip-details/pondicherry/gallery4.jpg";

export const tripsData = {
    1: {
      name: "Alpine Escape",
      hero: AlpineHero,
      overviewImg: AlpineOverview,
      overview: {
        days: "5-7 days",
        rating: "4.8-4.9",
        desc:
          "Explore the Swiss Alps with breathtaking hikes, cozy lodges, scenic train rides, and adventure sports. Discover charming villages and stunning landscapes.",
      },
      itineraries: [
        {
          id: 1,
          title: "Alpine Adventure - 5 Days",
          days: 5,
          price: 1200,
          rating: 4.8,
          highlights: [
            "Day 1: Arrival & City Tour",
            "Day 2: Mountain Hike & Lake Visit",
            "Day 3: Village Exploration",
          ],
          sample:
            "Experience the best of the Alps with city tours, mountain hikes, and scenic train rides. Unlock the full itinerary after purchase!",
          gallery: [AlpineGallery1, AlpineGallery2, AlpineGallery3],
        },
        {
          id: 2,
          title: "Alpine Explorer - 7 Days",
          days: 7,
          price: 1500,
          rating: 4.9,
          highlights: [
            "Day 1: Arrival & Welcome Dinner",
            "Day 2: Glacier Trek",
            "Day 3: Lake Cruise",
          ],
          sample:
            "A week-long journey through the Alps with glacier treks, cruises, and adventure sports. Unlock the full itinerary after purchase!",
          gallery: [AlpineGallery2, AlpineGallery1, AlpineGallery3],
        },
      ],
    },
    2: {
      name: "Bali Bliss",
      hero: BaliHero,
      overviewImg: BaliGallery1,
      overview: {
        days: "4-6 days",
        rating: "4.7-4.8",
        desc:
          "Discover Bali’s beaches, temples, rice terraces, and vibrant culture. Enjoy tropical adventures and serene escapes.",
      },
      itineraries: [
        {
          id: 1,
          title: "Bali Explorer - 4 Days",
          days: 4,
          price: 950,
          rating: 4.7,
          highlights: [
            "Day 1: Beach Arrival & Sunset",
            "Day 2: Temple Tour & Rice Terraces",
            "Day 3: Waterfall Adventure",
          ],
          sample:
            "A short but sweet Bali experience with beaches, temples, and waterfalls. Unlock the full itinerary after purchase!",
          gallery: [BaliGallery1, BaliGallery2, BaliGallery3],
        },
        {
          id: 2,
          title: "Bali Adventure - 6 Days",
          days: 6,
          price: 1200,
          rating: 4.8,
          highlights: [
            "Day 1: Arrival & Beach Relaxation",
            "Day 2: Ubud & Monkey Forest",
            "Day 3: Island Hopping",
          ],
          sample:
            "A full Bali adventure with island hopping, Ubud, and more. Unlock the full itinerary after purchase!",
          gallery: [BaliGallery2, BaliGallery4, BaliGallery5],
        },
      ],
    },
    3: {
      name: "Leh-Ladakh Adventure",
      hero: LehHero,
      overviewImg: LehOverview,
      overview: {
        days: "6-8 days",
        rating: "4.9-5.0",
        desc:
          "Journey through the rugged terrains of Leh-Ladakh, experience high-altitude passes, monasteries, and breathtaking landscapes.",
      },
      itineraries: [
        {
          id: 1,
          title: "Leh-Ladakh Explorer - 6 Days",
          days: 6,
          price: 1100,
          rating: 4.9,
          highlights: [
            "Day 1: Arrival & Acclimatization",
            "Day 2: Monastery Tour",
            "Day 3: Nubra Valley Adventure",
          ],
          sample:
            "Explore the best of Leh-Ladakh with monasteries, valleys, and adventure. Unlock the full itinerary after purchase!",
          gallery: [LehGallery1, LehGallery2, LehGallery3],
        },
        {
          id: 2,
          title: "Ladakh Expedition - 8 Days",
          days: 8,
          price: 1400,
          rating: 5.0,
          highlights: [
            "Day 1: Arrival & Local Sightseeing",
            "Day 2: Pangong Lake",
            "Day 3: High-Altitude Passes",
          ],
          sample:
            "A complete Ladakh experience with lakes, passes, and local culture. Unlock the full itinerary after purchase!",
          gallery: [LehGallery3, LehGallery2, LehGallery1],
        },
      ],
    },
    4: {
      name: "Munnar Escape",
      hero: MunnarHero,
      overviewImg: MunnarOverview,
      overview: {
        days: "4-6 days",
        rating: "4.6-4.8",
        desc:
          "Relax in the lush green hills of Munnar, Kerala, with tea gardens, waterfalls, and serene mountain air.",
      },
      itineraries: [
        {
          id: 1,
          title: "Munnar Retreat - 4 Days",
          days: 4,
          price: 800,
          rating: 4.6,
          highlights: [
            "Day 1: Arrival & Tea Garden Walk",
            "Day 2: Waterfall Visit",
            "Day 3: Hilltop Sunrise",
          ],
          sample:
            "A relaxing Munnar experience with tea gardens, waterfalls, and hilltop views. Unlock the full itinerary after purchase!",
          gallery: [MunnarGallery1, MunnarGallery2, MunnarGallery3],
        },
        {
          id: 2,
          title: "Munnar Explorer - 6 Days",
          days: 6,
          price: 1050,
          rating: 4.8,
          highlights: [
            "Day 1: Arrival & Local Markets",
            "Day 2: Wildlife Sanctuary",
            "Day 3: Plantation Tour",
          ],
          sample:
            "A complete Munnar escape with wildlife, plantations, and local culture. Unlock the full itinerary after purchase!",
          gallery: [MunnarGallery3, MunnarGallery2, MunnarGallery1],
        },
      ],
    },
    5: {
      name: "Manali Retreat",
      hero: ManaliHero,
      overviewImg: ManaliOverview,
      overview: {
        days: "4-6 days",
        rating: "4.7-4.8",
        desc:
          "Experience the beauty of Manali with snow-capped mountains, adventure sports, and vibrant culture.",
      },
      itineraries: [
        {
          id: 1,
          title: "Manali Adventure - 4 Days",
          days: 4,
          price: 900,
          rating: 4.7,
          highlights: [
            "Day 1: Arrival & Mall Road",
            "Day 2: Solang Valley Adventure",
            "Day 3: Hidimba Temple & Local Sights",
          ],
          sample:
            "A thrilling Manali trip with adventure sports and local culture. Unlock the full itinerary after purchase!",
          gallery: [ManaliGallery1, ManaliGallery2, ManaliGallery3],
        },
        {
          id: 2,
          title: "Manali Explorer - 6 Days",
          days: 6,
          price: 1150,
          rating: 4.8,
          highlights: [
            "Day 1: Arrival & Local Markets",
            "Day 2: Rohtang Pass",
            "Day 3: Vashisht Hot Springs",
          ],
          sample:
            "A complete Manali experience with Rohtang Pass and hot springs. Unlock the full itinerary after purchase!",
          gallery: [ManaliGallery3, ManaliGallery2, ManaliGallery1],
        },
      ],
    },
    6: {
      name: "Goa Getaway",
      hero: GoaHero,
      overviewImg: GoaOverview,
      overview: {
        days: "3-5 days",
        rating: "4.5-4.7",
        desc:
          "Enjoy the sun, sand, and sea in Goa with its lively beaches, nightlife, and Portuguese heritage.",
      },
      itineraries: [
        {
          id: 1,
          title: "Goa Beaches - 3 Days",
          days: 3,
          price: 700,
          rating: 4.5,
          highlights: [
            "Day 1: Arrival & Beach Relaxation",
            "Day 2: North Goa Tour",
            "Day 3: Water Sports",
          ],
          sample:
            "A short Goa trip with beaches, tours, and water sports. Unlock the full itinerary after purchase!",
          gallery: [GoaGallery1, GoaGallery2, GoaGallery3],
        },
        {
          id: 2,
          title: "Goa Explorer - 5 Days",
          days: 5,
          price: 950,
          rating: 4.7,
          highlights: [
            "Day 1: Arrival & Old Goa",
            "Day 2: South Goa Tour",
            "Day 3: Island Hopping",
          ],
          sample:
            "A full Goa experience with Old Goa, South Goa, and islands. Unlock the full itinerary after purchase!",
          gallery: [GoaGallery4, GoaGallery2, GoaGallery1],
        },
      ],
    },
    7: {
      name: "Jaipur Heritage Tour",
      hero: JaipurHero,
      overviewImg: JaipurOverview,
      overview: {
        days: "3-5 days",
        rating: "4.4-4.6",
        desc:
          "Explore the Pink City’s palaces, forts, and vibrant bazaars in a royal experience.",
      },
      itineraries: [
        {
          id: 1,
          title: "Jaipur Palaces - 3 Days",
          days: 3,
          price: 650,
          rating: 4.4,
          highlights: [
            "Day 1: Arrival & City Palace",
            "Day 2: Amber Fort & Jal Mahal",
            "Day 3: Local Bazaars",
          ],
          sample:
            "A royal Jaipur experience with palaces, forts, and shopping. Unlock the full itinerary after purchase!",
          gallery: [JaipurGallery1, JaipurGallery2, JaipurGallery3],
        },
        {
          id: 2,
          title: "Jaipur Explorer - 5 Days",
          days: 5,
          price: 900,
          rating: 4.6,
          highlights: [
            "Day 1: Arrival & Hawa Mahal",
            "Day 2: Nahargarh Fort",
            "Day 3: Cultural Shows",
          ],
          sample:
            "A complete Jaipur tour with forts, culture, and more. Unlock the full itinerary after purchase!",
          gallery: [JaipurGallery4, JaipurGallery2, JaipurGallery1],
        },
      ],
    },
    8: {
      name: "Dubai Explorer",
      hero: DubaiHero,
      overviewImg: DubaiOverview,
      overview: {
        days: "5-7 days",
        rating: "4.8-5.0",
        desc:
          "Discover Dubai’s futuristic skyline, luxury shopping, desert safaris, and cultural gems.",
      },
      itineraries: [
        {
          id: 1,
          title: "Dubai Highlights - 5 Days",
          days: 5,
          price: 1800,
          rating: 4.8,
          highlights: [
            "Day 1: Arrival & City Tour",
            "Day 2: Desert Safari",
            "Day 3: Burj Khalifa & Shopping",
          ],
          sample:
            "Experience the best of Dubai with city tours, desert safaris, and shopping. Unlock the full itinerary after purchase!",
          gallery: [DubaiGallery1, DubaiGallery2, DubaiGallery3],
        },
        {
          id: 2,
          title: "Dubai Adventure - 7 Days",
          days: 7,
          price: 2200,
          rating: 5.0,
          highlights: [
            "Day 1: Arrival & Marina Walk",
            "Day 2: Palm Jumeirah",
            "Day 3: Cultural Experiences",
          ],
          sample:
            "A complete Dubai adventure with beaches, culture, and more. Unlock the full itinerary after purchase!",
          gallery: [DubaiGallery4, DubaiGallery2, DubaiGallery1],
        },
      ],
    },
    9: {
      name: "Coorg Coffee Trails",
      hero: CoorgHero,
      overviewImg: CoorgOverview,
      overview: {
        days: "3-5 days",
        rating: "4.6-4.8",
        desc:
          "Wander through lush coffee plantations, waterfalls, and hills in the Scotland of India.",
      },
      itineraries: [
        {
          id: 1,
          title: "Coorg Retreat - 3 Days",
          days: 3,
          price: 700,
          rating: 4.6,
          highlights: [
            "Day 1: Arrival & Coffee Plantation Walk",
            "Day 2: Abbey Falls & Local Sights",
            "Day 3: Hilltop Sunrise",
          ],
          sample:
            "A relaxing Coorg experience with plantations, waterfalls, and hilltop views. Unlock the full itinerary after purchase!",
          gallery: [CoorgGallery1, CoorgGallery2, CoorgGallery3],
        },
        {
          id: 2,
          title: "Coorg Explorer - 5 Days",
          days: 5,
          price: 950,
          rating: 4.8,
          highlights: [
            "Day 1: Arrival & Local Markets",
            "Day 2: Wildlife Sanctuary",
            "Day 3: Plantation Tour",
          ],
          sample:
            "A complete Coorg escape with wildlife, plantations, and local culture. Unlock the full itinerary after purchase!",
          gallery: [CoorgGallery3, CoorgGallery2, CoorgGallery1],
        },
      ],
    },
    10: {
      name: "Rishikesh Adventure",
      hero: RishikeshHero,
      overviewImg: RishikeshOverview,
      overview: {
        days: "4-6 days",
        rating: "4.7-4.9",
        desc:
          "Experience yoga, river rafting, and spiritual bliss on the banks of the Ganges in Rishikesh.",
      },
      itineraries: [
        {
          id: 1,
          title: "Rishikesh Retreat - 4 Days",
          days: 4,
          price: 750,
          rating: 4.7,
          highlights: [
            "Day 1: Arrival & Ganga Aarti",
            "Day 2: Yoga & Meditation",
            "Day 3: River Rafting",
          ],
          sample:
            "A spiritual and adventurous Rishikesh experience. Unlock the full itinerary after purchase!",
          gallery: [RishikeshGallery1, RishikeshGallery2, RishikeshGallery3],
        },
        {
          id: 2,
          title: "Rishikesh Explorer - 6 Days",
          days: 6,
          price: 950,
          rating: 4.9,
          highlights: [
            "Day 1: Arrival & Local Temples",
            "Day 2: Adventure Sports",
            "Day 3: Spiritual Walks",
          ],
          sample:
            "A complete Rishikesh adventure with temples, sports, and more. Unlock the full itinerary after purchase!",
          gallery: [RishikeshGallery3, RishikeshGallery2, RishikeshGallery1],
        },
      ],
    },
    11: {
      name: "Varanasi Spiritual Sojourn",
      hero: VaranasiHero,
      overviewImg: VaranasiOverview,
      overview: {
        days: "3-5 days",
        rating: "4.3-4.5",
        desc:
          "Experience the spiritual heart of India with serene Ganga aartis, ancient temples, and bustling local markets.",
      },
      itineraries: [
        {
          id: 1,
          title: "Varanasi Retreat - 3 Days",
          days: 3,
          price: 500,
          rating: 4.3,
          highlights: [
            "Day 1: Arrival & Ganga Aarti",
            "Day 2: Temple Tour",
            "Day 3: Local Markets",
          ],
          sample:
            "A spiritual Varanasi experience with temples, aartis, and markets. Unlock the full itinerary after purchase!",
          gallery: [VaranasiGallery1, VaranasiGallery2, VaranasiGallery3],
        },
        {
          id: 2,
          title: "Varanasi Explorer - 5 Days",
          days: 5,
          price: 700,
          rating: 4.5,
          highlights: [
            "Day 1: Arrival & River Cruise",
            "Day 2: Sarnath Excursion",
            "Day 3: Cultural Walks",
          ],
          sample:
            "A complete Varanasi journey with river cruises, Sarnath, and culture. Unlock the full itinerary after purchase!",
          gallery: [VaranasiGallery4, VaranasiGallery2, VaranasiGallery1],
        },
      ],
    },
    12: {
      name: "Pondicherry Coastal Retreat",
      hero: PondicherryHero,
      overviewImg: PondicherryOverview,
      overview: {
        days: "3-5 days",
        rating: "4.4-4.6",
        desc:
          "Relax by the sea, stroll through French quarters, and enjoy the unique blend of Indian and French culture.",
      },
      itineraries: [
        {
          id: 1,
          title: "Pondicherry Getaway - 3 Days",
          days: 3,
          price: 600,
          rating: 4.4,
          highlights: [
            "Day 1: Arrival & Beach Walk",
            "Day 2: French Quarter Tour",
            "Day 3: Local Cafes",
          ],
          sample:
            "A relaxing Pondicherry trip with beaches, French quarters, and cafes. Unlock the full itinerary after purchase!",
          gallery: [PondicherryGallery1, PondicherryGallery2, PondicherryGallery3],
        },
        {
          id: 2,
          title: "Pondicherry Explorer - 5 Days",
          days: 5,
          price: 850,
          rating: 4.6,
          highlights: [
            "Day 1: Arrival & Promenade Beach",
            "Day 2: Auroville Visit",
            "Day 3: Heritage Walks",
          ],
          sample:
            "A complete Pondicherry experience with beaches, Auroville, and heritage. Unlock the full itinerary after purchase!",
          gallery: [PondicherryGallery4, PondicherryGallery2, PondicherryGallery1],
        },
      ],
    },
  };