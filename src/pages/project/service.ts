import { ProjectController } from '@/controller'

export const getListApi = () => {
  return ProjectController.getList()
}
