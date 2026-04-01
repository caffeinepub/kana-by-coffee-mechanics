import { Toaster } from "@/components/ui/sonner";
import {
  Beef,
  Clock,
  Leaf,
  Loader2,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";

// ─── Types ──────────────────────────────────────────────────────────────────
type MenuCategory =
  | "Beverages"
  | "Breakfast"
  | "Small Plates"
  | "Mains"
  | "Desserts";

interface MenuItem {
  name: string;
  description: string;
  veg: boolean | null; // null = neither badge
}

// ─── Menu Data ───────────────────────────────────────────────────────────────
const menuData: Record<MenuCategory, MenuItem[]> = {
  Beverages: [
    {
      name: "Espresso",
      description: "A concentrated shot of rich, aromatic coffee",
      veg: true,
    },
    {
      name: "Americano",
      description: "Espresso diluted with hot water, smooth and bold",
      veg: true,
    },
    {
      name: "Cappuccino",
      description: "Espresso with steamed milk and thick foam",
      veg: true,
    },
    {
      name: "Latte",
      description: "Espresso with silky steamed milk and light foam",
      veg: true,
    },
    {
      name: "Cold Brew",
      description: "Slow-steeped 18 hours for a smooth, mellow brew",
      veg: true,
    },
    {
      name: "Iced Coffee",
      description: "Chilled espresso over ice with your choice of milk",
      veg: true,
    },
    {
      name: "Millet Jaggery Latte",
      description:
        "House specialty: earthy millet, jaggery sweetness, espresso",
      veg: true,
    },
    {
      name: "Vietnamese Iced Coffee",
      description: "Strong drip coffee with condensed milk over crushed ice",
      veg: true,
    },
    {
      name: "Matcha Latte",
      description: "Ceremonial grade matcha whisked into steamed milk",
      veg: true,
    },
    {
      name: "Lemon Soda",
      description: "Fresh lemon, house syrups, sparkling water",
      veg: true,
    },
    {
      name: "Seasonal Blends",
      description: "Rotating experimental drinks featuring local ingredients",
      veg: true,
    },
  ],
  Breakfast: [
    {
      name: "Granola Bowl",
      description: "House granola, seasonal fruits, honey, and yogurt",
      veg: true,
    },
    {
      name: "Pumpkin Butter Toast",
      description: "Thick sourdough, spiced pumpkin butter, toasted seeds",
      veg: true,
    },
    {
      name: "Sourdough Cream Cheese Sandwich",
      description: "House sourdough, whipped cream cheese, fresh herbs",
      veg: true,
    },
    {
      name: "Potato Rosti",
      description: "Crispy shredded potato cake with crème fraîche and chives",
      veg: true,
    },
    {
      name: "Eggs & Breakfast Plate",
      description: "Eggs your way with toast, greens, and seasonal sides",
      veg: true,
    },
  ],
  "Small Plates": [
    {
      name: "Salt & Vinegar Fries",
      description: "Crispy golden fries tossed in sea salt and malt vinegar",
      veg: true,
    },
    {
      name: "Cauliflower Karaage",
      description: "Japanese-style fried cauliflower, ponzu mayo, scallions",
      veg: true,
    },
    {
      name: "Chicken Karaage",
      description: "Marinated Japanese fried chicken, yuzu kosho dip",
      veg: false,
    },
    {
      name: "Croquettes",
      description: "Golden-fried potato and herb croquettes, aioli",
      veg: true,
    },
    {
      name: "Skewers",
      description: "Seasonal skewers with housemade glazes and sauces",
      veg: null,
    },
  ],
  Mains: [
    {
      name: "Tomato Parmesan Pasta",
      description: "Al dente pasta in a slow-cooked San Marzano tomato sauce",
      veg: true,
    },
    {
      name: "Pesto Chicken Pasta",
      description: "Grilled chicken, fresh basil pesto, pine nuts, parmesan",
      veg: false,
    },
    {
      name: "Wood-fired Pizza",
      description: "Seasonal toppings on a hand-stretched sourdough crust",
      veg: null,
    },
    {
      name: "Burger",
      description: "Smash patty or veggie option, brioche bun, house sauces",
      veg: null,
    },
    {
      name: "Grilled Sandwich",
      description:
        "Pressed sourdough with seasonal fillings and house condiments",
      veg: null,
    },
  ],
  Desserts: [
    {
      name: "Banana Bread",
      description: "Moist and warming, served warm with honey butter",
      veg: true,
    },
    {
      name: "Chocolate Brownie",
      description: "Dense, fudgy Valrhona chocolate brownie with sea salt",
      veg: true,
    },
    {
      name: "Lemon Cake",
      description: "Bright lemon sponge with lemon curd and candied zest",
      veg: true,
    },
    {
      name: "Fresh Pastries",
      description: "Daily baked croissants, danish, and seasonal patisserie",
      veg: true,
    },
    {
      name: "Baked Goods",
      description: "Rotating selection of cookies, scones, and loaf cakes",
      veg: true,
    },
  ],
};

const menuCategories: MenuCategory[] = [
  "Beverages",
  "Breakfast",
  "Small Plates",
  "Mains",
  "Desserts",
];

const categoryIcons: Record<MenuCategory, string> = {
  Beverages: "☕",
  Breakfast: "🍳",
  "Small Plates": "🥢",
  Mains: "🍝",
  Desserts: "🍰",
};

// ─── Form State ──────────────────────────────────────────────────────────────
interface ReservationForm {
  customerName: string;
  email: string;
  phoneNumber: string;
  numberOfGuests: string;
  date: string;
  time: string;
  specialRequests: string;
}

const initialForm: ReservationForm = {
  customerName: "",
  email: "",
  phoneNumber: "",
  numberOfGuests: "2",
  date: "",
  time: "",
  specialRequests: "",
};

// ─── Nav Links ───────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Reservations", href: "#reservations" },
  { label: "Visit", href: "#visit" },
];

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const { actor } = useActor();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] =
    useState<MenuCategory>("Beverages");
  const [form, setForm] = useState<ReservationForm>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await actor!.createReservation({
        id: 0n,
        timestamp: 0n,
        customerName: form.customerName,
        email: form.email,
        phoneNumber: form.phoneNumber,
        numberOfGuests: BigInt(form.numberOfGuests),
        date: form.date,
        time: form.time,
        specialRequests: form.specialRequests,
      });
      setSubmitted(true);
      setForm(initialForm);
      toast.success("Reservation confirmed! We'll be in touch shortly.");
    } catch {
      toast.error(
        "Something went wrong. Please try again or call us directly.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Toaster position="top-right" theme="dark" />

      {/* ── Navigation ───────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 border-b border-border"
        style={{
          background: "rgba(9,10,11,0.88)",
          backdropFilter: "blur(14px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <a
            href="#home"
            data-ocid="nav.link"
            className="font-serif text-2xl font-bold tracking-widest text-gold"
          >
            KANA
          </a>
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                data-ocid="nav.link"
                className="text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase font-sans"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#reservations"
              data-ocid="nav.primary_button"
              className="text-sm tracking-wider bg-gold text-[oklch(0.12_0.004_250)] px-5 py-2 font-semibold hover:opacity-90 transition-opacity uppercase"
              style={{ borderRadius: "2px" }}
            >
              Book a Table
            </a>
          </nav>
          {/* Mobile menu toggle */}
          <button
            type="button"
            className="md:hidden text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            data-ocid="nav.toggle"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Mobile nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4"
            >
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  data-ocid="nav.link"
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm tracking-wider text-muted-foreground hover:text-foreground transition-colors uppercase"
                >
                  {link.label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center text-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-cafe.dim_1400x800.jpg')",
          }}
        />
        {/* Dark vignette overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(9,10,11,0.7) 0%, rgba(9,10,11,0.4) 40%, rgba(9,10,11,0.4) 60%, rgba(9,10,11,0.85) 100%)",
          }}
        />
        <div className="relative z-10 flex flex-col items-center gap-6 px-6 max-w-4xl mx-auto pt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <p className="text-xs tracking-[0.4em] text-gold uppercase font-sans mb-3">
              By Coffee Mechanics &nbsp;|&nbsp; Specialty Café &bull; Bengaluru
            </p>
            <h1
              className="font-serif text-8xl sm:text-9xl font-bold tracking-wider text-foreground"
              style={{ lineHeight: 1 }}
            >
              KANA
            </h1>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="font-serif text-xl sm:text-2xl italic text-foreground/90 max-w-xl"
          >
            Curated coffee, mindful dining,&nbsp;amidst&nbsp;nature.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <a
              href="#menu"
              data-ocid="hero.primary_button"
              className="px-8 py-3 bg-gold text-[oklch(0.12_0.004_250)] font-semibold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity"
              style={{ borderRadius: "2px" }}
            >
              View Menu
            </a>
            <a
              href="#reservations"
              data-ocid="hero.secondary_button"
              className="px-8 py-3 border border-gold text-gold font-semibold text-sm tracking-widest uppercase hover:bg-gold/10 transition-colors"
              style={{ borderRadius: "2px" }}
            >
              Book a Table
            </a>
          </motion.div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.6 }}
            className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent"
          />
        </div>
      </section>

      {/* ── About ─────────────────────────────────────────────── */}
      <section id="about" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden shadow-card border border-border"
          >
            <img
              src="/assets/generated/coffee-closeup.dim_800x600.jpg"
              alt="Latte art at Kana"
              className="w-full h-[420px] object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6"
          >
            <div>
              <p className="text-xs tracking-[0.35em] text-gold uppercase font-sans mb-3">
                Our Story &nbsp;|
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground leading-snug">
                Contemporary Artistry,
                <br />
                Elevated Taste.
              </h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              Kana by Coffee Mechanics is a contemporary specialty café in
              Bengaluru that brings together thoughtfully crafted coffee,
              wholesome food, and a calming, design-forward space. Rooted in the
              philosophy of quality and simplicity, Kana focuses on
              single-origin brews, innovative beverages, and fresh, all-day
              dining options.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              With warm interiors, lush greenery, and an inviting atmosphere,
              Kana is the perfect setting for everything from casual meetups to
              focused work sessions. Every element—from the coffee to the
              ambiance—is curated to create a relaxed yet refined experience.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-2">
              {[
                ["Single Origin", "Ethically sourced, traceable beans"],
                ["All-Day Dining", "Breakfast through evening bites"],
                ["Design-Forward", "Curated space for work & leisure"],
              ].map(([title, desc]) => (
                <div key={title} className="flex flex-col gap-1">
                  <span className="text-gold text-sm font-semibold tracking-wide">
                    {title}
                  </span>
                  <span className="text-muted-foreground text-xs">{desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-border" />
      </div>

      {/* ── Menu ─────────────────────────────────────────────── */}
      <section id="menu" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Food image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="rounded-xl overflow-hidden mb-16 border border-border shadow-card"
          >
            <img
              src="/assets/generated/food-spread.dim_800x600.jpg"
              alt="Food spread at Kana"
              className="w-full h-56 sm:h-72 object-cover object-center"
            />
          </motion.div>

          {/* Section heading */}
          <div className="text-center mb-12">
            <p className="text-xs tracking-[0.35em] text-gold uppercase font-sans mb-3">
              The Menu &nbsp;|
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground">
              Bengaluru's Finest Blends &amp; Bites
            </h2>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
              Specialty coffee, inventive beverages, and globally inspired
              comfort food — designed for all-day dining.
            </p>
          </div>

          {/* Tabs */}
          <div
            className="flex flex-wrap justify-center gap-2 mb-10"
            data-ocid="menu.tab"
          >
            {menuCategories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-ocid="menu.tab"
                className={`px-5 py-2 text-sm tracking-wider uppercase transition-all border font-sans ${
                  activeCategory === cat
                    ? "bg-gold text-[oklch(0.12_0.004_250)] border-gold font-semibold"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
                style={{ borderRadius: "2px" }}
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </div>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {menuData[activeCategory].map((item, i) => (
                <div
                  key={item.name}
                  data-ocid={`menu.item.${i + 1}`}
                  className="kana-card p-5 flex flex-col gap-3 hover:border-gold/40 transition-colors shadow-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-serif text-base font-semibold text-foreground leading-snug">
                      {item.name}
                    </h3>
                    {item.veg === true && (
                      <span className="flex-shrink-0 flex items-center gap-1 text-[10px] uppercase tracking-wider border border-green-700 text-green-500 px-2 py-0.5 rounded-sm">
                        <Leaf size={9} />
                        Veg
                      </span>
                    )}
                    {item.veg === false && (
                      <span className="flex-shrink-0 flex items-center gap-1 text-[10px] uppercase tracking-wider border border-red-800 text-red-400 px-2 py-0.5 rounded-sm">
                        <Beef size={9} />
                        Non-veg
                      </span>
                    )}
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Divider ──────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-border" />
      </div>

      {/* ── Reservations + Location ───────────────────────────── */}
      <section id="reservations" className="py-24 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs tracking-[0.35em] text-gold uppercase font-sans mb-3">
              Reservations &nbsp;|
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-8">
              Reserve Your Table
            </h2>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                data-ocid="reservation.success_state"
                className="kana-card p-8 text-center flex flex-col items-center gap-4"
              >
                <span className="text-4xl">✨</span>
                <h3 className="font-serif text-xl text-gold">
                  Reservation Confirmed!
                </h3>
                <p className="text-muted-foreground text-sm">
                  Thank you for choosing Kana. We'll be in touch to confirm your
                  reservation details.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  data-ocid="reservation.secondary_button"
                  className="mt-2 text-sm text-gold border border-gold px-5 py-2 hover:bg-gold/10 transition-colors"
                  style={{ borderRadius: "2px" }}
                >
                  Make Another Reservation
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                data-ocid="reservation.modal"
              >
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs tracking-wider text-muted-foreground uppercase"
                      htmlFor="customerName"
                    >
                      Full Name *
                    </label>
                    <input
                      id="customerName"
                      name="customerName"
                      type="text"
                      required
                      value={form.customerName}
                      onChange={handleFormChange}
                      placeholder="Your full name"
                      data-ocid="reservation.input"
                      className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs tracking-wider text-muted-foreground uppercase"
                      htmlFor="email"
                    >
                      Email *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="your@email.com"
                      data-ocid="reservation.input"
                      className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors rounded-sm"
                    />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs tracking-wider text-muted-foreground uppercase"
                      htmlFor="phoneNumber"
                    >
                      Phone Number *
                    </label>
                    <input
                      id="phoneNumber"
                      name="phoneNumber"
                      type="tel"
                      required
                      value={form.phoneNumber}
                      onChange={handleFormChange}
                      placeholder="+91 XXXXX XXXXX"
                      data-ocid="reservation.input"
                      className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs tracking-wider text-muted-foreground uppercase"
                      htmlFor="numberOfGuests"
                    >
                      Number of Guests *
                    </label>
                    <select
                      id="numberOfGuests"
                      name="numberOfGuests"
                      required
                      value={form.numberOfGuests}
                      onChange={handleFormChange}
                      data-ocid="reservation.select"
                      className="bg-card border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors rounded-sm appearance-none"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                        <option key={n} value={n}>
                          {n === 10 ? "10+" : n} {n === 1 ? "Guest" : "Guests"}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs tracking-wider text-muted-foreground uppercase"
                      htmlFor="date"
                    >
                      Preferred Date *
                    </label>
                    <input
                      id="date"
                      name="date"
                      type="date"
                      required
                      value={form.date}
                      onChange={handleFormChange}
                      data-ocid="reservation.input"
                      className="bg-card border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors rounded-sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      className="text-xs tracking-wider text-muted-foreground uppercase"
                      htmlFor="time"
                    >
                      Preferred Time *
                    </label>
                    <input
                      id="time"
                      name="time"
                      type="time"
                      required
                      value={form.time}
                      onChange={handleFormChange}
                      data-ocid="reservation.input"
                      className="bg-card border border-border px-4 py-3 text-sm text-foreground focus:outline-none focus:border-gold transition-colors rounded-sm"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label
                    className="text-xs tracking-wider text-muted-foreground uppercase"
                    htmlFor="specialRequests"
                  >
                    Special Requests
                  </label>
                  <textarea
                    id="specialRequests"
                    name="specialRequests"
                    rows={4}
                    value={form.specialRequests}
                    onChange={handleFormChange}
                    placeholder="Dietary restrictions, accessibility needs, occasion details, seating preferences..."
                    data-ocid="reservation.textarea"
                    className="bg-card border border-border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors rounded-sm resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  data-ocid="reservation.submit_button"
                  className="flex items-center justify-center gap-2 bg-gold text-[oklch(0.12_0.004_250)] py-4 font-semibold text-sm tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-60 mt-2"
                  style={{ borderRadius: "2px" }}
                >
                  {submitting && <Loader2 className="animate-spin" size={16} />}
                  {submitting ? "Reserving..." : "Reserve Table"}
                </button>
                {submitting && (
                  <p
                    data-ocid="reservation.loading_state"
                    className="text-xs text-center text-muted-foreground"
                  >
                    Processing your reservation...
                  </p>
                )}
              </form>
            )}
          </motion.div>

          {/* Location */}
          <motion.div
            id="visit"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col gap-8"
          >
            <div>
              <p className="text-xs tracking-[0.35em] text-gold uppercase font-sans mb-3">
                Find Us &nbsp;|
              </p>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-foreground mb-6">
                Visit Kana
              </h2>
            </div>

            {/* Map */}
            <div className="rounded-xl overflow-hidden border border-border shadow-card h-56">
              <iframe
                title="Kana by Coffee Mechanics location"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?q=Punappa+Layout,+Hennur+Gardens,+Bengaluru,+Karnataka+560043&output=embed"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            {/* Contact info */}
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4">
                <div className="mt-0.5 p-2 bg-card border border-border rounded-lg">
                  <MapPin size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Address
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Punappa Layout, Hennur Gardens,
                    <br />
                    Bengaluru, Karnataka 560043
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 p-2 bg-card border border-border rounded-lg">
                  <Clock size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Hours
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Monday – Sunday
                    <br />
                    8:00 AM – 9:00 PM
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 p-2 bg-card border border-border rounded-lg">
                  <Phone size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Phone
                  </p>
                  <p className="text-muted-foreground text-sm">
                    +91 98765 43210
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-0.5 p-2 bg-card border border-border rounded-lg">
                  <Mail size={16} className="text-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">
                    Email
                  </p>
                  <p className="text-muted-foreground text-sm">
                    hello@kanacafe.in
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────── */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid sm:grid-cols-3 gap-10">
            <div className="flex flex-col gap-4">
              <span className="font-serif text-2xl font-bold tracking-widest text-gold">
                KANA
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed">
                By Coffee Mechanics
                <br />
                Specialty Café · Bengaluru
              </p>
              <p className="text-muted-foreground text-xs">
                Punappa Layout, Hennur Gardens,
                <br />
                Bengaluru, Karnataka 560043
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                Quick Links
              </p>
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    data-ocid="nav.link"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <p className="text-xs tracking-[0.3em] text-gold uppercase">
                Hours
              </p>
              <div className="text-muted-foreground text-sm flex flex-col gap-1">
                <span>Monday – Sunday</span>
                <span>8:00 AM – 9:00 PM</span>
              </div>
              <div className="flex flex-col gap-1 mt-2">
                <a
                  href="tel:+919876543210"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  +91 98765 43210
                </a>
                <a
                  href="mailto:hello@kanacafe.in"
                  className="text-sm text-muted-foreground hover:text-gold transition-colors"
                >
                  hello@kanacafe.in
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-border mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-muted-foreground text-xs">
              &copy; {new Date().getFullYear()} Kana by Coffee Mechanics. All
              rights reserved.
            </p>
            <p className="text-muted-foreground text-xs">
              Built with ♥ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                className="text-gold hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
