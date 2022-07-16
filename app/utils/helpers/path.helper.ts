import { TCourseFormSection } from '../../modules/course-form/types/course-form-sectiontype'
import { API_DOMAIN } from '../constants/app.constant'
import { ROLE_FILTER_KEY } from './../../modules/admin/pages/roles/permission-management/PermissionToolbar/RoleFilter'
import { TInstructorSection } from './../../modules/instructor/types/instructor-section.type'
import { TMyCourse } from './../../modules/shared/interfaces/models/user.interface'
import { TController } from './../data/data.type'
import UrlHelper from './url.heper'
export default class PathHelper {
    private static module = {
        admin: 'admin',
        client: '',
        auth: 'join',
        instructor: 'instructor',
    }

    private static adminPages = {
        course: 'courses',
        user: 'users',
        role: 'roles',
        lecture: 'users',
        quiz: 'quizzes',
        file: 'files',
        category: 'categories',
        'user-course': 'user-course',
        auth: 'auth',
        comment: 'comments',
        permissionManagement: 'permission-management',
        performance: 'performance',
        payments: 'payments',
        'activity-log': 'activity-logs',
    }

    private static instructorPages = {
        course: 'courses',
    }

    private static clientPages = {
        courseDetail: 'course',
        category: 'courses',
        cart: 'cart',
        learn: 'learn',
        myCourses: 'my-courses',
        search: 'courses/search',
        user: 'user',
    }

    private static authPages = {
        login: 'login',
        signup: 'signup',
    }

    static isAdminPath(path: string) {
        return !!path.match(new RegExp(`^\/${this.module.admin}`))
    }

    static getActivityLogsPath() {
        return `/${this.module.admin}/${this.adminPages['activity-log']}`
    }
    static getAdminOrdersPath(orderId: string) {
        return `/${this.module.admin}/${this.adminPages.performance}/orders/${orderId}`
    }
    static getAdminInstructorPayment(instructorId: string) {
        return `/${this.module.admin}/${this.adminPages.payments}/instructor-payments/${instructorId}`
    }

    static getAdminPerformancePath(sub: string) {
        return `/${this.module.admin}/${this.adminPages.performance}/${sub}`
    }

    static getAdminControllerPage(ctrl: TController, queryObj?: Record<string, any>) {
        const queryString = !!queryObj ? UrlHelper.cvtObjToQueryString(queryObj) : ''
        return `/${this.module.admin}/${ctrl}?${queryString}`
    }

    static getAdminInstructorViewPath(instructorId: string, section: TInstructorSection) {
        return (
            this.getAdminPerformancePath('instructors') +
            `/${instructorId}/${this.getInstructorSectionPath(section)}`
        )
    }

    static getSetPermissionPath(roleId?: string) {
        const roleFilterString = roleId ? `?${ROLE_FILTER_KEY}=${roleId}` : ''
        return `/${this.module.admin}/${this.adminPages.permissionManagement}${roleFilterString}`
    }

    public static getCourseFormPath(id: string, section?: TCourseFormSection, pathName?: string) {
        const prefix = !!pathName ? pathName?.slice(1, pathName.indexOf('[')) : ''
        const sectionPath = section ? `/${section}` : ''
        return `/${prefix}${id}` + sectionPath
    }

    // ADMIN COURSE FORM
    static getAdminCourseFormPath(id: string, section?: TCourseFormSection) {
        return `/${this.module.admin}/${this.adminPages.course}${this.getCourseFormPath(
            id,
            section
        )}`
    }

    static getCourseFormBackPath(roleName: string) {
        const backUrl =
            roleName == 'Instructor'
                ? PathHelper.getInstructorPath('courses')
                : PathHelper.getAdminControllerPage('courses')
        return backUrl
    }

    // INSTRUCTOR
    static isInstructorPath(path: string) {
        return !!path.match(new RegExp(`^\/${this.module.instructor}`))
    }

    static getInstructorCourseFormPath(id: string, section?: TCourseFormSection) {
        return `/${this.module.instructor}/${this.instructorPages.course}${this.getCourseFormPath(
            id,
            section
        )}`
    }

    static getInstructorRevenueReportPath(reportId?: string) {
        const reportString = reportId ? `/${reportId}` : ''
        return `${this.getInstructorPath('revenue-reports')}${reportString}`
    }

    private static getInstructorSectionPath(section: TInstructorSection, sub?: string) {
        const sectionPath = sub ? `${section}/${sub}` : section
        return sectionPath
    }

    static getInstructorPath(section: TInstructorSection, sub?: string) {
        return `/${this.module.instructor}/${this.getInstructorSectionPath(section, sub)}`
    }

    static getInstructorStudentsPath(courseId?: string) {
        const queryString = courseId ? `course._id_filter=${courseId}` : ''
        return this.getInstructorPath('performance', 'students') + `?${queryString}`
    }

    static getInstructorReviewsPath(courseId?: string) {
        const queryString = courseId ? `course._id_filter=${courseId}` : ''
        return this.getInstructorPath('performance', 'reviews') + `?${queryString}`
    }

    // CLIENT PATHS
    static getClientDomain(path: string = '') {
        return `${process.env.NEXT_PUBLIC_FRONTEND_DOMAIN}/${path}`
    }
    static getClientPath(path: string = '') {
        return `${this.clientPrefix}/${path}`
    }

    static getCourseDetailPath(slug: string) {
        return `${this.clientPrefix}/${this.clientPages.courseDetail}/${slug}`
    }
    static getFilteredCoursesWithSearchValue(searchValue: string) {
        return `${this.clientPrefix}/${this.clientPages.search}/${searchValue}`
    }

    static getProfliePath() {
        return `${this.clientPrefix}/${this.clientPages.user}/edit-profile`
    }

    // LEARN
    static getLearnCoursePath(
        slug: string,

        options?: {
            commentId?: string
        }
    ) {
        let queryString = ''
        //
        if (options?.commentId) queryString += `commentId=${options.commentId}`
        //
        queryString = !!queryString ? `?${queryString}` : ''
        return `${this.clientPrefix}/${this.clientPages.courseDetail}/${slug}/${this.clientPages.learn}${queryString}`
    }
    // MY COURSES
    static getMyCoursesPath(sub: TMyCourse = 'learning') {
        return `${this.clientPrefix}/${this.clientPages.myCourses}/${sub}`
    }
    // CART
    static getCartPath() {
        return `${this.clientPrefix}/${this.clientPages.cart}`
    }
    // CATEGORY
    static getCategoryPath(cat: string, subCat?: string) {
        const subCatString = subCat ? `/${subCat}` : ''
        return `${this.clientPrefix}/${this.clientPages.category}/${cat}${subCatString}`
    }

    private static get clientPrefix() {
        return this.module.client == '' ? '' : `/${this.module.client}`
    }
    //
    static getSignUpPath() {
        return `/${this.module.auth}/${this.authPages.signup}`
    }
    static getLoginPath() {
        return `/${this.module.auth}/${this.authPages.login}`
    }
    //
    static getGoogleLoginUrl() {
        return `${API_DOMAIN}/auth/google`
    }
}
