import { canAccess } from './auth.middleware'

// AREA GUARD
export const accessACP = async (req: any, res: any) => {
    return canAccess(req, res, 'Admin control panel', 'access')
}

export const accessICP = async (req: any, res: any) => {
    return canAccess(req, res, 'Instructor control panel', 'access')
}

// FEATURE GUARD
export const accessPerformances = async (req: any, res: any) => {
    return canAccess(req, res, 'Performances', 'view')
}

// DOCUMENT GUARD
export const accessRoleManagement = async (req: any, res: any) => {
    return canAccess(req, res, 'Role', 'read')
}
export const accessUserManagement = async (req: any, res: any) => {
    return canAccess(req, res, 'User', 'read')
}
export const accessActivityLogs = async (req: any, res: any) => {
    return canAccess(req, res, 'Activity Log', 'read')
}
export const accessCategoryManagement = async (req: any, res: any) => {
    return canAccess(req, res, 'Category', 'read')
}
export const accessCourseManagement = async (
    req: any,
    res: any,
    onlyForCreator: boolean = false
) => {
    return canAccess(req, res, 'Course', 'read', onlyForCreator)
}
export const accessRuleManagement = async (req: any, res: any) => {
    return canAccess(req, res, 'Role', 'read')
}

export const accessSetting = async (req: any, res: any) => {
    return canAccess(req, res, 'Setting', 'read')
}
