import { DocumentClient} from 'aws-sdk/clients/dynamodb'

import { createLogger } from '../utils/logger.util'
import { getDDC } from '../utils/common.util'
import { isTeamArr, ITeam } from '../types/type-team'
import { NOT_GRID, TABLENAME_TEAM } from '../models/constants.model'

const TableName = TABLENAME_TEAM
const ddc = getDDC()
const logger = createLogger('team')

export const getTeamArr = async () => {
  const params: DocumentClient.ScanInput = { TableName : TableName, Limit: 300 }
  const result = await ddc.scan(params).promise()
  if (!result || !isTeamArr(result.Items)) throw new Error('Can not get teamArr')
  return result.Items
}

export const getTeamArrByGridId = async (gridId: string) => {
  const params: DocumentClient.QueryInput = {
    TableName : TableName,
    ExpressionAttributeValues: { ":gridId": gridId },
    KeyConditionExpression: "gridId = :gridId",
    Limit: 300,
  }
  const result = await ddc.query(params).promise()
  if (!result || !isTeamArr(result.Items)) throw new Error('Can not get teamArr by gridId: ' + gridId)

  return result.Items
}

export const newTeam = (teamId: string, teamName: string, gridId: string | null) => {
  const team: ITeam = { teamId, teamName, gridId: gridId || NOT_GRID }
  return team
}

export const putTeam = async (team: ITeam) => {
  const params: DocumentClient.PutItemInput = { TableName, Item: team }
  logger.debug(`put team into table ${TableName}. ${JSON.stringify(team)}`)
  await ddc.put(params).promise()
}
