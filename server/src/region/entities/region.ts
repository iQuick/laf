import { ApiProperty } from '@nestjs/swagger'
import { ObjectId } from 'mongodb'

export enum ApplicationNamespaceMode {
  Fixed = 'fixed',
  AppId = 'appid',
}

export type RegionNamespaceConf = {
  mode: ApplicationNamespaceMode
  prefix: string
  fixed?: string
}

export type RegionClusterConf = {
  driver: string
  kubeconfig: string
  npmInstallFlags: string
  runtimeAffinity: any
}

export type RegionDatabaseConf = {
  driver: string
  connectionUri: string
  controlConnectionUri: string
}

export type TLSConf = {
  enabled: boolean
  issuerRef: {
    name: string
    kind: 'ClusterIssuer' | 'Issuer'
  }
  wildcardCertificateSecretName?: string
}

export type RegionGatewayConf = {
  driver: 'apisix' | 'nginx'
  runtimeDomain: string
  websiteDomain: string
  port: number
  tls: TLSConf
}

export type RegionStorageConf = {
  driver: string
  domain: string
  externalEndpoint: string
  internalEndpoint: string
  accessKey: string
  secretKey: string
  controlEndpoint: string
}

export type LogServerConf = {
  apiUrl: string
  secret: string
  databaseUrl: string
}

export type PrometheusConf = {
  apiUrl: string
}

export class Region {
  @ApiProperty({ type: String })
  _id?: ObjectId

  @ApiProperty()
  name: string

  @ApiProperty()
  displayName: string

  namespaceConf: RegionNamespaceConf
  clusterConf: RegionClusterConf
  databaseConf: RegionDatabaseConf
  gatewayConf: RegionGatewayConf
  storageConf: RegionStorageConf
  logServerConf: LogServerConf
  prometheusConf: PrometheusConf

  @ApiProperty()
  state: 'Active' | 'Inactive'

  @ApiProperty()
  createdAt: Date

  @ApiProperty()
  updatedAt: Date

  constructor(partial: Partial<Region>) {
    Object.assign(this, partial)
  }
}
