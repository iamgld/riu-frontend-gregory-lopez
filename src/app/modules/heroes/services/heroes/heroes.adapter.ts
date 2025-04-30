// This Module Imports
import { Hero, HeroGender } from '@heroes/models'

export interface HeroFromData {
	id: number
	name: string
	slug: string
	gender: string
	image: string
	work: string
	biography: {
		fullName: string
		alterEgos: string
		aliases: string[]
		firstAppearance: string
		publisher: string
	}
}

export function heroAdapter(response: HeroFromData): Hero {
	let gender: HeroGender = HeroGender.unknown

	switch (response?.gender) {
		case 'male':
			gender = HeroGender.male
			break
		case 'female':
			gender = HeroGender.female
			break
		default:
			gender = HeroGender.unknown
			break
	}

	return {
		id: response?.id ?? 0,
		name: response?.name ?? '',
		slug: response?.slug ?? '',
		gender,
		image: response?.image ?? '',
		work: response?.work ?? '',
		biography: {
			fullName: response?.biography?.fullName ?? '',
			alterEgos: response?.biography?.alterEgos ?? '',
			aliases: response?.biography?.aliases ?? [],
			firstAppearance: response?.biography?.firstAppearance ?? '',
			publisher: response?.biography?.publisher ?? '',
		},
	}
}
