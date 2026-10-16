import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Menu as MenuIcon, 
  X, 
  ChevronRight, 
  ExternalLink, 
  Utensils, 
  Sparkles, 
  ChevronDown, 
  Users, 
  Info,
  CheckCircle2,
  Instagram
} from 'lucide-react';

// Centralized Configuration
const RESTAURANT_CONFIG = {
  name: "Lotus Premium Dining",
  tagline: "An Unlimited Experience. A Feast to Remember.",
  parentBrand: "Kamal Banquet's & Caterers",
  address: "212, Grand Emporio - Nr Srusti Arcade, Opp H.P. Petrol Pump, Motera - Gandhinagar Road, Motera, Sabarmati, Ahmedabad, Gujarat 380005",
  phones: ["9725699868", "9924599868"],
  whatsappNumber: "919924599868",
  mapsLink: "https://share.google/FTOcQvBb1PrG2R23r",
  mapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3669.831825838421!2d72.59783937588725!3d23.103251712611634!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83a45c3b9b4f%3A0xd641a96df9939598!2sGrand%20Emporio!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  zomatoUrl: "https://www.zomato.com",
  swiggyUrl: "https://www.swiggy.com",
  instagramUrl: "https://www.instagram.com", // Replace with your Instagram URL
  hours: {
    lunch: "12:00 PM - 3:30 PM",
    dinner: "7:00 PM - 11:00 PM"
  },
  unlimitedPricing: {
    lunch: "₹299",
    dinner: "₹349"
  }
};

// Complete Menu Data derived from provided Menu Document
const MENU_DATA = [
  {
    category: "Unlimited Dining",
    description: "Unlimited Tandoori Punjabi & Chinese Feast with starters, mains, breads, and desserts.",
    items: [
      { name: "Unlimited Punjabi & Chinese Feast", desc: "Complete unlimited meal featuring soups, starters, rich Punjabi curries, fresh breads, Chinese delicacies, rice, dal, and accompaniments." }
    ]
  },
  {
    category: "Soups",
    description: "Warm, flavorful start to your dining experience.",
    items: [
      { name: "Hot N Sour Soup", desc: "Spicy and tangy vegetable broth with minced fresh garden vegetables." },
      { name: "Veg. Manchow Soup", desc: "Popular Indo-Chinese dark soup garnished with crispy fried noodles." },
      { name: "Tomato Soup", desc: "Classic rich tomato reduction topped with golden bread croutons." },
      { name: "Sweet Corn Soup", desc: "Mild, creamy corn kernels crushed in a soothing light broth." },
      { name: "Cheese Corn Soup", desc: "Creamy corn broth enriched with melted process cheese." },
      { name: "Lemon Coriander Soup", desc: "Refreshing citrus-infused broth loaded with fresh coriander leaves." }
    ]
  },
  {
    category: "Starters & Tandoori",
    description: "Clay-oven cooked kebabs and appetizing bites.",
    items: [
      { name: "Tandoori Paneer Tikka", desc: "Fresh cottage cheese cubes marinated in spiced yogurt and charred in tandoor." },
      { name: "Peri Peri Paneer Tikka", desc: "Paneer cubes infused with a spicy Peri Peri chili rub." },
      { name: "Hariyali Paneer Tikka", desc: "Paneer marinated in fresh mint, coriander, and aromatic green herbs." },
      { name: "Malai Paneer Tikka", desc: "Velvety cottage cheese marinated in cream, cashew paste, and mild spices." },
      { name: "Achari Paneer Tikka", desc: "Pickle-spiced paneer skewers grilled to golden perfection." },
      { name: "Paneer Pesto Tikka", desc: "Fusion paneer marinated with basil pesto and Indian spices." },
      { name: "Paneer Kali Mirch Tikka", desc: "Peppery marinated paneer roasted with cracked black pepper." },
      { name: "Tandoori Aloo", desc: "Scooped marinated potatoes filled and charred in clay oven." },
      { name: "Hara Bhara Kabab", desc: "Pan-fried patties made with spinach, green peas, and paneer." },
      { name: "Aloo Corn Cheese Seekh", desc: "Melt-in-mouth skewers of potato, sweet corn, and blended cheese." },
      { name: "Veg. Seekh Kabab", desc: "Minced fresh vegetables spiced and skewered over live charcoal." },
      { name: "Tandoori Chaap", desc: "Protein-rich soya chaap marinated in classic tandoori masala." },
      { name: "Malai Chaap", desc: "Soft soya chaap steeped in cream and cashew marinade." },
      { name: "Hariyali Chaap", desc: "Soya chaap tossed in fresh coriander-mint marinade." },
      { name: "Peri Peri Chaap", desc: "Fiery spicy chaap roasted with piquant chili herbs." }
    ]
  },
  {
    category: "Paneer Specialties",
    description: "Rich and luxurious cottage cheese gravies.",
    items: [
      { name: "Paneer Butter Masala (Special)", desc: "Soft paneer cubes simmered in a silky, sweet tomato butter gravy." },
      { name: "Paneer Lababdar (Special)", desc: "Paneer in a rich onion-tomato gravy with grated cottage cheese." },
      { name: "Paneer Malai Kofta", desc: "Melt-in-mouth paneer dumplings cooked in a creamy white cashew gravy." },
      { name: "Paneer Tikka Masala", desc: "Char-grilled paneer tikka folded into a spicy masala gravy." },
      { name: "Kadhai Paneer", desc: "Paneer tossed with capsicum, onions, and freshly ground kadhai spices." },
      { name: "Paneer Tikka Tufani", desc: "Extra spicy and robust paneer preparation with bold red chili notes." },
      { name: "Paneer Kali Mirch", desc: "Paneer cubes in a rich, black pepper-flavored gravy." },
      { name: "Paneer Bhurji", desc: "Scrambled cottage cheese cooked with onions, tomatoes, and herbs." },
      { name: "Matar Paneer", desc: "Classic combination of soft paneer and green peas in spiced gravy." },
      { name: "Palak Paneer", desc: "Fresh cottage cheese cooked in smooth spinach puree with garlicky tempering." },
      { name: "Dahi ki Jugal Bandhi", desc: "Chef's special paneer preparation with a smooth yogurt base." }
    ]
  },
  {
    category: "Veg Specialties",
    description: "Traditional Punjabi gravies and royal vegetable preparations.",
    items: [
      { name: "Cheese Butter Masala", desc: "Generous cheese cubes simmered in rich creamy tomato butter gravy." },
      { name: "Dal Makhani (Special)", desc: "Black lentils slow-cooked overnight with butter, cream, and subtle spices." },
      { name: "Malai Kaju", desc: "Whole cashews simmered in a luscious white cream and milk gravy." },
      { name: "Kaju Masala", desc: "Roasted cashew nuts cooked in a rich, spiced onion-tomato gravy." },
      { name: "Navratan Korma", desc: "Royal mix of fruits, nuts, and vegetables cooked in mild sweet white gravy." },
      { name: "Amritsari Chana Masala", desc: "Authentic spicy chickpea curry infused with Punjabi spices." },
      { name: "Soya Chaap Masala", desc: "Tender soya chaap pieces cooked in dense, aromatic gravy." },
      { name: "Kadai Veg", desc: "Assorted garden vegetables tossed in kadhai masala." },
      { name: "Veg. Kolhapuri", desc: "Spicy mixed vegetable gravy inspired by Kolhapuri red chili paste." },
      { name: "Veg. Tufani", desc: "Zesty spicy multi-veggie curry." },
      { name: "Dum Aloo", desc: "Stuffed potatoes simmered slowly in rich yogurt gravy." },
      { name: "Dal Tadka", desc: "Yellow lentils tempered with ghee, cumin, garlic, and dried red chilis." },
      { name: "Butter Dal Tadka", desc: "Classic yellow lentil tempering enriched with extra butter." },
      { name: "Dal Fry", desc: "Lentils pan-fried with onions, tomatoes, and aromatic green herbs." }
    ]
  },
  {
    category: "Chinese Delights",
    description: "Indo-Chinese noodles, rice, and pan-fried gravies.",
    items: [
      { name: "Lotus Special Noodles", desc: "House special wok-tossed noodles with loaded veggies and chef's signature sauce." },
      { name: "Lotus Special Manchurian", desc: "Signature crispy vegetable dumplings in exotic spicy Chinese sauce." },
      { name: "Paneer Chilli", desc: "Crispy paneer cubes tossed with capsicum, onions, and dark soy-chili sauce." },
      { name: "Chilli Garlic Noodles", desc: "Spicy noodles infused with chili oil and golden fried garlic." },
      { name: "Schezwan Noodles", desc: "Fiery noodles tossed in vibrant Schezwan chili paste." },
      { name: "Hakka Noodles", desc: "Classic wok-tossed stir fry noodles with thin sliced veggies." },
      { name: "Garlic Noodles", desc: "Fragrant noodle prep with prominent roasted garlic flavor." },
      { name: "Chowmein", desc: "Traditional Indo-Chinese street style tossed noodles." },
      { name: "Veg. Dry Manchurian", desc: "Crispy vegetable balls tossed in dry garlicky soy seasoning." },
      { name: "Gravy Manchurian", desc: "Crispy veggie balls served in hot savory Manchurian gravy." },
      { name: "Chilli With Manchurian", desc: "Combined fusion of spicy chilli sauce and crispy manchurian balls." },
      { name: "Chinese Pulav", desc: "Wok-fried aromatic rice tossed with Chinese seasonings and veggies." },
      { name: "Chinese Roll", desc: "Crispy rolled pastry stuffed with seasoned noodle and veggie filling." }
    ]
  },
  {
    category: "Amritsari Kulcha Meals",
    description: "Served hot with Amritsari Chole or rich Dal Makhani.",
    items: [
      { name: "Paneer Butter Kulcha Meal", desc: "Stuffed paneer kulcha topped with butter, served with Chole / Dal Makhani." },
      { name: "Aloo Cheese Kulcha Meal", desc: "Spiced potato and melted cheese stuffed kulcha meal." },
      { name: "Aloo Butter Kulcha Meal", desc: "Crispy tandoori potato kulcha glazed with fresh butter." },
      { name: "Aloo Kulcha Meal", desc: "Traditional spiced potato stuffed tandoori bread meal." },
      { name: "Butter Kulcha Meal", desc: "Flaky tandoori layered kulcha served with spicy side gravies." },
      { name: "Plain Kulcha Meal", desc: "Classic soft tandoori kulcha with authentic Chole / Dal Makhani." }
    ]
  },
  {
    category: "Rice & Biryani",
    description: "Aromatic basmati rice preparations.",
    items: [
      { name: "Veg. Hyderabadi Biryani", desc: "Spiced layered rice with veggies cooked Hyderabadi dum style." },
      { name: "Veg. Biryani", desc: "Fragrant basmati rice cooked with fresh veggies and whole spices." },
      { name: "Veg. Pulav", desc: "Mildly spiced rice tossed with garden green peas and carrots." },
      { name: "Jeera Rice", desc: "Basmati rice tempered with cumin seeds and fresh ghee." },
      { name: "Steamed Rice", desc: "Fluffy long-grain aromatic basmati rice." }
    ]
  },
  {
    category: "Breads & Rotis",
    description: "Freshly baked Indian breads from the clay oven.",
    items: [
      { name: "Cheese Garlic Naan", desc: "Leavened naan bread stuffed with cheese and topped with garlic." },
      { name: "Cheese Naan", desc: "Soft naan stuffed with rich melted process cheese." },
      { name: "Garlic Naan", desc: "Tandoori naan brushed with minced garlic butter." },
      { name: "Paneer Kulcha", desc: "Clay-oven baked bread stuffed with spiced cottage cheese." },
      { name: "Lachha Paratha", desc: "Multi-layered whole wheat tandoori bread with ghee." },
      { name: "Tandoori Naan", desc: "Classic soft clay oven leavened flatbread." },
      { name: "Butter Tandoori Roti", desc: "Whole wheat tandoori roti glazed with fresh butter." },
      { name: "Tandoori Roti", desc: "Traditional whole wheat bread baked in tandoor." },
      { name: "Butter Chapati", desc: "Soft tawamade wheat chapati with butter." }
    ]
  },
  {
    category: "Refreshments & Sides",
    description: "Beverages, salads, papad, and savory accompaniments.",
    items: [
      { name: "Masala Butter Milk", desc: "Chilled spiced yogurt drink with roasted cumin and mint." },
      { name: "Butter Milk", desc: "Refreshing traditional salted buttermilk." },
      { name: "Pineapple Raita", desc: "Chilled sweetened yogurt mixed with juicy pineapple chunks." },
      { name: "Veg. Raita / Boondi Raita", desc: "Yogurt blended with diced veggies or crispy spiced boondi." },
      { name: "Masala Papad", desc: "Crispy fried papad topped with spicy chopped onion-tomato salad." },
      { name: "Fry / Roasted Papad", desc: "Classic thin lentil wafer roasted or fried." },
      { name: "French Fries / Cheese / Peri Peri", desc: "Crispy golden potato fries available in classic, cheese, or peri peri flavor." },
      { name: "Green Salad", desc: "Fresh sliced cucumber, tomato, onion, and carrot platter." }
    ]
  }
];

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOrderDropdownOpen, setIsOrderDropdownOpen] = useState(false);
  const [activeMenuTab, setActiveMenuTab] = useState("Starters & Tandoori");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToSection = (e, targetId) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    setIsOrderDropdownOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const getWhatsAppLink = (message) => {
    const encoded = encodeURIComponent(message);
    return `https://wa.me/${RESTAURANT_CONFIG.whatsappNumber}?text=${encoded}`;
  };

  return (
    <div className="min-h-screen bg-[#0B0E14] text-gray-100 font-sans selection:bg-[#D4AF37] selection:text-black">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-[#6A1B29] via-[#8B263E] to-[#6A1B29] text-amber-200 text-xs md:text-sm py-2 px-4 text-center font-medium border-b border-amber-500/20 tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
        <span>A Brand of <strong className="text-white font-semibold">{RESTAURANT_CONFIG.parentBrand}</strong> — Premium Vegetarian Dining Experience</span>
      </div>

      {/* Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0B0E14]/95 backdrop-blur-md border-b border-amber-500/10 transition-all duration-300 shadow-lg shadow-black/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            
            {/* Background-Free Logo Image */}
            <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="flex items-center group">
              <img 
                src="/images/logo.jpg" 
                alt="Lotus Premium Dining Logo" 
                className="h-12 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.3)]"
                onError={(e) => {
                  // Fallback image source if local path differs
                  e.target.onerror = null; 
                  e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100";
                }}
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 text-sm font-medium">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="text-gray-300 hover:text-amber-400 transition hover:scale-105 transform">Home</a>
              <a href="#unlimited" onClick={(e) => scrollToSection(e, 'unlimited')} className="text-amber-400 hover:text-amber-300 font-semibold transition flex items-center gap-1 hover:scale-105 transform">
                <Sparkles className="w-3.5 h-3.5" /> Unlimited Feast
              </a>
              <a href="#menu" onClick={(e) => scrollToSection(e, 'menu')} className="text-gray-300 hover:text-amber-400 transition hover:scale-105 transform">Our Menu</a>
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-300 hover:text-amber-400 transition hover:scale-105 transform">About Us</a>
              <a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="text-gray-300 hover:text-amber-400 transition hover:scale-105 transform">Gallery</a>
              <a href="#location" onClick={(e) => scrollToSection(e, 'location')} className="text-gray-300 hover:text-amber-400 transition hover:scale-105 transform">Location</a>
              <a href="#contact" onClick={(e) => scrollToSection(e, 'contact')} className="text-gray-300 hover:text-amber-400 transition hover:scale-105 transform">Contact</a>
            </nav>

            {/* Desktop Order Action Dropdown */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="relative">
                <button 
                  onClick={() => setIsOrderDropdownOpen(!isOrderDropdownOpen)}
                  className="px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-semibold text-sm shadow-md shadow-amber-500/20 flex items-center gap-2 transition duration-300 hover:shadow-amber-500/40 hover:scale-105 transform"
                >
                  <Utensils className="w-4 h-4" />
                  <span>Order Online</span>
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 ${isOrderDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {isOrderDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-52 bg-[#141923] border border-amber-500/30 rounded-xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200 backdrop-blur-lg">
                    <a 
                      href={RESTAURANT_CONFIG.zomatoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-200 hover:bg-amber-500/10 hover:text-amber-400 transition duration-150"
                    >
                      <span className="font-medium">Order on Zomato</span>
                      <ExternalLink className="w-3.5 h-3.5 text-red-400" />
                    </a>
                    <a 
                      href={RESTAURANT_CONFIG.swiggyUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 text-sm text-gray-200 hover:bg-amber-500/10 hover:text-amber-400 transition duration-150 border-t border-gray-800"
                    >
                      <span className="font-medium">Order on Swiggy</span>
                      <ExternalLink className="w-3.5 h-3.5 text-orange-400" />
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg text-gray-300 hover:text-amber-400 hover:bg-gray-800/50 transition"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0F141F] border-b border-amber-500/20 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top duration-300">
            <a 
              href="#home" 
              onClick={(e) => scrollToSection(e, 'home')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:bg-amber-500/10 hover:text-amber-400 transition"
            >
              Home
            </a>
            <a 
              href="#unlimited" 
              onClick={(e) => scrollToSection(e, 'unlimited')}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-amber-400 hover:bg-amber-500/10 transition"
            >
              Unlimited Feast
            </a>
            <a 
              href="#menu" 
              onClick={(e) => scrollToSection(e, 'menu')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:bg-amber-500/10 hover:text-amber-400 transition"
            >
              Our Menu
            </a>
            <a 
              href="#about" 
              onClick={(e) => scrollToSection(e, 'about')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:bg-amber-500/10 hover:text-amber-400 transition"
            >
              About Us
            </a>
            <a 
              href="#gallery" 
              onClick={(e) => scrollToSection(e, 'gallery')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:bg-amber-500/10 hover:text-amber-400 transition"
            >
              Gallery
            </a>
            <a 
              href="#location" 
              onClick={(e) => scrollToSection(e, 'location')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:bg-amber-500/10 hover:text-amber-400 transition"
            >
              Location
            </a>
            <a 
              href="#contact" 
              onClick={(e) => scrollToSection(e, 'contact')}
              className="block px-3 py-2.5 rounded-lg text-base font-medium text-gray-200 hover:bg-amber-500/10 hover:text-amber-400 transition"
            >
              Contact
            </a>
            
            <div className="pt-3 border-t border-gray-800 grid grid-cols-2 gap-2">
              <a 
                href={RESTAURANT_CONFIG.zomatoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 bg-red-600/20 text-red-300 border border-red-500/30 rounded-lg text-xs font-semibold hover:bg-red-600/30 transition"
              >
                <span>Order Zomato</span>
                <ExternalLink className="w-3 h-3" />
              </a>
              <a 
                href={RESTAURANT_CONFIG.swiggyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-3 px-3 bg-orange-600/20 text-orange-300 border border-orange-500/30 rounded-lg text-xs font-semibold hover:bg-orange-600/30 transition"
              >
                <span>Order Swiggy</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section (No Blinking Background Effect) */}
      <section id="home" className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-16 sm:py-24">
     <div className="absolute inset-0 z-0 overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/80 to-[#0B0E14]/60 z-10" />
  <img 
    src="/public/images/buffet-setup.jpeg" 
    alt="Lotus Premium Dining Interior Ambience" 
    className="w-full h-full object-cover object-center filter brightness-90 min-h-full"
    loading="eager"
  />
</div>

        <div className="relative z-20 max-w-5xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm shadow-md">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>A Brand of {RESTAURANT_CONFIG.parentBrand}</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-white mb-6 leading-tight drop-shadow-lg">
            An Unlimited Feast. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500">
              A Memory to Cherish.
            </span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg lg:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed drop-shadow-md">
            Discover authentic Tandoori Punjabi, Chinese, and Indian delicacies served in an elegant, air-conditioned premium dining atmosphere in Motera, Ahmedabad.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
            <a 
              href="#unlimited" 
              onClick={(e) => scrollToSection(e, 'unlimited')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-base shadow-lg shadow-amber-500/25 transition duration-300 hover:scale-105 transform flex items-center justify-center gap-2"
            >
              <span>Explore Unlimited Meal</span>
              <ChevronRight className="w-4 h-4" />
            </a>

            <a 
              href={RESTAURANT_CONFIG.mapsLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gray-900/80 hover:bg-gray-800 border border-amber-500/40 text-amber-300 font-semibold text-base backdrop-blur-sm transition duration-300 hover:scale-105 transform flex items-center justify-center gap-2"
            >
              <MapPin className="w-4 h-4 text-amber-400" />
              <span>Get Directions</span>
            </a>
          </div>

          <div className="mt-12 inline-flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-gray-400 border-t border-gray-800/80 pt-6">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Lunch: {RESTAURANT_CONFIG.hours.lunch}</span>
            </div>
            <span className="hidden sm:inline text-gray-600">•</span>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>Dinner: {RESTAURANT_CONFIG.hours.dinner}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Unlimited Dining Section */}
      <section id="unlimited" className="py-20 bg-gradient-to-b from-[#0B0E14] via-[#121722] to-[#0B0E14] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Signature Experience</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2 mb-4">
              Tandoori Punjabi & Chinese Unlimited Meal
            </h2>
            <p className="text-gray-400 text-base leading-relaxed">
              Indulge in an endless spread of live clay-oven tandoori starters, rich Punjabi gravies, sizzling Chinese dishes, fresh breads, desserts, and chilled beverages.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-6">
              
              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#1C2230] to-[#141923] border border-amber-500/30 shadow-xl relative overflow-hidden group hover:border-amber-500/50 transition duration-300 hover:-translate-y-1 transform">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase font-semibold tracking-wider text-amber-400">Afternoon Delight</span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">Unlimited Lunch</h3>
                    <p className="text-xs text-gray-400 mt-1">{RESTAURANT_CONFIG.hours.lunch}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                      {RESTAURANT_CONFIG.unlimitedPricing.lunch}
                    </span>
                    <span className="text-xs text-gray-400 block">/ Person</span>
                  </div>
                </div>
                <hr className="my-4 border-gray-800" />
                <ul className="text-xs sm:text-sm text-gray-300 space-y-2.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Unlimited Hot Soups & Starters</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Choice of Paneer & Veg Specialties</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Fresh Tandoori Rotis, Naan & Kulchas</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Noodles, Manchurian & Fried Rice</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Dal, Rice, Salad, Papad & Buttermilk</li>
                </ul>
              </div>

              <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#231720] via-[#1C2230] to-[#141923] border border-amber-500/40 shadow-xl relative overflow-hidden group hover:border-amber-500/60 transition duration-300 hover:-translate-y-1 transform">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs uppercase font-semibold tracking-wider text-amber-400">Evening Feast</span>
                    <h3 className="text-2xl font-serif font-bold text-white mt-1">Unlimited Dinner</h3>
                    <p className="text-xs text-gray-400 mt-1">{RESTAURANT_CONFIG.hours.dinner}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
                      {RESTAURANT_CONFIG.unlimitedPricing.dinner}
                    </span>
                    <span className="text-xs text-gray-400 block">/ Person</span>
                  </div>
                </div>
                <hr className="my-4 border-gray-800" />
                <ul className="text-xs sm:text-sm text-gray-300 space-y-2.5">
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Complete Multi-Course Dinner Buffet</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Premium Paneer & Cheese Delicacies</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Live Tandoori & Chinese Counters</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" /> Desserts, Gulab Jamun & Beverages</li>
                </ul>
              </div>

              <a 
                href={getWhatsAppLink("Hello Lotus Premium Dining, I would like to enquire about reserving a table for the Unlimited Dining Feast.")} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-sm shadow-lg shadow-green-600/20 flex items-center justify-center gap-2.5 transition duration-300 hover:scale-[1.02] transform"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Enquire / Book Table on WhatsApp</span>
              </a>

            </div>

            <div className="lg:col-span-7 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-md h-60 sm:h-72">
                  <img 
                    src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop" 
                    alt="Punjabi Gravies & Paneer Specialties" 
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>
                <div className="p-4 rounded-xl bg-[#141923] border border-gray-800">
                  <h4 className="text-sm font-semibold text-amber-300">Live Tandoori Starters</h4>
                  <p className="text-xs text-gray-400 mt-1">Paneer Tikka, Chaap, Kebabs baked fresh on hot clay ovens.</p>
                </div>
              </div>

              <div className="space-y-4 pt-6 sm:pt-8">
                <div className="p-4 rounded-xl bg-[#141923] border border-gray-800">
                  <h4 className="text-sm font-semibold text-amber-300">Chinese Specialities</h4>
                  <p className="text-xs text-gray-400 mt-1">Wok-tossed Hakka noodles, dry Manchurian & spicy Chilli Paneer.</p>
                </div>
                <div className="rounded-2xl overflow-hidden border border-gray-800 shadow-md h-60 sm:h-72">
                  <img 
                    src="/public/images/food-spread.jpg"  
                    alt="Unlimited Thali Spread" 
                    className="w-full h-full object-cover hover:scale-110 transition duration-500"
                  />
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-[#0B0E14] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">A La Carte & Delicacies</span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white mt-2 mb-4">
              Discover Our Pure Veg Menu
            </h2>
            <p className="text-gray-400 text-sm sm:text-base">
              Explore our wide variety of authentic preparations crafted with pure ingredients and rich traditional spices.
            </p>
          </div>

          <div className="w-full mb-10">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 max-w-5xl mx-auto px-2">
              {MENU_DATA.map((cat, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMenuTab(cat.category)}
                  className={`px-4 py-2 sm:px-5 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 transform hover:scale-105 ${
                    activeMenuTab === cat.category 
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600 text-black shadow-lg shadow-amber-500/25 ring-2 ring-amber-400/50' 
                      : 'bg-[#141923] text-gray-300 hover:bg-gray-800 border border-gray-800 hover:text-amber-300'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>
          </div>

          {MENU_DATA.filter(cat => cat.category === activeMenuTab).map((cat, idx) => (
            <div key={idx} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              
              <div className="mb-8 text-center bg-[#121722] p-5 rounded-2xl border border-amber-500/20 max-w-2xl mx-auto shadow-lg">
                <h3 className="text-xl font-serif font-bold text-amber-300">{cat.category}</h3>
                <p className="text-xs sm:text-sm text-gray-400 mt-1">{cat.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {cat.items.map((item, itemIdx) => (
                  <div 
                    key={itemIdx} 
                    className="p-5 sm:p-6 rounded-2xl bg-[#141923] border border-gray-800/90 hover:border-amber-500/40 transition duration-300 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 transform flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 className="text-base font-semibold text-white group-hover:text-amber-400 transition duration-200">
                          {item.name}
                        </h4>
                        <span className="w-4 h-4 rounded border border-green-500 p-0.5 flex items-center justify-center shrink-0 mt-0.5" title="Pure Vegetarian">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        </span>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))}

          <div className="mt-12 text-center text-xs text-gray-500 flex items-center justify-center gap-2">
            <Info className="w-4 h-4 text-amber-400 shrink-0" />
            <span>All food prepared using 100% pure vegetarian ingredients. Prices available upon order or inquiry.</span>
          </div>

        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-[#0B0E14] via-[#121722] to-[#0B0E14] border-t border-gray-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Our Heritage & Promise</span>
              <h2 className="text-3xl sm:text-5xl font-serif font-bold text-white leading-tight">
                Crafting Culinary Excellence in Motera
              </h2>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                <strong className="text-amber-300 font-medium">Lotus Premium Dining</strong> is built on a foundation of warm Gujarati hospitality and a passion for rich Indian flavors. We specialize in providing a luxurious, clean, and family-friendly dining environment.
              </p>
              <p className="text-gray-400 text-sm leading-relaxed">
                As a proud brand of <strong className="text-white">{RESTAURANT_CONFIG.parentBrand}</strong>, we inherit years of expertise in large-scale catering, outdoor events, and high-quality banqueting. Whether you visit us for an unlimited meal with friends or plan a private family celebration, we ensure every dish is crafted with fresh ingredients and authentic taste.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-800">
                <div>
                  <span className="text-2xl font-serif font-bold text-amber-400">100%</span>
                  <p className="text-xs text-gray-400 mt-0.5">Pure Vegetarian</p>
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold text-amber-400">Multi</span>
                  <p className="text-xs text-gray-400 mt-0.5">Cuisine Buffet</p>
                </div>
                <div>
                  <span className="text-2xl font-serif font-bold text-amber-400">Premium</span>
                  <p className="text-xs text-gray-400 mt-0.5">Family Ambience</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl relative z-10 group">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop" 
                  alt="Lotus Premium Dining Interior" 
                  className="w-full h-80 sm:h-96 object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Bulk Orders Section */}
      <section className="py-16 bg-gradient-to-r from-[#6A1B29]/50 via-[#121722] to-[#6A1B29]/50 border-y border-amber-500/20">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <Users className="w-10 h-10 text-amber-400 mx-auto mb-4" />
          <h2 className="text-3xl font-serif font-bold text-white mb-3">Planning a Celebration or Bulk Order?</h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-light">
            Backed by <strong className="text-amber-300">{RESTAURANT_CONFIG.parentBrand}</strong>, we cater to birthday parties, corporate gatherings, group dining, and outdoor bulk food orders with custom menu packages.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a 
              href={getWhatsAppLink("Hello Lotus Premium Dining, I would like to enquire about a Bulk Food Order / Group Booking.")}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition duration-300 hover:scale-105 transform"
            >
              <MessageSquare className="w-4 h-4 fill-current" />
              <span>Enquire Bulk Order on WhatsApp</span>
            </a>

            <a 
              href={`tel:${RESTAURANT_CONFIG.phones[0]}`}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gray-900 border border-gray-700 text-gray-200 font-semibold text-sm hover:bg-gray-800 flex items-center justify-center gap-2 transition duration-300 hover:scale-105 transform"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call Us: {RESTAURANT_CONFIG.phones[0]}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-[#0B0E14]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Visual Experience</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mt-2 mb-3">
              Ambience & Culinary Gallery
            </h2>
            <p className="text-gray-400 text-sm">
              Take a glimpse at our warm interior settings, copper buffet stations, and delicious food presentations.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: "Copper Buffet Setup", url: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=800&auto=format&fit=crop" },
              { title: "Unlimited Thali Spread", url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?q=80&w=800&auto=format&fit=crop" },
              { title: "Paneer Specialties", url: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=800&auto=format&fit=crop" },
              { title: "Dining Hall Ambience", url: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=800&auto=format&fit=crop" }
            ].map((img, idx) => (
              <div 
                key={idx} 
                onClick={() => setSelectedImage(img.url)}
                className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden cursor-pointer border border-gray-800 bg-gray-900"
              >
                <img 
                  src={img.url} 
                  alt={img.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <span className="text-xs font-medium text-amber-300">{img.title}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Gallery Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-gray-800 text-white hover:bg-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged gallery view" 
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl object-contain border border-amber-500/20"
          />
        </div>
      )}

      {/* Location & Contact Section */}
      <section id="location" className="py-20 bg-[#121722] border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            <div className="lg:col-span-5 space-y-8">
              <div>
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest">Find Us</span>
                <h2 className="text-3xl font-serif font-bold text-white mt-1 mb-4">Location & Contact</h2>
                <p className="text-gray-400 text-sm">
                  Visit us with family and friends or call us directly to inquire about table availability.
                </p>
              </div>

              <div className="space-y-4 text-sm">
                
                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#141923] border border-gray-800">
                  <MapPin className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-1">Restaurant Address</strong>
                    <a 
                      href={RESTAURANT_CONFIG.mapsLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-amber-400 transition leading-relaxed text-xs sm:text-sm block"
                    >
                      {RESTAURANT_CONFIG.address}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#141923] border border-gray-800">
                  <Phone className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-1">Phone Enquiries</strong>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs sm:text-sm">
                      {RESTAURANT_CONFIG.phones.map((phone, idx) => (
                        <a key={idx} href={`tel:${phone}`} className="text-gray-300 hover:text-amber-400 transition">
                          +91 {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3.5 p-4 rounded-xl bg-[#141923] border border-gray-800">
                  <Clock className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-1">Operating Hours</strong>
                    <p className="text-xs sm:text-sm text-gray-300">Lunch: {RESTAURANT_CONFIG.hours.lunch}</p>
                    <p className="text-xs sm:text-sm text-gray-300">Dinner: {RESTAURANT_CONFIG.hours.dinner}</p>
                  </div>
                </div>

              </div>

              <div className="pt-2">
                <a 
                  href={RESTAURANT_CONFIG.mapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-bold text-sm shadow-md flex items-center justify-center gap-2 transition duration-300 hover:scale-[1.02] transform"
                >
                  <MapPin className="w-4 h-4" />
                  <span>Open Maps Navigation</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="w-full h-full min-h-[380px] rounded-2xl overflow-hidden border border-amber-500/20 shadow-xl bg-gray-900">
                <iframe 
                  title="Lotus Premium Dining Location Map"
                  src={RESTAURANT_CONFIG.mapsEmbedUrl} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '380px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Footer with Instagram Integration */}
      <footer id="contact" className="bg-[#07090D] border-t border-gray-800/80 pt-16 pb-24 md:pb-12 text-gray-400 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-gray-800">
            
            <div className="md:col-span-5 space-y-4">
              <a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="inline-block">
                <img 
                  src="/images/logo.jpg" 
                  alt="Lotus Premium Dining Logo" 
                  className="h-12 w-auto object-contain"
                  onError={(e) => {
                    e.target.onerror = null; 
                    e.target.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=100";
                  }}
                />
              </a>
              <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
                Specializing in unlimited Tandoori Punjabi & Chinese dining experiences with authentic flavor and warm hospitality in Motera, Ahmedabad.
              </p>
              <p className="text-xs text-amber-400/90 font-medium">
                A Brand of {RESTAURANT_CONFIG.parentBrand}
              </p>

              {/* Instagram Button */}
              <div className="pt-2">
                <a 
                  href={RESTAURANT_CONFIG.instagramUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-amber-600/20 border border-pink-500/30 hover:border-pink-500/60 text-pink-300 text-xs font-semibold transition duration-300 hover:scale-105 transform"
                >
                  <Instagram className="w-4 h-4 text-pink-400" />
                  <span>Follow Us on Instagram</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-3 space-y-3">
              <h4 className="text-sm font-semibold text-white">Quick Navigation</h4>
              <ul className="space-y-2 text-xs">
                <li><a href="#home" onClick={(e) => scrollToSection(e, 'home')} className="hover:text-amber-400 transition">Home</a></li>
                <li><a href="#unlimited" onClick={(e) => scrollToSection(e, 'unlimited')} className="hover:text-amber-400 transition">Unlimited Dining</a></li>
                <li><a href="#menu" onClick={(e) => scrollToSection(e, 'menu')} className="hover:text-amber-400 transition">Our Menu</a></li>
                <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="hover:text-amber-400 transition">About Us</a></li>
                <li><a href="#gallery" onClick={(e) => scrollToSection(e, 'gallery')} className="hover:text-amber-400 transition">Gallery</a></li>
                <li><a href="#location" onClick={(e) => scrollToSection(e, 'location')} className="hover:text-amber-400 transition">Location</a></li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <h4 className="text-sm font-semibold text-white">Order Online</h4>
              <p className="text-xs text-gray-400">Enjoy Lotus Premium Dining delivered straight to your doorstep.</p>
              <div className="flex gap-3 pt-1">
                <a 
                  href={RESTAURANT_CONFIG.zomatoUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-red-600/10 border border-red-500/30 text-red-300 hover:bg-red-600/20 text-xs font-semibold transition"
                >
                  Zomato
                </a>
                <a 
                  href={RESTAURANT_CONFIG.swiggyUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-lg bg-orange-600/10 border border-orange-500/30 text-orange-300 hover:bg-orange-600/20 text-xs font-semibold transition"
                >
                  Swiggy
                </a>
              </div>
            </div>

          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-4">
            <p>© {new Date().getFullYear()} {RESTAURANT_CONFIG.name}. All rights reserved.</p>
            <p className="text-center sm:text-right">212, Grand Emporio, Motera - Gandhinagar Road, Ahmedabad</p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0F141F]/95 backdrop-blur-md border-t border-amber-500/20 p-2.5 z-40 grid grid-cols-3 gap-2">
        <a 
          href={`tel:${RESTAURANT_CONFIG.phones[0]}`}
          className="flex flex-col items-center justify-center py-2 bg-gray-800/90 rounded-xl text-amber-300 text-[10px] font-medium active:scale-95 transition"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span>Call Us</span>
        </a>
        <a 
          href={RESTAURANT_CONFIG.mapsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 bg-gray-800/90 rounded-xl text-amber-300 text-[10px] font-medium active:scale-95 transition"
        >
          <MapPin className="w-4 h-4 mb-0.5" />
          <span>Directions</span>
        </a>
        <a 
          href={getWhatsAppLink("Hello, I would like to book a table at Lotus Premium Dining.")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 bg-gradient-to-r from-amber-500 to-amber-600 rounded-xl text-black text-[10px] font-bold active:scale-95 transition"
        >
          <MessageSquare className="w-4 h-4 mb-0.5 fill-current" />
          <span>Enquire</span>
        </a>
      </div>

    </div>
  );
}