import { useGetUserById } from '@/hooks/useUser'

export function Home() {
  const { data: user } = useGetUserById()
  console.log(user)

  return (
    <main className="px-8">
      <div className="flex flex-col gap-4">
        {user ? (
          user.tasks ? (
            user.tasks.map((task) => {
              return (
                <div
                  className="flex h-16 w-[250px] items-center rounded-lg bg-white/10 px-6 shadow-glass"
                  key={task.id}
                >
                  <span className="text-sm">{task.content}</span>
                </div>
              )
            })
          ) : (
            <div>
              <h2>Você não tem tarefas.</h2>
            </div>
          )
        ) : (
          <span>Carregando...</span>
        )}
      </div>
    </main>
  )
}
