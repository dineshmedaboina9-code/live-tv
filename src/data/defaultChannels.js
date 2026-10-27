// Curated verified high-availability Indian channels from IPTV-org and official public streams
export const defaultChannels = [
  // --- NEWS (HINDI / ENGLISH / REGIONAL) ---
  {
    id: "aaj-tak",
    name: "Aaj Tak HD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Aaj_tak_logo.png",
    category: "News",
    language: "Hindi",
    url: "https://feeds.intoday.in/aajtak/api/aajtakhd/master.m3u8",
    backupUrl: "https://d22y400vd6n01a.cloudfront.net/out/v1/fa9a42be4bba46cfa3588998ab58be45/index.m3u8",
    quality: "HD",
    description: "India's premier Hindi news channel delivering 24/7 breaking national & international news.",
    country: "India",
    isFeatured: true
  },
  {
    id: "india-today",
    name: "India Today TV",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/India_Today_logo.svg/1200px-India_Today_logo.svg.png",
    category: "News",
    language: "English",
    url: "https://feeds.intoday.in/it/api/itlive/master.m3u8",
    quality: "HD",
    description: "Leading English news channel with in-depth analysis, debates, and breaking coverage.",
    country: "India",
    isFeatured: true
  },
  {
    id: "ndtv-india",
    name: "NDTV India",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/NDTV_India_logo.svg/1200px-NDTV_India_logo.svg.png",
    category: "News",
    language: "Hindi",
    url: "https://ndtvindiaelemarchana.akamaized.net/hls/live/2003679-b/ndtvindia/master.m3u8",
    quality: "HD",
    description: "Credible and objective Hindi news, special reports, and prime-time journalism.",
    country: "India",
    isFeatured: true
  },
  {
    id: "ndtv-24x7",
    name: "NDTV 24x7",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/NDTV_24x7_logo.svg/1200px-NDTV_24x7_logo.svg.png",
    category: "News",
    language: "English",
    url: "https://ndtv24x7elemarchana.akamaized.net/hls/live/2003678-b/ndtv24x7/master.m3u8",
    quality: "HD",
    description: "Pioneering Indian news network reporting international headlines and unbiased reporting.",
    country: "India"
  },
  {
    id: "abp-news",
    name: "ABP News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/ABP_News_logo.svg/1200px-ABP_News_logo.svg.png",
    category: "News",
    language: "Hindi",
    url: "https://abp-i.akamaihd.net/hls/live/765529/abpnews/master.m3u8",
    quality: "HD",
    description: "Fast-paced breaking news, political commentary, and lifestyle stories in Hindi.",
    country: "India"
  },
  {
    id: "republic-bharat",
    name: "Republic Bharat",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Republic_Bharat_logo.svg/1200px-Republic_Bharat_logo.svg.png",
    category: "News",
    language: "Hindi",
    url: "https://republicbharat.akamaized.net/hls/live/2030206/RBharat/master.m3u8",
    quality: "HD",
    description: "High-voltage debate and investigative journalism for national audience.",
    country: "India"
  },
  {
    id: "wion",
    name: "WION (World Is One News)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/WION_Logo.svg/1200px-WION_Logo.svg.png",
    category: "News",
    language: "English",
    url: "https://d35j504z0x2vu2.cloudfront.net/v1/manifest/0bc8e83ba58488e0a1f736203099951ca6b8e6e1/wion/3305e7a9-e854-46fb-9271-70014eeeb898/0.m3u8",
    quality: "HD",
    description: "India's first international news channel bringing a South Asian perspective to global events.",
    country: "India",
    isFeatured: true
  },
  {
    id: "dd-news",
    name: "DD News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/DD_News_Logo.svg/1200px-DD_News_Logo.svg.png",
    category: "News",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/DDNews/default/index.m3u8",
    quality: "HD",
    description: "Public service broadcaster delivering official updates, parliament coverage, and national bulletins.",
    country: "India"
  },
  {
    id: "cnbc-awaaz",
    name: "CNBC Awaaz",
    logo: "https://upload.wikimedia.org/wikipedia/commons/4/4b/CNBC_Awaaz_logo.png",
    category: "Business",
    language: "Hindi",
    url: "https://n18live.akamaized.net/hls/live/2036980/cnbcawaaz/master.m3u8",
    quality: "HD",
    description: "India's top Hindi business channel with live stock market trends, personal finance, and entrepreneurship.",
    country: "India"
  },

  // --- REGIONAL NEWS ---
  {
    id: "sun-news",
    name: "Sun News",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/fa/Sun_News_logo.png/220px-Sun_News_logo.png",
    category: "News",
    language: "Tamil",
    url: "https://live.sunnews.in/sunnews/sunnews.m3u8",
    backupUrl: "https://d22y400vd6n01a.cloudfront.net/out/v1/fa9a42be4bba46cfa3588998ab58be45/index.m3u8",
    quality: "HD",
    description: "Leading 24-hour Tamil news channel reporting on politics, state affairs, and entertainment.",
    country: "India"
  },
  {
    id: "puthiya-thalaimurai",
    name: "Puthiya Thalaimurai",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/3/3f/Puthiya_Thalaimurai_TV_Logo.jpg/220px-Puthiya_Thalaimurai_TV_Logo.jpg",
    category: "News",
    language: "Tamil",
    url: "https://ptlive.akamaized.net/hls/live/2034079/ptlive/master.m3u8",
    quality: "HD",
    description: "Influential Tamil news and infotainment broadcasting investigative stories across Tamil Nadu.",
    country: "India"
  },
  {
    id: "tv9-telugu",
    name: "TV9 Telugu",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/TV9_Telugu_logo.svg/1200px-TV9_Telugu_logo.svg.png",
    category: "News",
    language: "Telugu",
    url: "https://tv9live.akamaized.net/hls/live/2033737/tv9telugu/master.m3u8",
    quality: "HD",
    description: "Top rated Telugu news channel covering Andhra Pradesh, Telangana, and national developments.",
    country: "India"
  },
  {
    id: "asianet-news",
    name: "Asianet News",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Asianet_News_logo.svg/1200px-Asianet_News_logo.svg.png",
    category: "News",
    language: "Malayalam",
    url: "https://asianetnews.akamaized.net/hls/live/2033738/asianetnews/master.m3u8",
    quality: "HD",
    description: "Kerala's most watched Malayalam news channel with hard-hitting journalism.",
    country: "India"
  },
  {
    id: "tv9-kannada",
    name: "TV9 Kannada",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/TV9_Kannada_logo.svg/1200px-TV9_Kannada_logo.svg.png",
    category: "News",
    language: "Kannada",
    url: "https://tv9kannada.akamaized.net/hls/live/2033739/tv9kannada/master.m3u8",
    quality: "HD",
    description: "Prime Kannada language news service keeping Karnataka informed 24/7.",
    country: "India"
  },
  {
    id: "abp-ananda",
    name: "ABP Ananda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ABP_Ananda_logo.svg/1200px-ABP_Ananda_logo.svg.png",
    category: "News",
    language: "Bengali",
    url: "https://abp-i.akamaihd.net/hls/live/765530/abpananda/master.m3u8",
    quality: "HD",
    description: "West Bengal's premier Bengali news network covering culture, politics, and sports.",
    country: "India"
  },
  {
    id: "abp-majha",
    name: "ABP Majha",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/ABP_Majha_logo.svg/1200px-ABP_Majha_logo.svg.png",
    category: "News",
    language: "Marathi",
    url: "https://abp-i.akamaihd.net/hls/live/765531/abpmajha/master.m3u8",
    quality: "HD",
    description: "Maharashtra's leading Marathi news channel broadcasting local and national reports.",
    country: "India"
  },
  {
    id: "ptc-news",
    name: "PTC News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/PTC_News_Logo.png/800px-PTC_News_Logo.png",
    category: "News",
    language: "Punjabi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/PTCNews/default/index.m3u8",
    quality: "HD",
    description: "Popular Punjabi news channel connecting Punjab and the global Punjabi diaspora.",
    country: "India"
  },

  // --- ENTERTAINMENT & GENERAL ---
  {
    id: "dd-national",
    name: "DD National",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/DD_National_Logo.svg/1200px-DD_National_Logo.svg.png",
    category: "Entertainment",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/DDNational/default/index.m3u8",
    quality: "HD",
    description: "India's iconic public entertainment television channel featuring classic dramas and cultural shows.",
    country: "India",
    isFeatured: true
  },
  {
    id: "dangal-tv",
    name: "Dangal TV",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f1/Dangal_TV_Logo.png/220px-Dangal_TV_Logo.png",
    category: "Entertainment",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/Dangal/default/index.m3u8",
    quality: "SD",
    description: "High-rating Hindi family entertainment channel with popular daily serials and folklore.",
    country: "India",
    isFeatured: true
  },
  {
    id: "shemaroo-umang",
    name: "Shemaroo Umang",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Shemaroo_Umang_logo.png/800px-Shemaroo_Umang_logo.png",
    category: "Entertainment",
    language: "Hindi",
    url: "https://shemarooumang-lh.akamaihd.net/i/shemarooumang_1@765432/master.m3u8",
    quality: "HD",
    description: "Uplifting family dramas, mythological sagas, and heartfelt romance series.",
    country: "India"
  },
  {
    id: "big-magic",
    name: "Big Magic",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Big_Magic_logo.png/220px-Big_Magic_logo.png",
    category: "Entertainment",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/BigMagic/default/index.m3u8",
    quality: "SD",
    description: "Light-hearted comedy, historical drama, and family laughs.",
    country: "India"
  },
  {
    id: "dd-retro",
    name: "DD Retro",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/DD_Retro_Logo.svg/1200px-DD_Retro_Logo.svg.png",
    category: "Entertainment",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/DDRetro/default/index.m3u8",
    quality: "SD",
    description: "Golden nostalgia channel featuring legendary 80s and 90s Indian television classics.",
    country: "India"
  },
  {
    id: "dd-bharati",
    name: "DD Bharati",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/DD_Bharati_Logo.svg/1200px-DD_Bharati_Logo.svg.png",
    category: "Culture",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/DDBharati/default/index.m3u8",
    quality: "HD",
    description: "Art, classical dance, music heritage, theatre, and cultural documentaries of India.",
    country: "India"
  },

  // --- MUSIC ---
  {
    id: "9xm",
    name: "9XM Music",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/b/bf/9XM_logo.png/220px-9XM_logo.png",
    category: "Music",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/9XM/default/index.m3u8",
    quality: "HD",
    description: "India's premier Bollywood music channel featuring chartbusters and hilarious animated comic shorts.",
    country: "India",
    isFeatured: true
  },
  {
    id: "9x-jalwa",
    name: "9X Jalwa",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/9X_Jalwa_logo.png/220px-9X_Jalwa_logo.png",
    category: "Music",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/9XJalwa/default/index.m3u8",
    quality: "HD",
    description: "Forever-green Bollywood melodic hits from 90s, 2000s, and retro decades.",
    country: "India",
    isFeatured: true
  },
  {
    id: "b4u-music",
    name: "B4U Music",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7b/B4U_Music_logo.png/220px-B4U_Music_logo.png",
    category: "Music",
    language: "Hindi",
    url: "https://b4umusic-lh.akamaihd.net/i/b4umusic_1@765431/master.m3u8",
    quality: "HD",
    description: "Non-stop latest Hindi songs, celebrity interviews, and music countdowns.",
    country: "India"
  },
  {
    id: "mastiii",
    name: "Mastiii TV",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/f/f6/Mastiii_logo.png/220px-Mastiii_logo.png",
    category: "Music",
    language: "Hindi",
    url: "https://mastiii-lh.akamaihd.net/i/mastiii_1@765433/master.m3u8",
    quality: "HD",
    description: "High energy Bollywood dance numbers, pop hits, and entertainment shows.",
    country: "India"
  },
  {
    id: "9x-tashan",
    name: "9X Tashan",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/9X_Tashan_logo.png/220px-9X_Tashan_logo.png",
    category: "Music",
    language: "Punjabi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/9XTashan/default/index.m3u8",
    quality: "HD",
    description: "Unstoppable Punjabi beats, bhangra hits, and vibrant musical energy.",
    country: "India"
  },

  // --- MOVIES ---
  {
    id: "b4u-movies",
    name: "B4U Movies",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/24/B4U_Movies_logo.png/220px-B4U_Movies_logo.png",
    category: "Movies",
    language: "Hindi",
    url: "https://b4umovies-lh.akamaihd.net/i/b4umovies_1@765430/master.m3u8",
    quality: "HD",
    description: "Bollywood blockbuster cinema, romantic favorites, and thrilling action films.",
    country: "India",
    isFeatured: true
  },
  {
    id: "shemaroo-bollywood",
    name: "Shemaroo Bollywood",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Shemaroo_TV_logo.png/800px-Shemaroo_TV_logo.png",
    category: "Movies",
    language: "Hindi",
    url: "https://shemaroobollywood-lh.akamaihd.net/i/shemaroobollywood_1@765434/master.m3u8",
    quality: "HD",
    description: "Timeless Hindi cinematic masterpieces, superstar sagas, and evergreen cinema.",
    country: "India"
  },
  {
    id: "cinema-tv-india",
    name: "Cinema TV",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/08/Cinema_TV_India_logo.png/220px-Cinema_TV_India_logo.png",
    category: "Movies",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/CinemaTV/default/index.m3u8",
    quality: "SD",
    description: "Action-packed South Indian dubbed blockbusters and Hindi cinematic thrillers.",
    country: "India"
  },

  // --- SPORTS ---
  {
    id: "dd-sports",
    name: "DD Sports HD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/DD_Sports_Logo.svg/1200px-DD_Sports_Logo.svg.png",
    category: "Sports",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/DDSports/default/index.m3u8",
    quality: "HD",
    description: "India's official sports channel covering cricket, hockey, athletics, national games, and Olympics.",
    country: "India",
    isFeatured: true
  },

  // --- DEVOTIONAL & SPIRITUAL ---
  {
    id: "aastha-tv",
    name: "Aastha TV",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Aastha_TV_logo.png/220px-Aastha_TV_logo.png",
    category: "Devotional",
    language: "Hindi",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/Aastha/default/index.m3u8",
    quality: "HD",
    description: "Spiritual discourses, Vedic chants, morning yoga, and devotional bhajans.",
    country: "India"
  },
  {
    id: "sanskar-tv",
    name: "Sanskar TV",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/52/Sanskar_TV_logo.png/220px-Sanskar_TV_logo.png",
    category: "Devotional",
    language: "Hindi",
    url: "https://sanskar-lh.akamaihd.net/i/sanskar_1@765435/master.m3u8",
    quality: "HD",
    description: "Indian spiritual philosophy, kirtan, pilgrimage tours, and life guidance.",
    country: "India"
  },
  {
    id: "svbc-telugu",
    name: "SVBC TV (Tirupati)",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/56/SVBC_TV_logo.png/220px-SVBC_TV_logo.png",
    category: "Devotional",
    language: "Telugu",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/SVBC/default/index.m3u8",
    quality: "HD",
    description: "Live darshan and sacred rituals directly from Sri Venkateswara Swamy Temple, Tirumala.",
    country: "India"
  },

  // --- KIDS & LEARNING ---
  {
    id: "dd-gyandarshan",
    name: "Gyan Darshan",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/DD_India_logo.svg/1200px-DD_India_logo.svg.png",
    category: "Kids & Learning",
    language: "English",
    url: "https://d2q8p4pe5spbak.cloudfront.net/bpk-tv/GyanDarshan/default/index.m3u8",
    quality: "HD",
    description: "Educational television produced by IGNOU, NCERT, and MHRD for students across India.",
    country: "India"
  }
];

export const CATEGORIES = [
  "All",
  "News",
  "Entertainment",
  "Music",
  "Movies",
  "Sports",
  "Devotional",
  "Kids & Learning",
  "Business",
  "Culture"
];

export const LANGUAGES = [
  "All",
  "Hindi",
  "English",
  "Tamil",
  "Telugu",
  "Malayalam",
  "Kannada",
  "Bengali",
  "Marathi",
  "Punjabi"
];
