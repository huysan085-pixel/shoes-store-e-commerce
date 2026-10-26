/* File: src/app/data/products.data.ts */
import { Category, Product, ProductReview } from '../models/product.model';

const SIZES_FULL = ['6', '6.5', '7', '7.5', '8', '8.5', '9', '9.5', '10', '10.5', '11', '12'];
const SIZES_STANDARD = ['6', '7', '8', '8.5', '9', '9.5', '10', '11', '12'];

const REVIEWS_POOL: Omit<ProductReview, 'date'>[] = [
  { author: 'Sokha Dara', rating: 5, title: 'Super comfortable all day', body: 'Wore them around Phnom Penh from morning till night. No break-in required.' },
  { author: 'Kevin T.', rating: 5, title: 'Clean silhouette & premium leather', body: 'The leather feels soft and holds up well. Fits true to size.' },
  { author: 'Chanthy P.', rating: 4, title: 'Great everyday sneaker', body: 'Goes with almost everything from denim to shorts. Really happy with the quality.' },
  { author: 'Daniel R.', rating: 5, title: 'Iconic shape', body: 'Arrived in great condition. Cushioning feels solid for daily walks.' },
  { author: 'Sopheap M.', rating: 4, title: 'Classic look', body: 'Clean profile. I recommend going half a size up if you wear thick socks.' }
];

function buildReviews(seedIndex: number): ProductReview[] {
  return [0, 1, 2].map((offset, i) => ({
    ...REVIEWS_POOL[(seedIndex + offset) % REVIEWS_POOL.length],
    date: `2026-0${(seedIndex % 4) + 1}-${12 + i * 4}`
  }));
}

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'nike-air-force-1-07',
    sku: 'CW2288-111',
    name: "Nike Air Force 1 '07",
    brand: 'Nike',
    category: 'Lifestyle',
    price: 115,
    originalPrice: 130,
    description: "The radiance lives on in the Nike Air Force 1 '07, the b-ball icon that puts a fresh spin on what you know best: crisp leather, bold details, and the perfect amount of flash to make you shine. Padded low-cut collar looks sleek and feels comfortable.",
    highlights: [
      'Stitched leather overlays for heritage style and durability',
      'Nike Air cushioning designed originally for performance hoops',
      'Low-cut padded collar for an engineered ankle fit',
      'Non-marking rubber outsole with pivot circles'
    ],
    specs: [
      { label: 'Upper', value: 'Full-Grain Leather' },
      { label: 'Midsole', value: 'Encapsulated Air-Sole Unit' },
      { label: 'Outsole', value: 'Solid Rubber Cupsole' },
      { label: 'Fit', value: 'True to size' }
    ],
    image: '/images/shoes/nike-air-force-1-07.png',
    images: ['/images/shoes/nike-air-force-1-07.png'],
    sizes: SIZES_FULL,
    colors: [
      { name: 'Triple White', hex: '#FFFFFF', image: '/images/shoes/nike-air-force-1-07.png' }
    ],
    stock: 18,
    rating: 4.8,
    reviewCount: 342,
    featured: true,
    newArrival: false,
    createdAt: '2026-01-10',
    reviews: buildReviews(0)
  },
  {
    id: 2,
    slug: 'nike-dunk-low',
    sku: 'DD1391-100',
    name: 'Nike Dunk Low',
    brand: 'Nike',
    category: 'Lifestyle',
    price: 115,
    originalPrice: 125,
    description: 'Created for the hardwood but taken to the streets, the 80s icon returns with clean monochrome color blocking and padded low-cut collar for all-day comfort.',
    highlights: [
      'Crisp leather upper that softens and ages to vintage perfection',
      'Foam midsole offers lightweight, responsive cushioning',
      'Rubber cupsole with classic hoops pivot circle for traction'
    ],
    specs: [
      { label: 'Upper', value: 'Smooth Leather' },
      { label: 'Midsole', value: 'Resilient EVA Foam' },
      { label: 'Outsole', value: 'Circular Traction Rubber' },
      { label: 'Fit', value: 'True to size' }
    ],
    image: '/images/shoes/nike-dunk-low.png',
    images: ['/images/shoes/nike-dunk-low.png'],
    sizes: SIZES_FULL,
    colors: [
      { name: 'Black / White (Panda)', hex: '#1C1C1E', image: '/images/shoes/nike-dunk-low.png' }
    ],
    stock: 12,
    rating: 4.7,
    reviewCount: 289,
    featured: true,
    newArrival: true,
    createdAt: '2026-02-15',
    reviews: buildReviews(1)
  },
  {
    id: 3,
    slug: 'nike-air-max-90',
    sku: 'CN8490-100',
    name: 'Nike Air Max 90',
    brand: 'Nike',
    category: 'Running',
    price: 130,
    originalPrice: 145,
    description: 'Nothing as fly, nothing as comfortable, nothing as proven. The Nike Air Max 90 stays true to its OG running roots with iconic Waffle sole and visible Max Air cushioning.',
    highlights: [
      'Visible Max Air cushioning in the heel',
      'Stitched leather and textile overlays for durability',
      'Waffle rubber outsole delivering traction'
    ],
    specs: [
      { label: 'Upper', value: 'Leather and Mesh' },
      { label: 'Cushioning', value: 'Max Air Unit' },
      { label: 'Outsole', value: 'Waffle Rubber' },
      { label: 'Fit', value: 'True to size' }
    ],
    image: '/images/shoes/nike-air-max-90.png',
    images: ['/images/shoes/nike-air-max-90.png'],
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'White / Clear Jade', hex: '#FFFFFF', image: '/images/shoes/nike-air-max-90.png' }
    ],
    stock: 9,
    rating: 4.9,
    reviewCount: 412,
    featured: true,
    newArrival: false,
    createdAt: '2026-01-05',
    reviews: buildReviews(2)
  },
  {
    id: 4,
    slug: 'adidas-samba-og',
    sku: 'B75807',
    name: 'Adidas Samba OG',
    brand: 'Adidas',
    category: 'Lifestyle',
    price: 100,
    description: 'Born on the indoor pitch and refined for street culture. Soft chalk-tone leather with rich suede T-toe and classic low-profile gum cupsole.',
    highlights: [
      'Soft full-grain leather upper with suede T-toe',
      'Contrasting 3-Stripes and metallic gold foil SAMBA branding',
      'Low-profile gum rubber outsole'
    ],
    specs: [
      { label: 'Upper', value: 'Leather & Suede' },
      { label: 'Lining', value: 'Soft Synthetic' },
      { label: 'Outsole', value: 'Gum Rubber' },
      { label: 'Fit', value: 'True to size' }
    ],
    image: '/images/shoes/adidas-samba-og.png',
    images: ['/images/shoes/adidas-samba-og.png'],
    sizes: SIZES_FULL,
    colors: [
      { name: 'Putty Grey / Chalk White', hex: '#E2DDD9', image: '/images/shoes/adidas-samba-og.png' }
    ],
    stock: 25,
    rating: 4.9,
    reviewCount: 680,
    featured: true,
    newArrival: true,
    createdAt: '2026-03-01',
    reviews: buildReviews(3)
  },
  {
    id: 5,
    slug: 'adidas-ultraboost',
    sku: 'HQ6351',
    name: 'Adidas Ultraboost',
    brand: 'Adidas',
    category: 'Running',
    price: 170,
    originalPrice: 200,
    description: 'The stealth Triple Black running classic. Engineered with high-energy return BOOST capsules, supportive midfoot cage, and a foot-hugging PRIMEKNIT upper.',
    highlights: [
      'Full-length Black BOOST midsole for springy steps',
      'PRIMEKNIT textile upper adapts to your foot shape',
      'Continental™ Rubber outsole for superior grip'
    ],
    specs: [
      { label: 'Upper', value: 'PRIMEKNIT Textile' },
      { label: 'Midsole', value: 'BOOST Foam Capsules' },
      { label: 'Drop', value: '10 mm' },
      { label: 'Fit', value: 'Snug, sock-like fit' }
    ],
    image: '/images/shoes/adidas-ultraboost.png',
    images: ['/images/shoes/adidas-ultraboost.png'],
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Triple Black', hex: '#111827', image: '/images/shoes/adidas-ultraboost.png' }
    ],
    stock: 11,
    rating: 4.8,
    reviewCount: 529,
    featured: true,
    newArrival: false,
    createdAt: '2026-03-08',
    reviews: buildReviews(4)
  },
  {
    id: 6,
    slug: 'adidas-campus-00s',
    sku: 'HQ8708',
    name: 'Adidas Campus 00s',
    brand: 'Adidas',
    category: 'Lifestyle',
    price: 100,
    description: 'Puffy proportions and vintage skateboarding attitude. Features plush black suede, extra-wide laces, and bold contrast 3-Stripes on a cream cupsole.',
    highlights: [
      'Padded collar and puffy tongue with Trefoil branding',
      'Premium black suede upper',
      'Chunky white cotton laces'
    ],
    specs: [
      { label: 'Upper', value: 'Brushed Suede' },
      { label: 'Laces', value: 'Oversized Cotton' },
      { label: 'Outsole', value: 'Gum & Rubber Cupsole' },
      { label: 'Fit', value: 'True to size' }
    ],
    image: '/images/shoes/adidas-campus-00s.png',
    images: ['/images/shoes/adidas-campus-00s.png'],
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Core Black / White', hex: '#1F2937', image: '/images/shoes/adidas-campus-00s.png' }
    ],
    stock: 7,
    rating: 4.5,
    reviewCount: 156,
    featured: false,
    newArrival: true,
    createdAt: '2026-10-05',
    reviews: buildReviews(0)
  },
  {
    id: 7,
    slug: 'new-balance-530',
    sku: 'MR530SG',
    name: 'New Balance 530',
    brand: 'New Balance',
    category: 'Training',
    price: 105,
    originalPrice: 120,
    description: 'A throwback to 90s running aesthetics. Breathable white mesh upper with metallic silver curves and comfortable ABZORB heel cushioning.',
    highlights: [
      'ABZORB midsole absorbs impact with compression resistance',
      'Breathable mesh base with synthetic overlays',
      'Heritage turn-of-the-millennium runner aesthetic'
    ],
    specs: [
      { label: 'Upper', value: 'Mesh & Synthetic' },
      { label: 'Midsole', value: 'ABZORB Cushioning' },
      { label: 'Outsole', value: 'Segmented Rubber' },
      { label: 'Fit', value: 'True to size' }
    ],
    image: '/images/shoes/new-balance-530.png',
    images: ['/images/shoes/new-balance-530.png'],
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'White / Silver Metallic', hex: '#E5E7EB', image: '/images/shoes/new-balance-530.png' }
    ],
    stock: 16,
    rating: 4.6,
    reviewCount: 274,
    featured: false,
    newArrival: false,
    createdAt: '2026-04-14',
    reviews: buildReviews(1)
  },
  {
    id: 8,
    slug: 'new-balance-9060',
    sku: 'U9060ECA',
    name: 'New Balance 9060',
    brand: 'New Balance',
    category: 'Lifestyle',
    price: 150,
    description: 'The 9060 reinterprets elements from the iconic 99X series with a futuristic Y2K tech aesthetic, sculpted wavy midsole, and dual-density cushioning.',
    highlights: [
      'Dual-density midsole with ABZORB and SBS cushioning',
      'Sculpted pod midsole with exaggerated wavy sway bars',
      'Translucent CR device on the heel counter'
    ],
    specs: [
      { label: 'Upper', value: 'Suede & Open Mesh' },
      { label: 'Midsole', value: 'ABZORB & SBS' },
      { label: 'Outsole', value: 'Diamond Pattern Rubber' },
      { label: 'Fit', value: 'True to size' }
    ],
    image: '/images/shoes/new-balance-9060.png',
    images: ['/images/shoes/new-balance-9060.png'],
    sizes: SIZES_FULL,
    colors: [
      { name: 'Sea Salt / Teal', hex: '#F3F4F6', image: '/images/shoes/new-balance-9060.png' }
    ],
    stock: 12,
    rating: 4.9,
    reviewCount: 361,
    featured: false,
    newArrival: true,
    createdAt: '2026-10-12',
    reviews: buildReviews(2)
  },
  {
    id: 9,
    slug: 'asics-gel-kayano-14',
    sku: '1201A019-108',
    name: 'ASICS GEL-Kayano 14',
    brand: 'ASICS',
    category: 'Running',
    price: 160,
    description: 'Late-2000s technical velocity revived. Metallic layered mesh styling, visible GEL technology cushioning pods, and TRUSSTIC arch support.',
    highlights: [
      'Original 2008 tooling and aesthetic',
      'Rearfoot and forefoot GEL technology cushioning',
      'TRUSSTIC support system for torsional stability'
    ],
    specs: [
      { label: 'Upper', value: 'Layered Leather & Mesh' },
      { label: 'Cushioning', value: 'GEL Technology' },
      { label: 'Support', value: 'TRUSSTIC Bridge System' },
      { label: 'Fit', value: 'Snug performance fit' }
    ],
    image: '/images/shoes/asics-gel-kayano-14.png',
    images: ['/images/shoes/asics-gel-kayano-14.png'],
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Metallic Silver / Black', hex: '#B0B5B3', image: '/images/shoes/asics-gel-kayano-14.png' }
    ],
    stock: 0,
    rating: 4.7,
    reviewCount: 143,
    featured: false,
    newArrival: false,
    createdAt: '2026-05-30',
    reviews: buildReviews(3)
  },
  {
    id: 10,
    slug: 'converse-chuck-70',
    sku: '162058C',
    name: 'Converse Chuck 70 Vintage Canvas',
    brand: 'Converse',
    category: 'Lifestyle',
    price: 90,
    description: 'The high-top basketball icon, upgraded with heavy 12oz organic canvas, winged tongue stitching, and an ultra-cushioned OrthoLite insole.',
    highlights: [
      'Heavyweight 12oz organic canvas for structure and durability',
      'Glossy egret-colored vulcanized midsole with vintage license plate',
      'OrthoLite cushioned footbed for all-day arch comfort'
    ],
    specs: [
      { label: 'Upper', value: '12oz Organic Canvas' },
      { label: 'Insole', value: 'OrthoLite Foam' },
      { label: 'Outsole', value: 'Vulcanized Diamond Rubber' },
      { label: 'Fit', value: 'Runs half a size large' }
    ],
    image: '/images/shoes/converse-chuck-70.png',
    images: ['/images/shoes/converse-chuck-70.png'],
    sizes: SIZES_STANDARD,
    colors: [
      { name: 'Black / Egret', hex: '#111827', image: '/images/shoes/converse-chuck-70.png' }
    ],
    stock: 20,
    rating: 4.8,
    reviewCount: 618,
    featured: true,
    newArrival: false,
    createdAt: '2026-01-25',
    reviews: buildReviews(4)
  }
];

export const CATEGORIES: Category[] = ['Running', 'Lifestyle', 'Basketball', 'Training'];
export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))].sort();

/* Universal fallback if an image file is missing */
export const PLACEHOLDER_IMAGE = '/images/shoes/nike-air-force-1-07.png';