// common
export const STR_APP_NAME = "Anoymouslack"
export const STR_SLACK_COMMAND = "anoymouslack"

// posted message
export const STR_POSTED_MESSAGE_TITLE = "*익명 메시지가 도착입니다."
export const STR_DELETED_MESSAGE = "~삭제된 메시지~"
export const STR_REPORTED_MESSAGE = "~신고된 메시지~"

// maybe dialog
export const STR_DIALOG_VOICE_PLACEHOLDER = "익명으로 의견 드립니다. 찬/반 의견 피드백 부탁드립니다. 이번 제품 디자인 관련해서..."
export const STR_DIALOG_FACE_IMOJI = "프로필 이미지"
export const STR_DIALOG_FACE_IMOJI_PLACEHOLDER = "프로필 이미지를 선택해주세요"
export const STR_DIALOG_NICKNAME_TITLE = "닉네임"
export const STR_DIALOG_NICKNAME_PLACEHOLDER = "닉네임을 입력해주세요"
export const STR_DIALOG_MESSAGES_TITLE = "메세지"
export const STR_DIALOG_PASSWORD_TITLE = "패스워드"
export const STR_LABEL_CONTENT = "댓글"
export const STR_LABEL_PASSWORD = "패스워드"
export const STR_PLACEHOLDER_CONTENT_FOR_REPLY = "저는 ㅇㅇ님 의견에 반대합니다. 제 생각엔..."
export const STR_THIS_VOICE_ID = "MessageID: `%s`"
export const STR_DIALOG_PASSWORD_PLACEHOLDER = "삭제 시 사용할 Password 를 입력하세요"
export const STR_DIALOG_PASSWORD_HINT = "Password 는 메시지 삭제시 필요합니다."
export const STR_FAILED_TO_DELETE_REPLY = "댓글 삭제 실패. Password 를 확인하세요."
export const STR_FAILED_TO_DELETE_VOICE = "메시지 삭제 실패. Password 를 확인하세요."
export const STR_FAILED_TO_CREATE_VOICE = "메시지 작성 실패. 최근 24시간 동안 너무 많은 글이 작성되었습니다."
export const STR_UNKOWN_ERROR = "알 수 없는 에러 발생"
export const STR_SUCCESS_VOICE_CREATION = "익명 글 작성 성공. 웹 페이지를 새로고침 합니다"
export const STR_INVALID_URL = "유효하지 않은 url 입니다. url 은 수시로 변경 될 수 있으므로 정확한 url 을 확인하세요."

// agreement
export const STR_AGREEMENT_REQUIRED = `채널 멤버 중 한명이 \`${STR_APP_NAME}\` 사용을 제안했습니다. 이 슬랙 앱은 *익명 커뮤니케이션* 기능을 제공합니다.`
export const STR_AGREEMENT_REQUIRED_DESC = `슬랙 앱 사용을 위해 최소 %d 명의 동의가 필요합니다.\n익명으로 *동의* 하거나 실명으로 *활성화* 시킬 수 있습니다`
export const STR_AGREEMENT_ACCEPTED = `%d 명이 동의하여 앱이 활성화 되었습니다.`
export const STR_APP_ACTIVATED_BY_FORCE = `%s 님이 앱을 활성화 시켰습니다.`
export const STR_APP_DEACTIVATED_BY_FORCE = `%s 님이 앱을 비활성화 시켰습니다.`
export const STR_HOW_TO_POST = `이제 \`/${STR_SLACK_COMMAND}\` 명령어 또는 ＊Daily web url＊을 사용하여 익명 메시지를 작성 할 수 있습니다!`
export const STR_YOU_AREADY_AGREED = "이미 동의 하셨습니다"
export const STR_SHARE_AGREEMENT_LINK = `To use \`${STR_APP_NAME}\`, Go to the link and agree.\n%link`
export const STR_FORCE_ACTIVATE = `즉시 활성화`
export const STR_FORCE_DEACTIVATE = `즉시 비활성화`

// app install, permission
export const STR_DENIED_APP = `Slack app 사용 승인을 거절하였습니다`
export const STR_ALLOWED_APP = `Slack app 사용을 승인하였습니다. 채널에 \`/${STR_SLACK_COMMAND}\` 를 입력하세요. Workspace 의 첫 설치라면 한번 더 allow 를 요청 할 수 있습니다.`
export const STR_QUESTION = `문의 및 버그제보: %s`
export const STR_SERVER_VERSION = '서버 버전: `%s`'
export const STR_YOU_CAN_CREATE_VOICE = `:grinning: *${STR_APP_NAME}* 를 사용 할 수 있습니다`
export const STR_YOU_HAVE_TO_AGREE_APP_USAGE = `:disappointed_relieved: 익명 메시지를 작성하려면 채널 멤버들의 동의를 받아야 합니다.\n*아래 컨피그 메시지를 참고하세요:*\n%s`

export const STR_SLACK_APP_DOES_NOT_HAVE_PERMISSION1 = '슬랙앱이 본 채널의 메시지 작성 권한이 없습니다.'
export const STR_SLACK_APP_DOES_NOT_HAVE_PERMISSION2 = '아래 url 에 방문하여 권한을 부여 해주세요.'

export const STR_LIKE = ':thumbsup:'
export const STR_DISLIKE = ':thumbsdown:'
export const STR_AGREE = '앱 사용 동의'
export const STR_DELETE = '삭제'
export const STR_REPLY_AS_ANON = '익명으로 댓글 달기'
export const STR_POST_VOICE = '익명 메시지 작성'
export const STR_CONFIG_MSG = '컨피그 메시지: %s'
export const STR_REPORT = ':rotating_light:신고'
export const STR_REPORT_N = STR_REPORT + ' %d'

export const STR_VIEW_TITLE_VOICE_DELETION = '익명 메세지 삭제'
export const STR_VIEW_TITLE_REPLY_DELETION = '익명 댓글 삭제'
export const STR_VIEW_DELETE = '삭제'
export const STR_VIEW_CANCEL = '취소'
export const STR_NOT_MATCHED_PASSWORD = '패스워드가 일치하지 않습니다'