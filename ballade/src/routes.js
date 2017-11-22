import DiaryBook from './views/post/DiaryBook'
import Topic from './views/post/Topic'
import Activity from './views/activity/Activity'

export default {
    '/diary_book': {view: DiaryBook},
    '/topic/detail': {view: Topic},
    '/activity/detail': {view: Activity}
}
