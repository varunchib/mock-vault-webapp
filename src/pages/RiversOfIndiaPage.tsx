import * as React from 'react'
import { Link } from 'react-router-dom'
import { usePageMeta } from '../lib/usePageMeta'

type MapTributary = {
  n: string
  d: string
  s: [number, number]
}

type MapRiver = {
  n: string
  t: 'H' | 'P'
  c: string
  len: string
  src: string
  mouth: string
  info: string
  d: string
  m: string
  s: [number, number]
  e: [number, number]
  tr: MapTributary[]
}

type IndiaRiversMapData = {
  W: number
  H: number
  C: [string, string][]
  B: string
  st0: string
  CL: [string, number, number][]
  st: string
  tf: string
  lk: [string, number][]
  li: [string, string, [number, number]][]
  MK: [string, number, number, string][]
  R: MapRiver[]
}

type Lake = {
  name: string
  description: string
  point: [number, number]
}

type River = {
  name: string
  type: 'H' | 'P'
  color: string
  length: string
  source: string
  sourceRegion?: string
  mouth: string
  endLabel?: string
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
    sourceRegion: 'Tibet',
    mouth: 'Arabian Sea (via Pakistan)',
    states: ['Ladakh'],
    tributaries: 'Major basin rivers include Zanskar, Suru, Shyok, Gilgit, Kabul and the Punjab rivers that converge through the Panjnad.',
    info: 'Flows through Ladakh, the only stretch inside India. Its upper valley is among the highest river valleys in the world. Tributary lists for the full basin include rivers in Tibet, India, Pakistan and Afghanistan.',
    points: [[81.5, 32.5], [80.8, 32.2], [79.8, 32.5], [78.8, 33], [77.6, 34.1], [76.7, 34.8], [75.6, 35.3], [74.7, 35.8], [73.9, 35.4], [73.2, 34.7], [72.8, 33.6], [72.7, 32.3], [72.3, 31], [71.4, 29.7], [70.2, 28.3], [69.2, 26.9], [68.4, 25.7], [67.7, 24.7], [67.4, 24]],
    labelPoint: [77.6, 34.1],
  },
  {
    name: 'Sutlej',
    type: 'H',
    color: '#00acc1',
    length: '1,450 km (about 1,050 km in India)',
    source: 'Rakshastal Lake, Tibet',
    sourceRegion: 'Tibet',
    mouth: 'Joins the Chenab to form the Panjnad in Pakistan',
    endLabel: 'Panjnad confluence',
    states: ['Himachal Pradesh', 'Punjab'],
    tributaries: 'Spiti, Baspa and Beas; Beas meets the Sutlej at Harike, and the Sutlej later joins the Indus system through the Panjnad.',
    info: 'Enters India at Shipki La and feeds the Bhakra Nangal dam. It is the longest of the five rivers of Punjab.',
    points: [[81.2, 30.8], [80.6, 30.9], [79.7, 31.2], [78.8, 31.8], [78.1, 31.6], [77.4, 31.4], [76.7, 31.4], [76.1, 31.3], [75.5, 31.2], [74.7, 31], [73.7, 30.7], [72.8, 30.3], [71.8, 29.8], [71.1, 29.4]],
    labelPoint: [77.4, 31.4],
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
    points: [[79, 30.9], [78.6, 30.2], [78.2, 29.9], [79, 28.5], [79.5, 27.5], [80.3, 26.4], [81.8, 25.4], [83, 25.3], [84.9, 25.6], [86.9, 25.3], [87.9, 24.9], [88.7, 24.4], [89.6, 23.8], [90, 22.8], [89.4, 22]],
  },
  {
    name: 'Brahmaputra',
    type: 'H',
    color: '#8e24aa',
    length: '2,900 km (about 916 km in India)',
    source: 'Angsi Glacier, Tibet (Tsangpo)',
    sourceRegion: 'Tibet',
    mouth: 'Meets the Ganga-Padma system in Bangladesh before reaching the Meghna estuary, Bay of Bengal',
    states: ['Arunachal Pradesh', 'Assam'],
    tributaries: 'Dibang and Lohit join the Siang upstream; major Assam tributaries include Subansiri, Kameng, Manas, Sankosh, Beki, Raidak, Dhansiri, Kopili and Teesta.',
    info: 'Enters Arunachal Pradesh as the Siang and flows through Assam as a wide braided river with Majuli, one of the world’s largest river islands.',
    points: [[82, 30.4], [85, 29.8], [88.5, 29.5], [91.5, 29.3], [94.3, 29.4], [95.2, 29], [95.3, 28.1], [95, 27.5], [93.5, 26.8], [92, 26.3], [90.5, 26.2], [89.8, 25.9], [89.7, 24.8], [89.7, 23.8], [90.4, 23.2], [90.6, 22.1]],
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
  {
    name: 'Mahi',
    type: 'P',
    color: '#5e35b1',
    length: '583 km',
    source: 'Vindhya Range, Madhya Pradesh',
    mouth: 'Gulf of Khambhat, Arabian Sea',
    states: ['Madhya Pradesh', 'Rajasthan', 'Gujarat'],
    tributaries: 'The Som, Anas and Panam are among its major tributaries.',
    info: 'Flows northwest through Madhya Pradesh and Rajasthan before turning southwest through Gujarat to the Gulf of Khambhat.',
    points: [],
  },
  {
    name: 'Brahmani',
    type: 'P',
    color: '#00838f',
    length: 'About 799 km',
    source: 'Formed by the Sankh and South Koel rivers near Rourkela, Odisha',
    mouth: 'Bay of Bengal, Odisha',
    states: ['Jharkhand', 'Chhattisgarh', 'Odisha'],
    tributaries: 'The Sankh and South Koel unite to form the Brahmani; the Karo is another important tributary.',
    info: 'The Brahmani flows across Odisha and joins the Baitarani system near the coast before reaching the Bay of Bengal.',
    points: [],
  },
]

const RIVER_LABEL_FRACTIONS: Record<string, number> = {
  Indus: 0.5,
  Sutlej: 0.4,
  Yamuna: 0.45,
  Ganga: 0.6,
  Brahmaputra: 0.55,
  Narmada: 0.5,
  Tapti: 0.5,
  Mahanadi: 0.55,
  Godavari: 0.55,
  Krishna: 0.45,
  Kaveri: 0.5,
  Mahi: 0.45,
  Brahmani: 0.55,
}

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

const MAP_VIEWBOX = { x: 0, y: 0, width: 800, height: 774.1 }

function mercator(latitude: number) {
  return Math.log(Math.tan(Math.PI / 4 + latitude * Math.PI / 360))
}

function project([longitude, latitude]: [number, number]): [number, number] {
  const scale = 20 * 180 / Math.PI
  return [(longitude - 60) * 20, (mercator(40) - mercator(latitude)) * scale]
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
    rivers: 'Narmada, Tapti, Mahanadi, Godavari, Krishna, Kaveri, Mahi and Brahmani.',
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
  const [selectedLake, setSelectedLake] = React.useState<number | null>(null)
  const [indiaMap, setIndiaMap] = React.useState<IndiaRiversMapData | null>(null)
  const [mapLoadError, setMapLoadError] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<RiverFilter>('A')
  const [animationKey, setAnimationKey] = React.useState(0)
  const [zoom, setZoom] = React.useState(1)
  const [pan, setPan] = React.useState<[number, number]>([0, 0])
  const [isDragging, setIsDragging] = React.useState(false)
  const [showTributaries, setShowTributaries] = React.useState(true)
  const [showLakes, setShowLakes] = React.useState(true)
  const [showStates, setShowStates] = React.useState(true)
  const [riverLabelPositions, setRiverLabelPositions] = React.useState<Record<string, [number, number]>>({})
  const mapRef = React.useRef<HTMLDivElement>(null)
  const mapSvgRef = React.useRef<SVGSVGElement>(null)
  const dragRef = React.useRef<{ pointerId: number; x: number; y: number; pan: [number, number] } | null>(null)
  const draggedRef = React.useRef(false)
  const mapData = indiaMap
  const mapRivers = new Map(mapData?.R.map((river) => [river.n, river] as const) ?? [])
  const lakes: Lake[] = mapData ? [
    ...mapData.li.map(([name, description, point]) => ({ name, description, point })),
    ...mapData.MK.map(([name, x, y, description]) => ({ name, description, point: [x, y] as [number, number] })),
  ] : []
  const visibleRivers = RIVERS.map((river, index) => ({ river, index }))
    .filter(({ river }) => filter === 'A' || river.type === filter)

  React.useEffect(() => {
    let active = true
    void import('../data/india-rivers-map.json?url')
      .then(({ default: mapUrl }) => fetch(mapUrl))
      .then((response) => {
        if (!response.ok) throw new Error(`Map data request failed with status ${response.status}`)
        return response.json()
      })
      .then((data: IndiaRiversMapData) => {
        if (active) setIndiaMap(data)
      })
      .catch((error: unknown) => {
        console.error('Failed to load the rivers and lakes map data.', error)
        if (active) setMapLoadError('The map data could not be loaded. Please refresh the page.')
      })

    return () => { active = false }
  }, [])

  React.useLayoutEffect(() => {
    const svg = mapSvgRef.current
    if (!svg || !mapData) return

    const positions: Record<string, [number, number]> = {}
    for (const [index, river] of RIVERS.entries()) {
      if (filter !== 'A' && river.type !== filter) continue
      const path = svg.querySelector<SVGPathElement>(`[data-river-path="${index}"]`)
      const length = path?.getTotalLength()
      if (!path || !length) continue
      const point = path.getPointAtLength(length * (RIVER_LABEL_FRACTIONS[river.name] ?? 0.5))
      positions[river.name] = [point.x, point.y]
    }

    setRiverLabelPositions(positions)
  }, [animationKey, filter, mapData])

  usePageMeta({
    title: 'Rivers and Lakes of India: Interactive Map',
    description: 'Explore a full regional map of India’s major rivers, tributaries, lakes and state boundaries.',
    canonicalPath: '/rivers-of-india',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'Rivers and Lakes of India: Interactive Map',
      description: 'Explore the courses, tributaries, lakes, states and neighboring countries of India with an interactive map.',
      url: 'https://ministryofpapers.com/rivers-of-india',
      learningResourceType: 'Interactive map',
      educationalLevel: 'General education',
      keywords: 'rivers and lakes of India map, Indian rivers and tributaries, Himalayan rivers, Peninsular rivers, river systems, Indian geography',
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
      setSelectedLake(null)
      setSelectedRiver(null)
      setZoom(1)
      setPan([0, 0])
      return
    }

    setSelectedLake(null)
    setSelectedRiver(index)
    const bounds = mapRef.current?.getBoundingClientRect()
    const route = mapSvgRef.current?.querySelector<SVGPathElement>(`[data-river-path="${index}"]`)
    if (!bounds || !route) return
    const routeBounds = route.getBBox()
    const routeWidth = Math.max(routeBounds.width, 1)
    const routeHeight = Math.max(routeBounds.height, 1)
    const nextZoom = Math.min(4, Math.max(1, Math.min(
      MAP_VIEWBOX.width * 0.88 / routeWidth,
      MAP_VIEWBOX.height * 0.88 / routeHeight,
    )))
    const centerX = (routeBounds.x + routeBounds.width / 2 - MAP_VIEWBOX.x) / MAP_VIEWBOX.width * bounds.width
    const centerY = (routeBounds.y + routeBounds.height / 2 - MAP_VIEWBOX.y) / MAP_VIEWBOX.height * bounds.height
    setZoom(nextZoom)
    setPan(clampPan([
      bounds.width / 2 - centerX * nextZoom,
      bounds.height / 2 - centerY * nextZoom,
    ], nextZoom))
  }

  const selectLake = (index: number) => {
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }

    if (selectedLake === index) {
      setSelectedLake(null)
      setZoom(1)
      setPan([0, 0])
      return
    }

    setSelectedRiver(null)
    setSelectedLake(index)
    const bounds = mapRef.current?.getBoundingClientRect()
    if (!bounds) return
    const lake = lakes[index]
    if (!lake) throw new Error(`Missing lake details for index ${index}`)
    const [centerX, centerY] = lake.point
    const nextZoom = Math.min(4, Math.max(1, Math.min(
      MAP_VIEWBOX.width * 0.4 / 130,
      MAP_VIEWBOX.height * 0.4 / 130,
    )))
    const viewportX = (centerX - MAP_VIEWBOX.x) / MAP_VIEWBOX.width * bounds.width
    const viewportY = (centerY - MAP_VIEWBOX.y) / MAP_VIEWBOX.height * bounds.height
    setZoom(nextZoom)
    setPan(clampPan([
      bounds.width / 2 - viewportX * nextZoom,
      bounds.height / 2 - viewportY * nextZoom,
    ], nextZoom))
  }

  const selected = selectedRiver === null ? null : RIVERS[selectedRiver]
  const selectedLakeData = selectedLake === null ? null : lakes[selectedLake] ?? null
  const selectedStudy = selected ? RIVER_STUDY_DETAILS[selected.name] : null
  const selectedMapRiver = selected ? mapRivers.get(selected.name) : null
  const indusMapRiver = mapRivers.get('Indus')
  if (mapData && !indusMapRiver) throw new Error('Missing Indus map route')
  const selectedSource = selectedMapRiver?.s ?? null
  const selectedMouth = selectedMapRiver?.e ?? null
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

  if (mapLoadError) {
    return (
      <section className="public-page rivers-page">
        <article className="public-shell">
          <h1>Rivers and Lakes of India: Interactive Map</h1>
          <p role="alert">{mapLoadError}</p>
        </article>
      </section>
    )
  }

  if (!mapData) {
    return (
      <section className="public-page rivers-page">
        <article className="public-shell">
          <h1>Rivers and Lakes of India: Interactive Map</h1>
          <p role="status">Loading the full map…</p>
        </article>
      </section>
    )
  }

  return (
    <section className="public-page rivers-page">
      <article className="public-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Geography</span><span aria-hidden="true">›</span><span>Rivers of India</span>
        </nav>

        <header className="rivers-hero">
          <span className="public-kicker">Interactive geography</span>
          <h1>Rivers and Lakes of India: Interactive Map</h1>
          <p>
            Explore detailed river courses, tributaries, lakes, state borders
            and neighboring countries. Select any river or lake to zoom in and
            see its details.
          </p>
        </header>

        <section className="rivers-map-section" aria-label="Interactive map of Indian rivers and lakes">
          <div className="rivers-map-column">
            <div
              className={`rivers-map${isDragging ? ' is-dragging' : ''}`}
              onPointerDown={handleMapPointerDown}
              onPointerMove={handleMapPointerMove}
              onPointerUp={handleMapPointerUp}
              onPointerCancel={handleMapPointerUp}
              ref={mapRef}
            >
              <svg
                key={animationKey}
                className={`rivers-map-svg${selectedRiver === null ? '' : ' has-selection'}${showTributaries ? '' : ' no-tributaries'}${showLakes ? '' : ' hide-lakes'}${showStates ? '' : ' hide-states'}`}
                ref={mapSvgRef}
                viewBox={`${MAP_VIEWBOX.x} ${MAP_VIEWBOX.y} ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
                style={mapContentStyle}
                role="img"
                aria-labelledby="rivers-map-title rivers-map-description"
              >
                <title id="rivers-map-title">Interactive map of India’s rivers and lakes</title>
                <desc id="rivers-map-description">
                  Detailed river and tributary routes, lakes, country borders and Indian state boundaries.
                  Select a river or lake to zoom in and see information.
                </desc>
                <g className="rivers-country-shapes" aria-label="Neighboring country boundaries">
                  {mapData.C.map(([name, path]) => (
                    <path className="rivers-country-shape" d={path} key={name}>
                      <title>{name}</title>
                    </path>
                  ))}
                </g>
                <path className="rivers-country-border" d={mapData.B} />
                <g
                  aria-label="Indian state fill"
                  className="rivers-state-fill"
                  transform={mapData.tf}
                  dangerouslySetInnerHTML={{ __html: mapData.st0 }}
                />
                <g
                  aria-label="Indian state boundaries"
                  className="rivers-state-boundaries"
                  transform={mapData.tf}
                  dangerouslySetInnerHTML={{ __html: mapData.st }}
                />
                {showLakes && (
                  <g className="rivers-lakes" aria-label="Lakes and reservoirs">
                    {mapData.lk.map(([path, lakeIndex], shapeIndex) => (
                      <path
                        className="rivers-lake-shape"
                        d={path}
                        key={`lake-shape-${shapeIndex}`}
                        data-lake-index={lakeIndex >= 0 ? lakeIndex : undefined}
                        role={lakeIndex >= 0 ? 'button' : undefined}
                        tabIndex={lakeIndex >= 0 ? 0 : undefined}
                        aria-label={lakeIndex >= 0 ? lakes[lakeIndex].name : undefined}
                        onClick={lakeIndex >= 0 ? () => selectLake(lakeIndex) : undefined}
                        onKeyDown={lakeIndex >= 0 ? (event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            selectLake(lakeIndex)
                          }
                        } : undefined}
                      >
                        {lakeIndex >= 0 && <title>{lakes[lakeIndex].name}</title>}
                      </path>
                    ))}
                    {mapData.MK.map(([name, x, y], markerIndex) => {
                      const lakeIndex = mapData.li.length + markerIndex
                      return (
                        <g
                          className={`rivers-lake-marker${selectedLake === lakeIndex ? ' is-selected' : ''}`}
                          key={name}
                          role="button"
                          tabIndex={0}
                          aria-label={name}
                          onClick={() => selectLake(lakeIndex)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              selectLake(lakeIndex)
                            }
                          }}
                        >
                          <circle cx={x} cy={y} r="3.2" />
                          <title>{name}</title>
                        </g>
                      )
                    })}
                  </g>
                )}
                <g className="rivers-country-labels" aria-label="Country names">
                  {mapData.CL.map(([label, x, y]) => (
                    <text key={label} x={x} y={y} textAnchor="middle">
                      {label}
                    </text>
                  ))}
                </g>
                {indusMapRiver && selected?.sourceRegion !== 'Tibet' && (
                  <text
                    className="rivers-region-label"
                    x={indusMapRiver.s[0]}
                    y={indusMapRiver.s[1] - 16}
                    textAnchor="middle"
                  >
                    Tibet
                  </text>
                )}
                <text className="rivers-sea-label" x={project([64.5, 15])[0]} y={project([64.5, 15])[1]}>Arabian Sea</text>
                <text className="rivers-sea-label" x={project([86, 13])[0]} y={project([86, 13])[1]}>Bay of Bengal</text>
                <text className="rivers-sea-label" x={project([77, 6])[0]} y={project([77, 6])[1]}>Indian Ocean</text>
                {showStates && (
                  <g className="rivers-state-labels" aria-label="State names">
                    {STATE_LABELS.map(({ name, point }) => {
                      const [x, y] = project(point)
                      return <text key={name} x={x} y={y} textAnchor="middle">{name}</text>
                    })}
                  </g>
                )}
                {visibleRivers.map(({ river, index }) => {
                  const mapRiver = mapRivers.get(river.name)
                  if (!mapRiver) throw new Error(`Missing map route for ${river.name}`)
                  const isSelected = selectedRiver === index

                  return (
                    <g
                      className={`rivers-map-route${isSelected ? ' is-selected' : ''}`}
                      data-river-index={index}
                      key={river.name}
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
                        d={mapRiver.d}
                        data-river-path={index}
                        id={`rivers-route-${index}`}
                        pathLength="1"
                        stroke={river.color}
                        strokeWidth={isSelected ? 4 : 2.4}
                        style={{ animationDelay: `${index * 0.18}s` }}
                      />
                      <path className="rivers-route-flow" d={mapRiver.d} />
                      <circle className="rivers-route-drop" r="3" fill="#fff" stroke={river.color} strokeWidth="1.6">
                        <animateMotion dur={`${10 + index}s`} repeatCount="indefinite" path={mapRiver.m} />
                      </circle>
                      <circle cx={mapRiver.s[0]} cy={mapRiver.s[1]} r="3" fill={river.color} stroke="#fff" strokeWidth="1" />
                      <path className="rivers-route-hit" d={mapRiver.d} />
                      {showTributaries && mapRiver.tr.map((tributary) => (
                        <g className="rivers-tributary" key={tributary.n}>
                          <path
                            className="rivers-tributary-line"
                            d={tributary.d}
                            pathLength="1"
                            stroke={river.color}
                            style={{ animationDelay: `${index * 0.2 + 2.2}s` }}
                          />
                          <path className="rivers-route-flow rivers-tributary-flow" d={tributary.d} />
                          <path className="rivers-route-hit rivers-tributary-hit" d={tributary.d}>
                            <title>{`${tributary.n} (tributary of ${river.name})`}</title>
                          </path>
                        </g>
                      ))}
                      {showTributaries && selectedRiver === index && mapRiver.tr.map((tributary) => (
                        <text
                          className="rivers-map-label rivers-tributary-label"
                          key={`${tributary.n}-label`}
                          x={tributary.s[0] + 4}
                          y={tributary.s[1] - 3}
                        >
                          {tributary.n}
                        </text>
                      ))}
                      {riverLabelPositions[river.name] && (
                        <text
                          className="rivers-map-river-label"
                          aria-hidden="true"
                          fill={river.color}
                          textAnchor="middle"
                          x={riverLabelPositions[river.name][0]}
                          y={riverLabelPositions[river.name][1] - 5}
                        >
                          {river.name}
                        </text>
                      )}
                    </g>
                  )
                })}
                {selected && selectedMapRiver && selectedSource && selectedMouth && (
                  <g className="rivers-map-markers" aria-hidden="true">
                    <text
                      className="rivers-map-label"
                      x={selectedSource[0] + (selectedSource[0] <= selectedMouth[0] ? 6 : -6)}
                      y={selectedSource[1] - 5}
                      textAnchor={selectedSource[0] <= selectedMouth[0] ? 'start' : 'end'}
                    >
                      {selected.sourceRegion ?? 'Source'}
                    </text>
                    <text
                      className="rivers-map-label"
                      x={selectedMouth[0] + (selectedMouth[0] > selectedSource[0] ? -6 : 6)}
                      y={selectedMouth[1] + 11}
                      textAnchor={selectedMouth[0] > selectedSource[0] ? 'end' : 'start'}
                    >
                      {selected.endLabel ?? 'Mouth'}
                    </text>
                    <circle cx={selectedMouth[0]} cy={selectedMouth[1]} r="4.5" fill="none" stroke={selected.color} strokeWidth="1.6" />
                  </g>
                )}
                {selectedLakeData && selectedLake !== null && (
                  <g className="rivers-map-markers" aria-hidden="true">
                    <circle cx={selectedLakeData.point[0]} cy={selectedLakeData.point[1]} r="7" fill="none" stroke="#3f86b5" strokeWidth="1.6" />
                    <text className="rivers-map-label" x={selectedLakeData.point[0] + 9} y={selectedLakeData.point[1] + 3}>
                      {selectedLakeData.name}
                    </text>
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
              >Reset              </button>
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
                    onClick={() => {
                      setFilter(key)
                      setSelectedRiver(null)
                      setSelectedLake(null)
                      setZoom(1)
                      setPan([0, 0])
                    }}
                    type="button"
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="rivers-layer-controls" aria-label="Map layers">
                <button aria-pressed={showTributaries} className={showTributaries ? 'is-active' : ''} onClick={() => setShowTributaries((value) => !value)} type="button">
                  Tributaries
                </button>
                <button aria-pressed={showLakes} className={showLakes ? 'is-active' : ''} onClick={() => setShowLakes((value) => !value)} type="button">
                  Lakes
                </button>
                <button aria-pressed={showStates} className={showStates ? 'is-active' : ''} onClick={() => setShowStates((value) => !value)} type="button">
                  States
                </button>
              </div>
              <button
                className="rivers-replay-button"
                onClick={() => {
                  setSelectedRiver(null)
                  setSelectedLake(null)
                  setZoom(1)
                  setPan([0, 0])
                  setAnimationKey((current) => current + 1)
                }}
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
              ) : selectedLakeData ? (
                <>
                  <h2>{selectedLakeData.name}</h2>
                  <p className="rivers-detail-type">Lake or reservoir</p>
                  <p>{selectedLakeData.description}</p>
                </>
              ) : (
                <>
                  <h2>Select a river or lake</h2>
                  <p className="rivers-detail-type">Explore full river courses, tributaries, lakes and reservoirs.</p>
                  <p>Himalayan rivers are often perennial, while Peninsular rivers are more dependent on monsoon rainfall.</p>
                </>
              )}
            </article>
          </div>
          <div className="rivers-list-card rivers-lake-list" aria-label="Select a lake or reservoir">
            <h3>Lakes and reservoirs</h3>
            {lakes.map((lake, index) => (
              <button
                aria-pressed={selectedLake === index}
                className={`rivers-list-button${selectedLake === index ? ' is-active' : ''}`}
                key={lake.name}
                onClick={() => selectLake(index)}
                type="button"
              >
                <span className="rivers-lake-dot" />
                {lake.name}
              </button>
            ))}
          </div>
        </section>

        <section className="rivers-study-notes" aria-labelledby="rivers-study-heading">
          <h2 id="rivers-study-heading">Understanding India’s river systems</h2>
          <p>
            Explore where rivers begin, which tributaries join them, and where
            they meet the sea. River routes and state boundaries are mapped
            across India and neighboring regions; state lists follow the main
            course and may differ between references.
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
          <p className="rivers-attribution">
            Country outlines, rivers and lakes: Natural Earth (public domain).
            State boundaries: MapSVG via @svg-maps/india, licensed under{' '}
            <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
              CC BY 4.0
            </a>.
          </p>
        </section>
      </article>
    </section>
  )
}
