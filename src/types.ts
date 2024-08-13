export enum Sensor {
  ENERGY = 'energy',
  VIBRATION = 'vibration',
}

export enum Status {
  OPERATING = 'operating',
  ALERT = 'alert',
}

export type SensorType = Sensor | null

export type StatusType = Status | null

export interface Location {
  name: string
  id: string
  parentId: string | null
}

export interface Asset {
  name: string
  id: string
  locationId: string | null
  parentId: string | null
  sensorType?: SensorType
  status?: StatusType
  gatewayId?: string | null
  sensorId?: string | null
}
