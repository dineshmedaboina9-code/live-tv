import { defaultChannels } from '../data/defaultChannels';

const IPTV_ORG_INDIA_M3U = 'https://iptv-org.github.io/iptv/countries/in.m3u';
const CACHE_KEY = 'stream_pulse_india_channels_v2';
const CACHE_TIMESTAMP_KEY = 'stream_pulse_channels_time';
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Parses raw M3U text into structured Channel objects
 */
export function parseM3U(m3uText) {
  const lines = m3uText.split(/\r?\n/);
  const channels = [];
  let currentChannel = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('#EXTINF:')) {
      // Parse #EXTINF attributes
      const idMatch = line.match(/tvg-id="([^"]*)"/i);
      const nameMatch = line.match(/tvg-name="([^"]*)"/i);
      const logoMatch = line.match(/tvg-logo="([^"]*)"/i);
      const groupMatch = line.match(/group-title="([^"]*)"/i);
      
      // Fallback channel name from the trailing text after comma
      const commaIndex = line.lastIndexOf(',');
      const displayName = commaIndex !== -1 ? line.substring(commaIndex + 1).trim() : 'Channel';

      const channelName = nameMatch ? nameMatch[1] : displayName;
      const rawCategory = groupMatch ? groupMatch[1].trim() : 'General';

      // Infer clean category
      let category = 'General';
      const catLower = rawCategory.toLowerCase();
      const nameLower = channelName.toLowerCase();

      if (catLower.includes('news') || nameLower.includes('news')) category = 'News';
      else if (catLower.includes('music') || nameLower.includes('music') || nameLower.includes('9x')) category = 'Music';
      else if (catLower.includes('movie') || catLower.includes('cinema') || nameLower.includes('cinema') || nameLower.includes('movie')) category = 'Movies';
      else if (catLower.includes('sport') || nameLower.includes('sport')) category = 'Sports';
      else if (catLower.includes('spirit') || catLower.includes('religio') || catLower.includes('devotion') || nameLower.includes('aastha') || nameLower.includes('sanskar')) category = 'Devotional';
      else if (catLower.includes('kid') || catLower.includes('animat') || catLower.includes('educat')) category = 'Kids & Learning';
      else if (catLower.includes('entertain') || catLower.includes('series')) category = 'Entertainment';

      // Infer language
      let language = 'Hindi';
      if (nameLower.includes('tamil') || catLower.includes('tamil')) language = 'Tamil';
      else if (nameLower.includes('telugu') || catLower.includes('telugu')) language = 'Telugu';
      else if (nameLower.includes('malayalam') || catLower.includes('malayalam') || nameLower.includes('asianet')) language = 'Malayalam';
      else if (nameLower.includes('kannada') || catLower.includes('kannada')) language = 'Kannada';
      else if (nameLower.includes('bengali') || catLower.includes('bangla') || nameLower.includes('ananda')) language = 'Bengali';
      else if (nameLower.includes('marathi') || catLower.includes('marathi') || nameLower.includes('majha')) language = 'Marathi';
      else if (nameLower.includes('punjabi') || catLower.includes('punjabi') || nameLower.includes('ptc')) language = 'Punjabi';
      else if (nameLower.includes('english') || catLower.includes('english') || nameLower.includes('wion') || nameLower.includes('india today')) language = 'English';

      currentChannel = {
        id: idMatch ? idMatch[1] : `ch-${channels.length + 1}-${channelName.toLowerCase().replace(/[^a-z0-9]/g, '-')}`,
        name: channelName,
        logo: logoMatch ? logoMatch[1] : '',
        category,
        language,
        url: '',
        quality: channelName.toLowerCase().includes('hd') ? 'HD' : 'SD',
        description: `Live streaming from ${channelName} in ${language}.`,
        country: 'India'
      };
    } else if (line && !line.startsWith('#') && currentChannel) {
      // Stream URL
      currentChannel.url = line;
      if (currentChannel.url.startsWith('http://') || currentChannel.url.startsWith('https://')) {
        channels.push(currentChannel);
      }
      currentChannel = null;
    }
  }

  return channels;
}

/**
 * Fetches Indian live channels from IPTV-org with caching and verified fallback
 */
export async function getIndianChannels(forceRefresh = false) {
  // Check local storage cache
  if (!forceRefresh) {
    try {
      const cachedTime = localStorage.getItem(CACHE_TIMESTAMP_KEY);
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData && cachedTime && (Date.now() - parseInt(cachedTime, 10)) < CACHE_TTL_MS) {
        const parsed = JSON.parse(cachedData);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return mergeWithDefaults(parsed);
        }
      }
    } catch {
      // Ignore cache read errors
    }
  }

  // Attempt to fetch fresh playlist from IPTV-org
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);
    const response = await fetch(IPTV_ORG_INDIA_M3U, { signal: controller.signal });
    clearTimeout(timeoutId);

    if (response.ok) {
      const text = await response.text();
      const fetchedChannels = parseM3U(text);
      if (fetchedChannels.length > 0) {
        const merged = mergeWithDefaults(fetchedChannels);
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify(merged));
          localStorage.setItem(CACHE_TIMESTAMP_KEY, Date.now().toString());
        } catch {
          // localStorage quota exceeded or disabled
        }
        return merged;
      }
    }
  } catch (error) {
    console.warn('Live IPTV-org fetch failed or CORS restricted, falling back to verified channels:', error);
  }

  // Fallback to our curated verified high-uptime default channels
  return defaultChannels;
}

/**
 * Merges live parsed channels with default curated channels
 */
function mergeWithDefaults(fetchedChannels) {
  const map = new Map();

  // Curated verified channels go in first with high priority
  defaultChannels.forEach(ch => {
    map.set(ch.name.toLowerCase().trim(), ch);
  });

  // Add fetched channels if not already present
  fetchedChannels.forEach(ch => {
    const key = ch.name.toLowerCase().trim();
    if (!map.has(key)) {
      map.set(key, ch);
    }
  });

  return Array.from(map.values());
}

/**
 * Loads a custom user-provided M3U URL or raw text
 */
export async function loadCustomPlaylist(urlOrContent) {
  if (urlOrContent.startsWith('http://') || urlOrContent.startsWith('https://')) {
    const response = await fetch(urlOrContent);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const text = await response.text();
    return parseM3U(text);
  } else {
    return parseM3U(urlOrContent);
  }
}

/**
 * Generates realistic EPG (Electronic Program Guide) schedule for any channel
 */
export function generateEPG(channel) {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinutes = now.getMinutes();

  // Base schedule templates by genre
  const genreSchedules = {
    News: [
      { title: "Morning Express & Market Prep", desc: "Top national headlines, weather, and business outlook." },
      { title: "Prime Time Debate", desc: "Hot political topics dissected by leading commentators." },
      { title: "Special Investigation 360", desc: "Deep dive investigative reporting on vital public issues." },
      { title: "Top 100 Headlines Non-Stop", desc: "Rapid-fire updates on state, national, and international events." },
      { title: "Nation at 9 with Panelists", desc: "The definitive nightly news broadcast with expert debate." },
      { title: "Late Night World Round-Up", desc: "Global headlines and geopolitical analysis." }
    ],
    Entertainment: [
      { title: "Prabhat Darshan & Bhakti", desc: "Morning devotional melodies and sacred starts." },
      { title: "Mithai Family Special", desc: "Heartwarming family drama filled with twist and relationships." },
      { title: "Mahabharat / Ramayan Classics", desc: "Epic mythology recreated in magnificent grandeur." },
      { title: "Comedy Ka Maha Muqabla", desc: "Stand-up comedy stars bringing non-stop laughter." },
      { title: "Maha Episode Premiere", desc: "High drama confrontation in tonight's mega episode." },
      { title: "Midnight Suspense Thriller", desc: "Spine-chilling crime investigation and mystery tales." }
    ],
    Music: [
      { title: "Morning Bliss & Acoustic Rhythms", desc: "Start your day with soothing melodies and fresh acoustics." },
      { title: "Bollywood Top 20 Countdown", desc: "The biggest chartbusters ranked by listener popularity." },
      { title: "90s Golden Melodies", desc: "Kumar Sanu, Alka Yagnik, Udit Narayan classics back-to-back." },
      { title: "Dhamaka Dance Beats", desc: "High-octane party anthems and foot-tapping remix specials." },
      { title: "Unplugged & Indie Waves", desc: "Soulful indie artists and acoustic jam sessions." },
      { title: "Late Night Chill Sessions", desc: "Lo-fi beats, ambient tunes, and late-night serenades." }
    ],
    Movies: [
      { title: "Matinee Superhit Cinema", desc: "Star-studded blockbuster movie full of action and romance." },
      { title: "South Action Explosion", desc: "Electrifying South action blockbuster dubbed in high definition." },
      { title: "Bollywood Classic Gold", desc: "Award-winning iconic masterpiece from the golden era." },
      { title: "Mega Premiere of the Week", desc: "First time on television - sensational crime action thriller." },
      { title: "Late Night Comedy Bonanza", desc: "Side-splitting comic riot starring top ensemble cast." }
    ],
    Sports: [
      { title: "Morning Match Highlights & Analysis", desc: "Recap of yesterday's premier matches and expert analysis." },
      { title: "Live Stadium Match Broadcast", desc: "Direct live sporting action with commentary and stats." },
      { title: "Sports Center Live: The Big Game", desc: "Pre-match preview, pitch condition, and star lineups." },
      { title: "Post Match Review & Player Interviews", desc: "In-depth breakdown of winning moments and tactical plays." },
      { title: "Legends of Sport: Documentary", desc: "Inspiring journeys of legendary champion athletes." }
    ],
    Devotional: [
      { title: "Suprabhatam & Temple Aarti", desc: "Live auspicious morning prayers and sacred sanctum darshan." },
      { title: "Srimad Bhagavatam Discourse", desc: "Enlightening spiritual teachings by revered sages." },
      { title: "Sankirtan & Divine Bhajans", desc: "Soul-stirring devotional music and chants." },
      { title: "Sandhya Sandesh & Evening Aarti", desc: "Sunset lamp offering and evening prayers." },
      { title: "Spiritual Healing & Meditation", desc: "Guided mindfulness, peace chants, and philosophical reflections." }
    ]
  };

  const templates = genreSchedules[channel.category] || genreSchedules.Entertainment;
  const programs = [];

  // Generate 6 upcoming slots of 1 to 2 hours
  let startHour = (currentHour - 1 + 24) % 24;

  for (let i = 0; i < 6; i++) {
    const slotHour = (startHour + i * 2) % 24;
    const endSlotHour = (slotHour + 2) % 24;
    const tmpl = templates[i % templates.length];

    const isCurrent = (currentHour >= slotHour && currentHour < slotHour + 2) ||
                      (slotHour > endSlotHour && (currentHour >= slotHour || currentHour < endSlotHour));

    // Calculate progress percentage for current show
    let progress = 0;
    if (isCurrent) {
      const minutesIntoSlot = ((currentHour - slotHour + 24) % 24) * 60 + currentMinutes;
      progress = Math.min(100, Math.max(5, Math.round((minutesIntoSlot / 120) * 100)));
    }

    programs.push({
      id: `prog-${channel.id}-${i}`,
      title: tmpl.title,
      description: tmpl.desc,
      startTime: `${String(slotHour).padStart(2, '0')}:00`,
      endTime: `${String(endSlotHour).padStart(2, '0')}:00`,
      isCurrent,
      progress: isCurrent ? progress : 0
    });
  }

  return programs;
}
