import type { Service } from '@/types';

export const services: Service[] = [
  // Event Management
  {
    id: 'wedding-events',
    title: 'Wedding Events',
    description: 'Creating magical wedding experiences tailored to your dream day. From intimate ceremonies to grand celebrations.',
    category: 'event-management',
    icon: '💍',
    features: ['Venue selection & decoration', 'Catering coordination', 'Photography & videography', 'Flower arrangements', 'Entertainment booking', 'Day-of coordination'],
    packages: [
      { name: 'Essential', price: 'ETB 25,000', features: ['Venue setup', 'Basic decoration', '1 coordinator', 'Up to 100 guests'] },
      { name: 'Premium', price: 'ETB 55,000', features: ['Full venue design', 'Floral arrangements', '2 coordinators', 'Up to 250 guests', 'Photography'], popular: true },
      { name: 'Luxury', price: 'ETB 120,000', features: ['Complete planning', 'Premium décor', '4 coordinators', 'Unlimited guests', 'Photo & video', 'Entertainment'] },
    ],
  },
  {
    id: 'corporate-events',
    title: 'Corporate Events',
    description: 'Professional corporate event management that reflects your brand values and leaves lasting impressions.',
    category: 'event-management',
    icon: '🏢',
    features: ['Conference planning', 'Team building activities', 'AV & tech setup', 'Catering services', 'Keynote logistics', 'Live streaming'],
    packages: [
      { name: 'Basic', price: 'ETB 15,000', features: ['Basic setup', 'AV equipment', 'Up to 50 attendees'] },
      { name: 'Professional', price: 'ETB 40,000', features: ['Full AV setup', 'Branding integration', 'Up to 200 attendees', 'Catering'], popular: true },
      { name: 'Enterprise', price: 'Custom', features: ['Full production', 'Live streaming', 'Unlimited attendees', 'Full branding'] },
    ],
  },
  {
    id: 'conferences',
    title: 'Conferences & Seminars',
    description: 'End-to-end conference management for impactful knowledge-sharing events.',
    category: 'event-management',
    icon: '🎤',
    features: ['Speaker coordination', 'Registration management', 'Session scheduling', 'Sponsorship packages', 'Post-event reports'],
    packages: [
      { name: 'Starter', price: 'ETB 20,000', features: ['Basic logistics', 'Up to 100 delegates'] },
      { name: 'Advanced', price: 'ETB 50,000', features: ['Full coordination', 'Up to 500 delegates', 'Branding'], popular: true },
    ],
  },
  {
    id: 'product-launches',
    title: 'Product Launches',
    description: 'Make your product debut unforgettable with strategic launch events that generate buzz and drive results.',
    category: 'event-management',
    icon: '🚀',
    features: ['Launch strategy', 'Media invitations', 'Branded environments', 'Influencer engagement', 'PR coordination', 'Social media coverage'],
    packages: [
      { name: 'Standard', price: 'ETB 30,000', features: ['Event setup', 'Media kit', 'Up to 150 guests'] },
      { name: 'Impact', price: 'ETB 75,000', features: ['Full production', 'Media outreach', 'Influencer package', 'Live coverage'], popular: true },
    ],
  },
  {
    id: 'exhibitions',
    title: 'Exhibitions & Trade Shows',
    description: 'Comprehensive exhibition management to maximize your brand exposure and business opportunities.',
    category: 'event-management',
    icon: '🎪',
    features: ['Booth design & setup', 'Logistics management', 'Staff coordination', 'Lead generation tools', 'Post-event analytics'],
    packages: [
      { name: 'Basic Booth', price: 'ETB 18,000', features: ['Standard booth', 'Basic setup', '2 staff'] },
      { name: 'Premium Booth', price: 'ETB 45,000', features: ['Custom design', 'Full setup', '4 staff', 'Digital displays'], popular: true },
    ],
  },

  // Printing Services
  {
    id: 'tshirt-printing',
    title: 'T-Shirt Printing',
    description: 'High-quality custom T-shirt printing using the latest techniques for vibrant, long-lasting results.',
    category: 'printing',
    icon: '👕',
    features: ['Screen printing', 'Digital printing', 'Embroidery', 'All fabric types', 'Bulk orders', 'Fast turnaround'],
    packages: [
      { name: 'Small Batch', price: 'ETB 150/pc', features: ['10–50 pieces', 'Single color', 'Standard delivery'] },
      { name: 'Bulk Order', price: 'ETB 100/pc', features: ['50–200 pieces', 'Full color', 'Priority delivery'], popular: true },
      { name: 'Corporate', price: 'ETB 80/pc', features: ['200+ pieces', 'Custom design', 'Rush delivery', 'Quality guarantee'] },
    ],
  },
  {
    id: 'logo-printing',
    title: 'Logo Printing',
    description: 'Professional logo printing on various materials to elevate your brand presence.',
    category: 'printing',
    icon: '🎨',
    features: ['High-resolution output', 'Various materials', 'Color accuracy', 'Multiple sizes', 'Bulk discounts'],
    packages: [
      { name: 'Basic', price: 'ETB 500', features: ['A4 print', 'Standard materials', '5 copies'] },
      { name: 'Professional', price: 'ETB 1,500', features: ['Large format', 'Premium materials', '20 copies'], popular: true },
      { name: 'Brand Kit', price: 'ETB 5,000', features: ['All formats', 'Premium materials', '100 copies', 'Brand guidelines'] },
    ],
  },
  {
    id: 'banner-printing',
    title: 'Banner Printing',
    description: 'Eye-catching banners and signage that command attention at any event or location.',
    category: 'printing',
    icon: '🎌',
    features: ['Indoor & outdoor', 'Vinyl & fabric', 'Any size', 'UV resistant ink', 'Fast turnaround', 'Finishing options'],
    packages: [
      { name: 'Standard', price: 'ETB 800/m²', features: ['Standard vinyl', 'Indoor use', '3–5 days'] },
      { name: 'Premium', price: 'ETB 1,200/m²', features: ['Premium material', 'Indoor/outdoor', '1–2 days', 'UV protection'], popular: true },
      { name: 'Rush', price: 'ETB 1,800/m²', features: ['Best material', 'Any environment', 'Same day', 'Full finishing'] },
    ],
  },
  {
    id: 'promotional-materials',
    title: 'Promotional Materials',
    description: 'Complete range of branded promotional items to keep your brand top of mind.',
    category: 'printing',
    icon: '📦',
    features: ['Pens & notebooks', 'Mugs & bottles', 'Bags & totes', 'Stickers & labels', 'Branded packaging', 'Custom designs'],
    packages: [
      { name: 'Starter Pack', price: 'ETB 5,000', features: ['100 pcs mix', 'Logo printing', 'Standard items'] },
      { name: 'Business Pack', price: 'ETB 15,000', features: ['300 pcs mix', 'Full branding', 'Premium items'], popular: true },
      { name: 'Event Pack', price: 'ETB 35,000', features: ['1000 pcs', 'Custom design', 'Premium + custom'] },
    ],
  },
  {
    id: 'business-cards',
    title: 'Business Cards',
    description: 'Premium business cards that make a lasting first impression with every handshake.',
    category: 'printing',
    icon: '💼',
    features: ['Multiple finishes', 'Spot UV', 'Embossing', 'Foil stamping', 'Rounded corners', 'Standard & custom sizes'],
    packages: [
      { name: 'Standard', price: 'ETB 300/100pcs', features: ['Standard paper', 'Full color', '100 cards'] },
      { name: 'Premium', price: 'ETB 700/100pcs', features: ['Thick paper', 'Matte/gloss', '100 cards'], popular: true },
      { name: 'Luxury', price: 'ETB 1,500/100pcs', features: ['Premium stock', 'Foil/emboss', '100 cards', 'Custom shape'] },
    ],
  },

  // Advertising Services
  {
    id: 'brand-promotion',
    title: 'Brand Promotion',
    description: 'Strategic brand promotion campaigns that build awareness and drive engagement across all channels.',
    category: 'advertising',
    icon: '📣',
    features: ['Brand strategy', 'Campaign planning', 'Multi-channel execution', 'Influencer marketing', 'Analytics & reporting'],
    packages: [
      { name: 'Launch', price: 'ETB 20,000/mo', features: ['Strategy', '2 channels', 'Monthly report'] },
      { name: 'Growth', price: 'ETB 45,000/mo', features: ['Full strategy', '4 channels', 'Weekly reports', 'Influencers'], popular: true },
      { name: 'Scale', price: 'ETB 90,000/mo', features: ['Dedicated team', 'All channels', 'Daily management', 'Full analytics'] },
    ],
  },
  {
    id: 'digital-advertising',
    title: 'Digital Advertising',
    description: 'Data-driven digital advertising that targets the right audience at the right time.',
    category: 'advertising',
    icon: '💻',
    features: ['Social media ads', 'Google ads', 'Display advertising', 'Retargeting', 'A/B testing', 'Conversion tracking'],
    packages: [
      { name: 'Starter', price: 'ETB 10,000/mo', features: ['Social ads', 'Monthly budget tracking', 'Basic reporting'] },
      { name: 'Professional', price: 'ETB 25,000/mo', features: ['Social + Google', 'Retargeting', 'Weekly reports'], popular: true },
      { name: 'Full Stack', price: 'ETB 60,000/mo', features: ['All platforms', 'Advanced targeting', 'Daily optimization'] },
    ],
  },
  {
    id: 'outdoor-advertising',
    title: 'Outdoor Advertising',
    description: 'High-impact outdoor advertising solutions that put your brand in front of thousands daily.',
    category: 'advertising',
    icon: '🏙️',
    features: ['Billboard placement', 'Street signage', 'Vehicle wraps', 'Transit advertising', 'Location strategy'],
    packages: [
      { name: 'Local', price: 'ETB 15,000/mo', features: ['2 locations', 'Standard billboards', 'Monthly rotation'] },
      { name: 'City-Wide', price: 'ETB 40,000/mo', features: ['5 locations', 'Premium spots', 'Design included'], popular: true },
      { name: 'Domination', price: 'Custom', features: ['Unlimited', 'Premium locations', 'Full campaign', 'Analytics'] },
    ],
  },
  {
    id: 'marketing-campaigns',
    title: 'Marketing Campaigns',
    description: 'Integrated marketing campaigns that tell your brand story across every touchpoint.',
    category: 'advertising',
    icon: '📊',
    features: ['Campaign strategy', 'Creative production', 'Media buying', 'Performance tracking', 'ROI reporting'],
    packages: [
      { name: 'Basic Campaign', price: 'ETB 30,000', features: ['Strategy', 'Creative assets', '1-month run'] },
      { name: 'Full Campaign', price: 'ETB 80,000', features: ['Full production', 'Multi-channel', '3-month run'], popular: true },
      { name: 'Annual Plan', price: 'ETB 250,000', features: ['Yearly strategy', 'Full team', '12-month management', 'Quarterly reviews'] },
    ],
  },
];
