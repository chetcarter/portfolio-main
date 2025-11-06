export const navItems = [
	{ name: 'About', link: '#about' },
	{ name: 'Projects', link: '#projects' },
	{ name: 'Testimonials', link: '#testimonials' },
	{ name: 'Contact', link: '#contact' },
];

export const gridItems = [
	{
		id: 1,
		title:
			'I lead with partnership, ensuring communication stays open and effortless ',
		description: '',
		className: 'lg:col-span-3 md:col-span-6 md:row-span-4 lg:min-h-[60vh]',
		imgClassName: 'w-full h-full',
		titleClassName: 'justify-end',
		img: '/b1.svg',
		spareImg: '',
	},
	{
		id: 2,
		title: "I'm highly adaptable and available across multiple time zones",
		description: '',
		className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
		imgClassName: '',
		titleClassName: 'justify-start',
		img: '',
		spareImg: '',
	},
	{
		id: 3,
		title: 'My tech stack',
		description: "I'm constantly trying to improve",
		className: 'lg:col-span-2 md:col-span-3 md:row-span-2',
		imgClassName: '',
		titleClassName: 'justify-center',
		img: '',
		spareImg: '',
	},
	{
		id: 4,
		title: 'Tech enthusiast with a passion for development.',
		description: '',
		className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
		imgClassName: '',
		titleClassName: 'justify-start',
		img: '/grid.svg',
		spareImg: '/b4.svg',
	},

	{
		id: 5,
		title: 'Currently building a Banking and Finance App',
		description: 'The Inside Scoop',
		className: 'md:col-span-3 md:row-span-2',
		imgClassName: 'absolute right-0 bottom-0 md:w-96 w-60',
		titleClassName: 'justify-center md:justify-start lg:justify-center',
		img: '/b5.svg',
		spareImg: '/grid.svg',
	},
	{
		id: 6,
		title: 'Do you want to start a project together?',
		description: '',
		className: 'lg:col-span-2 md:col-span-3 md:row-span-1',
		imgClassName: '',
		titleClassName: 'justify-center md:max-w-full max-w-60 text-center',
		img: '',
		spareImg: '',
	},
];

export const projects = [
	{
		id: 1,
		title: 'Stock Market App',
		des: 'AI-powered modern stock market app built with Next.js, Shadcn, Better Auth, and Inngest!',
		img: '/p1.svg',
		iconLists: ['/re.svg', '/tail.svg', '/ts.svg', '/three.svg', '/fm.svg'],
		link: 'https://github.com/chetcarter/stock-tracker-app-main',
	},
	{
		id: 2,
		title: 'AI Resume Analyzer',
		des: 'Implement seamless auth, upload and store resumes, and match candidates to jobs using smart AI evaluations.',
		img: '/p2.svg',
		iconLists: ['/next.svg', '/tail.svg', '/ts.svg', '/stream.svg', '/c.svg'],
		link: 'https://github.com/chetcarter/ai-resume-analyzer-main',
	},
	{
		id: 3,
		title: 'Streaming Movie Dashboard',
		des: 'Built with React.js, Appwrite, TailwindCSS, this Movie App lets users browse trending movies, search titles, and explore content using the TMDB API.',
		img: '/p3.svg',
		iconLists: ['/re.svg', '/tail.svg', '/ts.svg', '/three.svg', '/c.svg'],
		link: 'https://github.com/chetcarter/react-movies-main',
	},
	{
		id: 4,
		title: 'Animated Apple iPhone 3D Website',
		des: 'Recreated the Apple iPhone 15 Pro website, combining GSAP animations and Three.js 3D effects..',
		img: '/p4.svg',
		iconLists: ['/next.svg', '/tail.svg', '/ts.svg', '/three.svg', '/gsap.svg'],
		link: 'https://github.com/chetcarter/iphone-main',
	},
];

export const testimonials = [
	{
		quote:
			"We've used Chet for our websites for years. He's very creative, responsive and listens well to where we want to take the business from a marketing and design perspective. I'd highly recommend him for website design, SEO and logo design. He's recently updated our azatmexpert.com site and we soon saw our website hit in the top 5 for all the google searches we were interested in. We've seen a lot more calls since he took over our marketing.",
		name: 'Brandon H',
		title: 'Partner at AZ ATM Experts',
		image: '/brandon-h-testimonial.png',
	},
	{
		quote:
			'I had the pleasure of working with Chet during his tenure at Terbine.io as a front-end developer. He brought exceptional skill with React, TypeScript, and REST API integrations, turning complex requirements into smooth, high-performing user experiences. Chet didn’t just implement — he cared about usability, code quality, and how each feature aligned with our business goals.',
		name: 'Matt Y',
		title: 'CTO at Terbine.io',
		image: '/matt-y-testimonial.png',
	},
	{
		quote:
			'Collaborating with Chet at The Letizia Agency was truly a standout experience. His ability to dive into complex campaigns, pivot quickly and deliver high-impact visuals and web solutions under tight timelines showed rare professionalism. Chet’s dedication to understanding not just the technical build, but also the emotional undercurrent of the brand, made every deliverable stronger. If you’re looking for someone who blends full-stack know-how with creative strategy to lift your digital presence, Chet is the one you want.',
		name: 'Brittany M',
		title: 'VP of Marketing at The Letizia Agency',
		image: '/brittany-m-testimonial.png',
	},
	{
		quote:
			'Working with Chet at LightSpeed VT was a game-changer. He doesn’t just manage projects — he drives results with clarity, confidence, and a get-it-done mentality. Chet coordinated fast-moving teams, kept communication razor-sharp, and ensured every initiative hit the mark and moved the mission forward. He shows up prepared, thinks several steps ahead, and executes with intention.',
		name: 'Thomas L',
		title: 'VP of Development at LightspeedVT',
		image: '/thomas-l-testimonial.png',
	},
];

export const companies = [
	{
		id: 1,
		name: 'US ATM Experts',
		img: '/uaeLogo.svg',
		nameImg: '/uaeName.svg',
	},
	{
		id: 2,
		name: 'Terbine',
		img: '/terbineLogo.svg',
		nameImg: '/terbineName.svg',
	},
	{
		id: 3,
		name: 'Letizia Agency',
		img: '/letiziaLogo.svg',
		nameImg: '/letiziaName.svg',
	},
	{
		id: 4,
		name: 'LightspeedVT',
		img: '/lsvtLogo.svg',
		nameImg: '/lsvtName.svg',
	},
	{
		id: 5,
		name: 'UFC',
		img: '/ufcLogo.svg',
		nameImg: '/ufcName.svg',
	},
];

export const workExperience = [
	{
		id: 1,
		title: 'Full Stack Developer',
		desc: 'Built dynamic React.js platforms from the ground up, improving user interaction and performance.',
		className: 'md:col-span-2',
		thumbnail: '/exp1.svg',
	},
	{
		id: 2,
		title: 'Mobile App Development',
		desc: 'Designed and developed mobile app for both iOS & Android platforms using React Native.',
		className: 'md:col-span-2', // change to md:col-span-2
		thumbnail: '/exp2.svg',
	},
	{
		id: 3,
		title: 'Freelance App Dev Project',
		desc: 'Led the development of a mobile app, from initial concept to deployment on app stores.',
		className: 'md:col-span-2', // change to md:col-span-2
		thumbnail: '/exp3.svg',
	},
	{
		id: 4,
		title: 'Lead Frontend Developer',
		desc: 'Developed and maintained user-facing features using modern frontend technologies.',
		className: 'md:col-span-2',
		thumbnail: '/exp4.svg',
	},
];

export const socialMedia = [
	{
		id: 1,
		img: '/git.svg',
		link: 'https://github.com/chetcarter',
	},
	{
		id: 3,
		img: '/link.svg',
		link: 'https://www.linkedin.com/in/chetcarter/',
	},
];
