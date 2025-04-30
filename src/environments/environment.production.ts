// Shared Imports
import { IEnvironment, EEnvironment } from '@shared/models'

export const environment: IEnvironment = {
	environment: EEnvironment.production,
	production: true,
	cloudflareIamgldAssetsBucket: 'https://assets.iamgld.dev',
}
