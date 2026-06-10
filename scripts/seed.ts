import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_SERVICE_ROLE_KEY!
)

/* ============================================================
   USERS
   ============================================================ */

const USERS = [
  {
    email: 'ada@chatter.dev',
    password: 'password123',
    username: 'ada_okafor',
    full_name: 'Ada Okafor',
    bio: 'Software engineer turned writer. I cover distributed systems, career growth, and life as a builder in Lagos.',
    website: 'https://ada.dev',
    twitter: 'ada_okafor',
    popularity: 'high',
  },
  {
    email: 'emeka@chatter.dev',
    password: 'password123',
    username: 'emeka_nwosu',
    full_name: 'Emeka Nwosu',
    bio: 'Philosopher by training. Product manager by day. I write long essays about technology, meaning, and modern work.',
    website: '',
    twitter: 'emeka_thinks',
    popularity: 'high',
  },
  {
    email: 'zara@chatter.dev',
    password: 'password123',
    username: 'zara_mensah',
    full_name: 'Zara Mensah',
    bio: 'Senior frontend engineer at a fintech. I write about React, design systems, and developer experience.',
    website: 'https://zaramensah.io',
    twitter: 'zara_codes',
    popularity: 'high',
  },
  {
    email: 'tunde@chatter.dev',
    password: 'password123',
    username: 'tunde_adeyemi',
    full_name: 'Tunde Adeyemi',
    bio: 'Early-stage investor. Fintech and infrastructure. Contrarian by default, optimist by evidence.',
    website: '',
    twitter: 'tunde_inv',
    popularity: 'high',
  },
  {
    email: 'chisom@chatter.dev',
    password: 'password123',
    username: 'chisom_eze',
    full_name: 'Chisom Eze',
    bio: 'Literary critic. Book reviews, essay writing, and slow thoughts about fast times.',
    website: '',
    twitter: 'chisom_reads',
    popularity: 'medium',
  },
  {
    email: 'amara@chatter.dev',
    password: 'password123',
    username: 'amara_diallo',
    full_name: 'Amara Diallo',
    bio: 'Science communicator. I translate research into stories. Physics, climate, and the future of energy.',
    website: 'https://amaradiallo.com',
    twitter: 'amara_science',
    popularity: 'medium',
  },
  {
    email: 'kofi@chatter.dev',
    password: 'password123',
    username: 'kofi_asante',
    full_name: 'Kofi Asante',
    bio: 'Designer. I write about visual culture, African aesthetics, and what good design actually means.',
    website: 'https://kofiasante.design',
    twitter: 'kofi_design',
    popularity: 'medium',
  },
  {
    email: 'ngozi@chatter.dev',
    password: 'password123',
    username: 'ngozi_ibrahim',
    full_name: 'Ngozi Ibrahim',
    bio: 'Macroeconomist. I write about African markets, monetary policy, and what the data actually says.',
    website: '',
    twitter: 'ngozi_econ',
    popularity: 'medium',
  },
  {
    email: 'seun@chatter.dev',
    password: 'password123',
    username: 'seun_falola',
    full_name: 'Seun Falola',
    bio: 'Health researcher and writer. Evidence-based takes on nutrition, sleep, and how to actually live longer.',
    website: '',
    twitter: 'seun_health',
    popularity: 'medium',
  },
  {
    email: 'ife@chatter.dev',
    password: 'password123',
    username: 'ife_coker',
    full_name: 'Ife Coker',
    bio: 'Music journalist. I cover Afrobeats, its global rise, and what the industry looks like from the inside.',
    website: 'https://ifecoker.com',
    twitter: 'ife_music',
    popularity: 'low',
  },
  {
    email: 'chidi@chatter.dev',
    password: 'password123',
    username: 'chidi_obi',
    full_name: 'Chidi Obi',
    bio: 'Sports data analyst. Football tactics, performance metrics, and why your favourite club\'s manager is wrong.',
    website: '',
    twitter: 'chidi_footy',
    popularity: 'low',
  },
  {
    email: 'bisi@chatter.dev',
    password: 'password123',
    username: 'bisi_afolabi',
    full_name: 'Bisi Afolabi',
    bio: 'Travel writer and photographer. I document underrepresented corners of the continent.',
    website: 'https://bisiafolabi.com',
    twitter: 'bisi_travels',
    popularity: 'low',
  },
]

/* ============================================================
   POSTS
   ============================================================ */

const POSTS = [
  // Ada — Engineering/Career
  {
    authorIndex: 0,
    title: 'Why I left a FAANG job to build in Lagos',
    excerpt: 'The salary was great. The work was comfortable. But something felt deeply wrong.',
    content: `<p>Three years ago, I handed in my resignation at one of the most coveted technology companies in the world. My colleagues thought I had lost my mind. My parents stopped speaking to me for two weeks.</p>
<h2>The comfort trap</h2>
<p>There is a particular kind of suffering that comes from a life that looks perfect from the outside. Good salary. Interesting problems. Smart colleagues. Stock options.</p>
<p>But every Sunday evening, as I prepared for another week, I felt a quiet dread. Not because the work was bad. Because it didn't feel like <em>mine</em>.</p>
<h2>Coming home</h2>
<p>Lagos is chaotic in ways that will break you if you let it. Traffic that turns a 20-minute drive into two hours. Power that disappears without warning.</p>
<p>But Lagos is also alive in ways I had forgotten. Every problem is an opportunity so obvious you wonder why no one has solved it yet.</p>
<blockquote>The best time to build for Africa is now. The second best time is also now.</blockquote>
<p>I came home with savings, skills, and a deep conviction that the next decade of African tech would be built by people who chose to stay.</p>`,
    tags: ['startups', 'africa', 'career'],
    reading_time_minutes: 4,
    trending: true,
  },
  {
    authorIndex: 0,
    title: 'How I think about technical debt as a solo founder',
    excerpt: 'Not all debt is created equal. Here is the framework I use to decide what to fix and what to leave.',
    content: `<p>Technical debt gets talked about as if it is uniformly bad. It is not. Some technical debt is a rational decision. Some is the cost of learning. Some will kill your product if you let it accumulate.</p>
<h2>Three types of technical debt</h2>
<p><strong>Intentional debt</strong> is what you take on consciously. You know the right way and choose the faster way because speed matters more right now. Document it.</p>
<p><strong>Accidental debt</strong> is what you accumulate without realising it. You did not know better at the time. Deal with it when you find it.</p>
<p><strong>Reckless debt</strong> is what happens when you consistently choose speed without thinking about consequences. This will eventually stop your product from moving forward.</p>
<h2>The rule</h2>
<p>Fix anything that will slow down the next feature. Leave everything else for later.</p>`,
    tags: ['engineering', 'startups', 'programming'],
    reading_time_minutes: 4,
    trending: true,
  },

  // Emeka — Philosophy/Essays
  {
    authorIndex: 1,
    title: 'The productivity myth we need to stop believing',
    excerpt: 'Getting more done is not the same as living well. We have confused the two for too long.',
    content: `<p>Somewhere in the last decade, we collectively decided that the purpose of a human life was to be productive. Not happy. Not connected. Not wise. <strong>Productive.</strong></p>
<h2>How we got here</h2>
<p>The language of productivity seeped out of factory floors and MBA programs and into the way ordinary people talk about their lives. We optimise our mornings. We time-block our afternoons.</p>
<p>None of this is inherently bad. The problem is what it crowds out.</p>
<blockquote>We are human beings, not human doings.</blockquote>
<p>The most interesting people I know are not the most productive. They are the most curious.</p>`,
    tags: ['productivity', 'philosophy', 'life'],
    reading_time_minutes: 3,
    trending: true,
  },
  {
    authorIndex: 1,
    title: 'What Silicon Valley gets wrong about African ambition',
    excerpt: 'The startup playbook exported from California assumes a world that does not exist here.',
    content: `<p>Every few months, a new cohort of founders arrives in Lagos, Nairobi, or Accra with a pitch deck full of TAM slides and a playbook written for a market they have never lived in.</p>
<h2>The assumptions problem</h2>
<p>The canonical startup advice assumes reliable infrastructure, a large credit-using middle class, and trust in digital institutions. Strip those away and the advice falls apart.</p>
<p>The founders who win here do not ignore the playbook. They translate it. They ask: what is the local equivalent of this mechanism? What local behaviour can I build on instead of fighting?</p>
<h2>Ambition is not the problem</h2>
<p>African founders are not less ambitious than their counterparts elsewhere. They are operating with harder constraints and less margin for error. That is not a weakness. It is a different kind of training.</p>`,
    tags: ['startups', 'africa', 'culture'],
    reading_time_minutes: 5,
    trending: false,
  },

  // Zara — Frontend/Design Systems
  {
    authorIndex: 2,
    title: 'Everything I know about design systems after 5 years',
    excerpt: 'Hard-won lessons from building, breaking, and rebuilding component libraries at scale.',
    content: `<p>I have built three design systems from scratch. I have inherited two that were already in various states of collapse. Here is what I know.</p>
<h2>Start with decisions, not components</h2>
<p>Every design system is a set of decisions made permanent. The mistake most teams make is starting by building components. You should start by documenting decisions.</p>
<p>What is your spacing scale? What are your typographic rules? How does colour communicate meaning in your product? Answer these first.</p>
<h2>Naming is architecture</h2>
<p>The names you give things determine how people think about them. Good naming is a forcing function for good thinking.</p>
<h2>Your system will be wrong</h2>
<p>Accept this early. A design system that cannot evolve is a design system that will be abandoned. Build for change.</p>`,
    tags: ['design', 'frontend', 'engineering'],
    reading_time_minutes: 5,
    trending: true,
  },
  {
    authorIndex: 2,
    title: 'The React patterns I wish someone had taught me earlier',
    excerpt: 'After five years of production React, here are the patterns that actually matter.',
    content: `<p>There are a thousand ways to write a React component. Most of them will cause you pain at scale. Here are the patterns I keep returning to.</p>
<h2>Composition over configuration</h2>
<p>The temptation when building reusable components is to add props for every variation. Resist this. A component with twenty props is a component with twenty failure modes.</p>
<p>Instead, design for composition. Let the parent decide what goes inside. Keep your components small and your interfaces narrow.</p>
<h2>Colocate state</h2>
<p>State should live as close to where it is used as possible. Global state is a last resort, not a default. Most state that ends up in Redux or Zustand had no business being there.</p>
<h2>Think in contracts</h2>
<p>Every component has a contract — what it expects and what it guarantees. Make that contract explicit with TypeScript. Your future self will thank you.</p>`,
    tags: ['react', 'frontend', 'programming'],
    reading_time_minutes: 6,
    trending: true,
  },

  // Tunde — Fintech/Investing
  {
    authorIndex: 3,
    title: 'The fintech opportunity hiding in plain sight across Africa',
    excerpt: 'Everyone is chasing the same markets. The real opportunity is where nobody is looking.',
    content: `<p>Every investor I know is looking at payments. Lending. Remittances. These are real opportunities and real companies are being built.</p>
<p>But there is a category that almost nobody is talking about, and I think it will produce the largest outcomes of the next decade.</p>
<h2>Business infrastructure</h2>
<p>The informal economy across sub-Saharan Africa is estimated at over a trillion dollars. These businesses have almost no access to financial infrastructure designed for them.</p>
<h2>The wedge</h2>
<p>The companies that will win here will not start with financial services. They will start with a tool that makes a specific business more efficient and use the data generated to underwrite credit.</p>
<p>This is not a new playbook. It is how the best fintech companies in every market have been built.</p>`,
    tags: ['fintech', 'africa', 'investing'],
    reading_time_minutes: 4,
    trending: true,
  },
  {
    authorIndex: 3,
    title: 'Why most African startups raise too much money too early',
    excerpt: 'Capital is not the bottleneck you think it is. Here is what actually limits growth.',
    content: `<p>The obsession with fundraising in the African startup ecosystem has reached a point where the raise itself is treated as the achievement. It is not. It is the beginning of a set of obligations that many founders are not ready for.</p>
<h2>What money cannot buy</h2>
<p>Distribution. Regulatory relationships. Trust. These are the actual bottlenecks in most African markets. None of them can be purchased with a Series A.</p>
<p>The founders I have seen build enduring companies spend their early years solving these problems before raising significant capital. By the time they raise, they know exactly what the money is for.</p>
<h2>The right question</h2>
<p>Do not ask how much you can raise. Ask what specific problem the money solves, and whether you have exhausted cheaper solutions first.</p>`,
    tags: ['startups', 'investing', 'africa'],
    reading_time_minutes: 4,
    trending: false,
  },

  // Chisom — Books/Literature
  {
    authorIndex: 4,
    title: 'On reading slowly in a world that wants you to read fast',
    excerpt: 'Summaries, highlights, and speed reading have their place. But they cannot replace the real thing.',
    content: `<p>I read about forty books a year. What I am more proud of is that I remember most of them.</p>
<h2>The illusion of consumption</h2>
<p>We have built an entire ecosystem around the idea that the goal of reading is to finish books. Book summaries. Highlight apps. Speed reading courses.</p>
<p>What we have lost is the experience of being <em>inside</em> a book.</p>
<h2>Reading as relationship</h2>
<p>The books that have changed me did not change me because of their key insights. They changed me because I spent time with them. I argued with the author in the margins.</p>
<blockquote>A book worth reading is worth reading slowly.</blockquote>`,
    tags: ['books', 'reading', 'culture'],
    reading_time_minutes: 3,
    trending: false,
  },
  {
    authorIndex: 4,
    title: 'Chinua Achebe and the question every African writer still faces',
    excerpt: 'Who are you writing for? The answer shapes everything.',
    content: `<p>In an interview conducted years before his death, Chinua Achebe was asked who he wrote for. His answer has stayed with me: he said he wrote for the African reader who needed to see their world taken seriously.</p>
<h2>The audience question</h2>
<p>Every African writer navigates a version of this question. The international market rewards certain stories — narratives of poverty, conflict, and redemption that confirm existing assumptions about the continent. These stories find publishers and prizes.</p>
<p>The stories that do not fit this template have a harder road.</p>
<h2>What Achebe showed us</h2>
<p>Achebe's answer was not to ignore the international reader but to refuse to write for their comfort. The African reader was the primary audience. Everyone else was welcome to follow along.</p>
<p>This seems obvious in retrospect. At the time, it was a radical act.</p>`,
    tags: ['books', 'writing', 'culture'],
    reading_time_minutes: 5,
    trending: false,
  },

  // Amara — Science
  {
    authorIndex: 5,
    title: 'Africa\'s solar opportunity is bigger than anyone is reporting',
    excerpt: 'The continent has the highest solar irradiance in the world and the fastest-growing energy demand. This is not a coincidence.',
    content: `<p>While the global conversation about renewable energy focuses on Europe's grid transition and America's Inflation Reduction Act, a quieter transformation is underway across sub-Saharan Africa.</p>
<h2>The numbers</h2>
<p>Sub-Saharan Africa receives more solar radiation per square metre than any other region on earth. It also has the largest population without grid electricity access — approximately 600 million people.</p>
<p>These two facts together represent one of the clearest investment and development opportunities of the next thirty years.</p>
<h2>The distributed advantage</h2>
<p>Unlike Europe, Africa does not have decades of centralised grid infrastructure to unwind. Many communities can go directly to distributed solar without the legacy costs that slow transitions elsewhere.</p>
<p>This is not a consolation prize for lack of development. It is a genuine structural advantage.</p>`,
    tags: ['science', 'energy', 'africa'],
    reading_time_minutes: 5,
    trending: true,
  },
  {
    authorIndex: 5,
    title: 'What we get wrong about how the brain handles stress',
    excerpt: 'The science of stress is more nuanced than the wellness industry wants you to believe.',
    content: `<p>The modern wellness narrative about stress is essentially this: stress is bad, you have too much of it, and here is a product that will help. This narrative is profitable and almost entirely wrong.</p>
<h2>What stress actually is</h2>
<p>Stress is a physiological response to perceived challenge or threat. At moderate levels, it enhances performance, sharpens focus, and strengthens the immune response. The problem is not stress. The problem is chronic, unresolved stress with no recovery.</p>
<h2>The hormesis principle</h2>
<p>In toxicology, hormesis refers to a dose-response phenomenon where a substance that is harmful at high doses is beneficial at low doses. Stress works the same way.</p>
<p>The goal is not to eliminate stress. It is to ensure that stress is followed by recovery.</p>`,
    tags: ['science', 'health', 'psychology'],
    reading_time_minutes: 4,
    trending: false,
  },

  // Kofi — Design
  {
    authorIndex: 6,
    title: 'The African design renaissance nobody is talking about',
    excerpt: 'A generation of designers is creating visual languages rooted in the continent. Here is what they are building.',
    content: `<p>Open any major design publication and you will find coverage of Scandinavian minimalism, Japanese wabi-sabi, and Swiss grid typography. What you will not find, or find rarely, is coverage of the extraordinary design work happening across the African continent.</p>
<h2>The new visual language</h2>
<p>A generation of designers — many trained abroad, most choosing to work at home — is developing visual systems that draw on African textile traditions, architectural patterns, and colour relationships that have no Western equivalent.</p>
<p>This is not nostalgia. It is not pastiche. It is the development of a genuine design language for contemporary life.</p>
<h2>Why it matters</h2>
<p>Design is how a culture sees itself. When the only design language available to you was developed for someone else's context, something essential is missing. The designers building this new language are filling that absence.</p>`,
    tags: ['design', 'culture', 'africa'],
    reading_time_minutes: 4,
    trending: false,
  },
  {
    authorIndex: 6,
    title: 'Why most apps built for Africa look like they were designed in California',
    excerpt: 'The gap between user research and product decisions in African tech is wider than it should be.',
    content: `<p>I have used financial apps, health apps, and logistics apps built specifically for African markets that look identical to their American counterparts. Same visual language. Same interaction patterns. Same assumptions about the user.</p>
<h2>The copy-paste problem</h2>
<p>The most common explanation is that designers and product managers in African tech companies were trained on Western products and unconsciously replicate them. This is partly true.</p>
<p>The deeper problem is that user research is underfunded and undervalued. Products are built on assumptions, and the assumptions come from whatever the team has seen before.</p>
<h2>What good looks like</h2>
<p>The best-designed products I have seen in African markets are built by teams who spent time with real users before writing a line of code. Not focus groups. Actual time. Watching people use phones with 2GB of storage in 30-degree heat with intermittent data.</p>`,
    tags: ['design', 'product', 'africa'],
    reading_time_minutes: 4,
    trending: true,
  },

  // Ngozi — Economics
  {
    authorIndex: 7,
    title: 'What the naira tells us about monetary policy in frontier markets',
    excerpt: 'Currency crises are symptoms, not causes. Here is what is actually happening.',
    content: `<p>The naira's depreciation over the past decade is not primarily a story about the naira. It is a story about the structural relationship between oil revenue, import dependence, and monetary policy in a frontier economy.</p>
<h2>The oil trap</h2>
<p>Nigeria earns the majority of its foreign exchange from oil exports. When oil prices fall, foreign exchange supply falls. When the central bank tries to maintain an official exchange rate that does not reflect this reality, parallel markets emerge.</p>
<p>This is not a uniquely Nigerian problem. It is a recurring pattern in commodity-dependent economies.</p>
<h2>What reform actually requires</h2>
<p>Exchange rate unification — which Nigeria has attempted several times — is a necessary but not sufficient condition for stability. The underlying issue is export diversification, and that is a decade-long project, not a policy announcement.</p>`,
    tags: ['economics', 'africa', 'policy'],
    reading_time_minutes: 6,
    trending: false,
  },

  // Seun — Health
  {
    authorIndex: 8,
    title: 'The sleep research that should change how you work',
    excerpt: 'Eight hours is the floor, not the ceiling. And most of what you know about sleep is wrong.',
    content: `<p>Sleep research has undergone a revolution in the last fifteen years, and most of it has not made it into mainstream conversation. What we know now should fundamentally change how organisations think about work.</p>
<h2>What sleep deprivation actually does</h2>
<p>After seventeen hours without sleep, cognitive impairment is equivalent to a blood alcohol level of 0.05. After twenty-four hours, it matches 0.10 — legally drunk in most jurisdictions.</p>
<p>Most knowledge workers are operating in a state of chronic mild impairment and calling it normal.</p>
<h2>The productivity paradox</h2>
<p>The cultures that most valorise overwork — consulting, finance, early-stage startups — are also the cultures where the quality of thinking matters most. This is not a coincidence. It is a collective delusion maintained by survivorship bias.</p>`,
    tags: ['health', 'productivity', 'science'],
    reading_time_minutes: 5,
    trending: true,
  },

  // Ife — Music
  {
    authorIndex: 9,
    title: 'How Afrobeats became the world\'s most-exported music genre',
    excerpt: 'From Lagos clubs to global charts — the infrastructure story behind the sound.',
    content: `<p>The mainstream narrative about Afrobeats' global rise focuses on the artists. Burna Boy. Wizkid. Davido. This is understandable — they are the faces of the movement. But the more interesting story is about infrastructure.</p>
<h2>The digital distribution moment</h2>
<p>Before streaming, African music had no reliable global distribution channel. Physical distribution was expensive and geographically limited. Radio required local relationships that did not exist across borders.</p>
<p>Streaming eliminated these barriers simultaneously. For the first time, a song recorded in Lagos could reach a listener in Lagos and London and Los Angeles on the same day.</p>
<h2>What comes next</h2>
<p>The next phase of Afrobeats' global expansion is not about more streams. It is about ownership. The artists who will define the next decade are the ones building labels, publishing companies, and management infrastructure that keep value in Africa.</p>`,
    tags: ['music', 'culture', 'africa'],
    reading_time_minutes: 5,
    trending: true,
  },

  // Chidi — Sports
  {
    authorIndex: 10,
    title: 'What xG actually tells us about African football',
    excerpt: 'Expected goals metrics were built on European data. Here is what happens when you apply them to AFCON.',
    content: `<p>Expected goals — xG — has become the dominant analytical framework in modern football. Every major European league now has detailed xG data. The metric has changed how we evaluate players, assess managers, and predict outcomes.</p>
<h2>The data gap</h2>
<p>The problem is that xG models are trained on European data. The shooting distances, angles, and defensive contexts that define African football — particularly at international level — are systematically different.</p>
<p>When you apply European xG models to AFCON matches, you get numbers that tell a plausible story but miss what is actually happening on the pitch.</p>
<h2>Building African football analytics</h2>
<p>The solution is not better European models. It is African models, built on African data, developed by analysts who understand the context. This work is beginning. It is not yet mature.</p>`,
    tags: ['sports', 'analytics', 'africa'],
    reading_time_minutes: 5,
    trending: false,
  },

  // Bisi — Travel
  {
    authorIndex: 11,
    title: 'The parts of West Africa you have never seen in a travel article',
    excerpt: 'Beyond the beaches and the markets, there is a continent of extraordinary ordinary life.',
    content: `<p>I have been writing about travel in West Africa for six years. The pitches I struggle to place are always the same: quiet moments. Ordinary beauty. Life that does not perform for the camera.</p>
<h2>What travel media gets wrong</h2>
<p>Travel writing about Africa defaults to one of two modes: wildlife and landscape photography, or poverty tourism dressed up as cultural immersion. Neither captures the actual texture of life.</p>
<p>The city of Tamale at six in the morning. The ferry crossing from Banjul to Barra. The way light falls on the old colonial buildings in Saint-Louis. These things are beautiful and ordinary and they almost never make it into print.</p>
<h2>A different kind of looking</h2>
<p>The most useful thing I have learned in six years of travel writing is to be bored. To stay somewhere long enough that the extraordinary becomes familiar and you start to see what is actually there.</p>`,
    tags: ['travel', 'culture', 'africa'],
    reading_time_minutes: 4,
    trending: false,
  },
]

/* ============================================================
   FOLLOW GRAPH
   Popularity levels drive follower counts:
   high   → followed by almost everyone
   medium → followed by about half
   low    → followed by a few
   ============================================================ */

function buildFollowPairs() {
  const highIdx    = USERS.map((u, i) => u.popularity === 'high'   ? i : -1).filter(i => i >= 0)
  const mediumIdx  = USERS.map((u, i) => u.popularity === 'medium' ? i : -1).filter(i => i >= 0)
  const lowIdx     = USERS.map((u, i) => u.popularity === 'low'    ? i : -1).filter(i => i >= 0)
  const all        = USERS.map((_, i) => i)

  const pairs: [number, number][] = []

  const add = (follower: number, following: number) => {
    if (follower !== following) pairs.push([follower, following])
  }

  // Everyone follows high-popularity accounts
  for (const follower of all) {
    for (const following of highIdx) add(follower, following)
  }

  // Medium accounts follow each other + high
  for (const follower of mediumIdx) {
    for (const following of mediumIdx) add(follower, following)
  }

  // Low accounts follow medium + high (but fewer follow them back)
  for (const follower of lowIdx) {
    for (const following of [...highIdx, ...mediumIdx]) add(follower, following)
  }

  // A few medium accounts follow low accounts (gives them some followers)
  add(4, 9)
  add(5, 10)
  add(6, 11)
  add(7, 9)
  add(8, 11)

  // Deduplicate
  const seen = new Set<string>()
  return pairs.filter(([f, g]) => {
    const key = `${f}-${g}`
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
}

/* ============================================================
   SEED FUNCTION
   ============================================================ */

async function reset() {
  console.log('🗑️  Resetting existing seed data...')
  await supabase.from('post_tags').delete().neq('post_id', '')
  await supabase.from('comments').delete().neq('id', '')
  await supabase.from('likes').delete().neq('post_id', '')
  await supabase.from('bookmarks').delete().neq('post_id', '')
  await supabase.from('follows').delete().neq('follower_id', '')
  await supabase.from('post_views').delete().neq('id', '')
  await supabase.from('posts').delete().neq('id', '')

  // Delete only seed users by email
  const { data } = await supabase.auth.admin.listUsers()
  const seedEmails = new Set(USERS.map(u => u.email))
  for (const user of data.users) {
    if (seedEmails.has(user.email ?? '')) {
      await supabase.auth.admin.deleteUser(user.id)
    }
  }
  console.log('   Done.\n')
}

async function seed() {
  console.log('🌱 Seeding Chatter...\n')
  await reset()

  // ── 1. Users ──────────────────────────────────────────────
  console.log('Creating users...')
  const userIds: string[] = []

  for (const u of USERS) {
    const { data, error } = await supabase.auth.admin.createUser({
      email: u.email,
      password: u.password,
      email_confirm: true,
      user_metadata: { username: u.username, full_name: u.full_name },
    })

    if (error) {
      console.error(`  ✗ ${u.email}: ${error.message}`)
      userIds.push('')
      continue
    }

    userIds.push(data.user.id)

    await supabase
      .from('profiles')
      .update({
        bio: u.bio,
        full_name: u.full_name,
        website: u.website || null,
        twitter: u.twitter || null,
      })
      .eq('id', data.user.id)

    console.log(`  ✓ ${u.full_name} (${u.username}) [${u.popularity}]`)
  }

  // ── 2. Posts ──────────────────────────────────────────────
  console.log('\nCreating posts...')
  const postIds: string[] = []

  for (const p of POSTS) {
    const authorId = userIds[p.authorIndex]
    if (!authorId) { postIds.push(''); continue }

    const slug =
      p.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')
      + '-' + Math.random().toString(36).substring(2, 7)

    const daysAgo = p.trending
      ? Math.random() * 2        // trending = last 2 days
      : 2 + Math.random() * 12   // others = 2–14 days ago

    const { data: post, error } = await supabase
      .from('posts')
      .insert({
        author_id: authorId,
        title: p.title,
        slug,
        excerpt: p.excerpt,
        content: p.content,
        status: 'published',
        reading_time_minutes: p.reading_time_minutes,
        published_at: new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000).toISOString(),
      })
      .select()
      .single()

    if (error) {
      console.error(`  ✗ "${p.title}": ${error.message}`)
      postIds.push('')
      continue
    }

    postIds.push(post.id)

    for (const tagName of p.tags) {
      const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-')
      const { data: tag } = await supabase
        .from('tags')
        .upsert({ name: tagName, slug: tagSlug }, { onConflict: 'slug' })
        .select()
        .single()
      if (tag) {
        await supabase.from('post_tags').upsert({ post_id: post.id, tag_id: tag.id })
      }
    }

    console.log(`  ✓ "${p.title}"`)
  }

  // ── 3. Views (drives trending) ────────────────────────────
  console.log('\nCreating post views...')
  let totalViews = 0

  for (let pi = 0; pi < POSTS.length; pi++) {
    const postId = postIds[pi]
    if (!postId) continue

    const isTrending = POSTS[pi].trending
    const viewCount = isTrending
      ? 80 + Math.floor(Math.random() * 120)   // 80–200 views in last 24h
      : 5  + Math.floor(Math.random() * 20)    // 5–25 views

    const rows = Array.from({ length: viewCount }, (_, i) => ({
      post_id: postId,
      viewer_id: userIds[i % userIds.length] || null,
      viewed_at: new Date(
        Date.now() - Math.random() * (isTrending ? 20 : 200) * 60 * 60 * 1000
      ).toISOString(),
    }))

    const { error } = await supabase.from('post_views').insert(rows)
    if (!error) totalViews += viewCount
  }
  console.log(`  ✓ ${totalViews} views created`)

  // ── 4. Follows ────────────────────────────────────────────
  console.log('\nCreating follow relationships...')
  const followPairs = buildFollowPairs()
  let followCount = 0

  for (const [followerIdx, followingIdx] of followPairs) {
    const followerId  = userIds[followerIdx]
    const followingId = userIds[followingIdx]
    if (!followerId || !followingId) continue
    const { error } = await supabase
      .from('follows')
      .upsert({ follower_id: followerId, following_id: followingId })
    if (!error) followCount++
  }
  console.log(`  ✓ ${followCount} follow relationships created`)

  // ── 5. Likes ──────────────────────────────────────────────
  console.log('\nCreating likes...')
  let likeCount = 0

  for (let pi = 0; pi < postIds.length; pi++) {
    const postId = postIds[pi]
    if (!postId) continue
    const isTrending = POSTS[pi].trending
    const likerCount = isTrending
      ? 6 + Math.floor(Math.random() * 6)
      : 1 + Math.floor(Math.random() * 4)

    const likerIndices = [...Array(USERS.length).keys()]
      .filter(i => i !== POSTS[pi].authorIndex)
      .sort(() => Math.random() - 0.5)
      .slice(0, likerCount)

    for (const li of likerIndices) {
      const uid = userIds[li]
      if (!uid) continue
      await supabase.from('likes').upsert({ user_id: uid, post_id: postId })
      likeCount++
    }
  }
  console.log(`  ✓ ${likeCount} likes created`)

  // ── 6. Comments ───────────────────────────────────────────
  console.log('\nCreating comments...')

  const COMMENTS = [
    { postIdx: 0,  authorIdx: 1,  content: 'This resonates deeply. The Sunday dread is real.' },
    { postIdx: 0,  authorIdx: 2,  content: 'What was the hardest part practically — banking? Clients?' },
    { postIdx: 0,  authorIdx: 3,  content: 'Counterpoint: infrastructure challenges are real and underestimated.' },
    { postIdx: 1,  authorIdx: 2,  content: 'The intentional vs reckless debt distinction is one I\'m going to use with my team.' },
    { postIdx: 2,  authorIdx: 0,  content: 'The human beings vs human doings line is going to stay with me.' },
    { postIdx: 2,  authorIdx: 4,  content: 'Productivity culture is just anxiety with better branding.' },
    { postIdx: 4,  authorIdx: 0,  content: 'The naming point is so underrated. I\'ve seen systems collapse because of this.' },
    { postIdx: 4,  authorIdx: 1,  content: 'Would love a follow-up on handling versioning and breaking changes.' },
    { postIdx: 5,  authorIdx: 3,  content: 'Composition over configuration — I wish I had internalised this three years ago.' },
    { postIdx: 6,  authorIdx: 0,  content: 'The wedge strategy you describe is exactly what I\'m seeing work in the market.' },
    { postIdx: 8,  authorIdx: 5,  content: 'The distributed solar advantage point is one I haven\'t seen made this clearly before.' },
    { postIdx: 12, authorIdx: 6,  content: 'The data gap in African football analytics is a real and solvable problem.' },
    { postIdx: 13, authorIdx: 9,  content: 'The infrastructure story is always more interesting than the artist story.' },
    { postIdx: 14, authorIdx: 4,  content: 'The xG calibration problem is fascinating. Would love to see the methodology.' },
    { postIdx: 16, authorIdx: 3,  content: 'The sleep as performance metric framing is exactly how I\'ve started presenting this to founders.' },
  ]

  const commentIdMap: Record<number, string> = {}

  for (let ci = 0; ci < COMMENTS.length; ci++) {
    const c = COMMENTS[ci]
    const postId   = postIds[c.postIdx]
    const authorId = userIds[c.authorIdx]
    if (!postId || !authorId) continue

    const { data, error } = await supabase
      .from('comments')
      .insert({ post_id: postId, author_id: authorId, content: c.content })
      .select()
      .single()

    if (!error && data) commentIdMap[ci] = data.id
  }

  // Replies
  const REPLIES = [
    { parentIdx: 1, postIdx: 0, authorIdx: 0, content: 'Banking was the hardest — took three months to get a business account sorted.' },
    { parentIdx: 2, postIdx: 0, authorIdx: 0, content: 'Genuinely hard. Power and logistics were the two I underestimated most.' },
    { parentIdx: 7, postIdx: 4, authorIdx: 2, content: 'Great question — planning a whole piece on versioning. Short answer: semantic versioning, strictly.' },
  ]

  for (const r of REPLIES) {
    const parentId = commentIdMap[r.parentIdx]
    const postId   = postIds[r.postIdx]
    const authorId = userIds[r.authorIdx]
    if (!parentId || !postId || !authorId) continue
    await supabase
      .from('comments')
      .insert({ post_id: postId, author_id: authorId, content: r.content, parent_id: parentId })
  }

  console.log(`  ✓ ${COMMENTS.length} comments + ${REPLIES.length} replies created`)

  // ── 7. Bookmarks ──────────────────────────────────────────
  console.log('\nCreating bookmarks...')
  const BOOKMARKS = [
    [0,4],[0,6],[1,5],[2,0],[3,4],[4,0],[4,2],[5,8],[6,7],[7,3],[8,16],[9,13],
  ]
  for (const [ui, pi] of BOOKMARKS) {
    if (!userIds[ui] || !postIds[pi]) continue
    await supabase.from('bookmarks').upsert({ user_id: userIds[ui], post_id: postIds[pi] })
  }
  console.log(`  ✓ ${BOOKMARKS.length} bookmarks created`)

  // ── Summary ───────────────────────────────────────────────
  console.log('\n✅ Seed complete!\n')
  console.log('━'.repeat(52))
  console.log('  Test accounts (password: password123)\n')
  USERS.forEach(u =>
    console.log(`  ${u.email.padEnd(28)} @${u.username}`)
  )
  console.log('━'.repeat(52))
}

seed().catch(console.error)