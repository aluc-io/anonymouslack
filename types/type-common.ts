import { isNotEmptyString, isNotNullObject } from "../common/common-util"

export interface ISlashCommandPayload {
  token?: string;
  team_id: string
  team_domain?: string;
  channel_id: string
  channel_name?: string;
  user_id: string
  user_name?: string;
  response_url: string
  trigger_id: string
  text: string
  command?: string;
  enterprise_id?: string;
  enterprise_name?: string;
}

export interface IPMDeletionView {
  channelId: string
  channelName: string
  ts: string
  threadTs?: string
}

export interface IChatGetPermalinkResponse {
    ok?:        boolean;
    permalink?: string;
    channel?:   string;
    error?:     string;
    needed?:    string;
    provided?:  string;
}

export interface IFaceImoji {
  value: string
  label: string
}

export const isPMDeletionView = (o: any): o is IPMDeletionView => {
  if (!isNotNullObject(o)) return false
  if (!isNotEmptyString(o.channelId)) return false
  if (!isNotEmptyString(o.channelName)) return false
  if (!isNotEmptyString(o.ts)) return false
  return true
}

export const isMySlashCommandRequest = (o: any): o is ISlashCommandPayload => {
  if (!isNotNullObject(o)) return false
  if (!isNotEmptyString(o.team_id)) return false
  if (!isNotEmptyString(o.channel_id)) return false
  if (!isNotEmptyString(o.user_id)) return false
  if (!isNotEmptyString(o.response_url)) return false
  if (!isNotEmptyString(o.trigger_id)) return false

  // user가 typing하는 부분. 빈 문자가 올 수도 있음
  if (typeof o.text !== 'string') return false

  return true
}