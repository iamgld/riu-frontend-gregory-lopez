// Hero Example
// {
// 	id: 9,
// 	name: 'Ajax',
// 	slug: '9-ajax',
// 	gender: 'male',
// 	image: 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/9-ajax.jpg',
// 	work: 'Enforcer',
// 	biography: {
// 		fullName: 'Francis',
// 		alterEgos: 'No alter egos found.',
// 		aliases: ['Francis'],
// 		firstAppearance: 'Deadpool #14 (1998)',
// 		publisher: 'Marvel Comics',
// 	},
// }

export interface Hero {
	id: number
	name: string
	slug: string
	gender: HeroGender
	image: string
	work: string
	biography: HeroBiography
}

export enum HeroGender {
	male = 'male',
	female = 'female',
	unknown = 'unknown',
}

export interface HeroBiography {
	fullName: string
	alterEgos: string
	aliases: string[]
	firstAppearance: string
	publisher: string
}
