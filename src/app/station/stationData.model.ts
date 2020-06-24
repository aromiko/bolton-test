export interface StationData {
  stationName: string,
  stationId: string,
  stationLine: string[]
}

export const stationData: StationData[] = []

stationData.push(
  {
    stationName: "Euston Underground Station",
    stationId: "940GZZLUEUS",
    stationLine: ["northern", "victoria"]
  },
  {
    stationName: "Baker Street Underground Station",
    stationId: "940GZZLUBST",
    stationLine: [
      "metropolitan",
      "hammersmith-city",
      "jubilee",
      "bakerloo",
      "circle"
    ]
  },
  {
    stationName: "Aldgate Underground Station",
    stationId: "940GZZLUALD",
    stationLine: ["metropolitan", "circle"]
  },
  {
    stationName: "Liverpool Street Underground Station",
    stationId: "940GZZLULVT",
    stationLine: ["metropolitan", "hammersmith-city", "circle", "central"]
  })
