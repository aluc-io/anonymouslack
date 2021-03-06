import axios from 'axios'
import { WebClient } from "@slack/web-api"
import { IParamNewReply, IReply, IPMNewReplyView, isPMCreateReplyView } from "../types/type-reply"
import { newReply, putReply, getReply } from "../models/model-reply"
import { getReplyArg, getNewReplyViewsOpen } from "./argument-reply"
import { getVoiceId, getReplyId, IMyBlockActionPayload, getGroupId, IMyViewSubmissionPayload, IMoreActionPayload, isMoreActionPayload} from "../models/model-common"
import { hashAndtoggle} from "../utils/common.util"
import { IGroup } from "../types/type-group"
import { INPUT_NAME_NICKNAME, INPUT_NAME_CONTENT, INPUT_NAME_PASSWORD, INPUT_FACE_IMOJI, NOT_YET } from "../models"
import { getTheradTs } from '../utils/common.util'
import { getPermalink, isFirstThreadMsgByPermalink } from './core-common'
import { parseGroupId } from '../types/type-common'
import { isNotEmptyString } from '../utils/typecheck.util'

export const createReplyFromSlack = async (web: WebClient, payload: IMyViewSubmissionPayload, group: IGroup) => {
  const { view } = payload
  const pm: IPMNewReplyView = JSON.parse(payload.view.private_metadata)
  if (!isPMCreateReplyView(pm)) throw new Error('pm is not IPMNewReplyView')

  const { channelId, threadTs } = pm
  const nickname = ''+view.state.values[INPUT_NAME_NICKNAME].s.value
  const content = ''+view.state.values[INPUT_NAME_CONTENT].s.value
  const rawPassword = ''+view.state.values[INPUT_NAME_PASSWORD].s.value
  const faceImoji = ''+view.state.values[INPUT_FACE_IMOJI].so.selected_option.value
  if (!nickname || !content || !rawPassword || !faceImoji) throw new Error('Invalid state')

  const groupId = getGroupId(channelId, group.teamId, group.gridId)
  const param: IParamNewReply = { platformId: NOT_YET, threadTs, nickname, content, rawPassword, faceImoji, groupId }
  await postAndPutReply(web, param)
}

export const postAndPutReply = async (web: WebClient, param: IParamNewReply) => {
  const { threadTs, groupId } = param
  const { channelId } = parseGroupId(groupId)
  const permalink = await getPermalink(web, channelId, threadTs)
  if (!permalink) throw new Error('Wrong messageID. Or Message might be deleted')

  if (!isFirstThreadMsgByPermalink(permalink)) throw new Error('Reply only can be added to first thread')
  const voiceId = getVoiceId(groupId, threadTs)
  const reply = newReply(param)
  const replyArg = getReplyArg(reply, threadTs)
  const result = await web.chat.postMessage(replyArg)
  if (!isNotEmptyString(result?.ts)) throw new Error('Wrong result.ts')

  const replyId = getReplyId(voiceId, result.ts)
  await putReply({ ...reply, replyId, platformId: result.ts })
}

export const voteSlackReply = async (payload: IMyBlockActionPayload, type: 'LIKE' | 'DISLIKE') => {
  const { team, channel, user, response_url, message } = payload
  if (!message.thread_ts) throw new Error('not found message.thread_ts')

  const groupId = getGroupId(channel.id, team.id, team.enterprise_id)
  const voiceId = getVoiceId(groupId, message.thread_ts)
  const replyId = getReplyId(voiceId, message.ts)
  const r = await getReply(replyId)

  const userLikeArr = type === 'LIKE' ? hashAndtoggle(r.userLikeArr, user.id, replyId) : r.userLikeArr
  const userDislikeArr = type === 'DISLIKE' ? hashAndtoggle(r.userDislikeArr, user.id, replyId) : r.userDislikeArr
  const newReply: IReply = { ...r, userLikeArr, userDislikeArr }

  const updatedReply = await putReply(newReply)
  await axios.post(response_url, getReplyArg(updatedReply))
}

export const openViewToPostReply = async (web: WebClient, payload: IMyBlockActionPayload | IMoreActionPayload) => {
  const channelId = payload.channel.id
  const channelName = payload.channel.name
  const { trigger_id, channel, message } = payload
  const threadTs = isMoreActionPayload(payload)
    ? getTheradTs(payload.message_ts, payload.message.thread_ts)
    : getTheradTs(message.ts, message.thread_ts)

  const pm: IPMNewReplyView = { channelId, threadTs, channelName }
  const arg = getNewReplyViewsOpen(trigger_id, pm)
  await web.views.open(arg)
}
