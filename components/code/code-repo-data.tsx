import { Eye } from "lucide-react";

async function fetchRepo(id: string, name: string) {
  const response = await fetch( `https://api.github.com/repos/${id}/${name}`,
    { next: { revalidate: 60 }}
  );
  const repo = await response.json();
  return repo;
}

interface RepoProps {
  id: string
  name: string
}

export const CodeRepoData = async ({ id, name }: RepoProps) => {
  const repo = await fetchRepo(id, name);
  return (
    <>
      <h2>{repo.name}</h2>
      <p>{repo.description}</p>
      <div className="card-stats">
        <div className="card-stat">
          {/* <FaStar /> */}
          <Eye/>
          <span>{repo.stargazers_count}</span>
        </div>
        <div className="card-stat">
          {/* <FaCodeBranch /> */}
          <Eye/>
          <span>{repo.forks_count}</span>
        </div>
        <div className="card-stat">
          {/* <FaEye /> */}
          <Eye/>
          <span>{repo.watchers_count}</span>
        </div>
      </div>
    </>
  );
};

