import { IRolePermission } from './../../shared/interfaces/models/role.interface'
import { IProfile } from './../../shared/interfaces/models/user.interface'
export default interface IJwtUser {
    _id: string
    email: string
    // profile: IProfile
    role: {
        _id: string
        name: string
        permissions: IRolePermission[]
    }
}
