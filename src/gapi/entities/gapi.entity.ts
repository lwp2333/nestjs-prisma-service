export enum RelationType {
  father,
  mother,
  sister,
  brother,
  other,
}

export class Relation {
  /**
   * 主键id
   */
  id: number
  /**
   * 姓名
   */
  name: string
  /**
   * 年龄
   */
  age: number
  /**
   * 关系类型
   */
  relationType: RelationType
}

export class GapiEntity {
  /**
   * 主键id
   */
  id: number
  /**
   * 姓名
   */
  name: string
  /**
   * 年龄
   */
  age: number
  /**
   * 人员关系列表
   */
  relation: Relation[]
}
