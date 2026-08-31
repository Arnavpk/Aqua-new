/**
 * Ride details table data — keyed by location slug.
 * Each location has zones, and each zone has rides.
 */
export const RIDE_DETAILS = {
  surat: [
    {
      zone: 'Tower A',
      rides: [
        { name: 'Tumble', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '18 Sec' },
        { name: 'Jumble', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '18 Sec' },
      ],
    },
    {
      zone: 'Tower B',
      rides: [
        { name: 'Manta', type: 'Raft Slide (96")', capacity: '4 to 6 person', height: '4 feet', weight: 'Min 250 kg to Max 450 kg', waterDepth: '2 feet', duration: '55 Sec' },
        { name: 'Bubba Tub', type: 'Raft Slide (96")', capacity: '3 to 4 person', height: '4 feet', weight: 'Min 250 kg to Max 350 kg', waterDepth: '2 feet', duration: '30 Sec' },
      ],
    },
    {
      zone: 'Tower C',
      rides: [
        { name: 'Aqua Drag', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '20 Sec' },
        { name: 'Tornado', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '20 Sec' },
        { name: 'Insano (Orange)', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: 'NA', duration: '6 Sec' },
        { name: 'Twister (Green)', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '15 Sec' },
        { name: 'Bullet Bowl (Purple)', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '9 feet', duration: '12 Sec' },
      ],
    },
    {
      zone: 'Tower D',
      rides: [
        { name: 'Big Thunder (Pink)', type: 'Double Tube Slide (48")', capacity: '1 to 2 person', height: '4 feet', weight: 'Min 136 kg to Max 182 kg', waterDepth: 'NA', duration: '1 Min 03 Sec' },
        { name: 'Splash Down (Blue)', type: 'Double Tube Slide (48")', capacity: '1 to 2 person', height: '4 feet', weight: 'Min 136 kg to Max 182 kg', waterDepth: 'NA', duration: '30 Sec' },
        { name: 'Master Blaster (Yellow)', type: 'Double Tube Slide (48")', capacity: '1 to 2 person', height: '4 feet', weight: 'Min 136 kg to Max 182 kg', waterDepth: 'NA', duration: '30 Sec', closed: true },
      ],
    },
    {
      zone: 'Tower E',
      rides: [
        { name: 'Whizzard — 6 Lane', type: 'Mat Slide', capacity: '1 person', height: '4 feet', weight: 'Min 45 kg to Max 136 kg', waterDepth: 'NA', duration: '16 Sec' },
        { name: 'Space Shot', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Min 55 kg to Max 110 kg', waterDepth: 'NA', duration: '14 Sec' },
      ],
    },
    {
      zone: 'Tower F',
      rides: [
        { name: 'Boombastic', type: 'Raft Slide (67")', capacity: '2 to 3 person', height: '4 feet', weight: 'Min 136 to 250 kg', waterDepth: 'NA', duration: '35 Sec' },
      ],
    },
    {
      zone: 'Kids Zone',
      rides: [
        { name: "Wet'n Wild", type: 'Body Slide', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: '2 feet', duration: 'NA' },
        { name: 'Boombastic Kids', type: 'Single Tube Slide (36")', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Ratler Kids', type: 'Single Tube Slide (36")', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Zip', type: 'Body Slide', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: '2 feet', duration: 'NA' },
        { name: 'Zap', type: 'Body Slide', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Zoom', type: 'Body Slide', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Racers (3 slides)', type: 'Body Slide', capacity: '3 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Get Set Go', type: 'Body Slide', capacity: '1 or 2 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
      ],
    },
    {
      zone: 'Other Attractions',
      rides: [
        { name: 'Thrill & Chill Creek (Lazy River)', type: 'Attraction (Single Tube 42", 48")', capacity: '1 person', height: '3 feet', weight: 'Kids must be accompanied by parents', waterDepth: '3.5 feet', duration: '12 Min' },
        { name: 'Fun Island (7 Slides Family Station)', type: 'Attraction', capacity: '1 person', height: '3.3 feet', weight: '90 kg per lane', waterDepth: 'NA', duration: 'NA' },
        { name: 'Splash Pad (Kids Tots Area)', type: 'Attraction', capacity: '1 person', height: 'NA', weight: 'NA', waterDepth: 'NA', duration: 'NA' },
        { name: 'Wet Disco (Rain Dance)', type: 'Attraction', capacity: '1 person', height: 'NA', weight: 'NA', waterDepth: 'NA', duration: 'NA' },
        { name: 'Tsunami Bay (Wave Pool)', type: 'Attraction', capacity: '1 person', height: 'NA', weight: 'NA', waterDepth: '3 to 7 feet', duration: 'NA' },
      ],
    },
  ],

  indore: [
    // Add Indore ride data here when available
  ],
  ahmedabad : [
    
    {
      zone: 'Tower A',
      rides: [
        { name: 'Tumble', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '18 Sec' },
        { name: 'Jumble', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '18 Sec' },
      ],
    },
    {
      zone: 'Tower B',
      rides: [
        { name: 'Manta', type: 'Raft Slide (96")', capacity: '4 to 6 person', height: '4 feet', weight: 'Min 250 kg to Max 450 kg', waterDepth: '2 feet', duration: '55 Sec' },
        { name: 'Bubba Tub', type: 'Raft Slide (96")', capacity: '3 to 4 person', height: '4 feet', weight: 'Min 250 kg to Max 350 kg', waterDepth: '2 feet', duration: '30 Sec' },
      ],
    },
    {
      zone: 'Tower C',
      rides: [
        { name: 'Aqua Drag', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '20 Sec' },
        { name: 'Tornado', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '20 Sec' },
        { name: 'Insano (Orange)', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: 'NA', duration: '6 Sec' },
        { name: 'Twister (Green)', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '3.5 feet', duration: '15 Sec' },
        { name: 'Bullet Bowl (Purple)', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Max 136 kg', waterDepth: '9 feet', duration: '12 Sec' },
      ],
    },
    {
      zone: 'Tower D',
      rides: [
        { name: 'Big Thunder (Pink)', type: 'Double Tube Slide (48")', capacity: '1 to 2 person', height: '4 feet', weight: 'Min 136 kg to Max 182 kg', waterDepth: 'NA', duration: '1 Min 03 Sec' },
        { name: 'Splash Down (Blue)', type: 'Double Tube Slide (48")', capacity: '1 to 2 person', height: '4 feet', weight: 'Min 136 kg to Max 182 kg', waterDepth: 'NA', duration: '30 Sec' },
        { name: 'Master Blaster (Yellow)', type: 'Double Tube Slide (48")', capacity: '1 to 2 person', height: '4 feet', weight: 'Min 136 kg to Max 182 kg', waterDepth: 'NA', duration: '30 Sec', closed: true },
      ],
    },
    {
      zone: 'Tower E',
      rides: [
        { name: 'Whizzard — 6 Lane', type: 'Mat Slide', capacity: '1 person', height: '4 feet', weight: 'Min 45 kg to Max 136 kg', waterDepth: 'NA', duration: '16 Sec' },
        { name: 'Space Shot', type: 'Body Slide', capacity: '1 person', height: '4 feet', weight: 'Min 55 kg to Max 110 kg', waterDepth: 'NA', duration: '14 Sec' },
      ],
    },
    {
      zone: 'Tower F',
      rides: [
        { name: 'Boombastic', type: 'Raft Slide (67")', capacity: '2 to 3 person', height: '4 feet', weight: 'Min 136 to 250 kg', waterDepth: 'NA', duration: '35 Sec' },
      ],
    },
    {
      zone: 'Kids Zone',
      rides: [
        { name: "Wet'n Wild", type: 'Body Slide', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: '2 feet', duration: 'NA' },
        { name: 'Boombastic Kids', type: 'Single Tube Slide (36")', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Ratler Kids', type: 'Single Tube Slide (36")', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Zip', type: 'Body Slide', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: '2 feet', duration: 'NA' },
        { name: 'Zap', type: 'Body Slide', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Zoom', type: 'Body Slide', capacity: '1 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Racers (3 slides)', type: 'Body Slide', capacity: '3 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
        { name: 'Get Set Go', type: 'Body Slide', capacity: '1 or 2 person', height: '3 feet', weight: '90 kg each', waterDepth: 'NA', duration: 'NA' },
      ],
    },
    {
      zone: 'Other Attractions',
      rides: [
        { name: 'Thrill & Chill Creek (Lazy River)', type: 'Attraction (Single Tube 42", 48")', capacity: '1 person', height: '3 feet', weight: 'Kids must be accompanied by parents', waterDepth: '3.5 feet', duration: '12 Min' },
        { name: 'Fun Island (7 Slides Family Station)', type: 'Attraction', capacity: '1 person', height: '3.3 feet', weight: '90 kg per lane', waterDepth: 'NA', duration: 'NA' },
        { name: 'Splash Pad (Kids Tots Area)', type: 'Attraction', capacity: '1 person', height: 'NA', weight: 'NA', waterDepth: 'NA', duration: 'NA' },
        { name: 'Wet Disco (Rain Dance)', type: 'Attraction', capacity: '1 person', height: 'NA', weight: 'NA', waterDepth: 'NA', duration: 'NA' },
        { name: 'Tsunami Bay (Wave Pool)', type: 'Attraction', capacity: '1 person', height: 'NA', weight: 'NA', waterDepth: '3 to 7 feet', duration: 'NA' },
      ],
    },
  ]
  
};