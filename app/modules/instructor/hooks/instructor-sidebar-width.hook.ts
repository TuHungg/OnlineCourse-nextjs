import { useInstructorMenu } from '../providers/instructor-menu.provider'

export const INSTRUCTOR_SIDEBAR_EXPANDED_WIDTH = 285
export const INSTRUCTOR_SIDEBAR_PRIMARY_WIDTH = 60
export const useInstructorSidebarWidth = () => {
    const {
        state: { activeNavGroup },
    } = useInstructorMenu()
    const hasSubBar = !!activeNavGroup?.items
    return hasSubBar ? INSTRUCTOR_SIDEBAR_EXPANDED_WIDTH : INSTRUCTOR_SIDEBAR_PRIMARY_WIDTH
}
