export class UserShortEntity {
  /**
   * 用户名
   * @example xxx
   */
  name: string
  /**
   * 用户邮箱
   * @example  1348@qq.com
   */
  email: string
}

export class PostEntity {
  /**
   * 主键
   * @example 0
   */
  id: number
  /**
   * 标题
   * @example Es6 介绍
   */
  title: string
  /**
   * 内容
   * @example xxxx
   */
  content: string
  /**
   * 发布状态
   * @example false
   */
  published: boolean
  /**
   * 作者id
   * @example sdasfas
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
   * @example
   */
  user?: UserShortEntity
}
