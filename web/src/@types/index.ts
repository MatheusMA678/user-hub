interface TaskTypes {
  id: string
  content: string
}

export interface UserTypes {
  id?: string
  name?: string
  email?: string
  password?: string
  picture?: string
  tasks?: TaskTypes[]
}
