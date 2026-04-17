// Mock data for Average Joe Mountaineering

export const summits = {
  past: [
    {
      id: 'hood',
      name: 'Mt. Hood',
      elevation: 11249,
      location: 'Oregon, USA',
      date: '2024-08-15',
      difficulty: 'Intermediate',
      story: 'My first major summit! The climb up Mt. Hood tested my endurance and willpower. Starting at 1 AM, we navigated the Pearly Gates in the dark, using headlamps and crampons. The sunrise at the summit was absolutely breathtaking - watching the shadow of the mountain stretch across the landscape below. The wind was fierce at the top, but the sense of accomplishment was worth every frozen moment.',
      image: 'https://images.unsplash.com/photo-1675699584693-3aaac3a25a2e?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [45.3736, -121.6960],
      photos: [
        'https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?crop=entropy&cs=srgb&fm=jpg&q=85',
        'https://images.unsplash.com/photo-1522506209496-4536d9020ec4?crop=entropy&cs=srgb&fm=jpg&q=85',
        'https://images.unsplash.com/photo-1721876726170-6ae73921f55d?crop=entropy&cs=srgb&fm=jpg&q=85'
      ]
    },
    {
      id: 'washington',
      name: 'Mt. Washington',
      elevation: 6288,
      location: 'New Hampshire, USA',
      date: '2024-09-22',
      difficulty: 'Moderate',
      story: 'Known for having the worst weather in the world, Mt. Washington lived up to its reputation. We faced 60mph winds and near-freezing temperatures even in September. The Tuckerman Ravine trail was challenging but rewarding. The alpine environment and weather observatory at the summit made this climb unique and educational.',
      image: 'https://images.unsplash.com/photo-1605461040584-801d790d9127?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [44.2706, -71.3033],
      photos: [
        'https://images.unsplash.com/photo-1639938794001-bcc9e3770fd4?crop=entropy&cs=srgb&fm=jpg&q=85',
        'https://images.unsplash.com/photo-1501450753566-4977b58843ef?crop=entropy&cs=srgb&fm=jpg&q=85',
        'https://images.unsplash.com/photo-1721876726195-7c3a56871eea?crop=entropy&cs=srgb&fm=jpg&q=85'
      ]
    }
  ],
  planned: [
    {
      id: 'shasta',
      name: 'Mt. Shasta',
      elevation: 14179,
      location: 'California, USA',
      date: '2025-07-15',
      difficulty: 'Intermediate',
      description: 'A dormant volcano and iconic California peak. Planning to climb via Avalanche Gulch route.',
      image: 'https://images.unsplash.com/photo-1762662313299-9cc7d3e297be?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [41.4093, -122.1949]
    },
    {
      id: 'baker',
      name: 'Mt. Baker',
      elevation: 10781,
      location: 'Washington, USA',
      date: '2025-09-10',
      difficulty: 'Intermediate',
      description: 'Heavily glaciated volcano with stunning ice formations. Targeting the Coleman-Deming route.',
      image: 'https://images.unsplash.com/photo-1605461041017-6233e64d308e?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [48.7767, -121.8144]
    },
    {
      id: 'rainier',
      name: 'Mt. Rainier',
      elevation: 14411,
      location: 'Washington, USA',
      date: '2027-08-01',
      difficulty: 'Advanced',
      description: 'The ultimate Pacific Northwest challenge. Technical glaciated climb with significant elevation gain.',
      image: 'https://images.unsplash.com/photo-1650275536755-c3f78da9e0a8?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [46.8523, -121.7603]
    },
    {
      id: 'huayna',
      name: 'Huayna Potosí',
      elevation: 19974,
      location: 'Bolivia',
      date: '2027-01-15',
      difficulty: 'Advanced',
      description: 'Part of the Bolivian Triple Crown. High altitude acclimatization challenge.',
      image: 'https://images.unsplash.com/photo-1575143367176-df82a0d4ff48?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [-16.2667, -68.1500]
    },
    {
      id: 'illimani',
      name: 'Illimani',
      elevation: 21122,
      location: 'Bolivia',
      date: '2027-01-22',
      difficulty: 'Advanced',
      description: 'Second peak of the Bolivian Triple Crown. Technical climbing at extreme altitude.',
      image: 'https://images.unsplash.com/photo-1762662313299-9cc7d3e297be?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [-16.6333, -67.7833]
    },
    {
      id: 'alpamayo',
      name: 'Pequeño Alpamayo',
      elevation: 17749,
      location: 'Bolivia',
      date: '2027-01-29',
      difficulty: 'Advanced',
      description: 'Final peak of the Bolivian Triple Crown. Stunning ice and rock climbing.',
      image: 'https://images.unsplash.com/photo-1605461040584-801d790d9127?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [-16.0167, -68.3500]
    }
  ],
  dreams: [
    {
      id: 'anapurna',
      name: 'Annapurna I',
      elevation: 26545,
      location: 'Nepal',
      difficulty: 'Expert',
      description: 'The ultimate goal. One of the most dangerous 8000m peaks with the highest fatality rate.',
      image: 'https://images.unsplash.com/photo-1650275536755-c3f78da9e0a8?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [28.5960, 83.8203]
    },
    {
      id: 'aconcagua',
      name: 'Aconcagua',
      elevation: 22837,
      location: 'Argentina',
      difficulty: 'Advanced',
      description: 'Highest peak in South America. Non-technical but extreme altitude challenge.',
      image: 'https://images.unsplash.com/photo-1575143367176-df82a0d4ff48?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [-32.6532, -70.0109]
    },
    {
      id: 'k2',
      name: 'K2',
      elevation: 28251,
      location: 'Pakistan/China',
      difficulty: 'Expert',
      description: 'The Savage Mountain. Second highest peak in the world and arguably the most difficult.',
      image: 'https://images.unsplash.com/photo-1762662313299-9cc7d3e297be?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [35.8825, 76.5133]
    },
    {
      id: 'nanga-parbat',
      name: 'Nanga Parbat',
      elevation: 26660,
      location: 'Pakistan',
      difficulty: 'Expert',
      description: 'The Killer Mountain. Ninth highest peak with one of the most dramatic vertical reliefs.',
      image: 'https://images.unsplash.com/photo-1605461041017-6233e64d308e?crop=entropy&cs=srgb&fm=jpg&q=85',
      coords: [35.2372, 74.5894]
    }
  ]
};

export const gearReviews = [
  {
    id: 1,
    name: 'Black Diamond Raven Ice Axe',
    category: 'Climbing Gear',
    rating: 9,
    review: 'Solid, reliable ice axe perfect for general mountaineering. Used it on both Hood and Washington with excellent performance. The pick holds well in various snow conditions.',
    price: 89.95,
    image: 'https://images.unsplash.com/photo-1772428278806-8513a75f5954?crop=entropy&cs=srgb&fm=jpg&q=85',
    pros: ['Durable construction', 'Great grip', 'Perfect length'],
    cons: ['Slightly heavy for technical climbing']
  },
  {
    id: 2,
    name: 'La Sportiva Nepal Evo GTX',
    category: 'Footwear',
    rating: 10,
    review: 'Best mountaineering boots I\'ve ever owned. Waterproof, warm, and compatible with automatic crampons. Broke in quickly and no blisters even on long approaches.',
    price: 599.00,
    image: 'https://images.unsplash.com/photo-1501450753566-4977b58843ef?crop=entropy&cs=srgb&fm=jpg&q=85',
    pros: ['Excellent warmth', 'Great ankle support', 'Waterproof'],
    cons: ['Expensive', 'Heavy for backpacking']
  },
  {
    id: 3,
    name: 'Petzl Meteor Helmet',
    category: 'Safety',
    rating: 8,
    review: 'Lightweight and comfortable for all-day wear. Good ventilation. Provides solid protection without feeling bulky.',
    price: 89.95,
    image: 'https://images.unsplash.com/photo-1721876726195-7c3a56871eea?crop=entropy&cs=srgb&fm=jpg&q=85',
    pros: ['Lightweight', 'Comfortable', 'Good ventilation'],
    cons: ['Adjustment system could be better']
  },
  {
    id: 4,
    name: 'Outdoor Research Alti Mitts',
    category: 'Clothing',
    rating: 9,
    review: 'Kept my hands warm in brutal conditions on Mt. Washington. Waterproof shell with removable liner is perfect for varying conditions.',
    price: 149.00,
    image: 'https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?crop=entropy&cs=srgb&fm=jpg&q=85',
    pros: ['Very warm', 'Waterproof', 'Removable liner'],
    cons: ['Bulky for technical climbing']
  },
  {
    id: 5,
    name: 'MSR PocketRocket Stove',
    category: 'Camping',
    rating: 7,
    review: 'Compact and lightweight. Boils water quickly at lower elevations but struggled above 10,000 feet. Good for weekend trips.',
    price: 44.95,
    image: 'https://images.unsplash.com/photo-1522506209496-4536d9020ec4?crop=entropy&cs=srgb&fm=jpg&q=85',
    pros: ['Lightweight', 'Compact', 'Fast boil time'],
    cons: ['Poor high-altitude performance', 'Unstable with large pots']
  },
  {
    id: 6,
    name: 'Arc\'teryx Alpha SV Jacket',
    category: 'Clothing',
    rating: 10,
    review: 'Worth every penny. This jacket has saved me in some gnarly weather. Bombproof Gore-Tex, perfect fit, and features exactly where you need them.',
    price: 825.00,
    image: 'https://images.unsplash.com/photo-1639938794001-bcc9e3770fd4?crop=entropy&cs=srgb&fm=jpg&q=85',
    pros: ['Completely waterproof', 'Durable', 'Perfect fit'],
    cons: ['Very expensive', 'Overkill for casual hiking']
  }
];

export const galleryPhotos = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1650275536755-c3f78da9e0a8?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Mt. Hood',
    caption: 'Sunrise at 11,249 feet'
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1534685785745-60a2cea0ec34?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Mt. Hood',
    caption: 'Summit victory above the clouds'
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1522506209496-4536d9020ec4?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Mt. Hood',
    caption: 'Golden hour descent'
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1721876726170-6ae73921f55d?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Mt. Hood',
    caption: 'Contemplating the climb ahead'
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1639938794001-bcc9e3770fd4?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Mt. Washington',
    caption: 'Victory despite 60mph winds'
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1501450753566-4977b58843ef?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Mt. Washington',
    caption: 'Rock climbing on the approach'
  },
  {
    id: 7,
    src: 'https://images.unsplash.com/photo-1721876726195-7c3a56871eea?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Mt. Washington',
    caption: 'Alpine environment beauty'
  },
  {
    id: 8,
    src: 'https://images.unsplash.com/photo-1772428278806-8513a75f5954?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'General',
    caption: 'Essential gear for safety'
  },
  {
    id: 9,
    src: 'https://images.unsplash.com/photo-1575143367176-df82a0d4ff48?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Dreams',
    caption: 'Future peaks await'
  },
  {
    id: 10,
    src: 'https://images.unsplash.com/photo-1762662313299-9cc7d3e297be?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Dreams',
    caption: 'Reaching for higher peaks'
  },
  {
    id: 11,
    src: 'https://images.unsplash.com/photo-1605461040584-801d790d9127?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Dreams',
    caption: 'Mountain majesty'
  },
  {
    id: 12,
    src: 'https://images.unsplash.com/photo-1675699584693-3aaac3a25a2e?crop=entropy&cs=srgb&fm=jpg&q=85',
    summit: 'Dreams',
    caption: 'Winter wonderland'
  }
];

export const stats = {
  totalSummits: 2,
  totalElevation: 17537,
  plannedPeaks: 6,
  dreamPeaks: 4
};