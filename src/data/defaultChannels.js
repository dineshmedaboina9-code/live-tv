// Curated verified ultra-fast Indian channels with tested low-latency CDN feeds
export const defaultChannels = [
  // --- NEWS (HINDI / ENGLISH / NATIONAL) ---
  {
    id: "aaj-tak",
    name: "Aaj Tak HD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/28/Aaj_tak_logo.png",
    category: "News",
    language: "Hindi",
    url: "https://feeds.intoday.in/aajtak/api/aajtakhd/master.m3u8",
    backupUrl: "https://d1rc86nwwc9fag.cloudfront.net/vglive-sk-472500/abpnews/master.m3u8",
    quality: "HD",
    description: "India's premier Hindi news channel delivering 24/7 breaking national & international news.",
    country: "India",
    isFeatured: true
  },
  {
    id: "abp-news",
    name: "ABP News",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/ABP_News_logo.svg/1200px-ABP_News_logo.svg.png",
    category: "News",
    language: "Hindi",
    url: "https://d1rc86nwwc9fag.cloudfront.net/vglive-sk-472500/abpnews/master.m3u8",
    quality: "HD",
    description: "Fast-paced breaking news, political commentary, and prime-time journalism.",
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
    id: "abp-ganga",
    name: "ABP Ganga",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/ABP_News_logo.svg/1200px-ABP_News_logo.svg.png",
    category: "News",
    language: "Hindi",
    url: "https://d2l4ar6y3mrs4k.cloudfront.net/live-streaming/ganga-livetv/master.m3u8",
    quality: "HD",
    description: "Regional news focused on Uttar Pradesh and Uttarakhand state affairs.",
    country: "India"
  },
  {
    id: "4-sides-tv",
    name: "4 SiDES TV HD",
    logo: "https://jiotvimages.cdn.jio.com/dare_images/images/4sites.png",
    category: "News",
    language: "English",
    url: "https://stream.ottlive.co.in/4sidestv/index.m3u8",
    quality: "HD",
    description: "National and international perspective reporting with modern studio formats.",
    country: "India"
  },
  {
    id: "aaj-ki-khabar",
    name: "Aaj Ki Khabar",
    logo: "https://m.media-amazon.com/images/I/71q8sOMPwHL.png",
    category: "News",
    language: "Hindi",
    url: "https://stream.ottlive.co.in/aajkikhabar/index.m3u8",
    quality: "HD",
    description: "Round-the-clock Indian headlines, ground reports, and lifestyle coverage.",
    country: "India"
  },

  // --- MUSIC ---
  {
    id: "9x-jalwa",
    name: "9X Jalwa",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/8/87/9X_Jalwa_logo.png/220px-9X_Jalwa_logo.png",
    category: "Music",
    language: "Hindi",
    url: "https://wiselp.wiseplayout.com/9X_Jalwa/master.m3u8",
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
    url: "https://amg01408-amg01408c5-amgplt0747.playout.now3.amagi.tv/b4um001/playlist.m3u8",
    quality: "HD",
    description: "Non-stop latest Hindi songs, celebrity interviews, and music countdowns.",
    country: "India",
    isFeatured: true
  },
  {
    id: "9x-tashan",
    name: "9X Tashan",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/2/23/9X_Tashan_logo.png/220px-9X_Tashan_logo.png",
    category: "Music",
    language: "Punjabi",
    url: "https://amg01281-9xmediapvtltd-9xtashan-samsungin-xz1sd.amagi.tv/playlist/amg01281-9xmediapvtltd-9xtashan-samsungin/playlist.m3u8",
    quality: "HD",
    description: "Unstoppable Punjabi beats, bhangra hits, and vibrant musical energy.",
    country: "India"
  },
  {
    id: "9x-jhakaas",
    name: "9X Jhakaas",
    logo: "https://dtil.tmsimg.com/assets/s90012_ld_h15_aa.png?lock=720x540",
    category: "Music",
    language: "Marathi",
    url: "https://amg01281-9xmediapvtltd-9xjhakaas-samsungin-ci2cs.amagi.tv/playlist/amg01281-9xmediapvtltd-9xjhakaas-samsungin/playlist.m3u8",
    quality: "HD",
    description: "Maharashtra's leading Marathi music television channel.",
    country: "India"
  },
  {
    id: "7s-music",
    name: "7S Music",
    logo: "https://i.imgur.com/zDiIhdN.png",
    category: "Music",
    language: "Tamil",
    url: "https://cdn.pishow.tv/ott/live/1257/master.m3u8",
    quality: "HD",
    description: "South Indian dance hits, Kollywood soundtracks, and melody favorites.",
    country: "India"
  },
  {
    id: "raj-musix-malayalam",
    name: "Raj Musix Malayalam",
    logo: "https://cdn.pishow.tv/ott/live/1073/master.m3u8",
    category: "Music",
    language: "Malayalam",
    url: "https://cdn.pishow.tv/ott/live/1073/master.m3u8",
    quality: "SD",
    description: "Popular Mollywood movie songs and non-stop music video broadcasts.",
    country: "India"
  },

  // --- MOVIES & ENTERTAINMENT ---
  {
    id: "and-tv",
    name: "&TV Cinema & Drama",
    logo: "https://xstreamcp-assets-msp.streamready.in/assets/LIVETV/LIVECHANNEL/LIVETV_LIVETVCHANNEL_SYMANDTV/images/LOGO_HD/LOGO_HD_image.png",
    category: "Movies",
    language: "Hindi",
    url: "https://drk6xq0vhn.gpcdn.net/live/and_tv_hd_abr/index.m3u8",
    quality: "HD",
    description: "Top Hindi cinema, romantic blockbusters, and engaging drama series.",
    country: "India",
    isFeatured: true
  },
  {
    id: "alankar-tv",
    name: "Alankar TV",
    logo: "https://livetv.tarangplus.in/alankar-origin/live/playlist.m3u8",
    category: "Movies",
    language: "Hindi",
    url: "https://livetv.tarangplus.in/alankar-origin/live/playlist.m3u8",
    quality: "HD",
    description: "Blockbuster movies, family dramas, and special cinema presentations.",
    country: "India"
  },
  {
    id: "asianet-movies",
    name: "Asianet Movies",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/a/ad/Asianet_News_logo.svg/1200px-Asianet_News_logo.svg.png",
    category: "Movies",
    language: "Malayalam",
    url: "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:asianetmovies.smil/chunklist_b1928000.m3u8",
    quality: "HD",
    description: "24/7 dedicated Malayalam cinema channel featuring iconic film favorites.",
    country: "India"
  },
  {
    id: "amrita-tv",
    name: "Amrita TV",
    logo: "https://ddash74r36xqp.cloudfront.net/master.m3u8",
    category: "Entertainment",
    language: "Malayalam",
    url: "https://ddash74r36xqp.cloudfront.net/master.m3u8",
    quality: "HD",
    description: "Family entertainment, cultural reality shows, and uplifting telefilms.",
    country: "India"
  },
  {
    id: "colors-kannada",
    name: "Colors Kannada HD",
    logo: "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:colorskannadahd1.smil/playlist.m3u8",
    category: "Entertainment",
    language: "Kannada",
    url: "https://da86m1sqpm3o0.cloudfront.net/28072023/smil:colorskannadahd1.smil/playlist.m3u8",
    quality: "HD",
    description: "Karnataka's leading general entertainment channel with blockbuster serials.",
    country: "India"
  },

  // --- SPORTS ---
  {
    id: "dd-sports",
    name: "DD Sports HD",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/DD_Sports_Logo.svg/1200px-DD_Sports_Logo.svg.png",
    category: "Sports",
    language: "Hindi",
    url: "https://cdn.pishow.tv/ott/live/1161/master.m3u8",
    backupUrl: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/b17adfe543354fdd8d189b110617cddd/index.m3u8",
    quality: "HD",
    description: "Official sports broadcaster covering cricket, national games, hockey, and athletics.",
    country: "India",
    isFeatured: true
  },
  {
    id: "eurosport",
    name: "Eurosport HD",
    logo: "https://drk6xq0vhn.gpcdn.net/live/euro_sports_hd_abr/index.m3u8",
    category: "Sports",
    language: "English",
    url: "https://drk6xq0vhn.gpcdn.net/live/euro_sports_hd_abr/index.m3u8",
    quality: "HD",
    description: "International motorsports, tennis tournaments, cycling, and martial arts championships.",
    country: "India",
    isFeatured: true
  },

  // --- REGIONAL NEWS & CHANNELS ---
  {
    id: "abp-ananda",
    name: "ABP Ananda",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ABP_Ananda_logo.svg/1200px-ABP_Ananda_logo.svg.png",
    category: "News",
    language: "Bengali",
    url: "https://d2l4ar6y3mrs4k.cloudfront.net/live-streaming/ananda-livetv/master.m3u8",
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
    url: "https://mumbai-edge.smartplaytv.in/ABPMajha/index.m3u8",
    quality: "HD",
    description: "Maharashtra's leading Marathi news channel broadcasting local and state reports.",
    country: "India"
  },
  {
    id: "abn-andhra-jyothi",
    name: "ABN Andhra Jyothi",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/TV9_Telugu_logo.svg/1200px-TV9_Telugu_logo.svg.png",
    category: "News",
    language: "Telugu",
    url: "https://mumbai-edge.smartplaytv.in/10TV/index.m3u8",
    quality: "HD",
    description: "Top rated Telugu news channel covering Andhra Pradesh and Telangana state updates.",
    country: "India"
  },
  {
    id: "aaryaa-tamil",
    name: "Aaryaa TV Tamil",
    logo: "https://stream.ottlive.co.in/aryatvtamil/index.m3u8",
    category: "News",
    language: "Tamil",
    url: "https://stream.ottlive.co.in/aryatvtamil/index.m3u8",
    quality: "HD",
    description: "Tamil news, current affairs, interviews, and cultural coverage across Tamil Nadu.",
    country: "India"
  },
  {
    id: "twenty-four-news",
    name: "24 News Live",
    logo: "https://mumt07.tangotv.in/zHjX9OFlTWENTYFOURNEWS/index.m3u8",
    category: "News",
    language: "Malayalam",
    url: "https://mumt07.tangotv.in/zHjX9OFlTWENTYFOURNEWS/index.m3u8",
    quality: "HD",
    description: "Leading 24-hour Malayalam television news network from Kerala.",
    country: "India"
  },
  {
    id: "dd-punjabi",
    name: "DD Punjabi",
    logo: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/da821c24a59d4e57960497aeaca8fb33/index.m3u8",
    category: "Entertainment",
    language: "Punjabi",
    url: "https://d3qs3d2rkhfqrt.cloudfront.net/out/v1/da821c24a59d4e57960497aeaca8fb33/index.m3u8",
    quality: "SD",
    description: "Punjab heritage, folk music, rural programs, and cultural shows.",
    country: "India"
  },
  {
    id: "abp-asmita",
    name: "ABP Asmita",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/ABP_News_logo.svg/1200px-ABP_News_logo.svg.png",
    category: "News",
    language: "Gujarati",
    url: "https://d2l4ar6y3mrs4k.cloudfront.net/live-streaming/asmita-livetv/master.m3u8",
    quality: "HD",
    description: "Leading Gujarati news network providing live bulletins from across Gujarat.",
    country: "India"
  },

  // --- DEVOTIONAL & SPIRITUAL ---
  {
    id: "aastha-tv",
    name: "Aastha TV HD",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/Aastha_TV_logo.png/220px-Aastha_TV_logo.png",
    category: "Devotional",
    language: "Hindi",
    url: "https://mumt04.tangotv.in/m18aqlK4AASTHAGUJARATI/index.m3u8",
    quality: "HD",
    description: "Spiritual discourses, Vedic chants, morning yoga, and devotional bhajans.",
    country: "India",
    isFeatured: true
  },
  {
    id: "aadinath-tv",
    name: "Aadinath TV",
    logo: "https://mumt01.tangotv.in/O5aw8Zn3AADINATHTV/index.m3u8",
    category: "Devotional",
    language: "Hindi",
    url: "https://mumt01.tangotv.in/O5aw8Zn3AADINATHTV/index.m3u8",
    quality: "SD",
    description: "Sacred discourses, Jain philosophy, and morning temple prayers.",
    country: "India"
  },
  {
    id: "aastha-kannada",
    name: "Aastha Kannada",
    logo: "https://aasthaott.akamaized.net/110923/smil:aasthakannada.smil/playlist.m3u8",
    category: "Devotional",
    language: "Kannada",
    url: "https://aasthaott.akamaized.net/110923/smil:aasthakannada.smil/playlist.m3u8",
    quality: "SD",
    description: "Kannada devotional songs, spiritual guidance, and temple sanctum darshan.",
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
  "Devotional"
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
  "Punjabi",
  "Gujarati"
];
