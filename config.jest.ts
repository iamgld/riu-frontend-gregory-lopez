import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'

setupZoneTestEnv()

export default {
	preset: 'jest-preset-angular',
	setupFilesAfterEnv: ['<rootDir>/config.jest.ts'],
	moduleNameMapper: {
		'^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
	},
}
