export const RESTAURANTS = [
  { slug: 'hungry-bird', badge: 'QUICK BITES', cuisine: 'Multi-cuisine · Snacks', name: 'Hungry Bird', desc: 'Burgers, fries, wraps and the fastest refuel between rides.', tags: ['Veg & Non-veg', 'Quick service'], hours: '⏰ 11am – 6pm', gradient: 'linear-gradient(135deg, #FF7A9C, #FFD84D)' },
  { slug: 'after-taste', badge: 'FAMILY DINING', cuisine: 'Indian · Thali', name: 'After Taste', desc: 'Full thali, biryani and comforting Indian meals for the whole family.', tags: ['Veg & Non-veg', 'Sit-down'], hours: '⏰ 11:30am – 5:30pm', gradient: 'linear-gradient(135deg, #0A5566, #00A5C8)' },
  { slug: 'buffetaria', badge: 'BUFFET', cuisine: 'Multi-cuisine · Buffet', name: 'Water World Buffetaria', desc: 'Unlimited buffet with 30+ dishes — the all-you-can-eat option.', tags: ['Veg & Non-veg', 'Unlimited'], hours: '⏰ 12pm – 4pm', gradient: 'linear-gradient(135deg, #22C4DE, #5FDDEA)' },
  { slug: 'jungle-fiesta', badge: 'THEMED', cuisine: 'Indian · Continental', name: 'Jungle Fiesta', desc: 'Tropical-themed dining with live counters and grilled specialties.', tags: ['Veg & Non-veg', 'Live grill'], hours: '⏰ 11am – 5:30pm', gradient: 'linear-gradient(135deg, #3FE0A5, #5FDDEA)' },
  { slug: 'chill-zone', badge: 'DESSERTS', cuisine: 'Desserts · Beverages', name: 'Chill Zone', desc: 'Soft serve, sundaes, fresh juices and cold coffee — the sweet pit stop.', tags: ['Veg', 'Walk-up'], hours: '⏰ 11am – 6pm', gradient: 'linear-gradient(135deg, #B6F26A, #FFD84D)' },
  { slug: 'chai-point', badge: 'CAFÉ', cuisine: 'Beverages · Snacks', name: 'Chai Point', desc: 'Masala chai, samosa, vada pav — the desi pick-me-up between zones.', tags: ['Veg', 'Grab & go'], hours: '⏰ 10:30am – 6pm', gradient: 'linear-gradient(135deg, #FFD84D, #FF7A9C)' },
];

export function getRestaurantBySlug(slug) { return RESTAURANTS.find(r => r.slug === slug) || null; }
