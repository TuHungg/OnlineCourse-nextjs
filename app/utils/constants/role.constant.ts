// permissions
export const BASIC_PERMISSIONS: TBasicPermission[] = ['create', 'read', 'update', 'delete']
export type TBasicPermission = 'read' | 'create' | 'update' | 'delete'
export type TBasicOwnPermission = 'read-own' | 'create-own' | 'update-own' | 'delete-own'
export type TReportPermission = 'import' | 'export' | 'view'
export type TMangePermission = 'submit' | 'approve'
export type TContentPermission = 'reply' | 'respond'
export type TAreaPermission = 'access'
export type TPermission =
    | TBasicPermission
    | TReportPermission
    | TMangePermission
    | TContentPermission
    | TAreaPermission
    | TBasicOwnPermission

// document types
export type TDocumentType = 'document' | 'area' | 'feature'
export type TDocumentName =
    | 'Course'
    | 'Order'
    | 'Category'
    | 'Topic'
    | 'Review'
    | 'Comment'
    | 'User'
    | 'Role'
    | 'File'
    | 'Admin control panel'
    | 'Instructor control panel'
    | 'Performances'
    | 'Setting'
    | 'Transaction'
    | 'Slider'
    | 'Payment'
    | 'Activity Log'

//
export const PERMISSION: Record<TPermission, string> = {
    create: 'create',
    read: 'read',
    update: 'update',
    delete: 'delete',
    export: 'export',
    import: 'import',
    access: 'access',
    approve: 'approve',
    submit: 'submit',
    reply: 'reply',
    respond: 'respond',
    view: 'view',
    'read-own': 'read-own',
    'create-own': 'create-own',
    'update-own': 'update-own',
    'delete-own': 'delete-own',
}
