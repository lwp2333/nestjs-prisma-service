export class UserShortEntity {
  /**
   * 用户名
   */
  name: string
  /**
   * 用户邮箱
   */
  email: string
}

export class PostEntity {
  /**
   * 主键
   */
  id: number
  /**
   * 标题
   */
  title: string
  /**
   * 内容
   */
  content: string
  /**
   * 发布状态
   */
  published: boolean
  /**
   * 作者id
   */
  authorId: number
  /**
   * 创建时间
   * @example 2021-09-4 23:00:00
   */
  createdAt: Date
  /**
   * 更新时间
   * @example  2021-09-4 23:59:59
   */
  updatedAt: Date
  /**
   * 用户简介信息
   */
  user?: UserShortEntity
}
