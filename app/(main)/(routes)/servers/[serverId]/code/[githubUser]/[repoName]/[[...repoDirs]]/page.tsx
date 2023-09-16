import { getGithubFile } from "@/lib/get-github-file"

import { CodeHeader } from "@/components/code/code-header"
import { CodeRepoDirs } from "@/components/code/code-repo-dirs"
import { BackButton } from "@/components/back-button"


interface RepoProps {
  params: {
    repoDirs: string[]
    repoName: string
    githubUser: string
    serverId: string
  }
}

interface ReposType {
  name: string
  path: string
  type: string
}

const RepoPage = async({params}: RepoProps) => {
  const directory = params.repoDirs ? params.repoDirs.join("/") : ""
  const contents: ReposType[] = await getGithubFile(params.githubUser, params.repoName, directory);
  
  const dirs = contents?.filter((content) => content.type === "dir");
  const files = contents?.filter((content) => content.type === "file");
  const headerLabel = params.repoDirs ? params.repoName.concat("/", directory) : params.repoName

  return (
    <div>
      <CodeHeader serverId={params.serverId} label={headerLabel} />
      <BackButton />
      <div>
        {dirs && <p className="text-lg md:text-2xl mx-5 mt-5 max-md:text-center text-zinc-600 dark:text-zinc-400">Directories</p>}
        <ul className="p-5">
          {dirs.map((dir, i) => (
            <li key={i}>
              <CodeRepoDirs repoName={params.repoName} serverId={params.serverId} dirPath={dir.path} dirName={dir.name} type={dir.type} githubUser={params.githubUser}/>
            </li>
          ))}
        </ul>
        {files && <p className="text-lg md:text-2xl mx-5 mt-5 max-md:text-center text-zinc-600 dark:text-zinc-400">Files</p>}
        <ul className="p-5">
          {files.map((dir:ReposType) => (
            <li key={dir.path}>
              <CodeRepoDirs repoName={params.repoName} serverId={params.serverId} dirPath={dir.path} dirName={dir.name} type={dir.type} githubUser={params.githubUser}/>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default RepoPage