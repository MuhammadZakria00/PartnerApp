export interface UserDetail {
    userId: string;
    restaurantId: string;
    email: string;
    userName: string;
    role?: string;
    roleId: string;
    rolePermission: {
      backgroundColor: string;
      isActive: boolean;
      name: string;
      roleId: string;
      systemModulePermissions: {
        systemModules: IGetSystemPermissions[]
      }
    }
  }
export interface RestaurantDetail {
    restaurantId: string;
    restaurantname: string;
  }
  export interface IGetSystemPermissions {
    systemModuleId: string;
    parentModule: string;
    description: string;
    modulePermissions: IModulePermissions[];
  }
  export interface IModulePermissions {
    systemPermissionId: string;
    title: string
    description: string;
    isAssigned: boolean;
  }
  export interface IRestaurantdetails
{
  data: {
    restaurant: RestaurantDetail[]
    pagination: IPagination
  };
}
interface IPagination {
    totalCount: number;
    pageSize: number;
    pageNo: number;
  }