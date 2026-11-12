import * as React from 'react'
import { Link, useSearchParams } from 'react-router-dom'
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
  sourceIndex?: number
  examRelevant: boolean
}

type MapMode = 'rivers' | 'lakes'

type MapPointer = {
  x: number
  y: number
}

type PinchGesture = {
  distance: number
  zoom: number
  anchor: [number, number]
}

export type River = {
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

// Shared by the map renderer and the standalone river guide.
// eslint-disable-next-line react-refresh/only-export-components
export const RIVERS: River[] = [
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
export type RiverStudyDetails = {
  leftBank: string[]
  rightBank: string[]
  districts: { state: string; names: string[] }[]
  tributaryNote?: string
}

type TributaryOption = {
  name: string
  bank: 'Left bank' | 'Right bank' | 'Basin / headstream'
  mapRoute: MapTributary | null
  mainRiverIndex: number | null
}

const TRIBUTARY_EXPLANATIONS: Record<string, string> = {
  Jhelum: 'Rises at Verinag in Kashmir, flows through Srinagar and Wular Lake, then continues into Pakistan and joins the Chenab.',
  Chenab: 'Formed by the Chandra and Bhaga rivers at Tandi in Himachal Pradesh; it joins the Indus system through the Panjnad.',
  Ravi: 'Rises in the Himalaya of Himachal Pradesh, flows through the Punjab region, and joins the Chenab in Pakistan.',
  Beas: 'Rises near Beas Kund in Himachal Pradesh and joins the Sutlej at Harike in Punjab.',
  Chambal: 'Rises in the Vindhya region of Madhya Pradesh and joins the Yamuna near Etawah in Uttar Pradesh.',
  Betwa: 'Rises in Madhya Pradesh and joins the Yamuna near Hamirpur in Uttar Pradesh.',
  Parbati: 'A tributary of the Chambal in the Yamuna basin; it reaches the Yamuna system through the Chambal rather than joining the Yamuna directly.',
  Ghaghara: 'Known upstream as the Karnali in Nepal; it crosses the northern plains and joins the Ganga in Bihar.',
  Gandak: 'Flows from the Nepal Himalaya into the northern plains and joins the Ganga near the Bihar–Uttar Pradesh border.',
  'Kosi (Sapt Kosi)': 'Formed by Himalayan tributaries in Nepal; it joins the Ganga near Kursela in Bihar.',
  Son: 'Rises near Amarkantak in Madhya Pradesh and flows northeast to meet the Ganga near the Patna region.',
  Lohit: 'Rises in eastern Tibet and joins the Siang in Arunachal Pradesh, contributing to the Brahmaputra system.',
  Teesta: 'Rises in the Sikkim Himalaya and flows through Sikkim and West Bengal before joining the Brahmaputra–Jamuna system in Bangladesh.',
  Tel: 'An important Mahanadi tributary that flows through western Odisha and joins the Mahanadi near Sonepur.',
  Wainganga: 'A major Godavari-basin river; it joins the Wardha to form the Pranhita, which then meets the Godavari.',
  Indravati: 'Rises in the Eastern Ghats region and flows through central India before joining the Godavari.',
  Bhima: 'Rises near Bhimashankar in Maharashtra and joins the Krishna near the Maharashtra–Karnataka region.',
  Tungabhadra: 'Formed by the Tunga and Bhadra rivers in Karnataka; it joins the Krishna near Alampur.',
  Sankh: 'A headstream of the Brahmani: it joins the South Koel near Rourkela to form the Brahmani.',
}

// Shared by the map renderer and the standalone river guide.
// eslint-disable-next-line react-refresh/only-export-components
export const RIVER_STUDY_DETAILS: Record<string, RiverStudyDetails> = {
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
    tributaryNote: 'Purna and Girna are among the major tributaries of the Tapti, with Panzara, Waghur, Aner and Gomai also draining the basin. These rivers join the Tapti as it flows west from Madhya Pradesh through Maharashtra and Gujarat to the Arabian Sea. Lists and bank groupings vary across reference tables.',
    districts: [
      { state: 'Madhya Pradesh', names: ['Betul', 'Burhanpur'] },
      { state: 'Maharashtra', names: ['Jalgaon'] },
      { state: 'Gujarat', names: ['Surat'] },
    ],
  },
  Mahanadi: {
    leftBank: ['Seonath', 'Hasdeo', 'Mand', 'Ib'],
    rightBank: ['Pairi', 'Ong', 'Tel', 'Jonk'],
    tributaryNote: 'The Seonath (Shivnath), Hasdeo, Mand and Ib join from the left bank; Pairi, Ong, Tel and Jonk are major right-bank tributaries. Together, these rivers collect runoff from the Chhattisgarh basin and Odisha uplands before the Mahanadi enters its delta and the Bay of Bengal.',
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
    tributaryNote: 'The Kaveri’s Karnataka tributaries include Harangi, Hemavati, Shimsha and Arkavathi, while Kabini, Bhavani, Noyyal and Amaravati join farther downstream. The river’s east-flowing basin crosses the Deccan plateau and enters Tamil Nadu before spreading through its delta. Tributary naming and bank grouping can differ among references.',
    districts: [
      { state: 'Karnataka', names: ['Kodagu', 'Mysuru', 'Mandya'] },
      { state: 'Tamil Nadu', names: ['Erode', 'Karur', 'Tiruchirappalli', 'Thanjavur'] },
    ],
  },
  Mahi: {
    leftBank: [],
    rightBank: [],
    tributaryNote: 'The Som, Anas and Panam are among the principal tributaries of the Mahi. They drain parts of Madhya Pradesh, Rajasthan and Gujarat before joining the west-flowing main river. Bank classifications and lists of smaller tributaries vary between references, so this guide highlights the commonly cited basin rivers without assigning disputed banks.',
    districts: [],
  },
  Brahmani: {
    leftBank: [],
    rightBank: [],
    tributaryNote: 'The Brahmani begins where the Sankh and South Koel meet near Rourkela. These headstreams form the river rather than joining it farther downstream; the Karo is another important tributary. The Brahmani then crosses Odisha and flows through the coastal delta system toward the Bay of Bengal.',
    districts: [],
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

const OUTSIDE_INDIA_LAKES = new Set([
  'Nam Co',
  'Siling Co',
  'Mansarovar (Mapam Yumco)',
  'Yamdrok Lake',
  'Tarbela Reservoir',
  'Kaptai Lake',
])

const EXAM_RELEVANT_LAKES = new Set([
  'Pangong Tso',
  'Krishna Raja Sagar',
  'Bhadra Reservoir',
  'Tungabhadra Reservoir',
  'Gobind Sagar',
  'Hirakud Reservoir',
  'Nagarjuna Sagar',
  'Gandhi Sagar',
  'Chilika Lake',
  'Dal Lake',
  'Wular Lake',
  'Sambhar Lake',
  'Loktak Lake',
  'Vembanad Lake',
  'Pulicat Lake',
  'Tso Moriri',
  'Kolleru Lake',
  'Deepor Beel',
  'Lonar Lake',
  'Nalsarovar',
  'Bhojtal',
  'Ashtamudi Lake',
  'Sasthamkotta Lake',
  'Renuka Lake',
  'Anchar Lake',
  'Manasbal Lake',
  'Surinsar Lake',
  'Mansar Lake',
  'Naini Lake',
  'Bhimtal',
  'Sattal',
  'Roopkund',
  'Chandratal',
  'Tso Kar',
  'Gurudongmar Lake',
  'Son Beel',
  'Kanwar Taal',
  'Bakhira Lake',
  'Ansupa Lake',
  'Tampara Lake',
  'Sur Sarovar',
  'Ana Sagar',
  'Pushkar Lake',
  'Thol Lake',
  'Periyar Lake',
  'Kodaikanal Lake',
])

const ADDITIONAL_INDIAN_LAKES: { name: string; description: string; point: [number, number] }[] = [
  { name: 'Tso Moriri', description: 'High-altitude lake in the Changthang region of Ladakh, a Ramsar wetland.', point: project([78.3, 32.9]) },
  { name: 'Kolleru Lake', description: 'Large freshwater lake between the Krishna and Godavari deltas in Andhra Pradesh.', point: project([81.2, 16.7]) },
  { name: 'Deepor Beel', description: 'Freshwater lake and Ramsar wetland near Guwahati, Assam.', point: project([91.7, 26.1]) },
  { name: 'Lonar Lake', description: 'Crater lake in Maharashtra formed by a meteorite impact in basaltic rock.', point: project([76.5, 19.98]) },
  { name: 'Nalsarovar', description: 'Shallow seasonal wetland and bird sanctuary in Gujarat.', point: project([72.05, 22.8]) },
  { name: 'Bhojtal', description: 'Large reservoir, also called Upper Lake, in Bhopal, Madhya Pradesh.', point: project([77.35, 23.25]) },
  { name: 'Ashtamudi Lake', description: 'Palm-shaped backwater lake in Kerala, part of the state’s coastal wetland system.', point: project([76.57, 8.95]) },
  { name: 'Sasthamkotta Lake', description: 'Largest freshwater lake in Kerala and an important source of drinking water.', point: project([76.62, 9.03]) },
  { name: 'Renuka Lake', description: 'Natural lake in Himachal Pradesh and a Ramsar wetland.', point: project([77.45, 30.61]) },
  { name: 'Tsomgo Lake', description: 'Glacial lake in East Sikkim, also known as Changu Lake.', point: project([88.77, 27.37]) },
  { name: 'Umiam Lake', description: 'Reservoir lake north of Shillong in Meghalaya.', point: project([91.88, 25.67]) },
  { name: 'Rudrasagar Lake', description: 'Ramsar wetland in Tripura, known for the Neermahal water palace.', point: project([91.31, 23.50]) },
  { name: 'Harike Wetland', description: 'Wetland at the confluence of the Beas and Sutlej in Punjab.', point: project([74.95, 31.16]) },
  { name: 'Sukhna Lake', description: 'Reservoir lake at Chandigarh, at the foothills of the Shivalik range.', point: project([76.82, 30.74]) },
  { name: 'Hussain Sagar', description: 'Historic lake between Hyderabad and Secunderabad in Telangana.', point: project([78.47, 17.42]) },
  { name: 'Lake Pichola', description: 'Historic artificial lake in Udaipur, Rajasthan.', point: project([73.68, 24.57]) },
  { name: 'Tehri Reservoir', description: 'Reservoir formed by the Tehri Dam on the Bhagirathi in Uttarakhand.', point: project([78.48, 30.38]) },
  { name: 'Sardar Sarovar Reservoir', description: 'Reservoir on the Narmada River in Gujarat.', point: project([73.75, 21.83]) },
  { name: 'Ukai Reservoir', description: 'Reservoir on the Tapti River in Gujarat.', point: project([73.58, 21.23]) },
  { name: 'Anchar Lake', description: 'Shallow urban lake at Soura in Srinagar, Jammu and Kashmir.', point: project([74.783, 34.15]) },
  { name: 'Manasbal Lake', description: 'Freshwater lake in Ganderbal district, north of Srinagar in Jammu and Kashmir.', point: project([74.667, 34.25]) },
  { name: 'Nigeen Lake', description: 'Lake in Srinagar connected to the Dal Lake water system.', point: project([74.87, 34.10]) },
  { name: 'Mansar Lake', description: 'Natural lake in Jammu region, paired geographically with nearby Surinsar Lake.', point: project([75.15, 32.69]) },
  { name: 'Surinsar Lake', description: 'Natural lake in Jammu region and part of the Surinsar-Mansar wetland complex.', point: project([75.03, 32.76]) },
  { name: 'Gangabal Lake', description: 'High-altitude glacial lake at the foot of Mount Harmukh in Kashmir.', point: project([74.92, 34.38]) },
  { name: 'Naini Lake', description: 'Natural freshwater lake in Nainital, Uttarakhand.', point: project([79.46, 29.39]) },
  { name: 'Bhimtal', description: 'Natural lake in the Kumaon region of Uttarakhand, near Nainital.', point: project([79.56, 29.34]) },
  { name: 'Sattal', description: 'Interconnected group of freshwater lakes in the Kumaon region of Uttarakhand.', point: project([79.55, 29.35]) },
  { name: 'Naukuchiatal', description: 'Natural lake in Uttarakhand whose name refers to its nine-cornered shape.', point: project([79.60, 29.32]) },
  { name: 'Roopkund', description: 'High-altitude glacial lake in the Garhwal Himalaya of Uttarakhand.', point: project([79.73, 30.26]) },
  { name: 'Hemkund Lake', description: 'High-altitude glacial lake in Chamoli district, Uttarakhand.', point: project([79.59, 30.70]) },
  { name: 'Chandratal', description: 'Crescent-shaped high-altitude lake in the Spiti region of Himachal Pradesh.', point: project([77.62, 32.48]) },
  { name: 'Suraj Tal', description: 'High-altitude lake below Baralacha La in Himachal Pradesh; the Bhaga River originates nearby.', point: project([77.42, 32.75]) },
  { name: 'Rewalsar Lake', description: 'Lake near Mandi in Himachal Pradesh, sacred to Buddhist, Hindu and Sikh communities.', point: project([76.83, 31.63]) },
  { name: 'Tso Kar', description: 'High-altitude salt lake and wetland complex on the Changthang plateau of Ladakh.', point: project([78.00, 33.29]) },
  { name: 'Gurudongmar Lake', description: 'High-altitude lake in North Sikkim, near the Tibetan border.', point: project([88.71, 28.02]) },
  { name: 'Sela Lake', description: 'High-altitude lake near Sela Pass in Arunachal Pradesh.', point: project([92.08, 27.50]) },
  { name: 'Sangetsar Lake', description: 'High-altitude lake near Tawang in Arunachal Pradesh, also known as Madhuri Lake.', point: project([91.87, 27.58]) },
  { name: 'Tam Dil', description: 'Natural lake in Mizoram near Saitual.', point: project([92.78, 23.73]) },
  { name: 'Shilloi Lake', description: 'Natural lake in the Patkai range of Nagaland.', point: project([94.77, 26.01]) },
  { name: 'Son Beel', description: 'Large seasonal wetland lake in southern Assam, in Karimganj district.', point: project([92.62, 24.68]) },
  { name: 'Chandubi Lake', description: 'Natural lake in Assam at the foothills of the Garo hills.', point: project([91.46, 26.03]) },
  { name: 'Kanwar Taal', description: 'Oxbow lake and wetland in Begusarai district, Bihar, also called Kabartal.', point: project([86.13, 25.62]) },
  { name: 'Kanjli Wetland', description: 'Wetland in Punjab formed around the Kali Bein stream near Kapurthala.', point: project([75.20, 31.41]) },
  { name: 'Ropar Wetland', description: 'Reservoir and wetland on the Sutlej River in Punjab, near Rupnagar.', point: project([76.52, 30.97]) },
  { name: 'Bakhira Lake', description: 'Shallow freshwater wetland in Sant Kabir Nagar district, Uttar Pradesh.', point: project([83.97, 26.92]) },
  { name: 'Ansupa Lake', description: 'Freshwater oxbow lake on the Mahanadi floodplain in Odisha.', point: project([85.63, 20.45]) },
  { name: 'Tampara Lake', description: 'Freshwater lake near Chhatrapur in Ganjam district, Odisha.', point: project([84.98, 19.36]) },
  { name: 'Sur Sarovar', description: 'Reservoir near Agra, Uttar Pradesh, also known as Keetham Lake.', point: project([77.87, 27.23]) },
  { name: 'Fateh Sagar Lake', description: 'Artificial lake in Udaipur, Rajasthan, connected to the city’s lake system.', point: project([73.67, 24.60]) },
  { name: 'Jaisamand Lake', description: 'Large artificial lake, also called Dhebar Lake, in Udaipur district, Rajasthan.', point: project([73.99, 24.24]) },
  { name: 'Ana Sagar', description: 'Historic artificial lake in Ajmer, Rajasthan.', point: project([74.63, 26.48]) },
  { name: 'Pushkar Lake', description: 'Sacred lake in Pushkar, Rajasthan, associated with the annual Pushkar fair.', point: project([74.55, 26.49]) },
  { name: 'Rajsamand Lake', description: 'Historic artificial lake in Rajsamand district, Rajasthan.', point: project([73.88, 25.07]) },
  { name: 'Thol Lake', description: 'Shallow freshwater wetland and bird habitat in Gujarat, northwest of Ahmedabad.', point: project([72.38, 23.15]) },
  { name: 'Tawa Reservoir', description: 'Reservoir on the Tawa River in Madhya Pradesh, a tributary of the Narmada.', point: project([77.95, 22.58]) },
  { name: 'Powai Lake', description: 'Artificial lake in Mumbai, Maharashtra.', point: project([72.90, 19.13]) },
  { name: 'Vihar Lake', description: 'Reservoir in Mumbai, Maharashtra, within Sanjay Gandhi National Park.', point: project([72.91, 19.15]) },
  { name: 'Jayakwadi Reservoir', description: 'Reservoir on the Godavari River near Paithan in Maharashtra.', point: project([75.38, 19.48]) },
  { name: 'Himayat Sagar', description: 'Reservoir on the outskirts of Hyderabad, Telangana.', point: project([78.37, 17.33]) },
  { name: 'Osman Sagar', description: 'Reservoir on the outskirts of Hyderabad, Telangana, also known as Gandipet Lake.', point: project([78.29, 17.38]) },
  { name: 'Ousteri Lake', description: 'Freshwater lake and wetland on the Puducherry-Tamil Nadu border, also called Oussudu.', point: project([79.75, 11.94]) },
  { name: 'Veeranam Lake', description: 'Large irrigation reservoir in Cuddalore district, Tamil Nadu.', point: project([79.55, 11.26]) },
  { name: 'Puzhal Lake', description: 'Reservoir north of Chennai, Tamil Nadu, also called Red Hills Lake.', point: project([80.16, 13.18]) },
  { name: 'Chembarambakkam Lake', description: 'Reservoir southwest of Chennai, Tamil Nadu.', point: project([80.06, 13.00]) },
  { name: 'Kodaikanal Lake', description: 'Artificial star-shaped lake in Kodaikanal, Tamil Nadu.', point: project([77.49, 10.23]) },
  { name: 'Ooty Lake', description: 'Artificial lake in Udhagamandalam in the Nilgiri Hills, Tamil Nadu.', point: project([76.69, 11.41]) },
  { name: 'Periyar Lake', description: 'Reservoir in the Periyar Tiger Reserve, Kerala, formed by the Mullaperiyar project.', point: project([77.15, 9.54]) },
  { name: 'Pookode Lake', description: 'Freshwater lake in Wayanad district, Kerala.', point: project([76.00, 11.52]) },
  { name: 'Vellayani Lake', description: 'Freshwater lake in Thiruvananthapuram district, Kerala.', point: project([76.99, 8.43]) },
]

const LAKE_EXAM_NOTES = [
  { name: 'Pangong Tso', region: 'Ladakh', category: 'High-altitude saltwater lake', examFact: 'A transboundary lake extending from Ladakh into Tibet; its brackish water freezes in winter.' },
  { name: 'Krishna Raja Sagar', region: 'Karnataka', category: 'Kaveri reservoir', examFact: 'Formed by the Krishna Raja Sagara Dam across the Kaveri near Mysuru; the Brindavan Gardens are nearby.' },
  { name: 'Bhadra Reservoir', region: 'Karnataka', category: 'Reservoir', examFact: 'Created by the Bhadra Dam on the Bhadra River, part of the Tungabhadra-Krishna basin.' },
  { name: 'Tungabhadra Reservoir', region: 'Karnataka', category: 'Reservoir', examFact: 'Formed by the Tungabhadra Dam near Hosapete on a major tributary of the Krishna.' },
  { name: 'Gobind Sagar', region: 'Himachal Pradesh', category: 'Reservoir', examFact: 'Created by the Bhakra Dam on the Sutlej; Bhakra-Nangal is a major multipurpose river-valley project.' },
  { name: 'Hirakud Reservoir', region: 'Odisha', category: 'Reservoir', examFact: 'Built across the Mahanadi near Sambalpur; the Hirakud Dam is one of the world’s longest earthen dams.' },
  { name: 'Nagarjuna Sagar', region: 'Telangana and Andhra Pradesh', category: 'Reservoir', examFact: 'A major masonry dam and reservoir on the Krishna River, on the state boundary.' },
  { name: 'Gandhi Sagar', region: 'Madhya Pradesh', category: 'Reservoir', examFact: 'Located on the Chambal River; it is one of the four major dams in the Chambal Valley Project.' },
  { name: 'Chilika Lake', region: 'Odisha', category: 'Brackish coastal lagoon', examFact: 'India’s largest coastal lagoon and a Ramsar wetland; known for migratory birds and Irrawaddy dolphins.' },
  { name: 'Dal Lake', region: 'Jammu and Kashmir', category: 'Freshwater urban lake', examFact: 'A Himalayan lake in Srinagar, noted for houseboats, shikaras and floating gardens.' },
  { name: 'Wular Lake', region: 'Jammu and Kashmir', category: 'Freshwater tectonic lake', examFact: 'One of India’s largest freshwater lakes; the Jhelum flows through it and it moderates floods in the Kashmir Valley.' },
  { name: 'Sambhar Lake', region: 'Rajasthan', category: 'Inland saline lake', examFact: 'India’s largest inland salt lake and an important source of salt; designated a Ramsar wetland.' },
  { name: 'Loktak Lake', region: 'Manipur', category: 'Freshwater lake', examFact: 'Famous for floating phumdis and Keibul Lamjao, the world’s only floating national park and home of the Sangai.' },
  { name: 'Vembanad Lake', region: 'Kerala', category: 'Backwater and brackish lake', examFact: 'India’s longest lake and a Ramsar wetland; the Nehru Trophy boat race is held on its waters.' },
  { name: 'Pulicat Lake', region: 'Andhra Pradesh and Tamil Nadu', category: 'Brackish coastal lagoon', examFact: 'India’s second-largest brackish-water lagoon; Sriharikota separates it from the Bay of Bengal.' },
  { name: 'Tso Moriri', region: 'Ladakh', category: 'High-altitude freshwater lake', examFact: 'A Ramsar wetland in the Changthang region, important for migratory birds and high-altitude wildlife.' },
  { name: 'Kolleru Lake', region: 'Andhra Pradesh', category: 'Freshwater lake', examFact: 'Lies between the Krishna and Godavari deltas and is protected as a wildlife sanctuary and Ramsar wetland.' },
  { name: 'Deepor Beel', region: 'Assam', category: 'Freshwater wetland', examFact: 'A Ramsar wetland near Guwahati and an important staging site for migratory birds.' },
  { name: 'Lonar Lake', region: 'Maharashtra', category: 'Meteorite-impact crater lake', examFact: 'Formed in basalt by a meteorite impact; its saline and alkaline water makes it a distinctive geological site.' },
  { name: 'Nalsarovar', region: 'Gujarat', category: 'Seasonal freshwater wetland', examFact: 'A Ramsar wetland and bird sanctuary that attracts migratory waterbirds.' },
  { name: 'Bhojtal', region: 'Madhya Pradesh', category: 'Artificial freshwater lake', examFact: 'Also called Upper Lake, it is a major source of water for Bhopal.' },
  { name: 'Ashtamudi Lake', region: 'Kerala', category: 'Brackish backwater', examFact: 'A Ramsar wetland whose palm-shaped channels connect to Kerala’s backwater network.' },
  { name: 'Sasthamkotta Lake', region: 'Kerala', category: 'Freshwater lake', examFact: 'Kerala’s largest freshwater lake and an important source of drinking water.' },
  { name: 'Renuka Lake', region: 'Himachal Pradesh', category: 'Natural freshwater lake', examFact: 'A Ramsar wetland in Sirmaur district, named after the goddess Renuka.' },
  { name: 'Tsomgo Lake', region: 'Sikkim', category: 'Glacial lake', examFact: 'Also called Changu Lake, it lies on the route between Gangtok and the Nathu La area.' },
  { name: 'Umiam Lake', region: 'Meghalaya', category: 'Reservoir lake', examFact: 'A reservoir north of Shillong, also known as Barapani.' },
  { name: 'Rudrasagar Lake', region: 'Tripura', category: 'Freshwater wetland', examFact: 'A Ramsar wetland known for Neermahal, the palace built on an island in the lake.' },
  { name: 'Harike Wetland', region: 'Punjab', category: 'Riverine wetland and reservoir', examFact: 'Formed near the confluence of the Beas and Sutlej; an important wintering site for waterbirds.' },
  { name: 'Sukhna Lake', region: 'Chandigarh', category: 'Artificial reservoir', examFact: 'A rain-fed reservoir at the foothills of the Shivalik range.' },
  { name: 'Hussain Sagar', region: 'Telangana', category: 'Artificial lake', examFact: 'A historic lake between Hyderabad and Secunderabad, built during the Qutb Shahi period.' },
  { name: 'Lake Pichola', region: 'Rajasthan', category: 'Artificial freshwater lake', examFact: 'A historic lake in Udaipur, associated with the City Palace and island palaces.' },
  { name: 'Tehri Reservoir', region: 'Uttarakhand', category: 'Hydroelectric reservoir', examFact: 'Formed by the Tehri Dam on the Bhagirathi, a headstream of the Ganga.' },
  { name: 'Sardar Sarovar Reservoir', region: 'Gujarat', category: 'Multipurpose reservoir', examFact: 'Formed by the Sardar Sarovar Dam on the Narmada as part of the Narmada Valley Project.' },
  { name: 'Ukai Reservoir', region: 'Gujarat', category: 'Multipurpose reservoir', examFact: 'Created by the Ukai Dam on the Tapti River.' },
  { name: 'Anchar Lake', region: 'Jammu and Kashmir', category: 'Urban freshwater lake', examFact: 'Located at Soura in Srinagar; it is part of the Kashmir Valley’s interconnected lake and wetland system.' },
  { name: 'Manasbal Lake', region: 'Jammu and Kashmir', category: 'Freshwater lake', examFact: 'Located in Ganderbal district, north of Srinagar, and known for its depth and aquatic vegetation.' },
  { name: 'Nigeen Lake', region: 'Jammu and Kashmir', category: 'Freshwater urban lake', examFact: 'A lake in Srinagar linked to the Dal Lake water system.' },
  { name: 'Mansar Lake', region: 'Jammu and Kashmir', category: 'Natural freshwater lake', examFact: 'A well-known lake in Jammu region, paired with nearby Surinsar Lake.' },
  { name: 'Surinsar Lake', region: 'Jammu and Kashmir', category: 'Natural freshwater lake', examFact: 'Together with Mansar Lake, it forms the Surinsar-Mansar wetland complex.' },
  { name: 'Gangabal Lake', region: 'Jammu and Kashmir', category: 'High-altitude glacial lake', examFact: 'Situated at the foot of Mount Harmukh in the Kashmir Himalaya.' },
  { name: 'Naini Lake', region: 'Uttarakhand', category: 'Natural freshwater lake', examFact: 'The crescent-shaped lake at Nainital gives the town its name.' },
  { name: 'Bhimtal', region: 'Uttarakhand', category: 'Natural freshwater lake', examFact: 'A prominent Kumaon lake near Nainital, with an island in its center.' },
  { name: 'Sattal', region: 'Uttarakhand', category: 'Interconnected lake group', examFact: 'A group of seven interconnected freshwater lakes in the Kumaon region.' },
  { name: 'Naukuchiatal', region: 'Uttarakhand', category: 'Natural freshwater lake', examFact: 'Its name means “lake of nine corners”; it lies in the Kumaon region.' },
  { name: 'Roopkund', region: 'Uttarakhand', category: 'High-altitude glacial lake', examFact: 'A glacial lake in the Garhwal Himalaya, popularly known as Skeleton Lake.' },
  { name: 'Hemkund Lake', region: 'Uttarakhand', category: 'High-altitude glacial lake', examFact: 'A glacial lake in Chamoli district, beside the Sikh pilgrimage site Hemkund Sahib.' },
  { name: 'Chandratal', region: 'Himachal Pradesh', category: 'High-altitude lake', examFact: 'A crescent-shaped lake in the Spiti region, near the source region of the Chandra River.' },
  { name: 'Suraj Tal', region: 'Himachal Pradesh', category: 'High-altitude lake', examFact: 'Lies below Baralacha La; the Bhaga River originates from the lake.' },
  { name: 'Rewalsar Lake', region: 'Himachal Pradesh', category: 'Natural lake', examFact: 'A sacred lake near Mandi revered by Buddhist, Hindu and Sikh communities.' },
  { name: 'Tso Kar', region: 'Ladakh', category: 'High-altitude salt lake', examFact: 'A salt-lake and wetland complex on the Changthang plateau, known for wildlife and breeding birds.' },
  { name: 'Gurudongmar Lake', region: 'Sikkim', category: 'High-altitude lake', examFact: 'A high-altitude lake in North Sikkim, near the Tibetan border.' },
  { name: 'Sela Lake', region: 'Arunachal Pradesh', category: 'High-altitude lake', examFact: 'Located near Sela Pass on the route to Tawang.' },
  { name: 'Sangetsar Lake', region: 'Arunachal Pradesh', category: 'High-altitude lake', examFact: 'A lake near Tawang, also widely known as Madhuri Lake.' },
  { name: 'Tam Dil', region: 'Mizoram', category: 'Natural freshwater lake', examFact: 'A natural lake near Saitual and one of Mizoram’s best-known lakes.' },
  { name: 'Shilloi Lake', region: 'Nagaland', category: 'Natural lake', examFact: 'A natural lake in the Patkai range of eastern Nagaland.' },
  { name: 'Son Beel', region: 'Assam', category: 'Seasonal wetland lake', examFact: 'A large seasonal wetland lake in Karimganj district in southern Assam.' },
  { name: 'Chandubi Lake', region: 'Assam', category: 'Natural lake', examFact: 'A lake at the foothills of the Garo hills, southwest of Guwahati.' },
  { name: 'Kanwar Taal', region: 'Bihar', category: 'Oxbow lake and wetland', examFact: 'Also called Kabartal, this oxbow lake is in Begusarai district.' },
  { name: 'Kanjli Wetland', region: 'Punjab', category: 'Riverine wetland', examFact: 'A Ramsar wetland formed around the Kali Bein stream near Kapurthala.' },
  { name: 'Ropar Wetland', region: 'Punjab', category: 'Reservoir and riverine wetland', examFact: 'A Ramsar wetland on the Sutlej near Rupnagar, also called Ropar Lake.' },
  { name: 'Bakhira Lake', region: 'Uttar Pradesh', category: 'Freshwater wetland', examFact: 'A shallow freshwater wetland in Sant Kabir Nagar district and a Ramsar site.' },
  { name: 'Ansupa Lake', region: 'Odisha', category: 'Freshwater oxbow lake', examFact: 'An oxbow lake on the Mahanadi floodplain in Cuttack district.' },
  { name: 'Tampara Lake', region: 'Odisha', category: 'Freshwater lake', examFact: 'A Ramsar wetland near Chhatrapur in Ganjam district.' },
  { name: 'Sur Sarovar', region: 'Uttar Pradesh', category: 'Reservoir and wetland', examFact: 'Also called Keetham Lake, it is a bird sanctuary near Agra.' },
  { name: 'Fateh Sagar Lake', region: 'Rajasthan', category: 'Artificial freshwater lake', examFact: 'One of the interconnected lakes of Udaipur, northwest of Lake Pichola.' },
  { name: 'Jaisamand Lake', region: 'Rajasthan', category: 'Artificial freshwater lake', examFact: 'Also called Dhebar Lake, it is an extensive artificial lake in Udaipur district.' },
  { name: 'Ana Sagar', region: 'Rajasthan', category: 'Historic artificial lake', examFact: 'A historic lake in Ajmer, built during the 12th century.' },
  { name: 'Pushkar Lake', region: 'Rajasthan', category: 'Sacred lake', examFact: 'A sacred lake in Pushkar, associated with the town’s annual camel and livestock fair.' },
  { name: 'Rajsamand Lake', region: 'Rajasthan', category: 'Historic artificial lake', examFact: 'A historic lake in Rajasthan, built near the town of Rajsamand.' },
  { name: 'Thol Lake', region: 'Gujarat', category: 'Freshwater wetland', examFact: 'A Ramsar wetland and bird sanctuary northwest of Ahmedabad.' },
  { name: 'Tawa Reservoir', region: 'Madhya Pradesh', category: 'River reservoir', examFact: 'Formed on the Tawa River, a tributary of the Narmada.' },
  { name: 'Powai Lake', region: 'Maharashtra', category: 'Artificial urban lake', examFact: 'An artificial lake in Mumbai, on the edge of Sanjay Gandhi National Park.' },
  { name: 'Vihar Lake', region: 'Maharashtra', category: 'Reservoir', examFact: 'A major source reservoir for Mumbai, located within Sanjay Gandhi National Park.' },
  { name: 'Jayakwadi Reservoir', region: 'Maharashtra', category: 'River reservoir', examFact: 'A large reservoir on the Godavari near Paithan, created by the Jayakwadi Dam.' },
  { name: 'Himayat Sagar', region: 'Telangana', category: 'Reservoir', examFact: 'A reservoir on the outskirts of Hyderabad, built across the Musi River system.' },
  { name: 'Osman Sagar', region: 'Telangana', category: 'Reservoir', examFact: 'Also called Gandipet Lake, it is a reservoir on the outskirts of Hyderabad.' },
  { name: 'Ousteri Lake', region: 'Puducherry and Tamil Nadu', category: 'Freshwater wetland', examFact: 'Also known as Oussudu Lake, it lies near the Puducherry-Tamil Nadu border.' },
  { name: 'Veeranam Lake', region: 'Tamil Nadu', category: 'Irrigation reservoir', examFact: 'A major reservoir in Cuddalore district, supplied through the Cauvery delta canal system.' },
  { name: 'Puzhal Lake', region: 'Tamil Nadu', category: 'Reservoir', examFact: 'Also called Red Hills Lake, it is an important water-supply reservoir for Chennai.' },
  { name: 'Chembarambakkam Lake', region: 'Tamil Nadu', category: 'Reservoir', examFact: 'A reservoir southwest of Chennai and one of the city’s drinking-water sources.' },
  { name: 'Kodaikanal Lake', region: 'Tamil Nadu', category: 'Artificial freshwater lake', examFact: 'A star-shaped artificial lake in the hill station of Kodaikanal.' },
  { name: 'Ooty Lake', region: 'Tamil Nadu', category: 'Artificial freshwater lake', examFact: 'An artificial lake in Udhagamandalam, in the Nilgiri Hills.' },
  { name: 'Periyar Lake', region: 'Kerala', category: 'Reservoir', examFact: 'A reservoir in Periyar Tiger Reserve, formed by the Mullaperiyar project.' },
  { name: 'Pookode Lake', region: 'Kerala', category: 'Freshwater lake', examFact: 'A natural freshwater lake in Wayanad district.' },
  { name: 'Vellayani Lake', region: 'Kerala', category: 'Freshwater lake', examFact: 'A freshwater lake in Thiruvananthapuram district, used for irrigation and local water needs.' },
] as const

const LAKE_EXAM_NOTE_BY_NAME = new Map<string, (typeof LAKE_EXAM_NOTES)[number]>(
  LAKE_EXAM_NOTES.map((note) => [note.name, note]),
)

type LakeStudyFact = {
  label: string
  value: string
  emphasis?: string[]
}

const LAKE_STUDY_DETAILS: Record<string, LakeStudyFact[]> = {
  'Dal Lake': [
    { label: 'Nicknames', value: 'Srinagar’s Jewel; Jewel in the Crown of Kashmir', emphasis: ['Srinagar’s Jewel', 'Jewel in the Crown of Kashmir'] },
    { label: 'Setting', value: 'Srinagar, Jammu and Kashmir, below the Zabarwan Range.' },
    { label: 'Basins', value: 'Often described as Gagribal, Lokut Dal, Bod Dal and Nagin/Nigeen; some references treat Nigeen as a separate lake.' },
    { label: 'Water and features', value: 'The Telbal stream is a major water source. Known for floating gardens (rad), houseboats, shikaras, and the Rup Lank (Char Chinar) and Sona Lank islands.' },
    { label: 'Exam note', value: 'Often described in regional references as Jammu and Kashmir’s second-largest lake; rankings vary with how the connected lake system is measured.' },
  ],
  'Wular Lake': [
    { label: 'District and setting', value: 'Bandipora area, Kashmir Valley, Jammu and Kashmir.' },
    { label: 'Origin', value: 'Tectonic freshwater lake.' },
    { label: 'River connection', value: 'The Jhelum flows through the lake.' },
    { label: 'Exam distinction', value: 'Commonly identified as Jammu and Kashmir’s largest freshwater lake.' },
    { label: 'Conservation', value: 'Ramsar wetland since 23 March 1990; listed area is 18,900 hectares.' },
  ],
  'Manasbal Lake': [
    { label: 'District and setting', value: 'Ganderbal district, north of Srinagar, Jammu and Kashmir.' },
    { label: 'Origin', value: 'Often described in regional references as tectonic.' },
    { label: 'Exam distinction', value: 'Often called the deepest lake in Kashmir; this is a regional comparison, not an India-wide ranking.' },
    { label: 'Known for', value: 'Lotus blooms and Jaroka Bagh, a Mughal garden on its shore.' },
  ],
  'Anchar Lake': [
    { label: 'Locality', value: 'Soura area of Srinagar, Jammu and Kashmir.' },
    { label: 'Character', value: 'Shallow urban lake.' },
    { label: 'Connections', value: 'Part of the Kashmir Valley’s connected lake and wetland system; associated with Sindh Nallah inflows and waterway links toward Kushalsar and Nigeen.' },
  ],
  'Nigeen Lake': [
    { label: 'Setting', value: 'Srinagar, west of Dal Lake, Jammu and Kashmir.' },
    { label: 'Connection', value: 'Linked to Dal Lake by a narrow channel; treated as part of the wider Dal system in some references and as a separate lake in others.' },
  ],
  'Mansar Lake': [
    { label: 'Exam connection', value: 'Study together with nearby Surinsar Lake as the Surinsar–Mansar lake pair.' },
  ],
  'Surinsar Lake': [
    { label: 'Exam connection', value: 'Paired with Mansar Lake in the Surinsar–Mansar wetland complex.' },
  ],
  'Gangabal Lake': [
    { label: 'Setting', value: 'At the foot of Mount Harmukh in Ganderbal district, Jammu and Kashmir.' },
    { label: 'Also known as', value: 'Harmukh Ganga.', emphasis: ['Harmukh Ganga'] },
    { label: 'Outflow', value: 'Flows toward nearby Nundkol and then through the Wangat stream system.' },
  ],
}

function renderLakeFactValue(value: string, emphasis: string[] = []): React.ReactNode {
  if (emphasis.length === 0) return value
  const escapedTerms = emphasis.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  const matcher = new RegExp(`(${escapedTerms.join('|')})`, 'g')
  const emphasizedTerms = new Set(emphasis)
  return value.split(matcher).map((part, index) => (
    emphasizedTerms.has(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part
  ))
}

function LakeQuickReference() {
  return (
    <details className="rivers-lake-reference">
      <summary>Lake and reservoir quick reference ({LAKE_EXAM_NOTES.length} entries)</summary>
      <p className="rivers-lake-reference-intro">
        Key locations, classifications and exam facts for the lakes and reservoirs shown on the map.
        Exact dimensions are included only where the current reference data provides them.
      </p>
      <div className="rivers-lake-reference-grid">
        {LAKE_EXAM_NOTES.map((note) => {
          const studyFacts = LAKE_STUDY_DETAILS[note.name]
          return (
            <article className="rivers-lake-reference-card" key={note.name}>
              <h4>{note.name}</h4>
              <dl>
                <dt>Location</dt><dd>{note.region}</dd>
                <dt>Type</dt><dd>{note.category}</dd>
                {studyFacts?.map((fact) => (
                  <React.Fragment key={fact.label}>
                    <dt>{fact.label}</dt>
                    <dd>{renderLakeFactValue(fact.value, fact.emphasis)}</dd>
                  </React.Fragment>
                ))}
                <dt>Exam fact</dt><dd>{note.examFact}</dd>
              </dl>
            </article>
          )
        })}
      </div>
    </details>
  )
}

const MULTI_STATE_LAKE_REGIONS: Record<string, string[]> = {
  'Andhra Pradesh and Tamil Nadu': ['Andhra Pradesh', 'Tamil Nadu'],
  'Puducherry and Tamil Nadu': ['Puducherry', 'Tamil Nadu'],
  'Telangana and Andhra Pradesh': ['Telangana', 'Andhra Pradesh'],
}

function lakeStates(region: string | undefined): string[] {
  if (!region) return ['Other / location not listed']
  return MULTI_STATE_LAKE_REGIONS[region] ?? [region]
}

function GeographyStudyGuide() {
  return (
    <section className="rivers-study-notes" aria-labelledby="rivers-study-heading">
      <h2 id="rivers-study-heading">Quick geography revision</h2>
      <div className="rivers-quick-revision">
        <article className="rivers-revision-item">
          <h3>River regimes</h3>
          <p>Himalayan rivers are generally perennial, fed by snowmelt and rain; most Peninsular rivers depend more on monsoon rainfall.</p>
        </article>
        <article className="rivers-revision-item">
          <h3>Direction and landforms</h3>
          <p>Most major Peninsular rivers flow east to the Bay of Bengal. Narmada and Tapti flow west through rift valleys to the Arabian Sea.</p>
        </article>
        <article className="rivers-revision-item">
          <h3>Lake quick clues</h3>
          <p>Wular—Jhelum; Loktak—floating phumdis; Sambhar—inland saline lake; Lonar—impact crater; Chilika—coastal lagoon.</p>
        </article>
      </div>
      <LakeQuickReference />
      <p className="rivers-attribution">
        Country outlines, rivers and lakes: Natural Earth (public domain).
        State boundaries: MapSVG via @svg-maps/india, licensed under{' '}
        <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noreferrer">
          CC BY 4.0
        </a>.
      </p>
    </section>
  )
}

export function RiversOfIndiaPage() {
  const [searchParams] = useSearchParams()
  const [selectedRiver, setSelectedRiver] = React.useState<number | null>(null)
  const [selectedTributary, setSelectedTributary] = React.useState<string | null>(null)
  const [tributaryScrollRequest, setTributaryScrollRequest] = React.useState(0)
  const [selectedLake, setSelectedLake] = React.useState<number | null>(null)
  const [mapMode, setMapMode] = React.useState<MapMode>('rivers')
  const [indiaMap, setIndiaMap] = React.useState<IndiaRiversMapData | null>(null)
  const [mapLoadError, setMapLoadError] = React.useState<string | null>(null)
  const [filter, setFilter] = React.useState<RiverFilter>('A')
  const [lakeSearch, setLakeSearch] = React.useState('')
  const [lakeState, setLakeState] = React.useState('all')
  const [zoom, setZoom] = React.useState(1)
  const [pan, setPan] = React.useState<[number, number]>([0, 0])
  const [isDragging, setIsDragging] = React.useState(false)
  const [showTributaries, setShowTributaries] = React.useState(true)
  const [riverLabelPositions, setRiverLabelPositions] = React.useState<Record<string, [number, number]>>({})
  const [riverAnimation, setRiverAnimation] = React.useState(0)
  const mapRef = React.useRef<HTMLDivElement>(null)
  const mapSvgRef = React.useRef<SVGSVGElement>(null)
  const tributaryDetailRef = React.useRef<HTMLElement>(null)
  const dragRef = React.useRef<{ pointerId: number; x: number; y: number; pan: [number, number] } | null>(null)
  const pointersRef = React.useRef(new Map<number, MapPointer>())
  const pinchRef = React.useRef<PinchGesture | null>(null)
  const viewportRef = React.useRef({ zoom: 1, pan: [0, 0] as [number, number] })
  const wheelCommitTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)
  const draggedRef = React.useRef(false)
  const mapData = indiaMap
  const mapRivers = new Map(mapData?.R.map((river) => [river.n, river] as const) ?? [])
  const lakes: Lake[] = mapData ? [
    ...mapData.li.flatMap(([name, description, point], sourceIndex) => OUTSIDE_INDIA_LAKES.has(name)
      ? []
      : [{ name, description, point, sourceIndex, examRelevant: EXAM_RELEVANT_LAKES.has(name) }]),
    ...mapData.MK.map(([name, x, y, description]) => ({
      name,
      description,
      point: [x, y] as [number, number],
      examRelevant: EXAM_RELEVANT_LAKES.has(name),
    })),
    ...ADDITIONAL_INDIAN_LAKES.map((lake) => ({
      ...lake,
      examRelevant: EXAM_RELEVANT_LAKES.has(lake.name),
    })),
  ] : []
  const lakeIndexBySource = new Map(lakes.flatMap((lake, index) => lake.sourceIndex === undefined ? [] : [[lake.sourceIndex, index] as const]))
  const mappedLakeCount = mapData ? mapData.li.filter(([name]) => !OUTSIDE_INDIA_LAKES.has(name)).length : 0
  const normalizedLakeSearch = lakeSearch.trim().toLocaleLowerCase()
  const lakeStateCounts = lakes.reduce((counts, lake) => {
    const region = LAKE_EXAM_NOTE_BY_NAME.get(lake.name)?.region
    for (const state of lakeStates(region)) counts.set(state, (counts.get(state) ?? 0) + 1)
    return counts
  }, new Map<string, number>())
  const sortedLakeStates = [...lakeStateCounts.keys()].sort((a, b) => {
    if (a.startsWith('Other /')) return 1
    if (b.startsWith('Other /')) return -1
    return a.localeCompare(b)
  })
  const lakeGroups = lakes.reduce<{ region: string; entries: { lake: Lake; index: number }[] }[]>((groups, lake, index) => {
    if (normalizedLakeSearch && !lake.name.toLocaleLowerCase().includes(normalizedLakeSearch)) return groups
    const region = LAKE_EXAM_NOTE_BY_NAME.get(lake.name)?.region ?? 'Other / location not listed'
    if (lakeState !== 'all' && !lakeStates(LAKE_EXAM_NOTE_BY_NAME.get(lake.name)?.region).includes(lakeState)) return groups
    let group = groups.find((candidate) => candidate.region === region)
    if (!group) {
      group = { region, entries: [] }
      groups.push(group)
    }
    group.entries.push({ lake, index })
    return groups
  }, [])
  const isLakeVisible = (index: number) => {
    if (lakeState === 'all') return true
    const region = LAKE_EXAM_NOTE_BY_NAME.get(lakes[index]?.name ?? '')?.region
    return lakeStates(region).includes(lakeState)
  }
  const filteredLakeCount = lakeGroups.reduce((count, group) => count + group.entries.length, 0)
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
  }, [filter, mapData])

  // Select river from URL query param e.g. /india-physical-geography-map?river=indus
  React.useEffect(() => {
    const riverParam = searchParams.get('river')
    if (!riverParam || !mapData) return
    const target = riverParam.toLowerCase().replace(/[^a-z0-9]/g, '')
    const matchIndex = RIVERS.findIndex(
      (r) => r.name.toLowerCase().replace(/[^a-z0-9]/g, '') === target
    )
    if (matchIndex !== -1) {
      selectRiver(matchIndex)
    }
  }, [searchParams, mapData])

  usePageMeta({
    title: 'India Physical Geography Map: Rivers, Lakes & Exam Facts',
    description: 'Explore an interactive physical geography map of India with major rivers, tributaries, lakes and reservoirs, plus concise competitive-exam facts.',
    canonicalPath: '/india-physical-geography-map',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'LearningResource',
      name: 'India Physical Geography Map: Rivers, Lakes and Exam Facts',
      description: 'Study major Indian rivers, tributaries, lakes and reservoirs, their states, river connections and competitive-exam facts with an interactive map.',
      url: 'https://ministryofpapers.com/india-physical-geography-map',
      learningResourceType: 'Interactive map',
      educationalLevel: 'General education',
      keywords: 'rivers and lakes of India map, major lakes of India, Indian rivers and tributaries, Indian geography questions, Himalayan rivers, Peninsular rivers, reservoirs of India',
      inLanguage: 'en',
      isAccessibleForFree: true,
      provider: { '@type': 'Organization', name: 'Ministry of Papers', url: 'https://ministryofpapers.com' },
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://ministryofpapers.com' },
          { '@type': 'ListItem', position: 2, name: 'Geography', item: 'https://ministryofpapers.com/india-physical-geography-map' },
          { '@type': 'ListItem', position: 3, name: 'India Geography Map', item: 'https://ministryofpapers.com/india-physical-geography-map' },
        ],
      },
    },
  })

  const clampPan = React.useCallback((nextPan: [number, number], scale = viewportRef.current.zoom): [number, number] => {
    const bounds = mapRef.current?.getBoundingClientRect()
    if (!bounds) return nextPan
    return [
      Math.min(0, Math.max(bounds.width * (1 - scale), nextPan[0])),
      Math.min(0, Math.max(bounds.height * (1 - scale), nextPan[1])),
    ]
  }, [])

  const setMapViewport = React.useCallback((scale: number, nextPan: [number, number], commit = true) => {
    const boundedPan = clampPan(nextPan, scale)
    viewportRef.current = { zoom: scale, pan: boundedPan }
    const svg = mapSvgRef.current
    if (svg) {
      svg.style.left = `${boundedPan[0]}px`
      svg.style.top = `${boundedPan[1]}px`
      svg.style.width = `${scale * 100}%`
      svg.style.height = `${scale * 100}%`
    }
    if (commit) {
      setZoom(scale)
      setPan(boundedPan)
    }
  }, [clampPan])

  const trackMapSelection = (contentType: 'river' | 'lake', name: string) => {
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'select_content', { content_type: contentType, item_id: name })
    }
  }

  const selectRiver = (index: number) => {
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }

    trackMapSelection('river', RIVERS[index].name)
    setSelectedLake(null)
    setSelectedTributary(null)
    setMapMode('rivers')
    setSelectedRiver(index)
    setRiverAnimation((animation) => animation + 1)
    const bounds = mapRef.current?.getBoundingClientRect()
    const route = mapSvgRef.current?.querySelector<SVGPathElement>(`[data-river-path="${index}"]`)
    if (!bounds || !route) return
    const riverGroup = mapSvgRef.current?.querySelector<SVGGElement>(`.rivers-map-route[data-river-index="${index}"]`)
    const routeBounds = (riverGroup ?? route).getBBox()
    const routeWidth = Math.max(routeBounds.width, 1)
    const routeHeight = Math.max(routeBounds.height, 1)
    const nextZoom = Math.min(4, Math.max(1, Math.min(
      MAP_VIEWBOX.width * 0.88 / routeWidth,
      MAP_VIEWBOX.height * 0.88 / routeHeight,
    )))
    const centerX = (routeBounds.x + routeBounds.width / 2 - MAP_VIEWBOX.x) / MAP_VIEWBOX.width * bounds.width
    const centerY = (routeBounds.y + routeBounds.height / 2 - MAP_VIEWBOX.y) / MAP_VIEWBOX.height * bounds.height
    setMapViewport(nextZoom, [
      bounds.width / 2 - centerX * nextZoom,
      bounds.height / 2 - centerY * nextZoom,
    ])
  }

  const selectLake = (index: number) => {
    if (draggedRef.current) {
      draggedRef.current = false
      return
    }

    trackMapSelection('lake', lakes[index].name)
    setLakeState(lakeStates(LAKE_EXAM_NOTE_BY_NAME.get(lakes[index].name)?.region)[0])
    setSelectedRiver(null)
    setSelectedTributary(null)
    setMapMode('lakes')
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
    setMapViewport(nextZoom, [
      bounds.width / 2 - viewportX * nextZoom,
      bounds.height / 2 - viewportY * nextZoom,
    ])
  }

  const selected = selectedRiver === null ? null : RIVERS[selectedRiver]
  const selectedLakeData = selectedLake === null ? null : lakes[selectedLake] ?? null
  const selectedLakeExamNote = selectedLakeData ? LAKE_EXAM_NOTE_BY_NAME.get(selectedLakeData.name) : undefined
  const selectedLakeStudyDetails = selectedLakeData ? LAKE_STUDY_DETAILS[selectedLakeData.name] : undefined
  const selectedStudy = selected ? RIVER_STUDY_DETAILS[selected.name] : null
  const selectedMapRiver = selected ? mapRivers.get(selected.name) : null
  const normalizeTributaryName = (name: string) => name.split('(')[0]?.trim().toLocaleLowerCase().replace(/[^a-z0-9]/g, '') ?? ''
  const tributaryOptions: TributaryOption[] = selected
    ? (() => {
        const options: TributaryOption[] = []
        const addOption = (name: string, bank: TributaryOption['bank']) => {
          if (options.some((option) => normalizeTributaryName(option.name) === normalizeTributaryName(name))) return
          const mapRoute = selectedMapRiver?.tr.find((tributary) =>
            normalizeTributaryName(tributary.n) === normalizeTributaryName(name),
          ) ?? null
          const mainRiverIndex = RIVERS.findIndex((river) =>
            normalizeTributaryName(river.name) === normalizeTributaryName(name)
              && normalizeTributaryName(river.name) !== normalizeTributaryName(selected.name),
          )
          options.push({ name, bank, mapRoute, mainRiverIndex: mainRiverIndex < 0 ? null : mainRiverIndex })
        }
        selectedStudy?.rightBank.forEach((name) => addOption(name, 'Right bank'))
        selectedStudy?.leftBank.forEach((name) => addOption(name, 'Left bank'))
        if ((selected.name === 'Mahi' || selected.name === 'Brahmani') && options.length === 0) {
          const names = selected.name === 'Mahi'
            ? ['Som', 'Anas', 'Panam']
            : ['Sankh', 'South Koel', 'Karo']
          names.forEach((name) => addOption(name, 'Basin / headstream'))
        }
        selectedMapRiver?.tr.forEach((tributary) => addOption(tributary.n, 'Basin / headstream'))
        return options
      })()
    : []
  const selectedTributaryOption = tributaryOptions.find((option) =>
    option.name === selectedTributary || option.mapRoute?.n === selectedTributary,
  ) ?? null
  React.useEffect(() => {
    if (tributaryScrollRequest > 0) {
      tributaryDetailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [tributaryScrollRequest])
  const selectedMapTributary = selectedMapRiver?.tr.find((tributary) =>
    normalizeTributaryName(tributary.n) === normalizeTributaryName(selectedTributary ?? ''),
  ) ?? null
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

  const zoomAt = (nextZoom: number, anchorX?: number, anchorY?: number) => {
    const bounds = mapRef.current?.getBoundingClientRect()
    if (!bounds) return
    const scale = Math.min(4, Math.max(1, nextZoom))
    const x = anchorX ?? bounds.width / 2
    const y = anchorY ?? bounds.height / 2
    const current = viewportRef.current
    const contentX = (x - current.pan[0]) / current.zoom
    const contentY = (y - current.pan[1]) / current.zoom
    setMapViewport(scale, [x - contentX * scale, y - contentY * scale])
  }

  const selectTributary = (name: string, riverSystemName = selected?.name) => {
    setSelectedTributary(name)
    setTributaryScrollRequest((request) => request + 1)
    setShowTributaries(true)
    const systemMapRiver = riverSystemName ? mapRivers.get(riverSystemName) : null
    const tributary = systemMapRiver?.tr.find((candidate) =>
      normalizeTributaryName(candidate.n) === normalizeTributaryName(name),
    )
    const bounds = mapRef.current?.getBoundingClientRect()
    const route = tributary
      ? mapSvgRef.current?.querySelector<SVGPathElement>(`[data-tributary-name="${tributary.n}"]`)
      : (() => {
          const riverIndex = RIVERS.findIndex((river) =>
            normalizeTributaryName(river.name) === normalizeTributaryName(name),
          )
          return riverIndex < 0
            ? null
            : mapSvgRef.current?.querySelector<SVGGElement>(`.rivers-map-route[data-river-index="${riverIndex}"]`)
        })()
    if (!bounds || !route) return
    const routeBounds = route.getBBox()
    const routeWidth = Math.max(routeBounds.width, 1)
    const routeHeight = Math.max(routeBounds.height, 1)
    const nextZoom = Math.min(4, Math.max(1, Math.min(
      MAP_VIEWBOX.width * (tributary ? 0.7 : 0.88) / routeWidth,
      MAP_VIEWBOX.height * (tributary ? 0.7 : 0.88) / routeHeight,
    )))
    const centerX = (routeBounds.x + routeBounds.width / 2 - MAP_VIEWBOX.x) / MAP_VIEWBOX.width * bounds.width
    const centerY = (routeBounds.y + routeBounds.height / 2 - MAP_VIEWBOX.y) / MAP_VIEWBOX.height * bounds.height
    setMapViewport(nextZoom, [
      bounds.width / 2 - centerX * nextZoom,
      bounds.height / 2 - centerY * nextZoom,
    ])
  }

  const handleMapPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || (event.target as Element).closest('button')) return
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    if (pointersRef.current.size >= 2) {
      const bounds = event.currentTarget.getBoundingClientRect()
      const [first, second] = [...pointersRef.current.values()]
      const centerX = (first.x + second.x) / 2 - bounds.left
      const centerY = (first.y + second.y) / 2 - bounds.top
      const distance = Math.hypot(second.x - first.x, second.y - first.y)
      const current = viewportRef.current
      pinchRef.current = {
        distance: Math.max(distance, 1),
        zoom: current.zoom,
        anchor: [(centerX - current.pan[0]) / current.zoom, (centerY - current.pan[1]) / current.zoom],
      }
      dragRef.current = null
      draggedRef.current = true
      setIsDragging(true)
      return
    }

    dragRef.current = { pointerId: event.pointerId, x: event.clientX, y: event.clientY, pan: viewportRef.current.pan }
    draggedRef.current = false
  }

  const handleMapPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointersRef.current.has(event.pointerId)) {
      pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    }

    const pinch = pinchRef.current
    if (pinch && pointersRef.current.size >= 2) {
      const bounds = event.currentTarget.getBoundingClientRect()
      const [first, second] = [...pointersRef.current.values()]
      const centerX = (first.x + second.x) / 2 - bounds.left
      const centerY = (first.y + second.y) / 2 - bounds.top
      const distance = Math.hypot(second.x - first.x, second.y - first.y)
      const scale = Math.min(4, Math.max(1, pinch.zoom * distance / pinch.distance))
      setMapViewport(scale, [
        centerX - pinch.anchor[0] * scale,
        centerY - pinch.anchor[1] * scale,
      ], false)
      draggedRef.current = true
      return
    }

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
    setMapViewport(viewportRef.current.zoom, [drag.pan[0] + deltaX, drag.pan[1] + deltaY], false)
  }

  const handleMapPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (!pointersRef.current.has(event.pointerId)) return
    pointersRef.current.delete(event.pointerId)

    if (pinchRef.current) {
      pinchRef.current = null
      const remaining = [...pointersRef.current.entries()][0]
      if (remaining) {
        const [pointerId, point] = remaining
        dragRef.current = { pointerId, x: point.x, y: point.y, pan: viewportRef.current.pan }
      } else {
        dragRef.current = null
        setIsDragging(false)
        setMapViewport(viewportRef.current.zoom, viewportRef.current.pan)
      }
      return
    }

    if (dragRef.current?.pointerId === event.pointerId) {
      dragRef.current = null
      setIsDragging(false)
      setMapViewport(viewportRef.current.zoom, viewportRef.current.pan)
    }
  }

  React.useEffect(() => {
    const map = mapRef.current
    if (!map) return

    const handleWheel = (event: WheelEvent) => {
      event.preventDefault()
      const bounds = map.getBoundingClientRect()
      const delta = event.deltaY * (event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16 : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? bounds.height : 1)
      const current = viewportRef.current
      const nextZoom = Math.min(4, Math.max(1, current.zoom * Math.exp(-delta * 0.002)))
      const x = event.clientX - bounds.left
      const y = event.clientY - bounds.top
      const contentX = (x - current.pan[0]) / current.zoom
      const contentY = (y - current.pan[1]) / current.zoom
      setMapViewport(nextZoom, [x - contentX * nextZoom, y - contentY * nextZoom], false)
      if (wheelCommitTimerRef.current !== null) clearTimeout(wheelCommitTimerRef.current)
      wheelCommitTimerRef.current = setTimeout(() => {
        setMapViewport(viewportRef.current.zoom, viewportRef.current.pan)
        wheelCommitTimerRef.current = null
      }, 120)
    }

    map.addEventListener('wheel', handleWheel, { passive: false })
    return () => {
      map.removeEventListener('wheel', handleWheel)
      if (wheelCommitTimerRef.current !== null) clearTimeout(wheelCommitTimerRef.current)
    }
  }, [mapData, setMapViewport])

  if (mapLoadError) {
    return (
      <section className="public-page rivers-page">
        <article className="public-shell">
          <h1>India Physical Geography Map</h1>
          <p role="alert">{mapLoadError}</p>
          <GeographyStudyGuide />
        </article>
      </section>
    )
  }

  if (!mapData) {
    return (
      <section className="public-page rivers-page">
        <article className="public-shell rivers-map-loading">
          <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Geography</span><span aria-hidden="true">›</span><span>India Geography Map</span>
          </nav>
          <header className="rivers-hero">
            <span className="public-kicker">Interactive geography</span>
            <h1>India Physical Geography Map</h1>
            <p>Explore India’s rivers, tributaries, lakes and reservoirs with an interactive map and competitive-exam facts.</p>
          </header>
          <div className="rivers-map-loading-panel" role="status" aria-label="Loading interactive map">
            <span className="rivers-map-loading-spinner" aria-hidden="true" />
          </div>
          <GeographyStudyGuide />
        </article>
      </section>
    )
  }

  return (
    <section className="public-page rivers-page">
      <article className="public-shell">
        <nav className="rivers-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span aria-hidden="true">›</span><span>Geography</span><span aria-hidden="true">›</span><span>India Geography Map</span>
        </nav>

        <header className="rivers-hero">
          <span className="public-kicker">Interactive geography</span>
          <h1>India Physical Geography Map</h1>
          <p>
            Explore India’s major rivers, tributaries, lakes and reservoirs.
            Switch map views for animated rivers or lake-only geography, and
            study exam facts for important Indian water bodies.
          </p>
        </header>

        <p className="rivers-article-link">
          <Link to="/blog/indian-rivers-and-tributaries">
            Read the guide to India’s major river systems and tributaries <span aria-hidden="true">→</span>
          </Link>
        </p>

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
                className={`rivers-map-svg${selectedRiver === null ? '' : ' has-selection'}${showTributaries ? '' : ' no-tributaries'}`}
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
                {mapMode === 'lakes' && (
                  <g className="rivers-lakes" aria-label="Lakes and reservoirs">
                    {mapData.lk.map(([path, sourceIndex], shapeIndex) => {
                      const lakeIndex = lakeIndexBySource.get(sourceIndex)
                      const lakeName = lakeIndex === undefined ? undefined : lakes[lakeIndex]?.name
                      if (!lakeName || lakeIndex === undefined || !isLakeVisible(lakeIndex)) return null
                      return (
                        <path
                          className="rivers-lake-shape"
                          d={path}
                          key={`lake-shape-${shapeIndex}`}
                          data-lake-index={lakeIndex}
                          role="button"
                          tabIndex={0}
                          aria-label={lakeName}
                          onClick={() => selectLake(lakeIndex)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter' || event.key === ' ') {
                              event.preventDefault()
                              selectLake(lakeIndex)
                            }
                          }}
                        >
                          <title>{lakeName}</title>
                        </path>
                      )
                    })}
                    {mapData.MK.map(([name, x, y], markerIndex) => {
                      const lakeIndex = mappedLakeCount + markerIndex
                      if (!isLakeVisible(lakeIndex)) return null
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
                    {ADDITIONAL_INDIAN_LAKES.map(({ name, point }) => {
                      const lakeIndex = lakes.findIndex((lake) => lake.name === name)
                      if (lakeIndex < 0 || !isLakeVisible(lakeIndex)) return null
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
                          <circle cx={point[0]} cy={point[1]} r="3.2" />
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
                <g className="rivers-state-labels" aria-label="State names">
                  {STATE_LABELS.map(({ name, point }) => {
                    const [x, y] = project(point)
                    return <text key={name} x={x} y={y} textAnchor="middle">{name}</text>
                  })}
                </g>
                {mapMode === 'rivers' && visibleRivers.map(({ river, index }) => {
                  const mapRiver = mapRivers.get(river.name)
                  if (!mapRiver) throw new Error(`Missing map route for ${river.name}`)
                  const isSelected = selectedRiver === index
                  const isSelectedTributaryRiver =
                    normalizeTributaryName(selectedTributary ?? '') === normalizeTributaryName(river.name)
                  const isHighlighted = isSelected || isSelectedTributaryRiver

                  return (
                    <g
                      className={`rivers-map-route${isHighlighted ? ' is-selected' : ''}${isSelected ? ' is-current-river' : ''}`}
                      data-river-index={index}
                      key={`${river.name}-${isSelected ? riverAnimation : 'idle'}`}
                      role="group"
                      aria-label={`${river.name} river and tributaries`}
                    >
                      <path
                        className="rivers-route-line"
                        d={mapRiver.d}
                        data-river-path={index}
                        id={`rivers-route-${index}`}
                        pathLength="1"
                        stroke={river.color}
                        strokeWidth={isHighlighted ? 4 : 2.4}
                        style={{ animationDelay: `${index * 0.18}s` }}
                      />
                      <path className="rivers-route-flow" d={mapRiver.d} />
                      <circle className="rivers-route-drop" r="3" fill="#fff" stroke={river.color} strokeWidth="1.6">
                        <animateMotion dur={`${10 + index}s`} repeatCount="indefinite" path={mapRiver.m} />
                      </circle>
                      <circle cx={mapRiver.s[0]} cy={mapRiver.s[1]} r="3" fill={river.color} stroke="#fff" strokeWidth="1" />
                      <path
                        aria-label={`${river.name} river: ${river.states.join(', ')}`}
                        aria-pressed={isSelected}
                        className="rivers-route-hit"
                        d={mapRiver.d}
                        onClick={() => selectRiver(index)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' || event.key === ' ') {
                            event.preventDefault()
                            selectRiver(index)
                          }
                        }}
                        role="button"
                        tabIndex={0}
                      />
                      {showTributaries && mapRiver.tr.map((tributary) => (
                        <g
                          className={`rivers-tributary${selectedRiver === index && normalizeTributaryName(selectedTributary ?? '') === normalizeTributaryName(tributary.n) ? ' is-selected' : ''}`}
                          key={tributary.n}
                        >
                          <path
                            className="rivers-tributary-line"
                            d={tributary.d}
                            pathLength="1"
                            stroke={river.color}
                            style={{ animationDelay: `${index * 0.2 + 2.2}s` }}
                          />
                          <path className="rivers-route-flow rivers-tributary-flow" d={tributary.d} />
                          <path
                            aria-label={`${tributary.n}, tributary in the ${river.name} river system`}
                            className="rivers-route-hit rivers-tributary-hit"
                            d={tributary.d}
                            data-tributary-name={tributary.n}
                            onClick={(event) => {
                              event.stopPropagation()
                              if (selectedRiver !== index) selectRiver(index)
                              selectTributary(tributary.n, river.name)
                            }}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter' || event.key === ' ') {
                                event.preventDefault()
                                event.stopPropagation()
                                selectTributary(tributary.n, river.name)
                              }
                            }}
                            role="button"
                            tabIndex={0}
                          >
                            <title>{`${tributary.n} (tributary of ${river.name})`}</title>
                          </path>
                        </g>
                      ))}
                      {showTributaries && selectedRiver === index && selectedMapTributary && (
                        <text
                          aria-hidden="true"
                          className="rivers-map-label rivers-tributary-label is-selected"
                          x={selectedMapTributary.s[0] + 4}
                          y={selectedMapTributary.s[1] - 3}
                        >
                          {selectedMapTributary.n}
                        </text>
                      )}
                      {riverLabelPositions[river.name] && (
                        <text
                          className={`rivers-map-river-label${isSelectedTributaryRiver ? ' rivers-tributary-label is-selected' : ''}`}
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
                {mapMode === 'rivers' && selected && selectedMapRiver && selectedSource && selectedMouth && (
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
                {mapMode === 'lakes' && selectedLakeData && selectedLake !== null && (
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
                onClick={() => zoomAt(viewportRef.current.zoom * 1.25)}
                type="button"
              >+</button>
              <button
                aria-label="Zoom out on map"
                disabled={zoom <= 1}
                onClick={() => zoomAt(viewportRef.current.zoom / 1.25)}
                type="button"
              >−</button>
              <button
                aria-label="Reset map zoom"
                disabled={zoom === 1}
                onClick={() => setMapViewport(1, [0, 0])}
                type="button"
              >Reset</button>
              <span className="rivers-map-zoom-hint">Scroll to zoom · drag to move</span>
            </div>
            {mapMode === 'rivers' && (
              <section className="rivers-directory" aria-labelledby="rivers-directory-heading">
                <header className="rivers-directory-header">
                  <div>
                    <h2 id="rivers-directory-heading">Explore rivers</h2>
                    <p>{visibleRivers.length} rivers · select one for its route and facts</p>
                  </div>
                </header>
                <div className="rivers-directory-list">
                  {visibleRivers.map(({ river, index }) => (
                    <button
                      aria-pressed={selectedRiver === index}
                      className={`rivers-directory-item${selectedRiver === index ? ' is-active' : ''}`}
                      key={river.name}
                      onClick={() => selectRiver(index)}
                      type="button"
                    >
                      <span className="rivers-directory-name">
                        <span className="rivers-list-dot" style={{ backgroundColor: river.color }} />
                        {river.name}
                      </span>
                      <span className="rivers-directory-states">{river.states.join(', ')}</span>
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="rivers-map-sidebar">
            <div className="rivers-map-controls" aria-label="Map controls">
              <div className="rivers-filter-controls" aria-label="Map view">
                <button
                  aria-pressed={mapMode === 'rivers'}
                  className={mapMode === 'rivers' ? 'is-active' : ''}
                  onClick={() => {
                    setMapMode('rivers')
                    setSelectedRiver(null)
                    setSelectedTributary(null)
                    setSelectedLake(null)
                    setMapViewport(1, [0, 0])
                  }}
                  type="button"
                >
                  Rivers
                </button>
                <button
                  aria-pressed={mapMode === 'lakes'}
                  className={mapMode === 'lakes' ? 'is-active' : ''}
                  onClick={() => {
                    setMapMode('lakes')
                    setSelectedRiver(null)
                    setSelectedTributary(null)
                    setSelectedLake(null)
                    setLakeState('all')
                    setMapViewport(1, [0, 0])
                  }}
                  type="button"
                >
                  Lakes
                </button>
                {mapMode === 'rivers' && FILTERS.map(({ key, label }) => (
                    <button
                      aria-pressed={filter === key}
                      className={filter === key ? 'is-active' : ''}
                      key={key}
                      onClick={() => {
                        setFilter(key)
                        setSelectedRiver(null)
                        setSelectedTributary(null)
                        setSelectedLake(null)
                        setMapViewport(1, [0, 0])
                      }}
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
              </div>
              {mapMode === 'rivers' && (
                <div className="rivers-layer-controls" aria-label="Map layers">
                  <button aria-pressed={showTributaries} className={showTributaries ? 'is-active' : ''} onClick={() => setShowTributaries((value) => !value)} type="button">
                    Tributaries
                  </button>
                </div>
              )}
              <button
                className="rivers-replay-button"
                onClick={() => {
                  setSelectedRiver(null)
                  setSelectedTributary(null)
                  setSelectedLake(null)
                  setMapViewport(1, [0, 0])
                }}
                type="button"
              >
                Reset map
              </button>
            </div>

            <article aria-live="polite" className="rivers-detail-card">
              {mapMode === 'rivers' && selected ? (
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
                  </dl>
                  <p>{selected.info}</p>
                  {selectedStudy && (
                    <section className="rivers-selected-study" aria-label={`${selected.name} river study details`}>
                      <div className="rivers-bank-groups">
                        {(['Left bank', 'Right bank'] as const).map((bank) => {
                          const tributaries = bank === 'Left bank' ? selectedStudy.leftBank : selectedStudy.rightBank
                          return (
                            <div key={bank}>
                              <h4>{bank} tributaries</h4>
                              <ul className="rivers-tributary-inline-list">
                                {tributaries.map((name) => {
                                  const option = tributaryOptions.find((candidate) =>
                                    normalizeTributaryName(candidate.name) === normalizeTributaryName(name),
                                  )
                                  if (!option) throw new Error(`Missing tributary option for ${name} on the ${selected.name}`)
                                  const isActive = normalizeTributaryName(selectedTributary ?? '') === normalizeTributaryName(name)
                                  return (
                                    <li key={name}>
                                      <button
                                        aria-pressed={isActive}
                                        className={`rivers-tributary-inline-button${isActive ? ' is-active' : ''}`}
                                        onClick={() => selectTributary(option.name)}
                                        type="button"
                                      >
                                        {name}
                                      </button>
                                    </li>
                                  )
                                })}
                              </ul>
                            </div>
                          )
                        })}
                      </div>
                      {selectedStudy.districts.length > 0 && (
                        <div className="rivers-study-districts">
                          <h4>Districts along the river</h4>
                          <ul>
                            {selectedStudy.districts.map(({ state, names }) => (
                              <li key={state}><strong>{state}:</strong> {names.join(', ')}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {selectedStudy.tributaryNote && <p>{selectedStudy.tributaryNote}</p>}
                      {selectedTributaryOption && (
                        <article aria-live="polite" className="rivers-selected-tributary-detail" ref={tributaryDetailRef}>
                          <h3>{selectedTributaryOption.name}</h3>
                          <dl>
                            <dt>River system</dt><dd>{selected.name} basin</dd>
                            <dt>Classification</dt><dd>{selectedTributaryOption.bank}</dd>
                            <dt>Map</dt>
                            <dd>
                              {selectedTributaryOption.mapRoute || selectedTributaryOption.mainRiverIndex !== null
                                ? 'Route shown and highlighted on the map.'
                                : 'This tributary is listed for the basin; its route is not drawn on this map.'}
                            </dd>
                          </dl>
                          <p>
                            {TRIBUTARY_EXPLANATIONS[selectedTributaryOption.mapRoute?.n ?? selectedTributaryOption.name]
                              ?? `${selectedTributaryOption.name} is listed among the ${selected.name} river-system tributaries. The current map does not include a separate route or additional source and confluence notes for this stream.`}
                          </p>
                        </article>
                      )}
                    </section>
                  )}
                  <p className="rivers-border-note">
                    State names describe the main river course; some stretches form state
                    boundaries. River lengths vary slightly by source.
                  </p>
                </>
              ) : mapMode === 'lakes' && selectedLakeData ? (
                <>
                  <h2>{selectedLakeData.name}</h2>
                  <p className="rivers-detail-type">
                    {selectedLakeExamNote
                      ? `${selectedLakeExamNote.region} · ${selectedLakeExamNote.category}`
                      : 'Lake or reservoir'}
                  </p>
                  {selectedLakeExamNote && (
                    <section className="rivers-selected-study" aria-label={`${selectedLakeData.name} geography facts`}>
                      <dl>
                        <dt>Location</dt><dd>{selectedLakeExamNote.region}</dd>
                        <dt>Type</dt><dd>{selectedLakeExamNote.category}</dd>
                        <dt>Overview</dt><dd>{selectedLakeData.description}</dd>
                        {selectedLakeStudyDetails?.map((fact) => (
                          <React.Fragment key={fact.label}>
                            <dt>{fact.label}</dt>
                            <dd>{renderLakeFactValue(fact.value, fact.emphasis)}</dd>
                          </React.Fragment>
                        ))}
                        <dt>Exam fact</dt><dd>{selectedLakeExamNote.examFact}</dd>
                      </dl>
                    </section>
                  )}
                </>
              ) : (
                <>
                  <h2>{mapMode === 'rivers' ? 'Explore India’s rivers' : 'Explore India’s lakes'}</h2>
                  <p className="rivers-detail-type">Explore full river courses, tributaries, lakes and reservoirs.</p>
                  <p>Himalayan rivers are often perennial, while Peninsular rivers are more dependent on monsoon rainfall.</p>
                </>
              )}
            </article>
          </div>
        </section>

        {mapMode === 'lakes' && <section className="rivers-directory rivers-lake-browser" aria-labelledby="rivers-lake-browser-heading">
          <div className="rivers-lake-browser-header rivers-directory-header">
            <div>
              <h2 id="rivers-lake-browser-heading">Explore lakes and reservoirs</h2>
              <p>{filteredLakeCount} of {lakes.length} listed · select one for its map location and exam fact</p>
            </div>
            <label className="rivers-lake-state-filter">
              <span>Filter lakes by state or region</span>
              <select
                onChange={(event) => {
                  setLakeState(event.target.value)
                  setSelectedLake(null)
                  setMapViewport(1, [0, 0])
                }}
                value={lakeState}
              >
                <option value="all">All states ({lakes.length})</option>
                {sortedLakeStates.map((state) => (
                  <option key={state} value={state}>
                    {state} ({lakeStateCounts.get(state)})
                  </option>
                ))}
              </select>
            </label>
            <label className="rivers-lake-search">
              <span>Search lakes</span>
              <input
                onChange={(event) => setLakeSearch(event.target.value)}
                placeholder="e.g. Manasbal"
                type="search"
                value={lakeSearch}
              />
            </label>
          </div>
          {lakeGroups.length > 0 ? (
            <div className="rivers-directory-list">
              {lakeGroups.flatMap(({ entries }) => entries.map(({ lake, index }) => (
                <button
                  aria-pressed={selectedLake === index}
                  className={`rivers-directory-item${selectedLake === index ? ' is-active' : ''}`}
                  key={lake.name}
                  onClick={() => selectLake(index)}
                  type="button"
                >
                  <span className="rivers-directory-name">
                    <span className="rivers-lake-dot" />
                    {lake.examRelevant && <span className="rivers-lake-star" aria-label="Frequently asked in competitive exams">★</span>}
                    {lake.name}
                  </span>
                  <span className="rivers-directory-states">
                    {LAKE_EXAM_NOTE_BY_NAME.get(lake.name)?.region ?? 'India'}
                  </span>
                </button>
              )))}
            </div>
          ) : (
            <p className="rivers-lake-empty">No lakes match “{lakeSearch}”. Try another name.</p>
          )}
        </section>}

        <GeographyStudyGuide />
      </article>
    </section>
  )
}
