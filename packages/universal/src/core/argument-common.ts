import { Option, InputBlock, ViewsOpenArguments, SectionBlock, ChatPostMessageArguments } from '@slack/web-api'
import {sillyname} from '../utils/sillyname'
import { IFaceImoji, IPMDeletionView, IPMDeactivateWarningView } from '../types/type-common'
import { getFaceImojiList, getRawPassword } from '../utils/common.util'
import { INPUT_FACE_IMOJI, INPUT_NAME_NICKNAME, nickname_min_length, nickname_max_length, INPUT_NAME_CONTENT, INPUT_NAME_PASSWORD, password_min_length, password_max_length, ACTION_SUBMISSION_DELETE, NOT_YET, CONST_APP_NAME, ACTION_APP_FORCE_DEACTIVATE } from '../models/constants.model'
import { STR_DIALOG_FACE_IMOJI, STR_DIALOG_FACE_IMOJI_PLACEHOLDER, STR_DIALOG_NICKNAME_PLACEHOLDER, STR_DIALOG_NICKNAME_TITLE, STR_DIALOG_PASSWORD_PLACEHOLDER, STR_DIALOG_PASSWORD_TITLE, STR_DIALOG_PASSWORD_HINT, STR_VIEW_TITLE_REPLY_DELETION, STR_VIEW_TITLE_VOICE_DELETION, STR_VIEW_DELETE, STR_VIEW_CANCEL, STR_REPORTED_MESSAGE, STR_DELETED_MESSAGE, STR_THIS_VOICE_ID, STR_DEACTIVATE_BUTTON, STR_DEACTIVATE_WARNING_MSG, STR_DEACTIVATED_NOTI, STR_ACTIVATED_NOTI } from '../models/strings.model'
import { IVoice, isVoice } from '../types/type-voice'
import { IReply } from '../types/type-reply'
import { isReplyByTsThreadTs } from '../utils/common.util'

const ENV_SLS_STAGE = process.env.ENV_SLS_STAGE

const getHiddenMsgInfo = (type: 'REPORTED' | 'DELETED', likeCount: number, dislikeCount: number) => {
  const msg = type === 'REPORTED' ? STR_REPORTED_MESSAGE : STR_DELETED_MESSAGE
  const imoji = type === 'REPORTED' ? ':rotating_light:' : ':x:'
  return `${imoji} ${msg} | :thumbsup: ${likeCount} | :thumbsdown: ${dislikeCount} |`
}

export const getContent = (obj: IVoice | IReply) => {
  const { isHiddenByReport, isDeleted, content, userLikeArr, userDislikeArr } = obj

  let modifiedContent =
      isHiddenByReport ? getHiddenMsgInfo('REPORTED', userLikeArr.length, userDislikeArr.length)
    : isDeleted        ? getHiddenMsgInfo('DELETED', userLikeArr.length, userDislikeArr.length)
    : content

  if (isVoice(obj) && obj.platformId !== NOT_YET && !isHiddenByReport && !isDeleted) {
    modifiedContent = modifiedContent + '\n\n' + STR_THIS_VOICE_ID.replace('%s', obj.platformId)
  }

  if (ENV_SLS_STAGE !== 'prod') {
    modifiedContent = `
(test용 슬랙앱에서 작성된 메시지 입니다)
${modifiedContent}
`.trim()
  }

  return modifiedContent
}


const getEmojiOption = (f: IFaceImoji): Option => {
  return {
    "value": f.value,
    "text": { "type": "plain_text", "text": f.label, "emoji": true },
  }
}

export const getInputFaceImojiBlock = (): InputBlock => {
  const faceImojiList = getFaceImojiList()
  const found = faceImojiList.find(f => f.value === ':grinning:')
  const initiaOption = found && getEmojiOption(found)

  return {
    block_id: INPUT_FACE_IMOJI,
    "type": "input",
    "label": { "type": "plain_text", "text": STR_DIALOG_FACE_IMOJI, "emoji": true },
    "element": {
      action_id: 'so',
      "type": "static_select",
      "placeholder": { "type": "plain_text", "text": STR_DIALOG_FACE_IMOJI_PLACEHOLDER, "emoji": true },
      initial_option: initiaOption,
      "options": faceImojiList.map(getEmojiOption),
    }
  }
}
export const getInputNicknameBlock = (): InputBlock => {
  return {
    "type": "input",
    "block_id": INPUT_NAME_NICKNAME,
    "element": {
      action_id: 's',
      "type": "plain_text_input",
      "initial_value": sillyname().split(' ')[0],
      "min_length": nickname_min_length,
      "max_length": nickname_max_length,
      "placeholder": { "type": "plain_text", "text": STR_DIALOG_NICKNAME_PLACEHOLDER, "emoji": true },
    },
    "label": { "type": "plain_text", "text": STR_DIALOG_NICKNAME_TITLE, "emoji": true },
  }
}
export const getInputContentBlock = (label: string, placeholder: string): InputBlock => {
  return {
    "type": "input",
    "block_id": INPUT_NAME_CONTENT,
    "element": {
      action_id: 's',
      "type": "plain_text_input",
      "multiline": true,
      "placeholder": { "type": "plain_text", "text": placeholder, "emoji": true },
    },
    "label": { "type": "plain_text", "text": label, "emoji": true },
  }
}

export const getInputPasswordBlock = (): InputBlock => {
  return {
    "type": "input",
    "block_id": INPUT_NAME_PASSWORD,
    "element": {
      action_id: 's',
      "type": "plain_text_input",
      "initial_value": getRawPassword(),
      "min_length": password_min_length,
      "max_length": password_max_length,
      "placeholder": { "type": "plain_text", "text": STR_DIALOG_PASSWORD_PLACEHOLDER, "emoji": true },
    },
    "label": { "type": "plain_text", "text": STR_DIALOG_PASSWORD_TITLE, "emoji": true },
    "hint": { "type": "plain_text", "text": STR_DIALOG_PASSWORD_HINT, "emoji": true },
  }
}

export const getDeletionViewOpenArg = (trigger_id: string, pm: IPMDeletionView): ViewsOpenArguments => {
  const { ts, threadTs } = pm
  const title = isReplyByTsThreadTs(ts, threadTs) ? STR_VIEW_TITLE_REPLY_DELETION : STR_VIEW_TITLE_VOICE_DELETION
  return {
    trigger_id,
    view: {
      private_metadata: JSON.stringify(pm),
      "callback_id": ACTION_SUBMISSION_DELETE,
      "type": "modal",
      "title": { "type": "plain_text", "text": title, "emoji": true },
      "submit": { "type": "plain_text", "text": STR_VIEW_DELETE, "emoji": true },
      "close": { "type": "plain_text", "text": STR_VIEW_CANCEL, "emoji": true },
      blocks: [
        {
          "type": "input",
          "block_id": INPUT_NAME_PASSWORD,
          "element": {
            action_id: 's',
            "type": "plain_text_input",
            "min_length": password_min_length,
            "max_length": password_max_length,
            "placeholder": { "type": "plain_text", "text": 'password', "emoji": true },
          },
          "label": { "type": "plain_text", "text": STR_DIALOG_PASSWORD_TITLE, "emoji": true },
        }
      ]
    }
  }
}

export const getErrorMsgBlockInView = (msg: string) => {
  const sectionBlock: SectionBlock = {
    "type": "section",
    "text": { type: "plain_text", text: ':warning: ' + msg, emoji: true }
  }
  return sectionBlock
}

export const getAppDeactivateWarningViewsArg = (trigger_id: string, agreedUserCount: number, pm: IPMDeactivateWarningView): ViewsOpenArguments => {
  const text = STR_DEACTIVATE_WARNING_MSG
    .replace('%d', ''+agreedUserCount)
    .replace('%s', CONST_APP_NAME)

  return {
    trigger_id,
    view: {
      "callback_id": ACTION_APP_FORCE_DEACTIVATE,
      private_metadata: JSON.stringify(pm),
      "type": "modal",
      "title": { "type": "plain_text", "text": CONST_APP_NAME, "emoji": true },
      "submit": { "type": "plain_text", "text": STR_DEACTIVATE_BUTTON, "emoji": true },
      "close": { "type": "plain_text", "text": STR_VIEW_CANCEL, "emoji": true },
      "blocks": [
        {
          "type": "section",
          "text": {
            "type": "mrkdwn",
            "text": text,
          }
        }
      ]
    }
  }
}

export const getActivatedArg = (channelId: string, forceDeactivateUserId: string, permalink: string): ChatPostMessageArguments => {
  const strActivatedByForce = STR_ACTIVATED_NOTI.replace('{user}', `<@${forceDeactivateUserId}>`)
    .replace('{app_name}', CONST_APP_NAME).replace('{link}', permalink)

  return {
    channel: channelId,
    text: '',
    blocks: [
      { type: "section", text: { type: "mrkdwn", text: strActivatedByForce }},
    ],
  }
}

export const getDeactivatedArg = (channelId: string, forceDeactivateUserId: string, agreedUserArrCount: number, permalink: string): ChatPostMessageArguments => {
  const strDeactivatedByForce = STR_DEACTIVATED_NOTI
    .replace('{user}', `<@${forceDeactivateUserId}>`)
    .replace('{app_name}', CONST_APP_NAME)
    .replace('{agreed_count}', ''+agreedUserArrCount)
    .replace('{link}', permalink)

  return {
    channel: channelId,
    text: '',
    blocks: [
      { type: "section", text: { type: "mrkdwn", text: strDeactivatedByForce }},
    ],
  }
}
