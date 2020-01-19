import { includes, values } from "lodash"

export const isEnumCommand = (command: any): command is EnumCommand => {
  return includes(values(EnumCommand), command)
}
export enum EnumCommand { help='help' }

export const ACTION_SUBMISSION_VOICE             = 'ACTION_SUBMISSION_VOICE'
export const ACTION_SUBMISSION_REPLY             = 'ACTION_SUBMISSION_REPLY'
export const ACTION_SUBMISSION_USERREPLY         = 'ACTION_SUBMISSION_USERREPLY'
export const ACTION_SUBMISSION_DELETE_VOICE      = 'ACTION_SUBMISSION_DELETE_VOICE'
export const ACTION_SUBMISSION_DELETE_REPLY      = 'ACTION_SUBMISSION_DELETE_REPLY'
export const ACTION_OPEN_DIALOG_VOICE            = 'ACTION_OPEN_DIALOG_VOICE'
export const ACTION_SUBMISSION_DELETE_USERREPLY  = 'ACTION_SUBMISSION_DELETE_USERREPLY'
export const ACTION_OPEN_DIALOG_REPLY            = 'ACTION_OPEN_DIALOG_REPLY'
export const ACTION_OPEN_DIALOG_DELETE_VOICE     = 'ACTION_OPEN_DIALOG_DELETE_VOICE'
export const ACTION_OPEN_DIALOG_DELETE_REPLY     = 'ACTION_OPEN_DIALOG_DELETE_REPLY'
export const ACTION_OPEN_DIALOG_DELETE_USERREPLY = 'ACTION_OPEN_DIALOG_DELETE_USERREPLY'
export const ACTION_VOTE_REPLY_LIKE              = 'ACTION_VOTE_REPLY_LIKE'
export const ACTION_VOTE_REPLY_DISLIKE           = 'ACTION_VOTE_REPLY_DISLIKE'
export const ACTION_VOTE_USERREPLY_LIKE          = 'ACTION_VOTE_USERREPLY_LIKE'
export const ACTION_VOTE_USERREPLY_DISLIKE       = 'ACTION_VOTE_USERREPLY_DISLIKE'
export const ACTION_VOTE_VOICE_LIKE              = 'ACTION_VOTE_VOICE_LIKE'
export const ACTION_VOTE_VOICE_DISLIKE           = 'ACTION_VOTE_VOICE_DISLIKE'
export const ACTION_HELP_NEW_MESSAGE             = 'ACTION_HELP_NEW_MESSAGE'
export const ACTION_APP_ACCEPTED_NEW_MESSAGE     = 'ACTION_APP_ACCEPTED_NEW_MESSAGE'
export const ACTION_APP_USE_AGREEMENT            = 'ACTION_APP_USE_AGREEMENT'
export const ACTION_APP_FORCE_ACTIVATE           = 'ACTION_APP_FORCE_ACTIVATE'
export const ACTION_APP_FORCE_DEACTIVATE         = 'ACTION_APP_FORCE_DEACTIVATE'
export const ACTION_INTERACTIVE_MENU_USERREPLY   = 'ACTION_INTERACTIVE_MENU_USERREPLY'

export const ACTION_SUBMISSION_DELETE            = 'ACTION_SUBMISSION_DELETE'
export const ACTION_OPEN_VIEW_DELETE             = 'ACTION_OPEN_VIEW_DELETE'
export const ACTION_VOTE_REPORT                  = 'ACTION_VOTE_REPORT'

export const NOT_YET = '__NOT_YET__'
export const NOT_GRID = '__NOT_GRID__'
export const UNKNOWN_CHANNEL_NAME = '__UNKOWN_CHANNEL_NAME__'

export const ACTIVATION_QUORUM = 3
export const VOICE_LIMIT_RECENT24H = 20

export const INPUT_NAME_NICKNAME = 'messagebox_nickname'
export const INPUT_NAME_PASSWORD = 'messagebox_password'
export const INPUT_NAME_CONTENT = 'messagebox_content'
export const INPUT_FACE_IMOJI = 'select_face_imoji'

export const ERROR_INVALID_PARAMETER = 'ERROR_INVALID_PARAMETER'
export const ERROR_CAN_NOT_QUERY_GROUP_BY_WEB_ACCESS_TOKEN = 'ERROR_CAN_NOT_QUERY_GROUP_BY_WEB_ACCESS_TOKEN'
export const ERROR_CAN_NOT_GET_GROUP_BY_WEB_ACCESS_TOKEN = 'ERROR_CAN_NOT_GET_GROUP_BY_WEB_ACCESS_TOKEN'

export const password_min_length = 4
export const password_max_length = 30
export const nickname_min_length = 1
export const nickname_max_length = 20
export const REPORT_MAX_ALLOWED_LENGTH = 5

const TABLENAME_PREFIX = process.env.ANONYMOUSLACK_TABLENAME_PREFIX || 'Anonymouslack'
export const TABLENAME_TEAM = `${TABLENAME_PREFIX}-Team`
export const TABLENAME_GROUP = `${TABLENAME_PREFIX}-Group`
export const TABLENAME_VOICE = `${TABLENAME_PREFIX}-Voice`
export const TABLENAME_REPLY = `${TABLENAME_PREFIX}-Reply`
export const TABLENAME_AT = `${TABLENAME_PREFIX}-AT`