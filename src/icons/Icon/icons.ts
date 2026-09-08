/**
 * Icon set.
 *
 * Shapes are expressed as simple SVG primitives on a 24x24 grid with a 2px round stroke.
 * The outlines are based on the MIT-licensed Feather icon set (https://feathericons.com).
 * Adding an icon means adding an entry here; consumers never import an icon library directly.
 */
export type IconShape =
  | { type: 'path'; d: string }
  | { type: 'line'; x1: number; y1: number; x2: number; y2: number }
  | { type: 'circle'; cx: number; cy: number; r: number }
  | { type: 'polyline'; points: string }
  | { type: 'polygon'; points: string }
  | { type: 'rect'; x: number; y: number; width: number; height: number; rx?: number };

const path = (d: string): IconShape => ({ type: 'path', d });
const line = (x1: number, y1: number, x2: number, y2: number): IconShape => ({
  type: 'line',
  x1,
  y1,
  x2,
  y2,
});
const circle = (cx: number, cy: number, r: number): IconShape => ({ type: 'circle', cx, cy, r });
const polyline = (points: string): IconShape => ({ type: 'polyline', points });
const polygon = (points: string): IconShape => ({ type: 'polygon', points });
const rect = (x: number, y: number, width: number, height: number, rx?: number): IconShape => ({
  type: 'rect',
  x,
  y,
  width,
  height,
  rx,
});

export const icons = {
  home: [path('M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'), polyline('9 22 9 12 15 12 15 22')],
  search: [circle(11, 11, 8), line(21, 21, 16.65, 16.65)],
  settings: [
    circle(12, 12, 3),
    path(
      'M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z',
    ),
  ],
  'arrow-left': [line(19, 12, 5, 12), polyline('12 19 5 12 12 5')],
  'arrow-right': [line(5, 12, 19, 12), polyline('12 5 19 12 12 19')],
  'arrow-up': [line(12, 19, 12, 5), polyline('5 12 12 5 19 12')],
  'arrow-down': [line(12, 5, 12, 19), polyline('19 12 12 19 5 12')],
  'chevron-left': [polyline('15 18 9 12 15 6')],
  'chevron-right': [polyline('9 18 15 12 9 6')],
  'chevron-up': [polyline('18 15 12 9 6 15')],
  'chevron-down': [polyline('6 9 12 15 18 9')],
  plus: [line(12, 5, 12, 19), line(5, 12, 19, 12)],
  minus: [line(5, 12, 19, 12)],
  close: [line(18, 6, 6, 18), line(6, 6, 18, 18)],
  check: [polyline('20 6 9 17 4 12')],
  warning: [
    path(
      'M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z',
    ),
    line(12, 9, 12, 13),
    line(12, 17, 12.01, 17),
  ],
  info: [circle(12, 12, 10), line(12, 16, 12, 12), line(12, 8, 12.01, 8)],
  error: [circle(12, 12, 10), line(12, 8, 12, 12), line(12, 16, 12.01, 16)],
  success: [path('M22 11.08V12a10 10 0 1 1-5.93-9.14'), polyline('22 4 12 14.01 9 11.01')],
  eye: [path('M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z'), circle(12, 12, 3)],
  'eye-off': [
    path(
      'M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24',
    ),
    line(1, 1, 23, 23),
  ],
  menu: [line(3, 12, 21, 12), line(3, 6, 21, 6), line(3, 18, 21, 18)],
  more: [circle(12, 12, 1), circle(19, 12, 1), circle(5, 12, 1)],
  'more-vertical': [circle(12, 12, 1), circle(12, 5, 1), circle(12, 19, 1)],
  heart: [
    path(
      'M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z',
    ),
  ],
  star: [
    polygon(
      '12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2',
    ),
  ],
  trash: [
    polyline('3 6 5 6 21 6'),
    path('M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'),
    line(10, 11, 10, 17),
    line(14, 11, 14, 17),
  ],
  edit: [path('M17 3a2.828 2.828 0 1 1 4 4L7.5 21.5 2 23l1.5-5.5L17 3z')],
  user: [path('M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'), circle(12, 7, 4)],
  users: [
    path('M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2'),
    circle(9, 7, 4),
    path('M23 21v-2a4 4 0 0 0-3-3.87'),
    path('M16 3.13a4 4 0 0 1 0 7.75'),
  ],
  bell: [path('M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'), path('M13.73 21a2 2 0 0 1-3.46 0')],
  mail: [
    path('M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z'),
    polyline('22,6 12,13 2,6'),
  ],
  lock: [rect(3, 11, 18, 11, 2), path('M7 11V7a5 5 0 0 1 10 0v4')],
  unlock: [rect(3, 11, 18, 11, 2), path('M7 11V7a5 5 0 0 1 9.9-1')],
  calendar: [rect(3, 4, 18, 18, 2), line(16, 2, 16, 6), line(8, 2, 8, 6), line(3, 10, 21, 10)],
  clock: [circle(12, 12, 10), polyline('12 6 12 12 16 14')],
  camera: [
    path('M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z'),
    circle(12, 13, 4),
  ],
  image: [rect(3, 3, 18, 18, 2), circle(8.5, 8.5, 1.5), polyline('21 15 16 10 5 21')],
  download: [
    path('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'),
    polyline('7 10 12 15 17 10'),
    line(12, 15, 12, 3),
  ],
  upload: [
    path('M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4'),
    polyline('17 8 12 3 7 8'),
    line(12, 3, 12, 15),
  ],
  share: [
    circle(18, 5, 3),
    circle(6, 12, 3),
    circle(18, 19, 3),
    line(8.59, 13.51, 15.42, 17.49),
    line(15.41, 6.51, 8.59, 10.49),
  ],
  filter: [polygon('22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3')],
  refresh: [
    polyline('23 4 23 10 17 10'),
    polyline('1 20 1 14 7 14'),
    path('M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15'),
  ],
  'external-link': [
    path('M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'),
    polyline('15 3 21 3 21 9'),
    line(10, 14, 21, 3),
  ],
  copy: [rect(9, 9, 13, 13, 2), path('M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1')],
  'log-out': [
    path('M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'),
    polyline('16 17 21 12 16 7'),
    line(21, 12, 9, 12),
  ],
  send: [line(22, 2, 11, 13), polygon('22 2 15 22 11 13 2 9 22 2')],
  'map-pin': [path('M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'), circle(12, 10, 3)],
  'credit-card': [rect(1, 4, 22, 16, 2), line(1, 10, 23, 10)],
  'shopping-cart': [
    circle(9, 21, 1),
    circle(20, 21, 1),
    path('M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6'),
  ],
  sun: [
    circle(12, 12, 5),
    line(12, 1, 12, 3),
    line(12, 21, 12, 23),
    line(4.22, 4.22, 5.64, 5.64),
    line(18.36, 18.36, 19.78, 19.78),
    line(1, 12, 3, 12),
    line(21, 12, 23, 12),
    line(4.22, 19.78, 5.64, 18.36),
    line(18.36, 5.64, 19.78, 4.22),
  ],
  moon: [path('M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z')],
  smartphone: [rect(5, 2, 14, 20, 2), line(12, 18, 12.01, 18)],
  globe: [
    circle(12, 12, 10),
    line(2, 12, 22, 12),
    path(
      'M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z',
    ),
  ],
  grid: [rect(3, 3, 7, 7, 1), rect(14, 3, 7, 7, 1), rect(14, 14, 7, 7, 1), rect(3, 14, 7, 7, 1)],
  list: [
    line(8, 6, 21, 6),
    line(8, 12, 21, 12),
    line(8, 18, 21, 18),
    line(3, 6, 3.01, 6),
    line(3, 12, 3.01, 12),
    line(3, 18, 3.01, 18),
  ],
  layers: [
    polygon('12 2 2 7 12 12 22 7 12 2'),
    polyline('2 17 12 22 22 17'),
    polyline('2 12 12 17 22 12'),
  ],
  'help-circle': [
    circle(12, 12, 10),
    path('M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'),
    line(12, 17, 12.01, 17),
  ],
  inbox: [
    polyline('22 12 16 12 14 15 10 15 8 12 2 12'),
    path(
      'M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z',
    ),
  ],
  zap: [polygon('13 2 3 14 12 14 11 22 21 10 12 10 13 2')],
  wifi: [
    path('M5 12.55a11 11 0 0 1 14.08 0'),
    path('M1.42 9a16 16 0 0 1 21.16 0'),
    path('M8.53 16.11a6 6 0 0 1 6.95 0'),
    line(12, 20, 12.01, 20),
  ],
  'wifi-off': [
    line(1, 1, 23, 23),
    path('M16.72 11.06A10.94 10.94 0 0 1 19 12.55'),
    path('M5 12.55a10.94 10.94 0 0 1 5.17-2.39'),
    path('M10.71 5.05A16 16 0 0 1 22.58 9'),
    path('M1.42 9a15.91 15.91 0 0 1 4.7-2.88'),
    path('M8.53 16.11a6 6 0 0 1 6.95 0'),
    line(12, 20, 12.01, 20),
  ],

  // Product categories & finance (added for El Lobo products such as Assinaí)
  tv: [rect(2, 7, 20, 15, 2), polyline('17 2 12 7 7 2')],
  monitor: [rect(2, 3, 20, 14, 2), line(8, 21, 16, 21), line(12, 17, 12, 21)],
  music: [path('M9 18V5l12-2v13'), circle(6, 18, 3), circle(18, 16, 3)],
  cloud: [path('M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z')],
  'book-open': [
    path('M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'),
    path('M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z'),
  ],
  activity: [polyline('22 12 18 12 15 21 9 3 6 12 2 12')],
  'file-text': [
    path('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'),
    polyline('14 2 14 8 20 8'),
    line(16, 13, 8, 13),
    line(16, 17, 8, 17),
    polyline('10 9 9 9 8 9'),
  ],
  phone: [
    path(
      'M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z',
    ),
  ],
  'dollar-sign': [line(12, 1, 12, 23), path('M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6')],
  'play-circle': [circle(12, 12, 10), polygon('10 8 16 12 10 16 10 8')],
  'trending-up': [polyline('23 6 13.5 15.5 8.5 10.5 1 18'), polyline('17 6 23 6 23 12')],
  'trending-down': [polyline('23 18 13.5 8.5 8.5 13.5 1 6'), polyline('17 18 23 18 23 12')],
  'pie-chart': [path('M21.21 15.89A10 10 0 1 1 8 2.83'), path('M22 12A10 10 0 0 0 12 2v10z')],
  'bar-chart': [line(18, 20, 18, 10), line(12, 20, 12, 4), line(6, 20, 6, 14)],
  repeat: [
    polyline('17 1 21 5 17 9'),
    path('M3 11V9a4 4 0 0 1 4-4h14'),
    polyline('7 23 3 19 7 15'),
    path('M21 13v2a4 4 0 0 1-4 4H3'),
  ],
  tag: [
    path('M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z'),
    line(7, 7, 7.01, 7),
  ],
  award: [circle(12, 8, 7), polyline('8.21 13.89 7 23 12 20 17 23 15.79 13.88')],
  percent: [line(19, 5, 5, 19), circle(6.5, 6.5, 2.5), circle(17.5, 17.5, 2.5)],
  shield: [path('M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z')],
  target: [circle(12, 12, 10), circle(12, 12, 6), circle(12, 12, 2)],
  clipboard: [
    path('M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'),
    rect(8, 2, 8, 4, 1),
  ],
  gift: [
    polyline('20 12 20 22 4 22 4 12'),
    rect(2, 7, 20, 5),
    line(12, 22, 12, 7),
    path('M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z'),
    path('M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z'),
  ],
} as const satisfies Record<string, readonly IconShape[]>;

export type IconName = keyof typeof icons;

export const iconNames = Object.keys(icons) as IconName[];
