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
