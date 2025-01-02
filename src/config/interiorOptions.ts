export const INTERIOR_OPTIONS = {
  fixtures: [
    { id: 'matte-black', label: 'Matte Black', color: '#333333', price: 100 },
    { id: 'satin-nickel', label: 'Satin Nickel', color: '#AAAAAA', price: 120 },
    { id: 'silverstone', label: 'Silverstone', color: '#C0C0C0', price: 130 },
    { id: 'merino-grey', label: 'Merino Grey', color: '#B0B0B0', price: 110 },
    { id: 'yuri-grey', label: 'Yuri Grey', color: '#A0A0A0', price: 115 }
  ],
  countertops: [
    { id: 'white-shaker', label: 'White Shaker', color: '#FFFFFF', price: 200 },
    { id: 'grey-shaker', label: 'Grey Shaker', color: '#D3D3D3', price: 220 },
    { id: 'silverstone', label: 'Silverstone', color: '#C0C0C0', price: 210 }
  ],
  cabinets: [
    { id: 'white-shaker', label: 'White Shaker', color: '#FFFFFF', price: 250 },
    { id: 'grey-shaker', label: 'Grey Shaker', color: '#D3D3D3', price: 260 },
    { id: 'knotted-chestnut', label: 'Knotted Chestnut', color: '#8B4513', price: 270 },
    { id: 'natural-hickory', label: 'Natural Hickory', color: '#A0522D', price: 280 },
    { id: 'fumed-hickory', label: 'Fumed Hickory', color: '#CD853F', price: 290 }
  ],
  mainFlooring: [
    { id: 'ashlar-oak', label: 'Ashlar Oak', color: '#DEB887', price: 150 },
    { id: 'sandcastle-oak', label: 'Sandcastle Oak', color: '#F4A460', price: 160 },
    { id: 'fawn-chestnut', label: 'Fawn Chestnut', color: '#D2B48C', price: 155 },
    { id: 'fumed-hickory', label: 'Fumed Hickory', color: '#8B4513', price: 165 },
    { id: 'knotted-chestnut', label: 'Knotted Chestnut', color: '#8B4513', price: 170 },
    { id: 'natural-hickory', label: 'Natural Hickory', color: '#A0522D', price: 175 }
  ],
  bathFlooring: [
    { id: 'ice-fog', label: 'Ice Fog', color: '#F0F8FF', price: 180 },
    { id: 'stone-grey', label: 'Stone Grey', color: '#708090', price: 190 },
    { id: 'gothic-arch', label: 'Gothic Arch', color: '#2F4F4F', price: 175 }
  ]
} as const;