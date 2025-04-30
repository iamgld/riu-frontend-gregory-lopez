export interface IEnvironment {
	environment: EEnvironment
	production: boolean
	cloudflareIamgldAssetsBucket: string
}

export enum EEnvironment {
	production = 'production',
	staging = 'staging',
	development = 'development',
	local = 'local',
}
