export type SensorType = 'energy' | 'vibration' | null

export type Status = 'operating' | 'alert' | null

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
  status?: Status
}
