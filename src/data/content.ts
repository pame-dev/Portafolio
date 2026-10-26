// Todo el contenido del portafolio vive aquí. Para editar textos, proyectos o
// habilidades no hace falta tocar los componentes.

export type Lang = 'es' | 'en'
export type Role = 'fullstack' | 'data' | 'qa'
export type Lens = 'all' | Role

type T = Record<Lang, string>

export const profile = {
  name: 'Pamela Rodríguez',
  fullName: 'Daira Pamela Rodríguez Gómez',
  github: 'https://github.com/pame-dev',
  linkedin: 'https://www.linkedin.com/in/daira-pamela-rodriguez-gomez-167452324',
  // Escribe aquí tu correo si quieres que aparezca en la sección de contacto.
  email: 'drodriguez64@ucol.mx',
}

export const ui = {
  nav: {
    work: { es: 'Proyectos', en: 'Work' },
    skills: { es: 'Habilidades', en: 'Skills' },
    path: { es: 'Formación', en: 'Background' },
    certs: { es: 'Certificaciones', en: 'Certifications' },
    contact: { es: 'Contacto', en: 'Contact' },
  },
  status: {
    es: 'Prácticas profesionales a partir de enero 2028',
    en: 'Available for internships from January 2028',
  },
  location: { es: 'Colima, México', en: 'Colima, Mexico' },
  lensLabel: { es: 'Enfoque', en: 'Focus' },
  lensHint: {
    es: 'Elige un perfil y el portafolio resalta lo relevante.',
    en: 'Pick a role and the portfolio highlights what matters.',
  },
  workTitle: { es: 'Proyectos seleccionados', en: 'Selected work' },
  matches: { es: 'coinciden', en: 'match' },
  code: { es: 'Código', en: 'Code' },
  live: { es: 'Ver en vivo', en: 'Live' },
  skillsTitle: { es: 'Herramientas', en: 'Toolbox' },
  certsTitle: { es: 'Certificaciones', en: 'Certifications' },
  close: { es: 'Cerrar', en: 'Close' },
  photoAlt: { es: 'Foto de Pamela Rodríguez', en: 'Photo of Pamela Rodríguez' },
  pathTitle: { es: 'Formación', en: 'Background' },
  contactTitle: { es: '¿Trabajamos juntos?', en: "Let's work together" },
  contactText: {
    es: 'Busco prácticas profesionales a partir de enero de 2028 como desarrolladora fullstack, analista de datos o QA. También me interesan proyectos para seguir aprendiendo. Escríbeme y platicamos.',
    en: "I'm looking for an internship starting January 2028 as a fullstack developer, data analyst or QA engineer, and I'm open to projects where I can keep learning. Reach out and let's talk.",
  },
  footer: { es: 'Hecho con React por Pamela', en: 'Built with React by Pamela' },
  toggleTheme: { es: 'Cambiar tema', en: 'Toggle theme' },
} satisfies Record<string, T | Record<string, T>>

export const lenses: { id: Lens; label: T; headline: T; pitch: T }[] = [
  {
    id: 'all',
    label: { es: 'Todo', en: 'All' },
    headline: {
      es: 'Ingeniera de software en formación que construye de punta a punta.',
      en: 'Software engineering student who builds end to end.',
    },
    pitch: {
      es: 'Estudio Ingeniería de Software en la Universidad de Colima. Hago apps web y móviles, conecto hardware con la nube y trabajo con datos, desde la base de datos hasta la interfaz.',
      en: 'I study Software Engineering at the University of Colima. I build web and mobile apps, connect hardware to the cloud and work with data, from the database to the interface.',
    },
  },
  {
    id: 'fullstack',
    label: { es: 'Fullstack', en: 'Fullstack' },
    headline: {
      es: 'Apps completas: web, móvil y backend en el mismo lugar.',
      en: 'Complete apps: web, mobile and backend in one place.',
    },
    pitch: {
      es: 'React, TypeScript y Kotlin del lado del cliente; Laravel, Supabase y SQL del lado del servidor. Me gusta diseñar la base de datos y ver cómo llega cada dato a la pantalla.',
      en: 'React, TypeScript and Kotlin on the client; Laravel, Supabase and SQL on the server. I enjoy designing the database and following each piece of data to the screen.',
    },
  },
  {
    id: 'data',
    label: { es: 'Data', en: 'Data' },
    headline: {
      es: 'Datos que se convierten en decisiones.',
      en: 'Data that turns into decisions.',
    },
    pitch: {
      es: 'Uso Python para visión por computadora, optimización y visualización, y SQL para modelar y consultar información. Me interesa entender el problema antes de elegir el modelo.',
      en: 'I use Python for computer vision, optimization and visualization, and SQL to model and query data. I like to understand the problem before choosing the model.',
    },
  },
  {
    id: 'qa',
    label: { es: 'QA', en: 'QA' },
    headline: {
      es: 'Software que funciona como se promete.',
      en: 'Software that works as promised.',
    },
    pitch: {
      es: 'Escribo scripts de prueba y diagnóstico, preparo cuentas y datos de prueba por rol y reviso a detalle los flujos críticos como autenticación, permisos y comunicación con hardware.',
      en: 'I write test and diagnostic scripts, set up test accounts and data per role, and carefully check critical flows such as authentication, permissions and hardware communication.',
    },
  },
]

export type Media =
  | { kind: 'image'; src: string; alt: T }
  | { kind: 'video'; src: string; poster: string; alt: T }

export type Project = {
  id: string
  name: string
  year: string
  context: T
  summary: T
  stack: string[]
  roles: Role[]
  repo: string
  live?: string
  media?: Media[]
}

const m = (file: string) => `/media/${file}`

const gh = (repo: string) => `${profile.github}/${repo}`

export const projects: Project[] = [
  {
    id: 'karsy',
    name: 'Karsy',
    year: '2026',
    context: { es: 'Proyecto integrador · 5º semestre', en: 'Capstone · 5th semester' },
    summary: {
      es: 'Plataforma para comprar y vender autos entre particulares y lotes. La app Android y la versión web comparten el mismo backend: mismas tablas, sesión y fotos. Tiene registro con verificación por código de 6 dígitos, recuperación de contraseña y tres roles de usuario.',
      en: 'Marketplace for buying and selling cars between individuals and dealerships. The Android app and the web client share one backend: same tables, auth and photos. Includes sign-up with 6-digit email codes, password recovery and three user roles.',
    },
    stack: ['Kotlin', 'Jetpack Compose', 'React', 'TypeScript', 'Supabase', 'PostgreSQL'],
    roles: ['fullstack', 'qa'],
    repo: gh('Mobile-application'),
    live: 'https://karsy.netlify.app',
    media: [
      { kind: 'image', src: m('karsy-1.webp'), alt: { es: 'Pantalla de inicio de sesión de Karsy', en: 'Karsy sign-in screen' } },
      { kind: 'image', src: m('karsy-2.webp'), alt: { es: 'Catálogo de vehículos en Karsy', en: 'Karsy vehicle listings' } },
    ],
  },
  {
    id: 'unimora',
    name: 'UnimoraAccess',
    year: '2026',
    context: { es: 'Proyecto integrador · 4º semestre', en: 'Capstone · 4th semester' },
    summary: {
      es: 'Control de acceso por reconocimiento facial: captura rostros en varias posturas, entrena un modelo LBPH y abre una cerradura con relevador. Incluye historial de accesos, panel de usuarios y scripts de prueba para cámara, relevador y buzzer.',
      en: 'Facial-recognition access control: captures faces in several poses, trains an LBPH model and opens a lock through a relay. Includes access history, a user panel and test scripts for camera, relay and buzzer.',
    },
    stack: ['Python', 'OpenCV', 'NumPy', 'MySQL', 'CustomTkinter', 'Raspberry Pi'],
    roles: ['data', 'qa'],
    repo: gh('Sistema-de-Reconocimiento-Facial'),
    media: [
      { kind: 'video', src: m('unimora.mp4'), poster: m('unimora-poster.jpg'), alt: { es: 'Video de UnimoraAccess funcionando', en: 'UnimoraAccess demo video' } },
      { kind: 'image', src: m('unimora-2.webp'), alt: { es: 'Pantalla táctil con acceso permitido', en: 'Touchscreen showing access granted' } },
      { kind: 'image', src: m('unimora-1.webp'), alt: { es: 'Prototipo de puerta con cámara y pantalla', en: 'Door prototype with camera and screen' } },
    ],
  },
  {
    id: 'pitline',
    name: 'PitLine',
    year: '2025',
    context: { es: 'Proyecto integrador · 3er semestre', en: 'Capstone · 3rd semester' },
    summary: {
      es: 'Sistema de turnos para un taller mecánico en Manzanillo: los clientes solicitan turno por área y el taller ve la fila en tiempo real. Tiene autenticación, roles y permisos configurables, y está publicado en producción.',
      en: 'Queue system for an auto repair shop in Manzanillo: customers request a turn by service area and staff see the live queue. Includes authentication and configurable roles and permissions, deployed to production.',
    },
    stack: ['Laravel', 'PHP', 'MySQL', 'Bootstrap', 'Spatie Permission'],
    roles: ['fullstack', 'qa'],
    repo: gh('crud_con_roles'),
    live: 'https://pitline.site',
    media: [
      { kind: 'video', src: m('pitline.mp4'), poster: m('pitline-poster.jpg'), alt: { es: 'Video de presentación de PitLine', en: 'PitLine demo video' } },
      { kind: 'image', src: m('pitline-1.webp'), alt: { es: 'PitLine en el celular', en: 'PitLine on mobile' } },
    ],
  },
  {
    id: 'pib',
    name: 'Más Allá del PIB',
    year: '2025',
    context: { es: 'Proyecto en equipo · 7 personas', en: 'Team project · 7 people' },
    summary: {
      es: 'Blog bilingüe con usuarios y autores sobre trabajo decente y crecimiento económico (ODS 8) en Manzanillo. Colaboré en el desarrollo con Git en equipo y escribí artículos para el sitio, que está publicado.',
      en: 'Bilingual blog with users and authors about decent work and economic growth (UN SDG 8) in Manzanillo. I contributed to development using a team Git workflow and wrote articles for the live site.',
    },
    stack: ['PHP', 'MySQL', 'JavaScript', 'HTML / CSS', 'Git'],
    roles: ['fullstack'],
    repo: 'https://github.com/Edubedo/MasAllaDelPIB',
    live: 'https://masalladelpib.site',
    media: [
      { kind: 'image', src: m('pib-1.webp'), alt: { es: 'Página principal del blog Más Allá del PIB', en: 'Más Allá del PIB blog home page' } },
    ],
  },
  {
    id: 'pastillero',
    name: 'Pastillero inteligente',
    year: '2026',
    context: { es: 'IoT · proyecto de materia', en: 'IoT · course project' },
    summary: {
      es: 'Pastillero de 7 compartimentos con LEDs controlados por un Particle Photon. Desde una web se programa cada cuántas horas se toma cada medicamento y un webhook guarda el historial en la nube.',
      en: 'Seven-compartment pill box with LEDs driven by a Particle Photon. A web app schedules each medication and a webhook stores the intake history in the cloud.',
    },
    stack: ['JavaScript', 'C++', 'Supabase', 'PostgreSQL', 'Particle'],
    roles: ['fullstack'],
    repo: gh('Pastillero_Inteligente'),
    media: [
      { kind: 'image', src: m('pastillero-1.webp'), alt: { es: 'Pastillero con LEDs encendidos y su circuito interno', en: 'Pill box with lit LEDs and its internal circuit' } },
    ],
  },
  {
    id: 'tortuga',
    name: 'Tortuga al rescate',
    year: '2025',
    context: { es: 'Videojuego educativo', en: 'Educational game' },
    summary: {
      es: 'Juego de plataformas 2D inspirado en el ODS 14 (Vida submarina): una tortuga esquiva redes y plásticos para rescatar a sus padres.',
      en: '2D platformer inspired by UN SDG 14 (Life Below Water): a sea turtle dodges nets and plastic to rescue its parents.',
    },
    stack: ['Python', 'Pygame'],
    roles: [],
    repo: gh('tortuga_al_rescate'),
    media: [
      { kind: 'image', src: m('tortuga-1.webp'), alt: { es: 'Pantalla de título de Tortuga al rescate', en: 'Tortuga al rescate title screen' } },
    ],
  },
  {
    id: 'rym',
    name: 'Buscador Rick & Morty',
    year: '2025',
    context: { es: 'Consumo de API', en: 'API client' },
    summary: {
      es: 'Buscador de personajes por nombre, episodio o mundo que consume una API REST pública. Funciona bien en celular.',
      en: 'Character search by name, episode or world on top of a public REST API. Works well on mobile.',
    },
    stack: ['JavaScript', 'Fetch API', 'Netlify'],
    roles: ['fullstack'],
    repo: gh('buscador-de-personajes-de-Rick-y-Mort'),
    live: 'https://683a3f7251d0807ad2d6a64f--remarkable-crepe-006513.netlify.app',
    media: [
      { kind: 'image', src: m('rym-1.webp'), alt: { es: 'Buscador con filtros y tarjetas de personajes', en: 'Search filters and character cards' } },
    ],
  },
]

export const skillGroups: { title: T; items: { name: string; roles: Role[] }[] }[] = [
  {
    title: { es: 'Lenguajes', en: 'Languages' },
    items: [
      { name: 'JavaScript', roles: ['fullstack', 'qa'] },
      { name: 'TypeScript', roles: ['fullstack'] },
      { name: 'Python', roles: ['data', 'qa'] },
      { name: 'Kotlin', roles: ['fullstack'] },
      { name: 'Java', roles: ['fullstack', 'qa'] },
      { name: 'PHP', roles: ['fullstack'] },
      { name: 'SQL', roles: ['fullstack', 'data', 'qa'] },
      { name: 'C / C++', roles: [] },
    ],
  },
  {
    title: { es: 'Web y móvil', en: 'Web & mobile' },
    items: [
      { name: 'React', roles: ['fullstack'] },
      { name: 'Vite', roles: ['fullstack'] },
      { name: 'HTML / CSS', roles: ['fullstack'] },
      { name: 'Bootstrap', roles: ['fullstack'] },
      { name: 'Laravel', roles: ['fullstack'] },
      { name: 'Jetpack Compose', roles: ['fullstack'] },
    ],
  },
  {
    title: { es: 'Datos', en: 'Data' },
    items: [
      { name: 'PostgreSQL', roles: ['fullstack', 'data'] },
      { name: 'MySQL', roles: ['fullstack', 'data'] },
      { name: 'Supabase', roles: ['fullstack'] },
      { name: 'NumPy', roles: ['data'] },
      { name: 'Matplotlib', roles: ['data'] },
      { name: 'OpenCV', roles: ['data'] },
      { name: 'Power BI', roles: ['data'] },
    ],
  },
  {
    title: { es: 'Calidad y flujo', en: 'Quality & workflow' },
    items: [
      { name: 'Git / GitHub', roles: ['fullstack', 'data', 'qa'] },
      { name: 'Pruebas manuales', roles: ['qa'] },
      { name: 'Scripts de prueba', roles: ['qa', 'data'] },
      { name: 'Migraciones de BD', roles: ['fullstack', 'qa'] },
      { name: 'IoT · Particle / RPi', roles: [] },
    ],
  },
  {
    title: { es: 'Habilidades blandas', en: 'Soft skills' },
    items: [
      { name: 'Trabajo en equipo', roles: ['fullstack', 'data', 'qa'] },
      { name: 'Comunicación', roles: ['qa'] },
      { name: 'Pensamiento analítico', roles: ['data', 'qa'] },
      { name: 'Aprendizaje autónomo', roles: [] },
      { name: 'Gestión de proyectos', roles: [] },
    ],
  },
  {
    title: { es: 'Idiomas', en: 'Languages' },
    items: [
      { name: 'Español · nativo', roles: [] },
      { name: 'Inglés · A2', roles: [] },
    ],
  },
]

export const background: { period: string; title: T; place: T; detail: T }[] = [
  {
    period: '2024 —',
    title: { es: 'Ingeniería de Software', en: 'B.Eng. Software Engineering' },
    place: { es: 'Universidad de Colima', en: 'University of Colima' },
    detail: {
      es: 'Cursando 5º semestre. Un proyecto integrador cada semestre, de CRUD web a sistemas con visión por computadora y apps móviles.',
      en: 'Currently in 5th semester. One capstone per semester, from web CRUDs to computer-vision systems and mobile apps.',
    },
  },
  {
    period: '— 2024',
    title: { es: 'Técnico en Contabilidad', en: 'Accounting Technician' },
    place: { es: 'Universidad de Colima · bachillerato', en: 'University of Colima · high school' },
    detail: {
      es: 'Formación técnica en contabilidad, que me dio bases de organización, análisis de números y atención al cliente.',
      en: 'Technical training in accounting that gave me a foundation in organization, working with numbers and customer service.',
    },
  },
  // Agrega aquí tu experiencia de LinkedIn (trabajos, voluntariados, certificaciones).
]

export const certifications: {
  title: string
  issuer: string
  date: T
  hours?: string
  roles: Role[]
  image: string
}[] = [
  {
    title: 'Web Development',
    issuer: 'Sololearn',
    date: { es: 'Ago 2025', en: 'Aug 2025' },
    roles: ['fullstack'],
    image: m('cert-web_development.webp'),
  },
  {
    title: 'Programación con Java',
    issuer: 'BEDU · Tecnolochicas PRO',
    date: { es: 'Jul 2025', en: 'Jul 2025' },
    hours: '40 h',
    roles: ['fullstack', 'qa'],
    image: m('cert-javat.webp'),
  },
  {
    title: 'Introduction to Java',
    issuer: 'Sololearn',
    date: { es: 'Jul 2025', en: 'Jul 2025' },
    roles: ['fullstack', 'qa'],
    image: m('cert-javai.webp'),
  },
  {
    title: 'Fundamentos de ChatGPT',
    issuer: 'Santander Open Academy',
    date: { es: 'Jul 2025', en: 'Jul 2025' },
    hours: '8 h',
    roles: [],
    image: m('cert-fundamentoschatgpt.webp'),
  },
  {
    title: 'Acelerador de Carrera con Power BI',
    issuer: 'Daxus Latam',
    date: { es: 'Jun 2025', en: 'Jun 2025' },
    hours: '8 h',
    roles: ['data'],
    image: m('cert-powerbi.webp'),
  },
  {
    title: 'Python: Crea tu primer juego con Pygame',
    issuer: 'Udemy',
    date: { es: 'Jun 2025', en: 'Jun 2025' },
    hours: '7.5 h',
    roles: [],
    image: m('cert-pygame.webp'),
  },
  {
    title: 'Visual Studio Code y GitHub Copilot',
    issuer: 'Código Facilito',
    date: { es: 'May 2025', en: 'May 2025' },
    hours: '3.5 h',
    roles: ['fullstack', 'qa'],
    image: m('cert-vscode_y_githubcopilot.webp'),
  },
]
