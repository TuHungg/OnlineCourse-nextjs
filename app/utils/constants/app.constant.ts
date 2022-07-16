import { TController, TModel } from '../data/data.type'

export const IS_DEV = process.env.NODE_ENV == 'development'
export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME
export const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN
export const FRONTEND_DOMAIN = process.env.NEXT_PUBLIC_FRONTEND_DOMAIN

export const CONTROLLER: Record<TModel, TController> = {
    order: 'orders',
    user: 'users',
    role: 'roles',
    course: 'courses',
    lecture: 'lectures',
    quiz: 'quizzes',
    file: 'files',
    category: 'categories',
    'user-course': 'user-course',
    auth: 'auth',
    comment: 'comments',
    review: 'reviews',
    notification: 'notifications',
    payment: 'payments',
    slider: 'sliders',
    'activity log': 'activity-logs',
}
export const MODEL: Record<TModel, TModel> = {
    notification: 'notification',
    order: 'order',
    user: 'user',
    role: 'role',
    course: 'course',
    lecture: 'lecture',
    quiz: 'quiz',
    file: 'file',
    category: 'category',
    'user-course': 'user-course',
    auth: 'auth',
    comment: 'comment',
    review: 'review',
    payment: 'payment',
    slider: 'slider',
    'activity log': 'activity log',
}
