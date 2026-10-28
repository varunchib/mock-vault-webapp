import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

type River = {
  name: string
  type: 'H' | 'P'
  color: string
  length: string
  source: string
  mouth: string
  states: string[]
  tributaries: string
  info: string
  points: [number, number][]
  labelPoint?: [number, number]
}

const RIVERS: River[] = [
  {
    name: 'Indus',
    type: 'H',
    color: '#1e88e5',
    length: '3,180 km (about 709 km in India)',
    source: 'Near Mount Kailash, Tibet',
    mouth: 'Arabian Sea (via Pakistan)',
    states: ['Ladakh'],
    tributaries: 'Major basin rivers include Zanskar, Suru, Shyok, Gilgit, Kabul and the Punjab rivers that converge through the Panjnad.',
    info: 'Flows through Ladakh, the only stretch inside India. Its upper valley is among the highest river valleys in the world. Tributary lists for the full basin include rivers in Tibet, India, Pakistan and Afghanistan.',
    points: [[81.5, 31.2], [79.5, 33.2], [77.5, 34.1], [75.5, 35], [74.5, 35.5]],
    labelPoint: [79.6, 35],
  },
  {
    name: 'Sutlej',
    type: 'H',
    color: '#00acc1',
    length: '1,450 km (about 1,050 km in India)',
    source: 'Rakshastal Lake, Tibet',
    mouth: 'Flows into the Indus system downstream in Pakistan',
    states: ['Himachal Pradesh', 'Punjab'],
    tributaries: 'Spiti, Baspa and Beas; Beas meets the Sutlej at Harike, and the Sutlej later joins the Indus system through the Panjnad.',
    info: 'Enters India at Shipki La and feeds the Bhakra Nangal dam. It is the longest of the five rivers of Punjab.',
    points: [[80, 31.1], [78.7, 31.6], [77, 31.3], [76.2, 31], [75, 31.1]],
    labelPoint: [78.7, 32.7],
  },
  {
    name: 'Yamuna',
    type: 'H',
    color: '#26a69a',
    length: '1,376 km',
    source: 'Yamunotri Glacier, Uttarakhand',
    mouth: 'Joins the Ganga at Prayagraj',
    states: ['Uttarakhand', 'Haryana', 'Delhi', 'Uttar Pradesh'],
    tributaries: 'Tons, Hindon, Chambal, Sind, Betwa, Ken and Rind; several join the Yamuna through the Chambal system.',
    info: 'Passes Delhi and Agra and is the Ganga’s longest tributary. The Taj Mahal stands on its bank.',
    points: [[78.5, 31], [77.3, 30], [77.2, 28.6], [78, 27.2], [79.5, 26.3], [81.8, 25.4]],
  },
  {
    name: 'Ganga',
    type: 'H',
    color: '#3949ab',
    length: '2,525 km',
    source: 'Gangotri Glacier, Uttarakhand',
    mouth: 'Bay of Bengal (Sundarbans delta)',
    states: ['Uttarakhand', 'Uttar Pradesh', 'Bihar', 'Jharkhand', 'West Bengal'],
    tributaries: 'Major direct tributaries include Ramganga, Gomti, Ghaghara, Gandak, Kosi, Mahananda, Yamuna, Tamsa, Son and Punpun. Bhagirathi and Alaknanda meet at Devprayag to form the Ganga.',
    info: 'A lifeline of the northern plains. Haridwar, Prayagraj, Varanasi and Patna lie on its banks.',
    points: [[79, 30.9], [78.2, 29.9], [79.5, 27.5], [80.3, 26.4], [81.8, 25.4], [83, 25.3], [84.9, 25.6], [86.9, 25.3], [87.9, 24.9], [88.3, 24.2], [89, 23.8]],
  },
  {
    name: 'Brahmaputra',
    type: 'H',
    color: '#8e24aa',
    length: '2,900 km (about 916 km in India)',
    source: 'Angsi Glacier, Tibet (Tsangpo)',
    mouth: 'Joins the Ganga delta, Bay of Bengal',
    states: ['Arunachal Pradesh', 'Assam'],
    tributaries: 'Dibang and Lohit join the Siang upstream; major Assam tributaries include Subansiri, Kameng, Manas, Sankosh, Beki, Raidak, Dhansiri, Kopili and Teesta.',
    info: 'Enters Arunachal Pradesh as the Siang and flows through Assam as a wide braided river with Majuli, one of the world’s largest river islands.',
    points: [[93.5, 29.3], [95.3, 29.5], [95.2, 28.2], [95.5, 27.5], [94.5, 27.2], [93.5, 26.8], [92, 26.3], [91.7, 26.2], [90.5, 26.2], [89.8, 25.8], [89.7, 25]],
  },
  {
    name: 'Narmada',
    type: 'P',
    color: '#e53935',
    length: '1,312 km',
    source: 'Amarkantak, Madhya Pradesh',
    mouth: 'Arabian Sea (Gulf of Khambhat)',
    states: ['Madhya Pradesh', 'Maharashtra', 'Gujarat'],
    tributaries: 'Major tributaries include Tawa, Hiran, Banjar, Shakkar, Dudhi, Ganjal, Barna, Kolar and Orsang.',
    info: 'Flows west in a rift valley between the Vindhya and Satpura ranges. Famous for the Dhuandhar Falls and Sardar Sarovar Dam.',
    points: [[81.8, 22.7], [80, 22.4], [78.5, 22.4], [76.5, 22.3], [75, 22.1], [73.5, 21.9], [72.6, 21.7]],
  },
  {
    name: 'Tapti',
    type: 'P',
    color: '#fb8c00',
    length: '724 km',
    source: 'Multai, Madhya Pradesh',
    mouth: 'Arabian Sea (near Surat)',
    states: ['Madhya Pradesh', 'Maharashtra', 'Gujarat'],
    tributaries: 'Major tributaries include Purna, Girna, Panzara, Waghur, Aner, Gomai, Arunavati, Bori, Buray, Amravati, Nesu, Mona and Sipna.',
    info: 'The other major west-flowing river of the peninsula, running just south of the Narmada.',
    points: [[77.9, 21.9], [76, 21.2], [74.5, 21.2], [73, 21.2], [72.7, 21.1]],
  },
  {
    name: 'Mahanadi',
    type: 'P',
    color: '#43a047',
    length: '858 km',
    source: 'Sihawa, Chhattisgarh',
    mouth: 'Bay of Bengal near Paradeep',
    states: ['Chhattisgarh', 'Odisha'],
    tributaries: 'Seonath (Shivnath), Hasdeo, Mand and Ib join from the left bank; Ong, Tel and Jonk join from the right.',
    info: 'Its Hirakud Dam is one of the longest earthen dams in the world. Cuttack stands on its delta.',
    points: [[81.9, 20.3], [82.5, 21.2], [83.9, 21.5], [84.5, 20.8], [85.8, 20.5], [86.7, 20.3]],
  },
  {
    name: 'Godavari',
    type: 'P',
    color: '#f4511e',
    length: '1,465 km',
    source: 'Trimbakeshwar, Nashik, Maharashtra',
    mouth: 'Bay of Bengal',
    states: ['Maharashtra', 'Telangana', 'Andhra Pradesh'],
    tributaries: 'Major left-bank tributaries include Purna, Pranhita, Indravati and Sabari; major right-bank tributaries include Pravara, Manjira and Maner.',
    info: 'The longest peninsular river, often called Dakshin Ganga. It hosts the Kumbh Mela at Nashik.',
    points: [[73.5, 19.9], [75, 19.2], [77, 19], [79.5, 18.7], [80.5, 18.5], [81.8, 17.5], [82.3, 16.8]],
  },
  {
    name: 'Krishna',
    type: 'P',
    color: '#d81b60',
    length: '1,400 km',
    source: 'Mahabaleshwar, Maharashtra',
    mouth: 'Bay of Bengal',
    states: ['Maharashtra', 'Karnataka', 'Telangana', 'Andhra Pradesh'],
    tributaries: 'Major left-bank tributaries include Bhima, Dindi, Musi, Paleru and Munneru; major right-bank tributaries include Koyna, Panchganga, Ghataprabha, Malaprabha and Tungabhadra.',
    info: 'Flows across the Deccan plateau and irrigates a vast rain-shadow region.',
    points: [[73.6, 17.9], [74.5, 17.2], [76, 16.5], [77.3, 16.2], [78.5, 16], [80, 16.2], [80.8, 16.1], [81, 15.7]],
  },
  {
    name: 'Kaveri',
    type: 'P',
    color: '#00897b',
    length: '800 km',
    source: 'Talakaveri, Karnataka',
    mouth: 'Bay of Bengal',
    states: ['Karnataka', 'Tamil Nadu', 'Puducherry (Karaikal delta)'],
    tributaries: 'Major left-bank tributaries include Harangi, Hemavati, Shimsha and Arkavathi; major right-bank tributaries include Lakshmanatirtha, Kabini, Bhavani, Noyyal and Amaravati.',
    info: 'A rain-fed river that still flows well in the dry months thanks to both monsoons. It splits into islands at Srirangapatna and Srirangam.',
    points: [[75.5, 12.4], [76.6, 12.2], [77.8, 12.1], [78.2, 11], [79, 10.9], [79.8, 10.8]],
  },
]

type RiverFilter = 'A' | 'H' | 'P'
type RiverStudyDetails = {
  leftBank: string[]
  rightBank: string[]
  districts: { state: string; names: string[] }[]
  tributaryNote?: string
}

const RIVER_STUDY_DETAILS: Record<string, RiverStudyDetails> = {
  Indus: {
    leftBank: ['Zanskar', 'Suru (including the Dras system)', 'Soan (Sohan)', 'Jhelum', 'Chenab', 'Ravi', 'Beas', 'Sutlej', 'Panjnad'],
    rightBank: ['Shyok (Nubra joins the Shyok)', 'Shigar', 'Gilgit (receives the Hunza)', 'Swat', 'Kunar (Chitral)', 'Kurram', 'Gomal', 'Tochi (Gambila)', 'Kabul'],
    districts: [{ state: 'Ladakh', names: ['Leh'] }],
    tributaryNote: 'This is the wider Indus basin, not a list of direct confluences only. Jhelum, Chenab, Ravi, Beas and Sutlej converge through the Panjnad before meeting the Indus. Nubra joins the Shyok, Hunza joins the Gilgit system, and Kishanganga (Neelum), Vishav, Rambiara and Doodhganga feed the Jhelum.',
  },
  Sutlej: {
    leftBank: ['Baspa', 'Tirung', 'Gayathing', 'Duling', 'Soldang', 'Nogli Khad'],
    rightBank: ['Spiti', 'Beas (joins at Harike)', 'Ropa', 'Taiti', 'Kashang', 'Mulgaon', 'Yula', 'Wanger', 'Throng', 'Rupi', 'Kerang', 'Soan (Swan)', 'White Bein (East Bein)'],
    tributaryNote: 'These lists include named Sutlej tributaries shown for the Himachal Pradesh and Punjab reaches. Farther downstream in Pakistan, the Sutlej and Chenab meet to form the Panjnad; Chenab is part of the wider Indus basin system, not a bank tributary of the Sutlej.',
    districts: [
      { state: 'Himachal Pradesh', names: ['Kinnaur', 'Lahaul and Spiti'] },
      { state: 'Punjab', names: ['Rupnagar'] },
    ],
  },
  Yamuna: {
    leftBank: ['Tons', 'Giri', 'Rishi Ganga', 'Hanuman Ganga', 'Hindon', 'Rind', 'Sengar', 'Sasur Khaderi'],
    rightBank: ['Chambal', 'Sind (Sindh)', 'Betwa', 'Ken', 'Sabi (Sahibi)', 'Baghain'],
    tributaryNote: 'The Chambal system also receives the Banas, Kali Sindh, Parbati and Shipra; Betwa receives the Dhasan. These are nested basin tributaries, not direct Yamuna confluences.',
    districts: [
      { state: 'Uttarakhand', names: ['Uttarkashi'] },
      { state: 'Haryana', names: ['Yamunanagar'] },
      { state: 'National Capital Territory of Delhi', names: ['Delhi'] },
      { state: 'Uttar Pradesh', names: ['Mathura', 'Agra', 'Etawah', 'Prayagraj'] },
    ],
  },
  Ganga: {
    leftBank: ['Ramganga', 'Gomti', 'Ghaghara (Karnali/Sarayu)', 'Gandak (Narayani)', 'Burhi Gandak', 'Kosi (Saptakoshi)', 'Mahananda', 'Varuna'],
    rightBank: ['Yamuna', 'Tamsa (Tamasa)', 'Karamnasa', 'Son (Sone)', 'Punpun', 'Falgu', 'Kiul', 'Chandan', 'Ajoy (Ajay)', 'Damodar (via Hooghly)', 'Rupnarayan (via Hooghly system)'],
    tributaryNote: 'Bhagirathi and Alaknanda meet at Devprayag to form the Ganga; Alaknanda receives Dhauliganga, Nandakini, Pindar and Mandakini. The Ghaghara system includes Sharda and Rapti; the Yamuna system includes Tons, Giri, Hindon, Rind, Sengar, Chambal, Sind, Betwa and Ken. Damodar and Rupnarayan drain through the Hooghly distributary system.',
    districts: [
      { state: 'Uttarakhand', names: ['Haridwar'] },
      { state: 'Uttar Pradesh', names: ['Prayagraj', 'Varanasi'] },
      { state: 'Bihar', names: ['Patna'] },
      { state: 'West Bengal', names: ['Murshidabad'] },
    ],
  },
  Brahmaputra: {
    leftBank: ['Lhasa', 'Nyang', 'Parlung Zangbo', 'Dibang', 'Lohit', 'Burhi Dihing', 'Dhansiri', 'Kopili', 'Kolong', 'Kulsi'],
    rightBank: ['Subansiri', 'Kameng (Jia Bharali)', 'Manas', 'Sankosh', 'Beki', 'Raidak', 'Jaldhaka', 'Torsa', 'Gadadhar', 'Teesta'],
    tributaryNote: 'Dibang and Lohit join the Siang (Dihang) before the combined river is called the Brahmaputra in Assam. The upper basin in Tibet also includes the Lhasa, Nyang and Parlung Zangbo rivers. Teesta joins the Jamuna, the Brahmaputra’s continuation in Bangladesh.',
    districts: [
      { state: 'Arunachal Pradesh', names: ['Upper Siang'] },
      { state: 'Assam', names: ['Dhemaji', 'Dibrugarh', 'Majuli', 'Sonitpur', 'Kamrup Metropolitan'] },
    ],
  },
  Narmada: {
    leftBank: ['Burhner', 'Banjar', 'Sher', 'Shakkar', 'Dudhi', 'Tawa', 'Chhota Tawa', 'Ganjal', 'Kundi', 'Goi', 'Karjan'],
    rightBank: ['Hiran', 'Tendoni (Tindoni)', 'Barna', 'Kolar', 'Man', 'Uri', 'Hatni', 'Orsang'],
    tributaryNote: 'Some published tributary tables place Karjan on both banks; it is listed once here, but its bank classification varies between references.',
    districts: [
      { state: 'Madhya Pradesh', names: ['Anuppur', 'Narmadapuram', 'Barwani'] },
      { state: 'Gujarat', names: ['Bharuch'] },
    ],
  },
  Tapti: {
    leftBank: ['Purna', 'Girna', 'Panzara (Panjhara)', 'Bori', 'Waghur', 'Amravati', 'Buray', 'Nesu', 'Mona', 'Sipna'],
    rightBank: ['Gomai', 'Aner', 'Arunavati', 'Vaki'],
    districts: [
      { state: 'Madhya Pradesh', names: ['Betul', 'Burhanpur'] },
      { state: 'Maharashtra', names: ['Jalgaon'] },
      { state: 'Gujarat', names: ['Surat'] },
    ],
  },
  Mahanadi: {
    leftBank: ['Seonath', 'Hasdeo', 'Mand', 'Ib'],
    rightBank: ['Pairi', 'Ong', 'Tel', 'Jonk'],
    districts: [
      { state: 'Chhattisgarh', names: ['Dhamtari'] },
      { state: 'Odisha', names: ['Sambalpur', 'Boudh', 'Cuttack'] },
    ],
  },
  Godavari: {
    leftBank: ['Purna', 'Pranhita', 'Indravati', 'Sabari'],
    rightBank: ['Pravara', 'Manjira', 'Maner'],
    tributaryNote: 'Pranhita is formed by the Wardha, Wainganga and Painganga river system. Important basin tributaries also include the Kadam and Kinnerasani.',
    districts: [
      { state: 'Maharashtra', names: ['Nashik', 'Nanded'] },
      { state: 'Telangana', names: ['Nizamabad', 'Bhadradri Kothagudem'] },
      { state: 'Andhra Pradesh', names: ['East Godavari', 'Konaseema'] },
    ],
  },
  Krishna: {
    leftBank: ['Yerla', 'Bhima', 'Dindi', 'Musi', 'Peddavagu', 'Halia', 'Paleru', 'Munneru'],
    rightBank: ['Kudali (Nira)', 'Venna', 'Koyna', 'Panchganga', 'Dudhaganga', 'Ghataprabha', 'Malaprabha', 'Tungabhadra'],
    tributaryNote: 'The Tunga and Bhadra unite to form the Tungabhadra, a major tributary of the Krishna.',
    districts: [
      { state: 'Maharashtra', names: ['Satara', 'Sangli'] },
      { state: 'Karnataka', names: ['Bagalkot', 'Raichur'] },
      { state: 'Telangana', names: ['Nalgonda'] },
      { state: 'Andhra Pradesh', names: ['Guntur'] },
    ],
  },
  Kaveri: {
    leftBank: ['Harangi', 'Hemavati', 'Shimsha', 'Arkavathi'],
    rightBank: ['Lakshmanatirtha', 'Kabini', 'Suvarnavathi', 'Bhavani', 'Noyyal', 'Amaravati'],
    districts: [
      { state: 'Karnataka', names: ['Kodagu', 'Mysuru', 'Mandya'] },
      { state: 'Tamil Nadu', names: ['Erode', 'Karur', 'Tiruchirappalli', 'Thanjavur'] },
    ],
  },
}

const FILTERS: { key: RiverFilter; label: string }[] = [
  { key: 'A', label: 'All rivers' },
  { key: 'H', label: 'Himalayan' },
  { key: 'P', label: 'Peninsular' },
]

function mercator(latitude: number) {
  return Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360))
}

function project([longitude, latitude]: [number, number]): [number, number] {
  const scale = 695.7 / (mercator(37.09) - mercator(6.75))
  return [(longitude - 68.16) * 20.93, (mercator(37.09) - mercator(latitude)) * scale]
}

function riverPath(points: [number, number][]) {
  const projected = points.map(project)
  let path = `M${projected[0][0].toFixed(1)},${projected[0][1].toFixed(1)}`

  for (let index = 0; index < projected.length - 1; index += 1) {
    const previous = projected[index - 1] ?? projected[index]
    const start = projected[index]
    const end = projected[index + 1]
    const next = projected[index + 2] ?? end
    const control1: [number, number] = [
      start[0] + (end[0] - previous[0]) / 6,
      start[1] + (end[1] - previous[1]) / 6,
    ]
    const control2: [number, number] = [
      end[0] - (next[0] - start[0]) / 6,
      end[1] - (next[1] - start[1]) / 6,
    ]
    path += `C${control1[0].toFixed(1)},${control1[1].toFixed(1)} ${control2[0].toFixed(1)},${control2[1].toFixed(1)} ${end[0].toFixed(1)},${end[1].toFixed(1)}`
  }

  return path
}

const riverGroups = [
  {
    title: 'Himalayan rivers',
    description: 'Generally perennial, with water supplied by snowmelt and monsoon rainfall.',
    rivers: 'Indus, Sutlej, Yamuna, Ganga and Brahmaputra.',
  },
  {
    title: 'Peninsular rivers',
    description: 'Mostly rain-fed, with seasonal flow shaped strongly by the monsoons.',
    rivers: 'Narmada, Tapti, Mahanadi, Godavari, Krishna and Kaveri.',
  },
]

const STATE_LABELS: { name: string; point: [number, number] }[] = [
  { name: 'Ladakh', point: [77.8, 34.1] },
  { name: 'Himachal Pradesh', point: [77.3, 31.7] },
  { name: 'Punjab', point: [75.5, 30.5] },
  { name: 'Uttarakhand', point: [79.3, 30.2] },
  { name: 'Haryana', point: [76.1, 29.1] },
  { name: 'Rajasthan', point: [73.3, 26.1] },
  { name: 'Uttar Pradesh', point: [80.8, 27.1] },
  { name: 'Sikkim', point: [88.4, 27.5] },
  { name: 'Arunachal Pradesh', point: [94.2, 28.5] },
  { name: 'Assam', point: [92.8, 26.1] },
  { name: 'Nagaland', point: [94.4, 25.7] },
  { name: 'Manipur', point: [93.8, 24.5] },
  { name: 'Mizoram', point: [92.8, 23.1] },
  { name: 'Tripura', point: [91.4, 23.8] },
  { name: 'Meghalaya', point: [90.7, 25.5] },
  { name: 'Bihar', point: [85.2, 25.5] },
  { name: 'Jharkhand', point: [85.6, 23.5] },
  { name: 'West Bengal', point: [87.8, 23.1] },
  { name: 'Madhya Pradesh', point: [78.1, 23.9] },
  { name: 'Gujarat', point: [71.9, 22.6] },
  { name: 'Chhattisgarh', point: [82.1, 21.3] },
  { name: 'Maharashtra', point: [75.4, 19.1] },
  { name: 'Goa', point: [74.1, 15.4] },
  { name: 'Telangana', point: [79.3, 18.1] },
  { name: 'Andhra Pradesh', point: [80.7, 15.2] },
  { name: 'Karnataka', point: [76.2, 15.1] },
  { name: 'Kerala', point: [76.2, 10.6] },
  { name: 'Tamil Nadu', point: [78.4, 10.8] },
  { name: 'Odisha', point: [85.5, 20.1] },
]

export function RiversOfIndiaPage() {
  const [selectedRiver, setSelectedRiver] = React.useState<number | null>(null)
  const [filter, setFilter] = React.useState<RiverFilter>('A')
  const [animationKey, setAnimationKey] = React.useState(0)
  const [zoom, setZoom] = React.useState(1)
  const [pan, setPan] = React.useState<[number, number]>([0, 0])
  const [isDragging, setIsDragging] = React.useState(false)
  const mapRef = React.useRef<HTMLDivElement>(null)
  const stateMapRef = React.useRef<HTMLObjectElement>(null)
  const dragRef = React.useRef<{ pointerId: number; x: number; y: number; pan: [number, number] } | null>(null)
  const draggedRef = React.useRef(false)
  const visibleRivers = RIVERS.map((river, index) => ({ river, index }))
    .filter(({ river }) => filter === 'A' || river.type === filter)

  usePageMeta({
    title: 'Rivers of India Map: Major Rivers & Tributaries',
    description: 'Explore India’s major rivers on an interactive map. Follow river courses, compare Himalayan and Peninsular systems, and discover tributaries, states and notable districts.',
    canonicalPath: '/rivers-of-india',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Rivers of India Map: Major Rivers and Tributaries',
      description: 'Explore the courses, tributaries, states and notable districts of India’s major rivers with an interactive map.',
      url: 'https://ministryofpapers.com/rivers-of-india',
      learningResourceType: 'Interactive map',
      educationalLevel: 'General education',
      keywords: 'rivers of India map, Indian rivers and tributaries, Himalayan rivers, Peninsular rivers, river systems, Indian geography',
      inLanguage: 'en',
      isAccessibleForFree: true,
      provider: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
          { '@type': 'ListItem', position: 2, name: 'Geography', item: 'https://ministryofpapers.com/rivers-of-india' },
          { '@type': 'ListItem', position: 3, name: 'Rivers of India', item: 'https://ministryofpapers.com/rivers-of-india' },
        ],
      },
    },
  })

  const selectRiver = (index: number) => {
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }

    if (selectedRiver === index) {
      setSelectedRiver(null)
      return
    }

    setSelectedRiver(index)
    const bounds = mapRef.current?.getBoundingClientRect()
    if (!bounds) return
    const points = RIVERS[index].points.map(project)
    const middle = Math.floor(points.length / 2)
    const nextZoom = Math.max(zoom, 1.4)
    const pointX = points[middle][0] / 612 * bounds.width
    const pointY = points[middle][1] / 720 * bounds.height
    setZoom(nextZoom)
    setPan(clampPan([bounds.width / 2 - pointX * nextZoom, bounds.height / 2 - pointY * nextZoom], nextZoom))
  }

  const selected = selectedRiver === null ? null : RIVERS[selectedRiver]
  const selectedStudy = selected ? RIVER_STUDY_DETAILS[selected.name] : null
  const selectedSource = selected ? project(selected.points[0]) : null
  const selectedMouth = selected ? project(selected.points[selected.points.length - 1]) : null
  const mapContentStyle = {
    left: `${pan[0]}px`,
    top: `${pan[1]}px`,
    width: `${zoom * 100}%`,
    height: `${zoom * 100}%`,
  }

  const clampPan = React.useCallback((nextPan: [number, number], scale = zoom): [number, number] => {
    const bounds = mapRef.current?.getBoundingClientRect()
    if (!bounds) return nextPan
    return [
      Math.min(0, Math.max(bounds.width * (1 - scale), nextPan[0])),
      Math.min(0, Math.max(bounds.height * (1 - scale), nextPan[1])),
    ]
  }, [zoom])

  const zoomAt = (nextZoom: number, anchorX?: number, anchorY?: number) => {
    const bounds = mapRef.current?.getBoundingClientRect()
    if (!bounds) return
    const scale = Math.min(4, Math.max(1, nextZoom))
    const x = anchorX ?? bounds.width / 2
    const y = anchorY ?? bounds.height / 2
    const contentX = (x - pan[0]) / zoom
    const contentY = (y - pan[1]) / zoom
    setZoom(scale)
    setPan(clampPan([x - contentX * scale, y - contentY * scale], scale))
  }

  const handleMapPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as Element).closest('button')) return
    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, pan }
    draggedRef.current = false
  }

  const handleMapPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current
    if (!drag || drag.pointerId !== event.pointerId) return
    const deltaX = event.clientX - drag.x
    const deltaY = event.clientY - drag.y
    if (Math.abs(deltaX) > 3 || Math.abs(deltaY) > 3) {
      if (!draggedRef.current && event.currentTarget.hasPointerCapture(event.pointerId) === false) {
        event.currentTarget.setPointerCapture(event.pointerId)
      }
      draggedRef.current = true
      setIsDragging(true)
    }
    setPan(clampPan([drag.pan[0] + deltaX, drag.pan[1] + deltaY]))
  }

  const handleMapPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return
    dragRef.current = null
    setIsDragging(false)
  }

  const highlightSelectedStates = React.useCallback(() => {
    const svgDocument = stateMapRef.current?.contentDocument
    if (!svgDocument) return

    const selectedStates = (selected?.states ?? []).map((state) => state.toLowerCase().replace(/\s+\(.+\)$/, ''))
    const paths = [...svgDocument.querySelectorAll('path')]
    for (const path of paths) {
      const stateName = path.querySelector('title')?.textContent?.trim().toLowerCase()
      path.classList.remove('river-state-flash')
      path.style.removeProperty('--river-highlight')
      path.style.removeProperty('animation-delay')
      const stateIndex = stateName ? selectedStates.indexOf(stateName) : -1
      if (stateIndex !== -1 && selected) {
        path.style.setProperty('--river-highlight', selected.color)
        path.style.animationDelay = `${stateIndex * 1.15}s`
        void path.getBoundingClientRect()
        path.classList.add('river-state-flash')
      }
    }
  }, [selected])

  React.useEffect(() => {
    highlightSelectedStates()
  }, [highlightSelectedStates])

  React.useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const bounds = map.getBoundingClientRect()
      const nextZoom = Math.min(4, Math.max(1, zoom * (event.deltaY < 0 ? 1.15 : 1 / 1.15)))
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const contentX = (x - pan[0]) / zoom
      const contentY = (y - pan[1]) / zoom
      setZoom(nextZoom)
      setPan(clampPan([x - contentX * nextZoom, y - contentY * nextZoom], nextZoom))
    }

    map.addEventListener('wheel', handleWheel, { passive: false })
    return () => map.removeEventListener('wheel', handleWheel)
  }, [clampPan, zoom, pan])

  return (
    <section className="public-page rivers-page">
      <article className="public-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Geography</span><span aria-hidden="true">›</span><span>Rivers of India</span>
        </nav>

        <header className="rivers-hero">
          <span className="public-kicker">Interactive geography</span>
          <h1>Rivers of India Map: Major Rivers and Tributaries</h1>
          <p>
            Follow India’s major rivers from source to sea, explore their
            tributaries and see the states and districts along their courses.
            Select a river to learn about its route and surrounding geography.
          </p>
        </header>

        <section className="rivers-map-section" aria-label="Interactive map of Indian rivers">
          <div
            className={`rivers-map${isDragging ? ' is-dragging' : ''}`}
            onPointerDown={handleMapPointerDown}
            onPointerMove={handleMapPointerMove}
            onPointerUp={handleMapPointerUp}
            onPointerCancel={handleMapPointerUp}
            ref={mapRef}
          >
            <div className="rivers-map-content">
              <object
                aria-label="Indian state boundary map"
                className="rivers-state-object"
                data="/india-state-boundaries.svg"
                onLoad={highlightSelectedStates}
                ref={stateMapRef}
                style={mapContentStyle}
                type="image/svg+xml"
              />
              <svg
                key={animationKey}
                className={`rivers-map-svg${selectedRiver === null ? '' : ' has-selection'}`}
                viewBox="0 0 612 720"
                style={mapContentStyle}
                role="img"
                aria-labelledby="rivers-map-title rivers-map-description"
              >
              <title id="rivers-map-title">Map of India showing eleven major rivers</title>
              <desc id="rivers-map-description">
                Select a river route on the map or use the river buttons to see its source,
                mouth and the Indian states it flows through.
              </desc>
              <g className="rivers-state-labels" aria-label="State names">
                {STATE_LABELS.map(({ name, point }) => {
                  const [x, y] = project(point)
                  return (
                    <text key={name} x={x} y={y} textAnchor="middle">
                      <title>{name}</title>
                      {name}
                    </text>
                  )
                })}
              </g>
              <text className="rivers-sea-label" x={project([68.3, 15])[0]} y={project([68.3, 15])[1]}>Arabian Sea</text>
              <text className="rivers-sea-label" x={project([86, 14.5])[0]} y={project([86, 14.5])[1]}>Bay of Bengal</text>
              <text className="rivers-sea-label" x={project([75.5, 6.2])[0]} y={project([75.5, 6.2])[1]}>Indian Ocean</text>
              {visibleRivers.map(({ river, index }) => {
                const path = riverPath(river.points)
                const source = project(river.points[0])
                const labelPoint = project(river.labelPoint ?? river.points[Math.floor(river.points.length / 2)])
                const isSelected = selectedRiver === index

                return (
                  <g key={river.name}>
                    <g
                      className={`rivers-map-route${isSelected ? ' is-selected' : ''}`}
                      data-river={river.name}
                      role="button"
                      tabIndex={0}
                      aria-label={`${river.name} river: ${river.states.join(', ')}`}
                      aria-pressed={isSelected}
                      onClick={() => selectRiver(index)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          selectRiver(index)
                        }
                      }}
                    >
                      <path
                        className="rivers-route-line"
                        d={path}
                        pathLength="1"
                        stroke={river.color}
                        strokeWidth={isSelected ? 5.5 : 3.2}
                        style={{ animationDelay: `${index * 0.18}s` }}
                      />
                      <path className="rivers-route-flow" d={path} />
                      <circle className="rivers-route-drop" r="3.6" fill="#fff" stroke={river.color} strokeWidth="2">
                        <animateMotion dur={`${6 + index * 0.4}s`} repeatCount="indefinite" path={path} />
                      </circle>
                      <circle cx={source[0]} cy={source[1]} r="4" fill={river.color} stroke="#fff" strokeWidth="1.5" />
                      <path className="rivers-route-hit" d={path} />
                    </g>
                    <text
                      className="rivers-map-river-label"
                      data-river-label={river.name}
                      x={labelPoint[0]}
                      y={labelPoint[1] - 8}
                      textAnchor="middle"
                      aria-hidden="true"
                      style={{ fill: river.color }}
                    >
                      {river.name}
                    </text>
                  </g>
                )
              })}
              {selected && selectedSource && selectedMouth && (
                <g className="rivers-map-markers" aria-hidden="true">
                  <text className="rivers-map-label" x={selectedSource[0] + 8} y={selectedSource[1] - 6}>Source</text>
                  <text className="rivers-map-label" x={selectedMouth[0] + 8} y={selectedMouth[1] + 14}>Mouth</text>
                  <circle cx={selectedMouth[0]} cy={selectedMouth[1]} r="5" fill="none" stroke={selected.color} strokeWidth="2" />
                </g>
              )}
              </svg>
            </div>
            <div className="rivers-map-zoom-controls" role="group" aria-label="Map zoom controls">
              <button
                aria-label="Zoom in on map"
                disabled={zoom >= 4}
                onClick={() => zoomAt(zoom * 1.25)}
                type="button"
              >+</button>
              <button
                aria-label="Zoom out on map"
                disabled={zoom <= 1}
                onClick={() => zoomAt(zoom / 1.25)}
                type="button"
              >−</button>
              <button
                aria-label="Reset map zoom"
                disabled={zoom === 1}
                onClick={() => { setZoom(1); setPan([0, 0]) }}
                type="button"
              >Reset</button>
              <span className="rivers-map-zoom-hint">Scroll to zoom · drag to move</span>
            </div>
          </div>

          <div className="rivers-map-sidebar">
            <div className="rivers-map-controls" aria-label="Map controls">
              <div className="rivers-filter-controls" aria-label="Filter rivers">
                {FILTERS.map(({ key, label }) => (
                  <button
                    aria-pressed={filter === key}
                    className={filter === key ? 'is-active' : ''}
                    key={key}
                    onClick={() => { setFilter(key); setSelectedRiver(null) }}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <button
                className="rivers-replay-button"
                onClick={() => { setSelectedRiver(null); setZoom(1); setPan([0, 0]); setAnimationKey((current) => current + 1) }}
                type="button"
              >
                <span aria-hidden="true">▶</span> Replay
              </button>
            </div>

            <div className="rivers-list-card" aria-label="Select a river">
              {visibleRivers.map(({ river, index }) => (
                <button
                  aria-pressed={selectedRiver === index}
                  className={`rivers-list-button${selectedRiver === index ? ' is-active' : ''}`}
                  key={river.name}
                  onClick={() => selectRiver(index)}
                  type="button"
                >
                  <span className="rivers-list-dot" style={{ backgroundColor: river.color }} />
                  {river.name}
                </button>
              ))}
            </div>

            <article aria-live="polite" className="rivers-detail-card">
              {selected ? (
                <>
                  <h2 style={{ borderBottomColor: selected.color }}>{selected.name}</h2>
                  <p className="rivers-detail-type">
                    {selected.type === 'H' ? 'Himalayan river (perennial)' : 'Peninsular river (mainly monsoon-fed)'}
                  </p>
                  <dl>
                    <dt>Length</dt><dd>{selected.length}</dd>
                    <dt>Source</dt><dd>{selected.source}</dd>
                    <dt>Mouth</dt><dd>{selected.mouth}</dd>
                    <dt>States crossed</dt><dd>{selected.states.join(', ')}</dd>
                    <dt>Major tributaries</dt><dd>{selected.tributaries}</dd>
                  </dl>
                  <p>{selected.info}</p>
                  {selectedStudy && (
                    <section className="rivers-selected-study" aria-label={`${selected.name} river details`}>
                      <h3>Major Tributaries</h3>
                      <div className="rivers-bank-groups">
                        <section>
                          <h4>Right-Bank Tributaries</h4>
                          <ul>{selectedStudy.rightBank.map((name) => <li key={name}>{name}</li>)}</ul>
                        </section>
                        <section>
                          <h4>Left-Bank Tributaries</h4>
                          <ul>{selectedStudy.leftBank.map((name) => <li key={name}>{name}</li>)}</ul>
                        </section>
                      </div>
                      {selectedStudy.tributaryNote && <p>{selectedStudy.tributaryNote}</p>}
                      <h3>Notable districts by state</h3>
                      <ul className="rivers-district-list">
                        {selectedStudy.districts.map(({ state, names }) => (
                          <li key={state}><strong>{state}:</strong> {names.join(', ')}</li>
                        ))}
                      </ul>
                      <p className="rivers-detail-type">Selected river-adjacent districts and places, not an exhaustive district boundary list.</p>
                      <p className="rivers-detail-type">Banks are named looking downstream. Lists include named tributaries surfaced in Google river-system results and source tables; nested basin streams are identified in the notes. Names and bank classifications can vary between references.</p>
                    </section>
                  )}
                  <p className="rivers-border-note">
                    State names describe the main river course; some stretches form state
                    boundaries. River lengths vary slightly by source.
                  </p>
                </>
              ) : (
                <>
                  <h2>Select a river</h2>
                  <p className="rivers-detail-type">Explore the course and states crossed by each river.</p>
                  <p>Himalayan rivers are often perennial, while Peninsular rivers are more dependent on monsoon rainfall.</p>
                </>
              )}
            </article>
          </div>
        </section>

        <section className="rivers-study-notes" aria-labelledby="rivers-study-heading">
          <h2 id="rivers-study-heading">Understanding India’s river systems</h2>
          <p>
            Explore where each river begins, how it flows, which tributaries
            join it and where it meets the sea. The map labels are schematic;
            where a river forms a state boundary, the state list follows the
            main course and may differ between references.
          </p>
          <div className="rivers-study-grid">
            {riverGroups.map((group) => (
              <article className="rivers-study-card" key={group.title}>
                <h3>{group.title}</h3>
                <p>{group.description}</p>
                <p><strong>Major rivers:</strong> {group.rivers}</p>
              </article>
            ))}
          </div>
          <h3>Major rivers and states along their course</h3>
          <ul className="rivers-state-revision-list">
            {RIVERS.map((river) => (
              <li key={river.name}>
                <strong>{river.name}:</strong> {river.states.join(', ')}.
                <span> Major tributaries: {river.tributaries}</span>
              </li>
            ))}
          </ul>
          <h3>States and union territories labelled on the map</h3>
          <ul className="rivers-map-state-list">
            {STATE_LABELS.map(({ name }) => <li key={name}>{name}</li>)}
          </ul>
          <p className="rivers-attribution">
            Map boundary artwork: MapSVG via @svg-maps/india, licensed under
            Creative Commons Attribution 4.0 (CC BY 4.0).
          </p>
        </section>
      </article>
    </section>
  )
}
