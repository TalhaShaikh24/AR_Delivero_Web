/**
 * Category type definitions
 */

export interface Category {
  _id: string
  title: string
  description: string
  image: string
  menuStatus: string
  status: boolean
  createdAt: string
  updatedAt: string
  __v: number
  productCount: number
}
