import { CodeHeader } from "@/components/code/code-header";
import { CodeRepos } from "@/components/code/code-repos";

interface CodeIdProps {
  params:{
    serverId: string
    githubUser: string
  }
}

type Repository = {
  id: number;
  name: string;
  description: string;
  html_url: string;
};

async function fetchRepos(id: string) {
  const response = await fetch(`https://api.github.com/users/${id}/repos`, {
    headers: { Authorization: `Bearer ${process.env.GITHUB_APP_KEY}`},
      next: { revalidate: 60 }
  })

  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const repos: Repository[] = await response.json()
  return repos
}

const CodeIdPage = async ({params}: CodeIdProps) => {

  const repos = await fetchRepos(params.githubUser)

  return (
    <div className="bg-white dark:bg-[#313338]">
      <CodeHeader serverId={params.serverId} label={params.githubUser} />
      <p className="text-lg md:text-2xl mx-5 mt-5 max-md:text-center text-zinc-600 dark:text-zinc-400">Repositories</p>
        <ul className="p-5">
            {repos.map(repo => (
                <li key={repo.id}>
                  <CodeRepos githubUser={params.githubUser} repo={repo}/>
              </li>
            ))}
        </ul>
    </div>
  )
};

export default CodeIdPage;
